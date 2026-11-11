import { FileTextIcon } from 'lucide-react';
import { Link } from 'waku';

import { RelativeDate } from '@/components/client';
import { PageHeading } from '@/components/common';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { formatDate } from '@/lib/date';
import { getPosts } from '@/lib/posts';

export default function Home() {
	return (
		<>
			<title>Blog | Ebrahim Haghshenas</title>
			<meta name='description' content='Posts by Ebrahim Haghshenas.' />
			<PageHeading>posts/</PageHeading>
			<ItemGroup className='gap-2'>
				{getPosts().map(post => (
					<Item key={post.slug} variant='outline' render={({ children, ...props }) => <Link {...props} to={`/posts/${post.slug}`}>{children}</Link>}>
						<ItemContent>
							<ItemTitle className='font-mono font-semibold text-primary group-hover/item:text-muted-foreground'>
								<FileTextIcon className='size-4 text-muted-foreground group-hover/item:text-foreground' />
								{post.title}
							</ItemTitle>
							<ItemDescription>{post.subtitle}</ItemDescription>
							<p className='text-xs text-muted-foreground tabular-nums'>
								<span className='group-hover/item:hidden'><RelativeDate timestamp={post.timestamp} /></span>
								<span className='hidden group-hover/item:inline'>{formatDate(post.timestamp)} · {post.minutes} min read</span>
							</p>
						</ItemContent>
					</Item>
				))}
			</ItemGroup>
		</>
	);
}
