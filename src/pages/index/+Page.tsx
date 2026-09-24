import { For } from 'solid-js';
import { useData } from 'vike-solid/useData';
import { useConfig } from 'vike-solid/useConfig';

import styles from './+Page.module.css';
import { PageHeading } from '~/components/PageHeading.tsx';

import type { Data } from './+data.ts';
import { HomePagePost } from '~/components/HomePagePost.tsx';

export function Page() {
	useConfig()({
		title: 'Blog | Ebrahim Haghshenas',
		description: 'Posts by Ebrahim Haghshenas.',
	});
	const data = useData<Data>();

	return (
		<>
			<PageHeading class={styles.heading}>posts/</PageHeading>
			<ul class={styles.list}>
				<For each={data.posts}>{post => <HomePagePost post={post} />}</For>
			</ul>
		</>
	);
}
