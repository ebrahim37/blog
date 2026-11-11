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
					<time dateTime={new Date(post.timestamp).toISOString()}>{formatDate(post.timestamp)}</time>
					<span>{post.minutes} min read</span>
				</div>
				<h1 className='my-2 pt-4 pb-2 text-3xl/10 font-bold text-balance'>{post.title}</h1>
				<p className='mb-4'>{post.subtitle}</p>
			</header>
			<div className='prose max-w-none leading-[1.7] wrap-anywhere prose-headings:font-mono prose-headings:font-semibold prose-a:font-normal prose-a:no-underline hover:prose-a:underline prose-img:mx-auto prose-img:rounded-lg prose-img:border prose-code:rounded-md prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-figcaption:text-center'>
				<PostMarkdown>{post.content}</PostMarkdown>
			</div>
		</article>
	);
}

export const getConfig = async () => ({
	render: 'static',
	staticPaths: getPosts().map(post => post.slug),
} as const);
