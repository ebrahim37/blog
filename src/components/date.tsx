import type { ComponentProps } from 'react';

const formatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const FormattedDate = ({ timestamp, ...props }: { timestamp: number } & ComponentProps<'time'>) => (
	<time dateTime={new Date(timestamp).toISOString()} {...props}>{formatter.format(timestamp)}</time>
);
