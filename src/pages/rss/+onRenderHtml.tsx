import { renderToStaticMarkup } from 'react-dom/server';
import Markdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Feed } from 'feed';
import type { PageContextServer } from 'vike/types';

import { POSTS } from '@/posts.ts';

// a post as plain html, without the site's code blocks and figures (components/markdown.tsx).
// urls are made absolute against the post's url, since feed readers can't resolve relative ones
const toHtml = (markdown: string, url: string) => renderToStaticMarkup(
	<Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
		urlTransform={value => new URL(defaultUrlTransform(value), url).href}>{markdown}</Markdown>
);

const author = {
	name: 'Ebrahim Haghshenas',
	email: 'sayhi@ebra.dev',
	link: 'https://ebra.dev'
};

// /rss.xml: written as is (pageContext.content) instead of the html of +onRenderHtml.tsx
export const onRenderHtml = (pageContext: PageContextServer) => {
	const feed = new Feed({
		title: author.name,
		id: author.link,
		link: author.link,
		description: "Ebrahim's Blog",
		language: 'en',
		author,
		feedLinks: { rss: `${author.link}/rss.xml` },
	});
	for (const post of POSTS) {
		const link = `${author.link}${post.href}`;
		feed.addItem({
			title: post.title,
			link,
			date: new Date(post.timestamp),
			guid: post.slug,
			description: post.subtitle,
			content: toHtml(post.content, link),
			author: [author],
		});
	}
	pageContext.content = feed.rss2();
};
