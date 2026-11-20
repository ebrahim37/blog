// the router: same-site links fetch the page (prefetched on hover) and swap <body> in a view
// transition, which fades (components/layout.module.css). without view transitions, links load normally.
// inlined into <head> by layout.tsx as a classic script, so the swap (which redoes module scripts)
// leaves it running
export const router = () => {
	// iOS Safari only shows :active (pressed) styles when the page listens for touches
	document.addEventListener('touchstart', () => {}, { passive: true });

	if (!document.startViewTransition)
		return;

	// html by path, shared by the hover prefetch and the click
	const pages: Record<string, Promise<string>> = {};
	const load = (path: string) => pages[path] ??= fetch(path).then(res => res.text());
	let current = location.pathname;

	// calls `handle` for plain links to another page of this site (no target, download or modifier keys)
	const onLink = (handle: (url: URL, event: MouseEvent) => void) => (event: MouseEvent) => {
		const link = (event.target as Element).closest?.('a');
		if (!link || link.target || link.hasAttribute('download')
			|| event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
			return;
		const url = new URL(link.href);
		if (url.origin === location.origin && !(url.pathname === location.pathname && url.hash))
			handle(url, event);
	};

	// scroll: the position to restore on back/forward
	const navigate = async (url: URL, scroll?: number) => {
		const page = new DOMParser().parseFromString(await load(url.pathname).catch(() => ''), 'text/html');
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
			// the new page's css and component scripts. parsed scripts don't run, so they're recreated
			const assets = 'style, link[rel=stylesheet], script[type=module]:not([src])';
			document.head.querySelectorAll(assets).forEach(element => element.remove());
			for (const element of page.head.querySelectorAll(assets))
				document.head.append(element instanceof HTMLScriptElement
					? Object.assign(document.createElement('script'), { type: 'module', text: element.text })
					: element);
			const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
			target ? target.scrollIntoView() : scrollTo(0, scroll ?? 0);
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
};
