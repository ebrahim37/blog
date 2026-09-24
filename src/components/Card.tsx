import { type JSX, type ParentComponent, splitProps } from 'solid-js';

import styles from './Card.module.css';

export const Card: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = props => {
	const [local, anchorProps] = splitProps(props, ['class', 'children']);
	const className = local.class ? `${styles.card} ${local.class}` : styles.card;

	return (
		<a {...anchorProps} class={className}>
			{local.children}
		</a>
	);
};
