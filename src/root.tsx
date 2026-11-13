import type { FunctionComponent, ReactNode } from 'react';
import { prerender } from 'react-dom/static';
import RssIcon from 'lucide-react/icons/rss';

import { ClientScript } from '@/components/client-script';
import { Router } from '@/components/router';
import { ThemeScript, ThemeToggle } from '@/components/theme';
import { rss } from '@/rss';
import css from '@/styles.css?inline';

type Page = { routes: string[], default: FunctionComponent<{ path: string }> };
const pages = Object.values(import.meta.glob<Page>('./pages/*.tsx', { eager: true }));

// every url to write out at build time
export const routes = [...pages.flatMap(page => page.routes), '/rss.xml'];

const Root = ({ path, children }: { path: string, children: ReactNode }) => (
	<html lang='en'>
		<head>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='theme-color' content='#ffffff' />
			<link rel='icon' href='data:image/png;base64,iVBORw0KGgo=' />
			<style dangerouslySetInnerHTML={{ __html: css }} />
			<ThemeScript />
			<Router />
			{/* iOS Safari only shows :active (pressed) styles when the page listens for touches */}
			<ClientScript run={() => {
				document.addEventListener('touchstart', () => {}, { passive: true });
			}} />
			<script src='https://heartbeat.ebra.dev/api/script.js' data-site-id='a6c00916053e' defer />
		</head>
		<body>
			<header className='border-b'>
				<div className='mx-auto flex h-10 max-w-3xl items-center justify-between px-4'>
					<nav aria-label='Primary navigation' className='flex gap-1'>
						{[['/', 'blog'], ['/projects', 'projects'], ['/about', 'about']].map(([href, label]) => (
							<a
								key={href}
								href={href}
								aria-current={href === path ? 'page' : undefined}
								className='nav-link'
							>
								{label}
							</a>
						))}
					</nav>
					<div className='flex'>
						<ThemeToggle />
						<a href='/rss.xml' target='_blank' aria-label='RSS feed' className='nav-icon'>
							<RssIcon />
						</a>
					</div>
				</div>
			</header>
			<main className='mx-auto min-h-[calc(100dvh-2.5rem-1px)] max-w-3xl px-6 pt-6 pb-10'>
				{children}
			</main>
		</body>
	</html>
);

export const render = async (url: string) => {
	const path = url.split(/[?#]/)[0]!.replace(/(.)\/$/, '$1');
	if (path === '/rss.xml')
		return { status: 200, type: 'application/xml', body: await rss() };

	const page = pages.find(page => page.routes.includes(path));
	const { default: Page } = page ?? pages.find(page => page.routes.includes('/404'))!;
	const { prelude } = await prerender(<Root path={path}><Page path={path} /></Root>);
	const body = await new Response(prelude).text();
	return { status: page && path !== '/404' ? 200 : 404, type: 'text/html', body };
};
