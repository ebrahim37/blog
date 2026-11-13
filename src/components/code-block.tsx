import type { ReactNode } from 'react';
import { CheckIcon, CopyIcon, DownloadIcon, FileCodeIcon, WrapTextIcon } from 'lucide-react';
import { cn } from 'cn';

import { ClientScript } from '@/components/client-script';
import { Button } from '@/components/shad/button';
import * as Shad from '@/components/shad/code-block';

type Props = { lines: ReactNode[], title?: string, filename: string };

export const CodeBlock = ({ lines, title, filename }: Props) => (
	<Shad.CodeBlock className='my-4 rounded-[0.5rem] bg-muted/60' data-filename={filename}>
		{title && (
			<Shad.CodeBlockHeader className='pt-2 pe-24'>
				<Shad.CodeBlockTitle className='flex items-center font-mono font-normal'>
					<FileCodeIcon />
					<span className='truncate'>{title}</span>
				</Shad.CodeBlockTitle>
			</Shad.CodeBlockHeader>
		)}
		<Shad.CodeBlockActions
			className={cn('[&_svg]:size-3.5!', title && '[[data-slot=code-block]>&]:opacity-100')}
		>
			<Button
				variant='ghost'
				size='icon-xs'
				aria-label='Wrap lines'
				aria-pressed='false'
				className='aria-pressed:text-foreground'
			>
				<WrapTextIcon />
			</Button>
			<Button variant='ghost' size='icon-xs' aria-label='Download'>
				<DownloadIcon />
			</Button>
			<Button variant='ghost' size='icon-xs' aria-label='Copy'>
				<CopyIcon className='in-data-copied:hidden' />
				<CheckIcon className='hidden in-data-copied:block' />
			</Button>
		</Shad.CodeBlockActions>
		<Shad.CodeBlockContent className='py-2.5'>
			{lines.map((line, i) => <Shad.CodeBlockLine key={i}>{line}</Shad.CodeBlockLine>)}
		</Shad.CodeBlockContent>
		<ClientScript run={block => {
			type Buttons = [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement];
			const [wrap, download, copy] = block.querySelectorAll('button') as unknown as Buttons;
			const lines = block.querySelectorAll('[data-slot=code-block-line-content]');
			const code = [...lines].map(line => line.textContent!.replace(/^\n$/, '')).join('\n');

			wrap.onclick = () => {
				wrap.ariaPressed = String(block.querySelector('pre')!.toggleAttribute('data-wrap'));
			};
			download.onclick = () => {
				const link = document.createElement('a');
				link.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
				link.download = block.dataset.filename!;
				link.click();
				URL.revokeObjectURL(link.href);
			};
			copy.onclick = () => navigator.clipboard.writeText(code).then(() => {
				copy.toggleAttribute('data-copied', true);
				setTimeout(() => copy.toggleAttribute('data-copied', false), 2000);
			}, () => {});
		}} />
	</Shad.CodeBlock>
);
