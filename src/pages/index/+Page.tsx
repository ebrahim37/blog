import { CardList } from '@/components/card.tsx';
import { Meta } from '@/components/layout.tsx';
import { PostCard } from '@/components/post-card.tsx';
import { POSTS } from '@/posts.ts';

export default () => (
	<>
		<Meta title='Blog' description="Ebrahim's Blog" />
		<h1>posts/</h1>
		<CardList>
			{POSTS.map(post => <PostCard key={post.slug} post={post} />)}
		</CardList>
	</>
);
