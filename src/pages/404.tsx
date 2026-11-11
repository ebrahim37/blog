import { PageHeading, TextLink } from '@/components/common';

export default function NotFound() {
	return (
		<>
			<title>Page not found | Ebrahim Haghshenas</title>
			<PageHeading>404/</PageHeading>
			<p className='mb-4 text-muted-foreground'>The requested page could not be found.</p>
			<TextLink href='/'>Return to the blog</TextLink>
		</>
	);
}
