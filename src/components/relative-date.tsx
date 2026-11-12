'use client';

import { useEffect, useState } from 'react';

import { formatDate, formatRelativeDate } from '@/lib/date';

export const RelativeDate = ({ timestamp }: { timestamp: number }) => {
	const [text, setText] = useState(() => formatDate(timestamp));
	useEffect(() => setText(formatRelativeDate(timestamp)), [timestamp]);
	return <time dateTime={new Date(timestamp).toISOString()}>{text}</time>;
};
