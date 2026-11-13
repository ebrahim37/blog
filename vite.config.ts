import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

type Render = typeof import('./src/render');

// a static site: every page is rendered to html by src/render.tsx, on request in dev
// and into docs/ after a build. nothing is hydrated, so react never reaches the browser
const staticSite = (): Plugin => ({
	name: 'static-site',
	configureServer: server => {
		server.watcher.on('change', () => server.ws.send({ type: 'full-reload' }));
		// returned, so it runs after vite's own middleware (public files, fonts, /@vite/client)
		return () => server.middlewares.use(async (req, res) => {
			const { render } = await server.ssrLoadModule('/src/render.tsx') as Render;
			const page = await render(req.url!);
			const body = page.type === 'text/html'
				? await server.transformIndexHtml(req.url!, page.body)
				: page.body;
			res.writeHead(page.status, { 'content-type': `${page.type}; charset=utf-8` }).end(body);
		});
	},
	closeBundle: async () => {
		const { render, routes } = await import(resolve('dist/render.js')) as Render;
		rmSync('docs', { recursive: true, force: true });
		cpSync('public', 'docs', { recursive: true });
		cpSync('dist/assets', 'docs/assets', { recursive: true });
		for (const route of routes()) {
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
		ssr: 'src/render.tsx',
		ssrEmitAssets: true,
		// shadcn's "use client" directives mean nothing here, since nothing is hydrated
		rolldownOptions: {
			onwarn: (warning, warn) => warning.code !== 'MODULE_LEVEL_DIRECTIVE' && warn(warning),
		},
	},
});
