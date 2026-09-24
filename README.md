# ebra.dev

Source code for my personal website and blog, available at [ebra.dev](https://ebra.dev).

The site is built with [SolidJS](https://www.solidjs.com/) and [Vike](https://vike.dev/). Blog posts are written in Markdown, and syntax highlighting for code block is done with Shiki.

The visual design is inspired by [Max Leiter’s website](https://maxleiter.com/).

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
src/         SolidJS components, pages, styles, and utilities
docs/        Gemerated static site
```

Each post is a Markdown file in `posts/` with front matter for its title, subtitle, and timestamp:

```md
---
title: Post title
subtitle: A short description of the post.
timestamp: 1785369600000
---
```
