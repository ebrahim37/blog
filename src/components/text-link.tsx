import type { ComponentProps } from 'react';
import { cn } from 'cn';

type Props = ComponentProps<'a'> & { external?: boolean };

export const TextLink = ({ external, className, children, ...props }: Props) => (
	<a
		className={cn(
			'text-link underline underline-offset-3 transition-opacity hover:opacity-80',
			className,
		)}
		{...external && { target: '_blank', rel: 'noreferrer' }}
		{...props}
	>
		{children}
		{external && <span className='sr-only'>, opens in a new tab</span>}
	</a>
);
