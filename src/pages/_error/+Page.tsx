import { usePageContext } from 'vike-solid/usePageContext';
import { useConfig } from 'vike-solid/useConfig';

import styles from './+Page.module.css';
import { PageHeading } from '~/components/PageHeading.tsx';
import { TextLink } from '~/components/TextLink.tsx';

export function Page() {
	const is404 = usePageContext().is404;
	const config = is404 ? {
		title: 'Page not found | Ebrahim Haghshenas',
		description: 'The requested page could not be found.',
	} : {
		title: 'Error | Ebrahim Haghshenas',
		description: 'Something went wrong while rendering the page.',
	};
	useConfig()(config);

	return (
		<>
			<PageHeading>{is404 ? '404/' : 'error/'}</PageHeading>
			<p class={styles.description}>{config.description}</p>
			<TextLink href='/'>Return to the blog</TextLink>
		</>
	);
}
