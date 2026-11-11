import type { ReactNode } from 'react';

// runs before paint so the saved/system theme never flashes
const themeScript = `try {
	if ((localStorage.getItem('theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark') {
		document.documentElement.classList.add('dark');
		document.querySelector('meta[name="theme-color"]').content = '#000000';
	}
} catch {}`;

export default function Root({ children }: { children: ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#ffffff' />
				<link rel='icon' href='data:image/png;base64,iVBORw0KGgo=' />
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<script src='https://heartbeat.ebra.dev/api/script.js' data-site-id='a6c00916053e' defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
