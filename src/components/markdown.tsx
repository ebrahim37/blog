import { Children, type JSX, type ReactElement, type ReactNode } from 'react';
import Markdown, { type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { bundledLanguages, codeToTokens } from 'shiki';

import { CodeBlock } from '@/components/code-block.tsx';
import { newTab } from '@/components/text-link.tsx';
import styles from './markdown.module.css';

// keep fence meta (the title in ```ts file.ts) as an attribute, since rehype-raw drops node.data
type MdNode = { meta?: string, data?: object, children?: MdNode[] };
const remarkCodeMeta = () => function walk(node: MdNode) {
	if (node.meta)
		node.data = { hProperties: { dataMeta: node.meta } };
	node.children?.forEach(walk);
};

// token colors become classes (s0, s1, ...), not inline styles: a block has hundreds of tokens but
// only a dozen colors. numbered build-wide, so a class means the same colors on every page
const classes = new Map<string, string>();

// lines of tokens and the css of their classes, or null for languages shiki doesn't have
const highlightCode = async (code: string, lang: string) => {
	if (!(lang in bundledLanguages))
		return null;

	const { tokens } = await codeToTokens(code, {
		lang: lang as keyof typeof bundledLanguages,
		themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
		defaultColor: false
	});

	const rules = new Map<string, string>();
	const lines = tokens.map(line => line.map((token, i) => {
		// spaces and tabs look the same in any color
		if (!token.content.trim())
			return token.content;
		const { '--shiki-light': light, '--shiki-dark': dark, ...rest } = token.htmlStyle ?? {};
		const declarations = [
			`color:light-dark(${light},${dark})`,
			...Object.entries(rest).map(([property, value]) => `${property}:${value}`),
		].join(';');
		let name = classes.get(declarations);
		if (!name)
			classes.set(declarations, name = `s${classes.size}`);
		rules.set(name, `.${name}{${declarations}}`);
		return <span key={i} className={name}>{token.content}</span>;
	}));
	return { lines, rules };
};

const Pre = async ({ node }: ExtraProps) => {
	const { properties, children: [text] } = node!.children[0] as typeof node & {};
	const code = (text as { value: string }).value.replace(/\n$/, '');
	const lang = String(properties.className ?? '').replace('language-', '');
	const title = properties.dataMeta as string | undefined;
	const highlighted = await highlightCode(code, lang);
	const filename = title?.split('/').pop() ?? `code.${lang || 'txt'}`;

	return (
		<CodeBlock lines={highlighted?.lines ?? code.split('\n')} title={title} filename={filename}>
			{/* one tag per class, so react writes each rule once per page */}
			{[...highlighted?.rules ?? []].map(([name, rule]) => (
				<style key={name} href={name} precedence='code-block'>{rule}</style>
			))}
		</CodeBlock>
	);
};

// an image followed by an *italic* line becomes a figure, with that line as its caption
const P = ({ node, children, ...props }: JSX.IntrinsicElements['p'] & ExtraProps) => {
	const [img, em, ...rest] = node!.children
		.filter(child => child.type !== 'text' || child.value.trim());
	const isTag = (child: typeof img, tag: string) =>
		child?.type === 'element' && child.tagName === tag;
	if (!isTag(img, 'img') || !isTag(em, 'em') || rest.length)
		return <p {...props}>{children}</p>;

	const [image, caption] = Children.toArray(children).filter(child => typeof child !== 'string' || child.trim());
	const captionText = (caption as ReactElement<{ children: ReactNode }>).props.children;
	return (
		<figure>
			{image}
			<figcaption>{captionText}</figcaption>
		</figure>
	);
};

export const PostMarkdown = ({ children }: { children: string }) => (
	<div className={styles.prose}>
		<Markdown
			remarkPlugins={[remarkGfm, remarkCodeMeta]}
			rehypePlugins={[rehypeRaw]}
			components={{
				// external links open in a new tab, in-page ones (footnotes, #headings) don't
				a: ({ node: _, ...props }) => <a {...props} {...!props.href?.startsWith('#') && newTab} />,
				p: P,
				pre: Pre,
			}}
		>
			{children}
		</Markdown>
	</div>
);
