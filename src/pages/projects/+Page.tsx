import { Card, CardList } from '@/components/card.tsx';
import { Meta } from '@/components/layout.tsx';
import styles from './projects.module.css';

const PROJECTS = [
	{
		name: 'infra-template',
		description: 'Reproducible Fedora CoreOS infrastructure for three hosts, with encrypted secrets, Podman Quadlets, systemd services, and a restore path built around persistent volumes.',
		period: '2026',
		technologies: ['Fedora CoreOS', 'Butane', 'Podman', 'systemd'],
		href: 'https://github.com/ebrahim37/infra-template',
	},
	{
		name: 'nixos-configs',
		description: 'NixOS configurations for VMs across Windows and macOS, sharing a declarative Firefox profile, persistent tmux sessions, Tailscale networking, and remote GUI support through Waypipe.',
		period: '2026',
		technologies: ['NixOS', 'Nix flakes', 'QEMU', 'Waypipe'],
		href: 'https://github.com/ebrahim37/nixos-configs',
	},
	{
		name: 'revved-up',
		description: 'A five-person capstone project for Queen’s Revved Up gym. The app organizes reusable exercise plans with Google sign-in and role-based workflows for patients, students, trainers, and administrators.',
		period: '2026',
		technologies: ['TypeScript', 'React', 'Elysia', 'Drizzle'],
		href: 'https://revved-up.skhs.queensu.ca/',
	},
	{
		name: 'wealthgate',
		description: 'A real-time investing prototype that connected bank accounts through Plaid and let users buy and sell shares in real-estate properties.',
		period: '2023',
		technologies: ['Next.js', 'Express', 'Plaid', 'Socket.IO'],
		href: 'https://wealthgate.ebra.dev/',
	},
	{
		name: 'orionlotto',
		description: 'A full-stack casino platform with real-time games and deposits and withdrawals settled in USDC on the Stellar network.',
		period: '2022',
		technologies: ['SolidJS', 'Express', 'Socket.IO', 'Stellar'],
		href: 'https://orion.ebra.dev/',
	},
	{
		name: 'maze-solver',
		description: 'An interactive rewrite of one of my earliest C++ projects, compiled to WebAssembly so A*, Dijkstra, breadth-first search, and depth-first search can run in the browser.',
		period: '2021',
		technologies: ['C++', 'WebAssembly', 'Dear ImGui', 'GLFW'],
		href: 'https://ebra.dev/maze-solver/',
	},
	{
		name: 'lumite',
		description: 'A browser-only Stellar wallet that creates and manages an XLM account without a backend.',
		period: '2022',
		technologies: ['Next.js', 'Preact', 'Stellar'],
		href: 'https://ebra.dev/lumite/',
	},
	{
		name: 'xplorit',
		description: 'A real-time, geocaching-inspired game designed to get people outside and exploring. Built at TurnerHacks 2021, where it placed second.',
		period: '2021',
		technologies: ['JavaScript', 'Express', 'Socket.IO'],
		href: 'https://github.com/ebrahim37/xplorit',
	},
	{
		name: 'manhunt',
		description: 'A multiplayer browser game inspired by Find My Friends, using live location from the Geolocation API to turn a city into the game board.',
		period: '2021',
		technologies: ['JavaScript', 'Express', 'Socket.IO'],
		href: 'https://github.com/ebrahim37/manhunt',
	},
	{
		name: 'spigot-compass',
		description: 'A Minecraft Bukkit plugin that recreates the player-tracking compass from Dream’s Manhunt videos.',
		period: '2020',
		technologies: ['Java', 'Bukkit'],
		href: 'https://github.com/ebrahim37/spigot-compass',
	},
	{
		name: 'steganography',
		description: 'A small C++ command-line tool for hiding plaintext messages in PNG images and recovering them later.',
		period: '2020',
		technologies: ['C++', 'stb_image'],
		href: 'https://github.com/ebrahim37/steganography',
	},
	{
		name: 'kernel-read-write-using-ioctl',
		description: 'A Windows kernel driver that exposes cross-process memory operations to a user-space client through IOCTL requests.',
		period: '2020',
		technologies: ['C++', 'Windows', 'Kernel development'],
		href: 'https://github.com/ebrahim37/kernel-read-write-using-ioctl',
	},
];

export default () => (
	<>
		<Meta
			title='Projects'
			description='Selected full-stack, infrastructure, systems, and graphics projects by Ebrahim Haghshenas.'
		/>
		<h1>projects/</h1>
		<CardList className={styles.grid}>
			{PROJECTS.map(project => (
				<Card external key={project.name} href={project.href}>
					<h2>
						{project.name}
						<span className={styles.year}>{project.period}</span>
					</h2>
					<p className={styles.description}>{project.description}</p>
					<div className={styles.technologies} translate='no'>
						{project.technologies.map(technology => <span key={technology}>{technology}</span>)}
					</div>
				</Card>
			))}
		</CardList>
	</>
);
