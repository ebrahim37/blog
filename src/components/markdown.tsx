import Markdown, { type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from '@/components/ui/code-block';
import { highlightCode } from '@/lib/highlighter';

// keep fence meta (e.g. title='file.ts') as a data attribute, since rehype-raw drops node.data
type MdNode = { meta?: string, data?: object, children?: MdNode[] };
const remarkCodeMeta = () => {
	const walk = (node: MdNode) => {
		if (node.meta)
			node.data = { hProperties: { dataMeta: node.meta } };
		node.children?.forEach(walk);
	};
	return walk;
};

// highlighted on the server at build time, so no highlighter ships to the browser
const Pre = async ({ node }: ExtraProps) => {
	const code = node!.children[0] as typeof node & {};
	const text = (code.children[0] as { value: string }).value.replace(/\n$/, '');
	const lang = String((code.properties.className as string[] | undefined)?.[0] ?? '').replace('language-', '');
	const title = String(code.properties.dataMeta ?? '').match(/title=["']([^"']*)/)?.[1];
	const lines = await highlightCode(text, lang) ?? text.split('\n');
	const actions = <CodeBlockActions><CodeBlockCopyButton value={text} /></CodeBlockActions>;

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
