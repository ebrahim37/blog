import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide';

import { Icon } from '@/components/icon.tsx';
import { type LinkProps, newTab } from '@/components/text-link.tsx';
import styles from './card.module.css';

export const CardList = ({ className, children }: { className?: string, children: ReactNode[] }) => (
	<ul className={className ? `${styles.list} ${className}` : styles.list}>
		{children.map((child, i) => <li key={i}>{child}</li>)}
	</ul>
);

// a bordered link, titled by the <h2> or <h3> among its children
export const Card = ({ external, children, ...props }: LinkProps) => (
	<a className={styles.card} {...external && newTab} {...props}>
		<div className={styles.body}>{children}</div>
		{external && <Icon icon={ExternalLink} />}
	</a>
);
