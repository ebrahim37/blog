'use client';

import { type ReactNode, useState } from 'react';
import { DownloadIcon, FileCodeIcon, WrapTextIcon } from 'lucide-react';
import { cn } from 'cn';

import { Button } from '@/components/shad/button';
import * as Shad from '@/components/shad/code-block';

type Props = { code: string, lines: ReactNode[], title?: string, filename: string };

const download = (code: string, filename: string) => {
	const link = document.createElement('a');
	link.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
};

export const CodeBlock = ({ code, lines, title, filename }: Props) => {
	const [wrap, setWrap] = useState(false);

	return (
		<Shad.CodeBlock className='my-4 rounded-[0.5rem] bg-muted/60'>
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
					aria-pressed={wrap}
					className='aria-pressed:text-foreground'
					onClick={() => setWrap(!wrap)}
				>
					<WrapTextIcon />
				</Button>
				<Button
					variant='ghost'
					size='icon-xs'
					aria-label='Download'
					onClick={() => download(code, filename)}
				>
					<DownloadIcon />
				</Button>
				<Shad.CodeBlockCopyButton value={code} />
			</Shad.CodeBlockActions>
			<Shad.CodeBlockContent wrap={wrap} className='py-2.5'>
				{lines.map((line, i) => <Shad.CodeBlockLine key={i}>{line}</Shad.CodeBlockLine>)}
			</Shad.CodeBlockContent>
		</Shad.CodeBlock>
	);
};
