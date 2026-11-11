import '@/styles.css';

import { type ReactNode, ViewTransition } from 'react';
import { RssIcon } from 'lucide-react';

import { NavLink, ThemeToggle } from '@/components/client';
import { buttonVariants } from '@/components/ui/button';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className='border-b'>
				<div className='mx-auto flex h-10 max-w-3xl items-center justify-between px-4'>
					<nav aria-label='Primary navigation' className='flex gap-1'>
						<NavLink to='/'>blog</NavLink>
						<NavLink to='/projects'>projects</NavLink>
						<NavLink to='/about'>about</NavLink>
					</nav>
					<div className='flex'>
						<ThemeToggle />
						<a href='/rss.xml' target='_blank' aria-label='RSS feed' className={buttonVariants({ variant: 'ghost', size: 'icon-lg', className: 'text-muted-foreground' })}>
							<RssIcon />
						</a>
					</div>
				</div>
			</header>
			<ViewTransition name='page'>
				<main className='mx-auto min-h-[calc(100dvh-2.5rem)] max-w-3xl px-6 pt-6 pb-10'>{children}</main>
			</ViewTransition>
		</>
	);
}
