'use client';

import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/shad/button';

export const ThemeToggle = () => (
	<Button
		variant='ghost'
		size='icon-lg'
		aria-label='Toggle theme'
		className='rounded-[0.375rem] text-muted-foreground'
		onClick={() => {
			const dark = document.documentElement.classList.toggle('dark');
			localStorage.setItem('theme', dark ? 'dark' : 'light');
			const color = dark ? '#000000' : '#ffffff';
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
		}}
	>
		<MoonIcon className='dark:hidden' />
		<SunIcon className='hidden dark:block' />
	</Button>
);
