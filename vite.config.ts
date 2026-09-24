import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import vike from 'vike/plugin';
import vikeSolid from 'vike-solid/vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		vike(),
		vikeSolid(),
	],
	resolve: {
		alias: {
			'~': path.join(rootDir, 'src'),
		},
	},
});