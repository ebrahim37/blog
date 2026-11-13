import { readFileSync, readdirSync } from 'node:fs';

import matter from 'gray-matter';

export const POSTS = readdirSync('posts')
	.filter(file => file.endsWith('.md'))
	.map(file => {
		const { data, content } = matter(readFileSync(`posts/${file}`, 'utf8'));
		return {
			slug: file.slice(0, -3),
			title: data.title as string,
			subtitle: data.subtitle as string,
			timestamp: data.timestamp as number,
			minutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
			content,
		};
	})
	.sort((a, b) => b.timestamp - a.timestamp);
