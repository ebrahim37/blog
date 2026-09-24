import { type ParentComponent, createMemo } from 'solid-js';
import { usePageContext } from 'vike-solid/usePageContext';

import styles from './NavLink.module.css';

export const NavLink: ParentComponent<{ href: string }> = props => {
	const pageContext = usePageContext();
	const isActive = createMemo(() => {
		const pathname = pageContext.urlPathname.replace(/\/$/, '') || '/';
		return !pageContext.is404 && pathname === props.href;
	});

	return (
		<a href={props.href} class={`${styles.link}${isActive() ? ` ${styles.active}` : ''}`}>
			{props.children}
		</a>
	);
};
