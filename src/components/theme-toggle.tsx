'use client';

import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/shad/button';

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
