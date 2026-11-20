import { Moon, Sun } from 'lucide';

import { Icon } from '@/components/icon.tsx';
import styles from './theme-toggle.module.css';

// runs in the browser (see +onRenderHtml.tsx). layout.tsx applies the saved theme before first paint
export const client = (button: HTMLElement) => {
	button.onclick = () => {
		const dark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', dark ? 'dark' : 'light');
		document.querySelector('meta[name=theme-color]')!.setAttribute('content', dark ? '#000000' : '#ffffff');
	};
};

export const ThemeToggle = ({ className }: { className?: string }) => (
	<button className={className} type='button' aria-label='Toggle theme' data-client='theme-toggle'>
		<Icon icon={Moon} className={styles.moon} />
		<Icon icon={Sun} className={styles.sun} />
	</button>
);
