import { splitProps, type Component, type JSX, type ParentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type ExternalLinkProps = ParentProps<
	Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
		component?: Component<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>,
	}
>;

export const ExternalLink = (props: ExternalLinkProps) => {
	const [local, anchorProps] = splitProps(props, ['component']);

	return (
		<Dynamic
			component={local.component ?? 'a'}
			{...anchorProps}
			target='_blank'
			rel='noreferrer'
		/>
	);
};
