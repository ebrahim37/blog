import Markdown, { type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from '@/components/shad/code-block';
import { highlightCode } from '@/lib/highlighter';

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

const Pre = async ({ node }: ExtraProps) => {
	const { properties, children: [text] } = node!.children[0] as typeof node & {};
	const code = (text as { value: string }).value.replace(/\n$/, '');
	const lang = String(properties.className ?? '').replace('language-', '');
	const title = properties.dataMeta as string | undefined;
	const lines = await highlightCode(code, lang) ?? code.split('\n');
	const actions = <CodeBlockActions><CodeBlockCopyButton value={code} /></CodeBlockActions>;

	return (
		<CodeBlock className='not-prose my-4 bg-muted/60'>
			{title ? <CodeBlockHeader><CodeBlockTitle className='font-mono'>{title}</CodeBlockTitle>{actions}</CodeBlockHeader> : actions}
			<CodeBlockContent>{lines.map((line, i) => <CodeBlockLine key={i}>{line}</CodeBlockLine>)}</CodeBlockContent>
		</CodeBlock>
	);
};

export const PostMarkdown = ({ children }: { children: string }) => (
	<Markdown
		remarkPlugins={[remarkGfm, remarkCodeMeta]}
		rehypePlugins={[rehypeRaw]}
		components={{
			a: ({ node: _, ...props }) => <a {...props} target='_blank' rel='noreferrer' />,
			pre: Pre,
		}}
	>
		{children}
	</Markdown>
);
