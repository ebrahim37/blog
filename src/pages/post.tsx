import { FormattedDate } from '@/components/date';
import { PostMarkdown } from '@/components/markdown';
import { Meta } from '@/components/meta';
import { getPost } from '@/lib/posts';

export default function Post({ slug }: { slug: string }) {
	const post = getPost(slug);
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
