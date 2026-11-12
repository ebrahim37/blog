import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'waku/config';

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			tsconfigPaths: true,
		},
		// lucide-react's barrel re-exports ~2000 icons, so skip loading them one by one:
		// pre-bundle it for SSR in dev, and only compile the icons actually used in builds
		environments: {
			ssr: { optimizeDeps: { include: ['lucide-react'] } },
		},
		build: {
			rolldownOptions: { experimental: { lazyBarrel: true } },
		},
	},
});
