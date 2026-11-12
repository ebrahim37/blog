import { Feed } from 'feed';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

import { getPosts } from '@/lib/posts';

const toHtml = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeStringify);

const author = {
	name: 'Ebrahim Haghshenas',
	email: 'sayhi@ebra.dev',
	link: 'https://ebra.dev'
};

export const GET = async () => {
	const feed = new Feed({
		title: author.name,
		id: author.link,
		link: author.link,
		description: "Ebrahim's Blog",
		language: 'en',
		author,
		feedLinks: { rss: `${author.link}/rss.xml` },
	});
	for (const post of getPosts()) {
		feed.addItem({
			title: post.title,
			link: `${author.link}/posts/${post.slug}`,
			date: new Date(post.timestamp),
			guid: post.slug,
			description: post.subtitle,
			content: String(await toHtml.process(post.content)),
			author: [author],
		});
	}
	// application/xml rather than application/rss+xml, so browsers display it instead of downloading
	return new Response(feed.rss2(), {
		headers: { 'content-type': 'application/xml; charset=utf-8' },
	});
};

export const getConfig = async () => ({ render: 'static' } as const);
