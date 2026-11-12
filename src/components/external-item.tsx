import type { ReactNode } from 'react';
import { ExternalLinkIcon } from 'lucide-react';

import { Item, ItemContent } from '@/components/shad/item';

export const ExternalItem = ({ href, children }: { href: string, children: ReactNode }) => (
	<Item variant='outline' className='flex-nowrap items-start' render={<a href={href} target='_blank' rel='noreferrer' />}>
		<ItemContent className='h-full'>{children}</ItemContent>
		<ExternalLinkIcon className='size-3 text-muted-foreground' />
	</Item>
);
