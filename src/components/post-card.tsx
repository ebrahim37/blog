import { FileText } from 'lucide';

import { Card } from '@/components/card.tsx';
import { FormattedDate } from '@/components/date.tsx';
import { Icon } from '@/components/icon.tsx';
import { RelativeDate } from '@/components/relative-date.tsx';
import type { Post } from '@/posts.ts';
import styles from './post-card.module.css';

export const PostCard = ({ post }: { post: Post }) => (
	<Card href={post.href}>
		<h2>
			<Icon icon={FileText} />
			{post.title}
		</h2>
		<p>{post.subtitle}</p>
		<p className={styles.meta}>
			<RelativeDate className={styles.relative} timestamp={post.timestamp} />
			<span className={styles.full}>
				<FormattedDate timestamp={post.timestamp} /> · {post.minutes} min read
			</span>
		</p>
	</Card>
);
