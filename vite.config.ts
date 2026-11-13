import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import postcss from 'postcss';
import { defineConfig, type Plugin } from 'vite';

type Root = typeof import('./src/root');

// react html-encodes &'"<> in attributes, which class names like [&_svg]:size-4 contain
const entities: Record<string, string> = { amp: '&', '#x27': "'", quot: '"', lt: '<', gt: '>' };
const decode = (html: string) =>
	html.replace(/&(amp|#x27|quot|lt|gt);/g, (_, name) => entities[name]!);
// a class in a selector, e.g. .hover\:bg-muted, and its unescaped name
const classSelector = /(?<![\d\\])\.((?:\\[\da-f]{1,6} ?|\\.|[\w-])+)/gi;
const unescape = (name: string) => name.replace(/\\([\da-f]{1,6}) ?|\\(.)/gi,
	(_, hex, char) => hex ? String.fromCodePoint(parseInt(hex, 16)) : char);

// every page inlines the same stylesheet. this drops css rules for classes no page uses, renames
// the rest to a, b, ... aB (most used first) and drops classes from the html that no rule uses
const optimizeCss = (pages: string[]) => {
	const style = /<style>([\s\S]*?)<\/style>/;
	const classAttr = / class="([^"]*)"/g;
	const counts = new Map<string, number>();
	for (const page of pages)
		for (const [, list] of page.matchAll(classAttr))
			for (const name of decode(list!).split(' '))
				counts.set(name, (counts.get(name) ?? 0) + 1);

	const css = postcss.parse(pages.map(page => page.match(style)?.[1]).find(Boolean)!);
	// dark is only added by a script. classes matched by substring, like shadcn's
	// [class*='size-'], keep their names so those selectors still match
	const used = (name: string) => name === 'dark' || counts.has(name);
	const substrings = [...css.toString().matchAll(/\[class\*=['"]?([^'"\]]+)/g)].map(m => m[1]!);
	const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const shortName = (i: number): string =>
		(i >= 52 ? shortName(Math.floor(i / 52) - 1) : '') + letters[i % 52];
	const short = new Map([...counts]
		.filter(([name]) => !substrings.some(part => name.includes(part)))
		.sort(([, a], [, b]) => b - a)
		.map(([name], i) => [name, shortName(i)]));

	const inCss = new Set<string>();
	css.walkRules(rule => {
		const selectors = rule.selectors.filter(selector => [...selector.matchAll(classSelector)]
			.every(([, name]) => used(unescape(name!))));
		if (!selectors.length) {
			rule.remove();
			return;
		}
		rule.selectors = selectors.map(text => text.replace(classSelector, (match, name) => {
			const renamed = short.get(unescape(name));
			inCss.add(unescape(name));
			return renamed ? `.${renamed}` : match;
		}));
	});
	// drop custom properties no var() reads and keyframes no animation uses (repeated, since
	// variables reference each other), then at-rules (like @media) left empty
	for (let size = 0; size !== css.toString().length;) {
		size = css.toString().length;
		const text = css.toString();
		const unread = (name: string) => !text.includes(`var(${name}`);
		css.walkDecls(/^--/, decl => void (unread(decl.prop) && decl.remove()));
		css.walkAtRules('property', rule => void (unread(rule.params) && rule.remove()));
		// a keyframes name that only appears in its own @keyframes
		css.walkAtRules('keyframes', rule =>
			void (text.split(rule.params).length < 3 && rule.remove()));
		css.walkAtRules(rule => void (rule.nodes?.length === 0 && rule.remove()));
		css.walkRules(rule => void (rule.nodes.length === 0 && rule.remove()));
	}

	return pages.map(page => page.replace(style, () => `<style>${css}</style>`)
		.replace(classAttr, (_, list: string) => {
			const kept = list.split(' ').filter(name => inCss.has(decode(name)))
				.map(name => short.get(decode(name)) ?? name);
			return kept.length ? ` class="${kept.join(' ')}"` : '';
		}));
};

// a static site: pages are rendered to html by src/root.tsx, on request in dev and into docs/
// after a build. nothing is hydrated, so react never reaches the browser
const staticSite = (): Plugin => ({
	name: 'static-site',
	configureServer: server => {
		server.watcher.on('all', () => {
			// posts aren't modules, so drop every cached module to pick up post changes too
			server.environments.ssr.moduleGraph.invalidateAll();
			server.ws.send({ type: 'full-reload' });
		});
		// returned, so it runs after vite's own middleware (public files, fonts, /@vite/client).
		// render errors go to next(), showing an error response instead of crashing the server
		return () => server.middlewares.use((req, res, next) => (async () => {
			const { render } = await server.ssrLoadModule('/src/root.tsx') as Root;
			const page = await render(req.url!);
			const body = page.type === 'text/html'
				? await server.transformIndexHtml(req.url!, page.body)
				: page.body;
			res.writeHead(page.status, { 'content-type': `${page.type}; charset=utf-8` }).end(body);
		})().catch(next));
	},
	closeBundle: async () => {
		const { render, routes } = await import(resolve('dist/root.js')) as Root;
		const pages = optimizeCss(await Promise.all(routes.map(async route => (
			(await render(route)).body
		))));
		rmSync('docs', { recursive: true, force: true });
		cpSync('public', 'docs', { recursive: true });
		cpSync('dist/assets', 'docs/assets', { recursive: true });
		for (const [i, route] of routes.entries()) {
			const file = route.includes('.') ? route
				: route === '/404' ? '/404.html'
				: `${route.replace(/\/$/, '')}/index.html`;
			mkdirSync(dirname(`docs${file}`), { recursive: true });
			writeFileSync(`docs${file}`, pages[i]!);
		}
		rmSync('dist', { recursive: true });
	},
});

export default defineConfig({
	appType: 'custom',
	plugins: [tailwindcss(), staticSite()],
	resolve: { tsconfigPaths: true },
	build: {
		ssr: 'src/root.tsx',
		ssrEmitAssets: true,
		// also minifies the inline scripts, since ClientScript inlines function source
		minify: true,
		rolldownOptions: {
			// shadcn's "use client" directives mean nothing here, since nothing is hydrated
			onwarn: (warning, warn) => warning.code !== 'MODULE_LEVEL_DIRECTIVE' && warn(warning),
		},
	},
});
