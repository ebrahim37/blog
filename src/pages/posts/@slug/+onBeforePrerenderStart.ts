import { POSTS } from '@/posts.ts';

export const onBeforePrerenderStart = () => POSTS.map(post => post.href);
