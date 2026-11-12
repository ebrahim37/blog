import FileTextIcon from 'lucide-react/icons/file-text';
import { Link } from 'waku';
import { cn } from 'cn';

import { PageHeading } from '@/components/page-heading';
import { RelativeDate } from '@/components/relative-date';
import { ItemDescription, ItemTitle } from '@/components/item';
import { Item, ItemContent, ItemGroup } from '@/components/shad/item';
import { formatDate } from '@/lib/date';
import { getPosts } from '@/lib/posts';

export default function Home() {
	return (
		<>
			<title>Blog | ebra.dev</title>
			<meta name='description' content="Ebrahim's Blog" />
			<PageHeading>posts/</PageHeading>
			<ItemGroup className='gap-2'>
				{getPosts().map(post => (
					<Item
						key={post.slug}
						variant='outline'
						className='p-3'
						render={({ children, ...props }) => (
							<Link {...props} to={`/posts/${post.slug}`}>{children}</Link>
						)}
					>
						<ItemContent>
							<ItemTitle>
								<FileTextIcon className={cn(
									'size-4 shrink-0 text-muted-foreground',
									'group-hover/item:text-foreground',
								)} />
								{post.title}
							</ItemTitle>
							<ItemDescription>{post.subtitle}</ItemDescription>
							<p className='mt-1 text-xs text-muted-foreground tabular-nums'>
								<span className='group-hover/item:hidden'>
									<RelativeDate timestamp={post.timestamp} />
								</span>
								<span className='hidden group-hover/item:inline'>
									{formatDate(post.timestamp)} · {post.minutes} min read
								</span>
							</p>
						</ItemContent>
					</Item>
				))}
			</ItemGroup>
		</>
	);
}
