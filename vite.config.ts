import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

type Root = typeof import('./src/root');

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
		rmSync('docs', { recursive: true, force: true });
		cpSync('public', 'docs', { recursive: true });
		cpSync('dist/assets', 'docs/assets', { recursive: true });
		for (const route of routes) {
			const file = route.includes('.') ? route
				: route === '/404' ? '/404.html'
				: `${route.replace(/\/$/, '')}/index.html`;
			mkdirSync(dirname(`docs${file}`), { recursive: true });
			writeFileSync(`docs${file}`, (await render(route)).body);
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
		rolldownOptions: {
			// shadcn's "use client" directives mean nothing here, since nothing is hydrated
			onwarn: (warning, warn) => warning.code !== 'MODULE_LEVEL_DIRECTIVE' && warn(warning),
		},
	},
});
