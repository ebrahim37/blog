import { For } from 'solid-js';
import { useConfig } from 'vike-solid/useConfig';

import styles from './+Page.module.css';
import { Card } from '~/components/Card.tsx';
import { ExternalLink } from '~/components/ExternalLink.tsx';
import { PageHeading } from '~/components/PageHeading.tsx';

import { ExternalLinkIcon } from '~/components/Icons.tsx';

type Project = {
	name: string,
	description: string,
	technologies: string[],
	href: string,
};

const PROJECTS: Project[] = [
	{
		name: 'infra-template',
		description: 'Declarative Fedora CoreOS server configurations using Butane/Ignition and Podman Quadlets.',
		technologies: ['Fedora CoreOS', 'Butane', 'Podman', 'Quadlet'],
		href: 'https://github.com/ebrahim37/infra-template',
	},
	{
		name: 'nixos-configs',
		description: 'NixOS configs for high-performance QEMU VMs running on Windows 11 and macOS.',
		technologies: ['NixOS', 'Nix flakes', 'Home Manager', 'QEMU'],
		href: 'https://github.com/ebrahim37/nixos-configs',
	},
	{
		name: 'revved-up',
		description: 'Exercise-plan templating and role-based access for Queen’s Revved Up gym, built as a five-person capstone project.',
		technologies: ['TypeScript', 'React', 'Elysia', 'Drizzle'],
		href: 'https://revved-up.skhs.queensu.ca/',
	},
	{
		name: 'wealthgate',
		description: 'A real-time property investing prototype with Plaid-connected bank accounts and tradeable property shares.',
		technologies: ['Next.js', 'Express', 'Plaid', 'Socket.IO'],
		href: 'https://wealthgate.ebra.dev/',
	},
	{
		name: 'orionlotto',
		description: 'A full-stack casino application with real-time games and Stellar USDC deposits and withdrawals.',
		technologies: ['SolidJS', 'Express', 'Socket.IO', 'Stellar'],
		href: 'https://orion.ebra.dev/',
	},
	{
		name: 'maze-solver',
		description: 'An interactive C++ maze solver compiled to WebAssembly with A*, Dijkstra, BFS, and DFS visualizations.',
		technologies: ['C++', 'WebAssembly', 'Dear ImGui', 'GLFW'],
		href: 'https://ebra.dev/maze-solver/',
	},
	{
		name: 'lumite',
		description: 'A browser-only, no-backend XLM wallet for the Stellar network.',
		technologies: ['Next.js', 'Preact', 'Stellar'],
		href: 'https://ebra.dev/lumite/',
	},
	{
		name: 'xplorit',
		description: 'A real-time geocaching-inspired game made for TurnerHacks 2021, where it placed second.',
		technologies: ['JavaScript', 'Express', 'Socket.IO'],
		href: 'https://github.com/ebrahim37/xplorit',
	},
	{
		name: 'manhunt',
		description: 'A live location-based browser game built with the Geolocation API and multiplayer updates.',
		technologies: ['JavaScript', 'Express', 'Socket.IO'],
		href: 'https://github.com/ebrahim37/manhunt',
	},
	{
		name: 'steganography',
		description: 'A command-line utility that hides plaintext messages inside PNG images.',
		technologies: ['C++', 'stb_image'],
		href: 'https://github.com/ebrahim37/steganography',
	},
	{
		name: 'R6 external ESP',
		description: 'An external Rainbow Six Siege overlay from the reverse-engineering projects that started my programming journey.',
		technologies: ['C++', 'Direct3D 9', 'Reverse engineering'],
		href: 'https://github.com/ebrahim37/R6-external-esp-v2',
	},
];

export function Page() {
	useConfig()({
		title: 'Projects | Ebrahim Haghshenas',
		description: 'Personal projects of Ebrahim Haghshenas.',
	});

	return (
		<>
			<PageHeading>projects/</PageHeading>
			<ul class={styles.list}>
				<For each={PROJECTS}>{project =>
					<li>
						<ExternalLink
							component={Card}
							class={styles.card}
							href={project.href}
						>
							<div class={styles.cardInner}>
								<div class={styles.details}>
									<h2>{project.name}</h2>
									<p class={styles.description}>{project.description}</p>
									<div class={styles.tags}>
										<For each={project.technologies}>{technology => <span class={styles.tag} translate='no'>{technology}</span>}</For>
									</div>
								</div>
								<ExternalLinkIcon />
							</div>
						</ExternalLink>
					</li>
				}</For>
			</ul>
		</>
	);
}
