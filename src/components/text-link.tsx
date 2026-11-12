import type { ComponentProps } from 'react';
import { cn } from 'cn';

export const TextLink = ({ external, className, children, ...props }: ComponentProps<'a'> & { external?: boolean }) => (
	<a
		className={cn('text-link underline underline-offset-3 transition-opacity hover:opacity-80', className)}
		{...external && { target: '_blank', rel: 'noreferrer' }}
		{...props}
	>
		{children}
		{external && <span className='sr-only'>, opens in a new tab</span>}
	</a>
);
