import { Children, type CSSProperties, type JSX, type ReactElement, type ReactNode } from 'react';
import Markdown, { type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

import { CodeBlock } from '@/components/code-block';

// keep fence meta (the title, e.g. ```ts file.ts) as an attribute, since rehype-raw drops node.data
type MdNode = {
	meta?: string,
	data?: object,
	children?: MdNode[]
};
const remarkCodeMeta = () => function walk(node: MdNode) {
	if (node.meta)
		node.data = { hProperties: { dataMeta: node.meta } };
	node.children?.forEach(walk);
};

const highlighter = createHighlighterCore({
	themes: [import('shiki/themes/vitesse-light.mjs'), import('shiki/themes/vitesse-dark.mjs')],
	langs: [
		import('shiki/langs/typescript.mjs'),
		import('shiki/langs/tsx.mjs'),
		import('shiki/langs/json.mjs'),
		import('shiki/langs/shellscript.mjs'),
		import('shiki/langs/yaml.mjs'),
		import('shiki/langs/nix.mjs'),
	],
	engine: createJavaScriptRegexEngine({ forgiving: true }),
});

const highlightCode = async (code: string, lang: string) => {
	const shiki = await highlighter;
	if (!shiki.getLoadedLanguages().includes(lang))
		return null;

	const { tokens } = shiki.codeToTokens(code, {
		lang,
		themes: {
			light: 'vitesse-light',
			dark: 'vitesse-dark'
		},
		defaultColor: false
	});

	return tokens.map(line => line.map((token, i) => (
		<span
			key={i}
			style={token.htmlStyle as CSSProperties}
			className='text-(--shiki-light) dark:text-(--shiki-dark)'
		>
			{token.content}
		</span>
	)));
};

const Pre = async ({ node }: ExtraProps) => {
	const { properties, children: [text] } = node!.children[0] as typeof node & {};
	const code = (text as { value: string }).value.replace(/\n$/, '');
	const lang = String(properties.className ?? '').replace('language-', '');
	const title = properties.dataMeta as string | undefined;
	const lines = await highlightCode(code, lang) ?? code.split('\n');
	const filename = title?.split('/').pop() ?? `code.${lang || 'txt'}`;

	return <CodeBlock lines={lines} title={title} filename={filename} />;
};

// an image followed by an *italic* line becomes a figure, with that line as its caption
const P = ({ node, children, ...props }: JSX.IntrinsicElements['p'] & ExtraProps) => {
	const isBlank = (child: unknown) => typeof child === 'string' && !child.trim();
	const [img, em, ...rest] = node!.children
		.filter(child => child.type !== 'text' || child.value.trim());
	const isTag = (child: typeof img, tag: string) =>
		child?.type === 'element' && child.tagName === tag;
	if (!isTag(img, 'img') || !isTag(em, 'em') || rest.length)
		return <p {...props}>{children}</p>;

	const [image, caption] = Children.toArray(children).filter(child => !isBlank(child));
	const captionText = (caption as ReactElement<{ children: ReactNode }>).props.children;
	return (
		<figure>
			{image}
			<figcaption>{captionText}</figcaption>
		</figure>
	);
};

export const PostMarkdown = ({ children }: { children: string }) => (
	<Markdown
		remarkPlugins={[remarkGfm, remarkCodeMeta]}
		rehypePlugins={[rehypeRaw]}
		components={{
			// open external links in a new tab, keep in-page ones (footnotes, #headings) in place
			a: ({ node: _, ...props }) => props.href?.startsWith('#')
				? <a {...props} />
				: <a {...props} target='_blank' rel='noreferrer' />,
			p: P,
			pre: Pre,
		}}
	>
		{children}
	</Markdown>
);
