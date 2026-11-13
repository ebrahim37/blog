import { Meta } from '@/components/meta';
import { PageHeading } from '@/components/page-heading';
import { TextLink } from '@/components/text-link';

export default function NotFound() {
	return (
		<>
			<Meta title='Page not found' />
			<PageHeading>404/</PageHeading>
			<p className='mb-4 text-muted-foreground'>The requested page could not be found.</p>
			<TextLink href='/'>Return to the blog</TextLink>
		</>
	);
}
