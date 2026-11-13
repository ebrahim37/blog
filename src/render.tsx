import type { ReactNode } from 'react';
import { prerender } from 'react-dom/static';

import { Layout } from '@/layout';
import { getPosts } from '@/lib/posts';
import { rss } from '@/rss';
import NotFound from '@/pages/404';
import About from '@/pages/about';
import Home from '@/pages/index';
import Post from '@/pages/post';
import Projects from '@/pages/projects';

const pages = (): Record<string, () => ReactNode> => ({
	'/': () => <Home />,
	'/projects': () => <Projects />,
	'/about': () => <About />,
	...Object.fromEntries(getPosts().map(({ slug }) => [
		`/posts/${slug}`,
		() => <Post slug={slug} />,
	])),
});

export const routes = () => [...Object.keys(pages()), '/404', '/rss.xml'];

export const render = async (url: string) => {
	const path = url.split(/[?#]/)[0]!.replace(/(.)\/$/, '$1');
	if (path === '/rss.xml')
		return { status: 200, type: 'application/xml', body: await rss() };

	const page = pages()[path];
	const { prelude } = await prerender(<Layout path={path}>{page ? page() : <NotFound />}</Layout>);
	const body = await new Response(prelude).text();
	return { status: page ? 200 : 404, type: 'text/html', body };
};
