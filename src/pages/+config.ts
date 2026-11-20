import type { Config } from 'vike/types';

export default {
	prerender: true,
	// without this, vike still bundles every page for the browser (then deleted, unused), which slows the build
	meta: {
		Page: {
			env: { server: true, client: false }
		}
	},
} satisfies Config;
