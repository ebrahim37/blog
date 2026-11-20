import type { ComponentProps } from 'react';

import styles from './text-link.module.css';

export type LinkProps = ComponentProps<'a'> & { external?: boolean };

// spread on a link that opens in a new tab
export const newTab = { target: '_blank', rel: 'noreferrer' };

export const TextLink = ({ external, children, ...props }: LinkProps) => (
	<a className={styles.link} {...external && newTab} {...props}>
		{children}
		{external && <span className='sr-only'>, opens in a new tab</span>}
	</a>
);
