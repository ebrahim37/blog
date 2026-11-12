const dateFormatter = new Intl.DateTimeFormat('en-CA', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	timeZone: 'UTC'
});
export const formatDate = (timestamp: number) => dateFormatter.format(timestamp);

const relativeFormatter = new Intl.RelativeTimeFormat('en', {
	numeric: 'auto'
});
export const formatRelativeDate = (timestamp: number) => {
	const days = Math.round((timestamp - Date.now()) / 86_400_000);
	if (Math.abs(days) < 14)
		return relativeFormatter.format(days, 'day');
	if (Math.abs(days) < 365)
		return relativeFormatter.format(Math.round(days / 30.4375), 'month');
	return relativeFormatter.format(Math.round(days / 365.25), 'year');
};
