import { Meta } from '@/components/layout.tsx';
import { TextLink } from '@/components/text-link.tsx';
import styles from './404.module.css';

export default () => (
	<>
		<Meta title='Page not found' />
		<h1>404/</h1>
		<p className={styles.text}>The requested page could not be found.</p>
		<TextLink href='/'>Return to the blog</TextLink>
	</>
);
