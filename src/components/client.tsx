'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import { Link, useRouter } from 'waku';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatDate, formatRelativeDate } from '@/lib/date';
import { cn } from '@/lib/utils';

export const NavLink = ({ to, children }: { to: ComponentProps<typeof Link>['to'], children: string }) => (
	<Link
		to={to}
		className={cn(
			'inline-flex h-10 min-w-11 items-center justify-center px-1 text-sm font-medium underline-offset-4 hover:underline',
			useRouter().path === to && 'underline',
		)}
	>
		{children}
	</Link>
);

export const ThemeToggle = () => (
	<Button
		variant='ghost'
		size='icon-lg'
		aria-label='Toggle theme'
		className='text-muted-foreground'
		onClick={() => {
			const dark = document.documentElement.classList.toggle('dark');
			localStorage.setItem('theme', dark ? 'dark' : 'light');
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#000000' : '#ffffff');
		}}
	>
		<MoonIcon className='dark:hidden' />
		<SunIcon className='hidden dark:block' />
	</Button>
);

export const RelativeDate = ({ timestamp }: { timestamp: number }) => {
	const [text, setText] = useState(() => formatDate(timestamp));
	useEffect(() => setText(formatRelativeDate(timestamp)), [timestamp]);
	return <time dateTime={new Date(timestamp).toISOString()}>{text}</time>;
};
