import type { ReactNode } from 'react';

export const PageHeading = ({ children }: { children: ReactNode }) => (
	<h1 className='mb-8 font-mono text-3xl font-bold text-primary'>{children}</h1>
);
