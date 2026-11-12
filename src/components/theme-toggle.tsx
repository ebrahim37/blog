'use client';

import { MoonIcon, SunIcon } from 'lucide-react';

export const ThemeToggle = () => (
	<button
		type='button'
		aria-label='Toggle theme'
		className='nav-icon'
		onClick={() => {
			const dark = document.documentElement.classList.toggle('dark');
			localStorage.setItem('theme', dark ? 'dark' : 'light');
			const color = dark ? '#000000' : '#ffffff';
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
		}}
	>
		<MoonIcon className='dark:hidden' />
		<SunIcon className='hidden dark:block' />
	</button>
);
