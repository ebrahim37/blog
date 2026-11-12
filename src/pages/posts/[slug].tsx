import type { PageProps } from 'waku/router';

import { PostMarkdown } from '@/components/markdown';
import { formatDate } from '@/lib/date';
import { getPost, getPosts } from '@/lib/posts';

export default function PostPage({ slug }: PageProps<'/posts/[slug]'>) {
	const post = getPost(slug);
	return (
		<article>
			<title>{post.title}</title>
			<meta name='description' content={post.subtitle} />
			<header className='font-mono text-primary'>
				<div className='flex justify-between text-sm text-muted-foreground tabular-nums'>
					<time dateTime={new Date(post.timestamp).toISOString()}>
						{formatDate(post.timestamp)}
					</time>
					<span>{post.minutes} min read</span>
				</div>
				<h1 className='my-2 pt-4 pb-2 text-3xl/10 font-bold text-balance'>{post.title}</h1>
				<p className='mb-4'>{post.subtitle}</p>
			</header>
			<div className='markdown'>
				<PostMarkdown>{post.content}</PostMarkdown>
			</div>
		</article>
	);
}

export const getConfig = async () => ({
	render: 'static',
	staticPaths: getPosts().map(post => post.slug),
} as const);
