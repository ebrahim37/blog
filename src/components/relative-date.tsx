import { FormattedDate } from '@/components/date.tsx';

// runs in the browser (see +onRenderHtml.tsx): rewrites the date as "3 days ago" etc.
export const client = (time: HTMLTimeElement) => {
	const days = Math.round((Date.parse(time.dateTime) - Date.now()) / 86_400_000);
	const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	time.textContent = Math.abs(days) < 14
		? relative.format(days, 'day')
		: Math.abs(days) < 365
			? relative.format(Math.round(days / 30.4375), 'month')
			: relative.format(Math.round(days / 365.25), 'year');
};

export const RelativeDate = ({ timestamp, className }: { timestamp: number, className?: string }) => (
	<FormattedDate timestamp={timestamp} className={className} data-client='relative-date' />
);
