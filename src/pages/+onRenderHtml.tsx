import type { FunctionComponent } from 'react';
import { prerender } from 'react-dom/static';
import { dangerouslySkipEscape } from 'vike/server';
import type { PageContextServer } from 'vike/types';

import { Layout } from '@/components/layout.tsx';

// a component's `client` export runs on each element with data-client="<component file name>".
// it's inlined as source, so it can only use the element and the dom, not imports
const components = import.meta.glob<{ client?: (element: never) => void }>('/src/components/*.tsx', { eager: true });

export const onRenderHtml = async ({ Page, urlPathname: path }: PageContextServer) => {
	const Content = Page as FunctionComponent<{ path: string }>;
	const { prelude } = await prerender(<Layout path={path}><Content path={path} /></Layout>);
	const html = await new Response(prelude).text();
	const scripts = Object.entries(components).map(([file, { client }]) => {
		const name = file.slice('/src/components/'.length, -'.tsx'.length);
		return client && html.includes(`data-client="${name}"`)
			? `<script type="module">document.querySelectorAll('[data-client="${name}"]').forEach(${client})</script>`
			: '';
	});
	return dangerouslySkipEscape(html.replace('</head>', `${scripts.join('')}</head>`));
};
