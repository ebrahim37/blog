import type { ReactNode } from 'react';

import { ClientScript } from '@/components/client-script';

const formatter = new Intl.DateTimeFormat('en-CA', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	timeZone: 'UTC',
});

type Props = { timestamp: number, children?: ReactNode };

export const FormattedDate = ({ timestamp, children }: Props) => (
	<time dateTime={new Date(timestamp).toISOString()}>
		{formatter.format(timestamp)}
		{children}
	</time>
);

// rendered as a fixed date, then rewritten in the browser as "3 days ago" etc.
export const RelativeDate = ({ timestamp }: { timestamp: number }) => (
	<FormattedDate timestamp={timestamp}>
		<ClientScript run={(time: HTMLTimeElement) => {
			const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
			const days = Math.round((Date.parse(time.dateTime) - Date.now()) / 86_400_000);
			time.textContent = Math.abs(days) < 14
				? relative.format(days, 'day')
				: Math.abs(days) < 365
					? relative.format(Math.round(days / 30.4375), 'month')
					: relative.format(Math.round(days / 365.25), 'year');
		}} />
	</FormattedDate>
);
