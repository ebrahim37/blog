import type { ParentComponent } from 'solid-js';

import styles from './Layout.module.css';

import { useTheme } from '~/utils/useTheme.ts';
import { NavLink } from '~/components/NavLink.tsx';
import { ExternalLink } from '~/components/ExternalLink.tsx';
import { GitHubIcon, LinkedInIcon, MoonIcon, RssIcon, SunIcon } from '~/components/Icons.tsx';

export const Layout: ParentComponent = props => {
	const [theme, toggleTheme] = useTheme();

	return (
		<>
			<header class={styles.header}>
				<div class={styles.headerInner}>
					<nav aria-label='Primary navigation' class={styles.navigation}>
						<NavLink href='/'>blog</NavLink>
						<NavLink href='/projects'>projects</NavLink>
						<NavLink href='/about'>about</NavLink>
					</nav>
					<div class={styles.headerActions}>
						<button
							class={styles.iconButton}
							type='button'
							onClick={toggleTheme}
							aria-label={`Switch to ${theme() === 'light' ? 'dark' : 'light'} theme`}
						>
							{theme() === 'light'
								? <MoonIcon class={styles.headerIcon} />
								: <SunIcon class={styles.headerIcon} />}
						</button>
						<ExternalLink
							class={styles.iconButton}
							href='/rss.xml'
							aria-label='RSS feed (opens in a new tab)'
						>
							<RssIcon class={styles.headerIcon} />
						</ExternalLink>
						<ExternalLink
							class={styles.iconButton}
							href='https://github.com/ebrahim37'
							aria-label='Ebrahim on GitHub (opens in a new tab)'
						>
							<GitHubIcon class={styles.headerIcon} />
						</ExternalLink>
						<ExternalLink
							class={styles.iconButton}
							href='https://www.linkedin.com/in/ebrahim-hagh'
							aria-label='Ebrahim on LinkedIn (opens in a new tab)'
						>
							<LinkedInIcon class={styles.headerIcon} />
						</ExternalLink>
					</div>
				</div>
			</header>
			{/* enable card hover/active feedback on iOS Safari */}
			<main class={styles.main} on:touchstart={{ handleEvent: () => {}, passive: true }}>
				{props.children}
			</main>
		</>
	);
};
