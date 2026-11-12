// deno-fmt-ignore-file
// biome-ignore-all format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_PostsSlug_getConfig } from './pages/posts/[slug]';

// prettier-ignore
type Page =
| { path: '/404'; render: 'static' }
| { path: '/about'; render: 'static' }
| { path: '/'; render: 'static' }
| ({ path: '/posts/[slug]' } & GetConfigResponse<typeof File_PostsSlug_getConfig>)
| { path: '/projects'; render: 'static' };

// prettier-ignore
type Layout =
| { path: '/' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
