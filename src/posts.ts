import matter from 'gray-matter';

// imported through vite, so the dev server reloads when posts change
const files = import.meta.glob<string>('/posts/*.md', { eager: true, query: '?raw', import: 'default' });

export const POSTS = Object.entries(files)
	.map(([file, source]) => {
		const { data, content } = matter(source);
		const slug = file.slice('/posts/'.length, -'.md'.length);
		return {
			slug,
			href: `/posts/${slug}`,
			title: data.title as string,
			subtitle: data.subtitle as string,
			timestamp: data.timestamp as number,
			minutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
			content,
		};
	})
	.sort((a, b) => b.timestamp - a.timestamp);

export type Post = typeof POSTS[number];
