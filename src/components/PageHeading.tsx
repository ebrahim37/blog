import { type JSX, type ParentComponent, splitProps } from 'solid-js';

import styles from './PageHeading.module.css';

export const PageHeading: ParentComponent<JSX.HTMLAttributes<HTMLHeadingElement>> = props => {
	const [local, headingProps] = splitProps(props, ['class', 'children']);
	const className = local.class ? `${styles.heading} ${local.class}` : styles.heading;

	return (
		<h1 {...headingProps} class={className}>
			{local.children}
		</h1>
	);
};
