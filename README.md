# ebra.dev

Source code for my personal website/blog.

The site is built with [Vite](https://vite.dev/), React and [shadcn/ui](https://ui.shadcn.com/).
React only runs at build time: pages are rendered to static HTML with inlined CSS,
and the only JavaScript shipped is small inline scripts (see `src/components/client-script.tsx`).

## Development

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/), then install the dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Create a production build:

```sh
pnpm build
```

The build command prerenders the site and writes static output to `docs/`.

## Project structure

```text
posts/       Markdown blog posts
public/      Static files copied into the build
src/pages/   Pages, each exporting its URLs as `routes` (rendered by src/root.tsx)
docs/        Generated static site
```

Each post is a Markdown file in `posts/` with front matter for its title, subtitle, and timestamp:

```md
---
title: Post title
subtitle: A short description of the post.
timestamp: 1785369600000
---
```
