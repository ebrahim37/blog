import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { createElement, type FunctionComponent } from 'react';
import { prerender } from 'react-dom/static';
import { defineConfig, type Plugin } from 'vite';

type Page = { routes: string[], default: FunctionComponent<{ path: string }> };
type Modules = {
	layout: typeof import('./src/layout'),
	rss: typeof import('./src/rss'),
	pages: Page[],
};

// layout, rss and every page in src/pages, each built to its own file under dist/
const entries: Record<string, string> = {
	layout: 'src/layout.tsx',
	rss: 'src/rss.ts',
	...Object.fromEntries(readdirSync('src/pages').map(file => [
		`pages/${file.replace(/\.tsx$/, '')}`,
		`src/pages/${file}`,
	])),
};

// loads every module through `load` (vite in dev, the built files after a build)
const loadAll = async (load: (name: string) => Promise<unknown>) => {
	const [layout, rss, ...pages] = await Promise.all(Object.keys(entries).map(load));
	return { layout, rss, pages } as Modules;
};

const render = async ({ layout, rss, pages }: Modules, url: string) => {
	const path = url.split(/[?#]/)[0]!.replace(/(.)\/$/, '$1');
	if (path === '/rss.xml')
		return { status: 200, type: 'application/xml', body: await rss.rss() };

	const page = pages.find(page => page.routes.includes(path));
	const { default: Page } = page ?? pages.find(page => page.routes.includes('/404'))!;
	const element = createElement(layout.Layout, { path, children: createElement(Page, { path }) });
	const body = await new Response((await prerender(element)).prelude).text();
	return { status: page && path !== '/404' ? 200 : 404, type: 'text/html', body };
};

// a static site: pages are rendered to html on request in dev, and into docs/ after a build.
// nothing is hydrated, so react never reaches the browser
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
			const modules = await loadAll(name => server.ssrLoadModule(entries[name]!));
			const page = await render(modules, req.url!);
			const body = page.type === 'text/html'
				? await server.transformIndexHtml(req.url!, page.body)
				: page.body;
			res.writeHead(page.status, { 'content-type': `${page.type}; charset=utf-8` }).end(body);
		})().catch(next));
	},
	closeBundle: async () => {
		const modules = await loadAll(name => import(resolve(`dist/${name}.js`)));
		rmSync('docs', { recursive: true, force: true });
		cpSync('public', 'docs', { recursive: true });
		cpSync('dist/assets', 'docs/assets', { recursive: true });
		for (const route of [...modules.pages.flatMap(page => page.routes), '/rss.xml']) {
			const file = route.includes('.') ? route
				: route === '/404' ? '/404.html'
				: `${route.replace(/\/$/, '')}/index.html`;
			mkdirSync(dirname(`docs${file}`), { recursive: true });
			writeFileSync(`docs${file}`, (await render(modules, route)).body);
		}
		rmSync('dist', { recursive: true });
	},
});

export default defineConfig({
	appType: 'custom',
	plugins: [tailwindcss(), staticSite()],
	resolve: { tsconfigPaths: true },
	build: {
		ssr: true,
		ssrEmitAssets: true,
		rolldownOptions: {
			input: entries,
			// shared code goes to chunks/, keeping assets/ for the fonts copied into docs/
			output: { entryFileNames: '[name].js', chunkFileNames: 'chunks/[name].js' },
			// shadcn's "use client" directives mean nothing here, since nothing is hydrated
			onwarn: (warning, warn) => warning.code !== 'MODULE_LEVEL_DIRECTIVE' && warn(warning),
		},
	},
});
