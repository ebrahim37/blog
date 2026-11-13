import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import postcss from 'postcss';
import { defineConfig, type Plugin } from 'vite';

type Root = typeof import('./src/root');

// every page inlines the same stylesheet: drop rules for classes no page uses. classes are read
// from html class attributes, where react encodes &'"<> (used by names like [&_svg]:size-4)
const purgeCss = (pages: string[]) => {
	const entities: Record<string, string> = { amp: '&', '#x27': "'", quot: '"', lt: '<', gt: '>' };
	const decode = (text: string) => text.replace(/&(\w+|#x27);/g, (_, name) => entities[name]!);
	const used = new Set(['dark', ...pages.flatMap(page => [...page.matchAll(/ class="([^"]*)"/g)]
		.flatMap(([, list]) => decode(list!).split(' ')))]);
	const style = /<style>([\s\S]*?)<\/style>/;
	const css = postcss.parse(pages.map(page => page.match(style)?.[1]).find(Boolean)!);
	// a class in a selector (not a decimal like 0.5), escaped: .hover\:x is hover:x
	const classes = (selector: string) => [...selector.matchAll(/(?<![\d\\])\.((?:\\.|[\w-])+)/g)]
		.map(([, name]) => name!.replace(/\\(.)/g, '$1'));
	css.walkRules(rule => {
		const kept = rule.selectors.filter(text => classes(text).every(name => used.has(name)));
		if (kept.length)
			rule.selectors = kept;
		else
			rule.remove();
	});
	css.walkAtRules(rule => void (rule.nodes?.length === 0 && rule.remove()));
	return pages.map(page => page.replace(style, () => `<style>${css}</style>`));
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
		// returned, so it runs after vite's own middleware (public files, /@vite/client).
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
		const pages = purgeCss(await Promise.all(routes.map(async route => (
			(await render(route)).body
		))));
		rmSync('docs', { recursive: true, force: true });
		cpSync('public', 'docs', { recursive: true });
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
		// also minifies the inline scripts, since ClientScript inlines function source
		minify: true,
		rolldownOptions: {
			// shadcn's "use client" directives mean nothing here, since nothing is hydrated
			onwarn: (warning, warn) => warning.code !== 'MODULE_LEVEL_DIRECTIVE' && warn(warning),
		},
	},
});
