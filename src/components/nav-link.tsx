'use client';

import type { ComponentProps } from 'react';
import { Link, useRouter } from 'waku';
import { cn } from 'cn';

type Props = { to: ComponentProps<typeof Link>['to'], children: string };

export const NavLink = ({ to, children }: Props) => (
	<Link
		to={to}
		className={cn(
			'inline-flex h-10 min-w-11 items-center justify-center px-1',
			'text-sm font-medium underline-offset-4 hover:underline',
			useRouter().path === to && 'underline',
		)}
	>
		{children}
	</Link>
);
