import { ExternalItem, ItemDescription, ItemTitle } from '@/components/item';
import { PageHeading } from '@/components/page-heading';
import { Badge } from '@/components/shad/badge';
import { ItemGroup } from '@/components/shad/item';

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
	{
		name: 'R6 external ESP',
		description: 'A Direct3D overlay for Rainbow Six Siege built while learning reverse engineering, process memory, and real-time graphics.',
		period: '2020',
		technologies: ['C++', 'Direct3D 9', 'Reverse engineering'],
		href: 'https://github.com/ebrahim37/R6-external-esp-v2',
	},
	{
		name: 'r6-dumper',
		description: 'An external tool for finding and exporting runtime offsets from Rainbow Six Siege after game updates.',
		period: '2020',
		technologies: ['C++', 'Reverse engineering'],
		href: 'https://github.com/ebrahim37/r6-dumper',
	},
];

export default function Projects() {
	return (
		<>
			<title>Projects | Ebrahim Haghshenas</title>
			<meta
				name='description'
				content='Selected full-stack, infrastructure, systems, and graphics projects by Ebrahim Haghshenas.'
			/>
			<PageHeading>projects/</PageHeading>
			<ItemGroup className='mb-10 grid gap-2 min-[700px]:grid-cols-2'>
				{PROJECTS.map(project => (
					<ExternalItem key={project.name} href={project.href}>
						<ItemTitle>
							{project.name}
							<span className='font-sans text-xs font-normal text-muted-foreground tabular-nums'>
								{project.period}
							</span>
						</ItemTitle>
						<ItemDescription className='mb-1 flex-1'>
							{project.description}
						</ItemDescription>
						<div className='flex flex-wrap gap-1.5' translate='no'>
							{project.technologies.map(tech => (
								<Badge
									key={tech}
									variant='outline'
									className='rounded-sm bg-muted px-1.5 font-normal text-muted-foreground'
								>
									{tech}
								</Badge>
							))}
						</div>
					</ExternalItem>
				))}
			</ItemGroup>
		</>
	);
}
