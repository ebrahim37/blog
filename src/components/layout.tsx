import '@/global.css';
import type { ReactNode } from 'react';
import { Rss } from 'lucide';

import { Icon } from '@/components/icon.tsx';
import { ThemeToggle } from '@/components/theme-toggle.tsx';
import favicon from '@/favicon.svg';
import { router } from '@/router.ts';
import styles from './layout.module.css';

// runs in <head> before first paint, so the saved (or system) theme never flashes
const applyTheme = () => {
	try {
		const saved = localStorage.getItem('theme');
		if (saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
			document.querySelector('meta[name=theme-color]')!.setAttribute('content', '#000000');
		}
	} catch {}
};

// runs in <head> before first paint: hides the page until geist (inlined by global.css) is ready, so
// text never reflows from a fallback font. vite.config.ts puts the css above this script, so the fonts
// are declared by now. the timeout shows the page anyway if loading stalls
const awaitFonts = () => {
	const html = document.documentElement;
	const show = () => html.style.removeProperty('visibility');
	html.style.visibility = 'hidden';
	setTimeout(show, 3000);
	Promise.all(['1em Geist', '1em Geist Mono'].map(font => document.fonts.load(font))).finally(show);
};

// <title> and description, which react moves into <head>
export const Meta = ({ title, description }: { title: string, description?: string }) => (
	<>
		<title>{`${title} | ebra.dev`}</title>
		{description && <meta name='description' content={description} />}
	</>
);

export const Layout = ({ path, children }: { path: string, children: ReactNode }) => (
	<html lang='en'>
		<head>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='theme-color' content='#ffffff' />
			<link rel='icon' href={favicon} type='image/svg+xml' />
			<script dangerouslySetInnerHTML={{ __html: `(${awaitFonts})();(${applyTheme})();(${router})()` }} />
			<script src='https://heartbeat.ebra.dev/api/script.js' data-site-id='a6c00916053e' defer />
		</head>
		<body>
			<header className={styles.header}>
				<div className={styles.bar}>
					<nav className={styles.nav} aria-label='Primary navigation'>
						{[['/', 'blog'], ['/projects', 'projects'], ['/about', 'about']].map(([href, label]) => (
							<a key={href} href={href} aria-current={href === path ? 'page' : undefined}>
								{label}
							</a>
						))}
					</nav>
					<div className={styles.tools}>
						<ThemeToggle className={styles.tool} />
						<a className={styles.tool} href='/rss.xml' target='_blank' aria-label='RSS feed'>
							<Icon icon={Rss} />
						</a>
					</div>
				</div>
			</header>
			<main className={styles.main}>{children}</main>
		</body>
	</html>
);
