import type { Component } from 'solid-js';

import styles from './Icons.module.css';

export type IconProps = {
	class?: string,
};

export const SunIcon: Component<IconProps> = props => (
	<svg class={props.class} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z' />
	</svg>
);

export const MoonIcon: Component<IconProps> = props => (
	<svg class={props.class} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M9.822 2.238a9 9 0 0 0 11.94 11.94C20.768 18.654 16.775 22 12 22 6.477 22 2 17.523 2 12c0-4.775 3.346-8.768 7.822-9.762zm8.342.053L19 2.5v1l-.836.209a2 2 0 0 0-1.455 1.455L16.5 6h-1l-.209-.836a2 2 0 0 0-1.455-1.455L13 3.5v-1l.836-.209A2 2 0 0 0 15.29.836L15.5 0h1l.209.836a2 2 0 0 0 1.455 1.455zm5 5L24 7.5v1l-.836.209a2 2 0 0 0-1.455 1.455L21.5 11h-1l-.209-.836a2 2 0 0 0-1.455-1.455L18 8.5v-1l.836-.209a2 2 0 0 0 1.455-1.455L20.5 5h1l.209.836a2 2 0 0 0 1.455 1.455z' />
	</svg>
);

export const RssIcon: Component<IconProps> = props => (
	<svg class={props.class} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M5 3.5a1.5 1.5 0 1 0 0 3c6.893 0 12.5 5.607 12.5 12.5a1.5 1.5 0 0 0 3 0C20.5 10.453 13.547 3.5 5 3.5zm0 5a1.5 1.5 0 1 0 0 3A7.5 7.5 0 0 1 12.5 19a1.5 1.5 0 0 0 3 0C15.5 13.21 10.79 8.5 5 8.5zm0 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
	</svg>
);

export const GitHubIcon: Component<IconProps> = props => (
	<svg class={props.class} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path d='M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z' />
	</svg>
);

export const LinkedInIcon: Component<IconProps> = props => (
	<svg class={props.class} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
		<path fill-rule='nonzero' d='M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z' />
	</svg>
);

export const ExternalLinkIcon: Component<IconProps> = props => (
	<svg class={props.class ? `${styles.externalLink} ${props.class}` : styles.externalLink} viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
		<path fill-rule='evenodd' clip-rule='evenodd' d='M13.5 10.25V13.25C13.5 13.3881 13.3881 13.5 13.25 13.5H2.75C2.61193 13.5 2.5 13.3881 2.5 13.25L2.5 2.75C2.5 2.61193 2.61193 2.5 2.75 2.5H5.75H6.5V1H5.75H2.75C1.7835 1 1 1.7835 1 2.75V13.25C1 14.2165 1.7835 15 2.75 15H13.25C14.2165 15 15 14.2165 15 13.25V10.25V9.5H13.5V10.25ZM9 1H9.75H14.2495C14.6637 1 14.9995 1.33579 14.9995 1.75V6.25V7H13.4995V6.25V3.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L12.4388 2.5H9.75H9V1Z' />
	</svg>
);

export const DocumentIcon: Component<IconProps> = props => (
	<svg class={props.class ? `${styles.document} ${props.class}` : styles.document} fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
		<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
	</svg>
);
