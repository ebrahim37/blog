import type { ReactNode } from 'react';
import { Check, Copy, Download, FileCode, WrapText } from 'lucide';

import { Icon } from '@/components/icon.tsx';
import styles from './code-block.module.css';

// runs in the browser for each code block (see +onRenderHtml.tsx): the wrap, download and copy buttons
export const client = (block: HTMLElement) => {
	const [wrap, download, copy] = block.querySelectorAll('button');
	const code = () => [...block.querySelectorAll('code > span')]
		.map(line => line.textContent!.replace(/^\n$/, ''))
		.join('\n');

	wrap!.onclick = () => {
		wrap!.ariaPressed = String(block.querySelector('pre')!.toggleAttribute('data-wrap'));
	};
	download!.onclick = () => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob([code()], { type: 'text/plain' }));
		link.download = block.dataset.filename!;
		link.click();
		URL.revokeObjectURL(link.href);
	};
	copy!.onclick = () => navigator.clipboard.writeText(code()).then(() => {
		copy!.toggleAttribute('data-copied', true);
		setTimeout(() => copy!.toggleAttribute('data-copied', false), 2000);
	}, () => {});
};

// children: the <style> with the token colors (components/markdown.tsx)
type Props = { lines: ReactNode[], title?: string, filename: string, children?: ReactNode };

export const CodeBlock = ({ lines, title, filename, children }: Props) => (
	<div className={styles.block} data-client='code-block' data-filename={filename}>
		{children}
		{title && (
			<div className={styles.title}>
				<Icon icon={FileCode} />
				<span>{title}</span>
			</div>
		)}
		<div className={styles.actions}>
			<button type='button' aria-label='Wrap lines' aria-pressed='false'>
				<Icon icon={WrapText} />
			</button>
			<button type='button' aria-label='Download'>
				<Icon icon={Download} />
			</button>
			<button type='button' aria-label='Copy'>
				<Icon icon={Copy} />
				<Icon icon={Check} />
			</button>
		</div>
		<pre tabIndex={0}>
			<code>
				{/* an empty line holds a newline, so copying a selection keeps blank lines */}
				{lines.map((line, i) => (
					<span key={i}>{line === '' || (Array.isArray(line) && !line.length) ? '\n' : line}</span>
				))}
			</code>
		</pre>
	</div>
);
