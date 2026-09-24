import { type JSX, type ParentComponent, splitProps } from 'solid-js';

import styles from './TextLink.module.css';

export const TextLink: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = props => {
	const [local, anchorProps] = splitProps(props, ['class', 'children']);
	const className = local.class ? `${styles.link} ${local.class}` : styles.link;

	return (
		<a {...anchorProps} class={className}>
			{local.children}
		</a>
	);
};
