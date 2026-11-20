# ebra.dev

Source code for my personal website/blog.

The site is built with [Vike](https://vike.dev/) (on [Vite](https://vite.dev/)), React and CSS modules.
React only runs at build time: every page is prerendered to static HTML (`src/pages/+onRenderHtml.tsx`).
Each page has its CSS and the scripts of the interactive components on it inlined, so the HTML
file is the only request.

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
posts/            Markdown blog posts
public/           Static files copied into the build
src/pages/        Vike pages (filesystem routing): about/+Page.tsx is /about, _error/ is 404.html
src/components/   Components, each with its CSS module (card.tsx + card.module.css)
docs/             Generated static site
```

## Interactive components

A component's browser code is its `client` export, next to the JSX. It's called with each element
on the page marked `data-client="<component file name>"`, and inlined (minified) once into the pages
that have such an element, however many there are (`src/pages/+onRenderHtml.tsx`). Since it's
shipped as source, it can only use the element and the DOM: no imports or other code from its file.

```tsx
// src/components/like-button.tsx
export const client = (button: HTMLElement) => {
	button.onclick = () => alert('Thanks!');
};

export const LikeButton = () => <button type='button' data-client='like-button'>Like</button>;
```

Each post is a Markdown file in `posts/` with front matter for its title, subtitle, and timestamp:

```md
---
title: Post title
subtitle: A short description of the post.
timestamp: 1785369600000
---
```
