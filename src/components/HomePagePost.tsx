import { type Component, createSignal, onMount } from 'solid-js';

import styles from './HomePagePost.module.css';
import { Card } from './Card.tsx';

import type { PostSummary } from '~/utils/posts.ts';
import { formatDate, formatRelativeDate } from '~/utils/formatDate.ts';
import { DocumentIcon } from '~/components/Icons.tsx';

export const HomePagePost: Component<{ post: PostSummary }> = props => {
	const [relativeDate, setRelativeDate] = createSignal(formatDate(props.post.timestamp));
	onMount(() => setRelativeDate(formatRelativeDate(props.post.timestamp)));

	return (
		<li>
			<Card class={styles.postCard} href={`/posts/${props.post.slug}`}>
				<div class={styles.titleRow}>
					<DocumentIcon class={styles.icon} />
					<h2>{props.post.title}</h2>
				</div>
				<p class={styles.subtitle}>{props.post.subtitle}</p>
				<p class={styles.meta}>
					<time datetime={(new Date(props.post.timestamp)).toISOString()}>
						<span class={styles.relativeDate}>{relativeDate()}</span>
						<span class={styles.absoluteDate}>{formatDate(props.post.timestamp)}</span>
					</time>
					<span class={styles.readingTime}> · {props.post.minutes} min read</span>
				</p>
			</Card>
		</li>
	);
};
