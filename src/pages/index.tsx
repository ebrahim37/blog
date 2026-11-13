import FileTextIcon from 'lucide-react/icons/file-text';
import { cn } from 'cn';

import { FormattedDate, RelativeDate } from '@/components/date';
import { ItemDescription, ItemMeta, ItemTitle } from '@/components/item';
import { Meta } from '@/components/meta';
import { PageHeading } from '@/components/page-heading';
import { Item, ItemContent, ItemGroup } from '@/components/shad/item';
import { POSTS } from '@/posts';

export const routes = ['/'];

export default function Home() {
	return (
		<>
			<Meta title='Blog' description="Ebrahim's Blog" />
			<PageHeading>posts/</PageHeading>
			<ItemGroup className='gap-2'>
				{POSTS.map(post => (
					<Item
						key={post.slug}
						variant='outline'
						className='p-3'
						render={<a href={`/posts/${post.slug}`} />}
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
							<ItemMeta className='mt-1'>
								<span className='group-hover/item:hidden'>
									<RelativeDate timestamp={post.timestamp} />
								</span>
								<span className='hidden group-hover/item:inline'>
									<FormattedDate timestamp={post.timestamp} /> · {post.minutes} min read
								</span>
							</ItemMeta>
						</ItemContent>
					</Item>
				))}
			</ItemGroup>
		</>
	);
}
