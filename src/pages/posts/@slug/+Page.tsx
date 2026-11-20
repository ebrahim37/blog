import { render } from 'vike/abort';

import { FormattedDate } from '@/components/date.tsx';
import { Meta } from '@/components/layout.tsx';
import { PostMarkdown } from '@/components/markdown.tsx';
import { POSTS } from '@/posts.ts';
import styles from './post.module.css';

export default ({ path }: { path: string }) => {
	const post = POSTS.find(post => post.href === path);
	if (!post)
		throw render(404);
	return (
		<article>
			<Meta title={post.title} description={post.subtitle} />
			<header className={styles.header}>
				<div className={styles.info}>
					<FormattedDate timestamp={post.timestamp} />
					<span>{post.minutes} min read</span>
				</div>
				<h1>{post.title}</h1>
				<p className={styles.subtitle}>{post.subtitle}</p>
			</header>
			<PostMarkdown>{post.content}</PostMarkdown>
		</article>
	);
}
