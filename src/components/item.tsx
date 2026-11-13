import type { ComponentProps, ReactNode } from 'react';
import ExternalLinkIcon from 'lucide-react/icons/external-link';
import { cn } from 'cn';

import * as Shad from '@/components/shad/item';

export const ExternalItem = ({ href, children }: { href: string, children: ReactNode }) => (
	<Shad.Item
		variant='outline'
		className='flex-nowrap items-start p-3'
		render={<a href={href} target='_blank' rel='noreferrer' />}
	>
		<Shad.ItemContent className='h-full'>{children}</Shad.ItemContent>
		<ExternalLinkIcon className='size-3 text-muted-foreground' />
	</Shad.Item>
);

export const ItemTitle = ({ className, ...props }: ComponentProps<typeof Shad.ItemTitle>) => (
	<Shad.ItemTitle
		className={cn(
			'line-clamp-none flex font-mono font-semibold text-primary transition-colors',
			'group-hover/item:text-muted-foreground',
			className,
		)}
		{...props}
	/>
);

export const ItemDescription = ({ className, ...props }: ComponentProps<'p'>) => (
	<Shad.ItemDescription className={cn('line-clamp-none leading-5', className)} {...props} />
);

// the small grey line in an item: dates, periods
export const ItemMeta = ({ className, ...props }: ComponentProps<'p'>) => (
	<p className={cn('text-xs text-muted-foreground tabular-nums', className)} {...props} />
);
