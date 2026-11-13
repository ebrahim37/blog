import type { ReactNode } from 'react';
import RssIcon from 'lucide-react/icons/rss';
import { cn } from 'cn';

import { Router } from '@/components/router';
import { ThemeScript, ThemeToggle } from '@/components/theme';
import css from '@/styles.css?inline';

export const Layout = ({ path, children }: { path: string, children: ReactNode }) => (
	<html lang='en'>
		<head>
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='theme-color' content='#ffffff' />
			<link rel='icon' href='data:image/png;base64,iVBORw0KGgo=' />
			<style dangerouslySetInnerHTML={{ __html: css }} />
			<ThemeScript />
			<Router />
			<script
				src='https://heartbeat.ebra.dev/api/script.js'
				data-site-id='a6c00916053e'
				defer
			/>
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
								className={cn(
									'inline-flex h-10 min-w-11 items-center justify-center px-1',
									'text-sm font-medium underline-offset-4',
									'hover:underline aria-[current]:underline',
								)}
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
			<main className={cn(
				'mx-auto min-h-[calc(100dvh-2.5rem-1px)] max-w-3xl px-6 pt-6 pb-10',
				'[view-transition-name:page]',
			)}>
				{children}
			</main>
		</body>
	</html>
);
