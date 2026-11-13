import { FormattedDate } from '@/components/date';
import { PostMarkdown } from '@/components/markdown';
import { Meta } from '@/components/meta';
import { POSTS } from '@/posts';

export const routes = POSTS.map(post => `/posts/${post.slug}`);

export default function Post({ path }: { path: string }) {
	const post = POSTS.find(post => `/posts/${post.slug}` === path)!;
	return (
		<article>
			<Meta title={post.title} description={post.subtitle} />
			<header className='font-mono text-primary'>
				<div className='flex justify-between text-sm text-muted-foreground tabular-nums'>
					<FormattedDate timestamp={post.timestamp} />
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
