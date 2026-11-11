import type { ComponentProps, ReactNode } from 'react';

import { ExternalLinkIcon } from 'lucide-react';

import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';

export const ext = { target: '_blank', rel: 'noreferrer' } as const;

export const PageHeading = ({ children }: { children: ReactNode }) => (
	<h1 className='mb-8 font-mono text-3xl font-bold text-primary'>{children}</h1>
);

export const TextLink = ({ className, children, ...props }: ComponentProps<'a'>) => (
	<a className={cn('text-link underline underline-offset-3 transition-opacity hover:opacity-80', className)} {...props}>
		{children}
		{props.target === '_blank' && <span className='sr-only'>, opens in a new tab</span>}
	</a>
);

export const ExternalItem = ({ href, className, children }: { href: string, className?: string, children: ReactNode }) => (
	<Item variant='outline' className={cn('flex-nowrap items-start', className)} render={<a href={href} {...ext} />}>
		<ItemContent className='h-full'>{children}</ItemContent>
		<ExternalLinkIcon className='size-3 text-muted-foreground' />
	</Item>
);
