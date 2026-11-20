import { createElement } from 'react';
import type { IconNode } from 'lucide';

// a lucide icon (`import { Rss } from 'lucide'`), drawn with the stroke settings in global.css
export const Icon = ({ icon, className }: { icon: IconNode, className?: string }) => (
	<svg viewBox='0 0 24 24' className={className} aria-hidden>
		{icon.map(([tag, attributes], i) => createElement(tag, { key: i, ...attributes }))}
	</svg>
);
