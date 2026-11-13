import { ClientScript } from '@/components/client-script';

// goes in <head>: turns same-site link clicks into fetch + <body> swaps inside a view transition,
// so pages fade (styles.css) without a full reload. pages are prefetched on hover
export const Router = () => (
	<ClientScript run={() => {
		// browsers without view transitions keep normal page loads
		if (!document.startViewTransition)
			return;

		// html by path, shared by the hover prefetch and the click
		const pages: Record<string, Promise<string>> = {};
		const load = (path: string) => pages[path] ??= fetch(path).then(res => res.text());
		let current = location.pathname;

		// calls `handle` for links to another page of this site, opened normally
		// (no new tab, download or modifier keys)
		const onLink = (handle: (url: URL, event: MouseEvent) => void) => (event: MouseEvent) => {
			const link = (event.target as Element).closest?.('a');
			if (!link || link.target || link.hasAttribute('download')
				|| event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
				return;
			const url = new URL(link.href);
			if (url.origin === location.origin && !(url.pathname === location.pathname && url.hash))
				handle(url, event);
		};

		// scroll is given when going back/forward, to restore that entry's position
		const navigate = async (url: URL, scroll?: number) => {
			const html = await load(url.pathname).catch(() => '');
			const page = new DOMParser().parseFromString(html, 'text/html');
			if (!page.querySelector('main'))
				return location.assign(url);
			if (scroll === undefined) {
				history.replaceState({ scroll: scrollY }, '');
				history.pushState(null, '', url);
			}
			current = url.pathname;
			document.startViewTransition(() => {
				document.body.replaceWith(page.body);
				document.title = page.title;
				// DOMParser's scripts never run, but createContextualFragment's do
				const range = document.createRange();
				for (const script of document.body.querySelectorAll('script'))
					script.replaceWith(range.createContextualFragment(script.outerHTML));
				const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
				if (target)
					target.scrollIntoView();
				else
					scrollTo(0, scroll ?? 0);
			});
		};

		history.scrollRestoration = 'manual';
		// same-page entries (#footnote links) are left to the browser
		addEventListener('popstate', event => {
			if (location.pathname !== current)
				navigate(new URL(location.href), event.state?.scroll ?? 0);
		});
		document.addEventListener('pointerover', onLink(url => load(url.pathname)));
		document.addEventListener('click', onLink((url, event) => {
			event.preventDefault();
			navigate(url);
		}));
	}} />
);
