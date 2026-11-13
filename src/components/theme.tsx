import MoonIcon from 'lucide-react/icons/moon';
import SunIcon from 'lucide-react/icons/sun';

import { ClientScript } from '@/components/client-script';

// goes in <head>: applies the saved (or system) theme before first paint, so it never flashes
export const ThemeScript = () => (
	<ClientScript run={head => {
		try {
			const saved = localStorage.getItem('theme');
			const system = matchMedia('(prefers-color-scheme: dark)').matches;
			if (saved ? saved === 'dark' : system) {
				document.documentElement.classList.add('dark');
				head.querySelector('[name=theme-color]')!.setAttribute('content', '#000000');
			}
		} catch {}
	}} />
);

export const ThemeToggle = () => (
	<button type='button' aria-label='Toggle theme' className='nav-icon'>
		<MoonIcon className='dark:hidden' />
		<SunIcon className='hidden dark:block' />
		<ClientScript run={button => button.onclick = () => {
			const dark = document.documentElement.classList.toggle('dark');
			localStorage.setItem('theme', dark ? 'dark' : 'light');
			const color = dark ? '#000000' : '#ffffff';
			document.querySelector('meta[name=theme-color]')!.setAttribute('content', color);
		}} />
	</button>
);
