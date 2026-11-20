import { globSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

// browsers with nesting and light-dark(), so css keeps them as written. lower targets also merge
// animation-timeline into the animation shorthand, which firefox doesn't read
const targets = { chrome: 123 << 16, firefox: 146 << 16, safari: (17 << 16) | (5 << 8) };
// vite transforms with lightningcss.targets but minifies with build.cssTarget, so both get them
const cssTarget = Object.entries(targets).map(([browser, version]) => `${browser}${version >> 16}.${version >> 8 & 255}`);

export default defineConfig({
	resolve: { tsconfigPaths: true },
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets,
			cssModules: { pattern: '[name]_[local]' }
		}
	},
	// minify also covers the server build, which holds the inlined router and component scripts
	// assetsInlineLimit: every imported asset (fonts, favicon) becomes a data url, so each page is one file
	build: { minify: true, cssTarget, assetsInlineLimit: () => true },
	plugins: [vike(), {
		// after prerendering: inline each page's stylesheets as one <style>, then delete assets/, which
		// no page loads. the <style> goes before the first <script>, so layout.tsx's font script sees
		// the @font-face rules
		name: 'inline-css',
		buildApp: {
			order: 'post',
			handler: async () => {
				for (const file of globSync('dist/client/**/*.html')) {
					let css = '';
					const html = readFileSync(file, 'utf8').replace(/<link rel="stylesheet" type="text\/css" href="\/(assets\/[^"]+)">/g,
						(_, path) => (css += readFileSync(`dist/client/${path}`, 'utf8'), ''));
					if (css)
						writeFileSync(file, html.replace('<script', `<style>${css}</style><script`));
				}
				rmSync('dist/client/assets', { recursive: true });
			},
		},
	}],
});
