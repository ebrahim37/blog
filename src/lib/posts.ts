import path from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';

import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export const getPost = (slug: string) => {
	const { data, content } = matter(readFileSync(path.join(postsDir, `${slug}.md`), 'utf8'));
	return {
		slug,
		title: data.title as string,
		subtitle: data.subtitle as string,
		timestamp: data.timestamp as number,
		minutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
		content,
	};
};

export const getPosts = () => readdirSync(postsDir)
	.filter(file => file.endsWith('.md'))
	.map(file => getPost(file.slice(0, -3)))
	.sort((a, b) => b.timestamp - a.timestamp);
