import { Card, CardList } from '@/components/card.tsx';
import { Meta } from '@/components/layout.tsx';
import { TextLink } from '@/components/text-link.tsx';
import styles from './about.module.css';

const EXPERIENCE = [
	{
		title: 'AI Training Specialist (Coding) @ DataAnnotation',
		period: '03/2024 - present',
		description: 'Help train coding-focused LLMs by evaluating and rewriting their work across languages, frameworks, databases, and developer tools. I also design agentic software-engineering tasks, reference solutions, and grading criteria that expose meaningful differences between models.',
		href: 'https://www.dataannotation.tech/',
	},
	{
		title: 'Undergraduate Research Assistant @ Queen’s University',
		period: '05/2025 - 08/2025',
		description: 'Built a Python MCP server for TELUS’s corporate GitLab in Professor Juergen Dingel’s MASE Lab. The server exposed repository tools and resources with pagination, rate-limit handling, caching, structured logging, and onboarding documentation.',
		href: 'https://labs.cs.queensu.ca/mase/',
	},
	{
		title: 'Full-stack Developer Intern @ Myadcenter',
		period: '08/2021 - 01/2022',
		description: 'Worked in a small Scrum team migrating a legacy PHP application to Next.js, Express, and Redux. This was my first professional software role.',
		href: 'https://www.crunchbase.com/organization/myadcenter',
	},
];

export default () => (
	<>
		<Meta
			title='About'
			description='Ebrahim Haghshenas is a software engineer and AI training specialist who builds full-stack systems, developer tools, and infrastructure.'
		/>
		<h1>about/</h1>
		<div className={styles.about}>
			<section>
				<h2>Ebrahim Haghshenas</h2>
				<p>
					I’m a new grad software engineer interested in full-stack systems,
					Linux infrastructure, developer tooling, and building software
					that stays understandable.
				</p>
				<div className={styles.links}>
					<TextLink external href='https://github.com/ebrahim37'>github</TextLink>
					<TextLink external href='https://www.linkedin.com/in/ebrahim-hagh'>linkedin</TextLink>
					<TextLink href='mailto:sayhi@ebra.dev'>email</TextLink>
					<TextLink external href='https://drive.google.com/file/d/1ZqPFToCU4kQDG6dCo4Z0z7QGLY_1xBYG/view'>resume</TextLink>
				</div>
			</section>
			<section>
				<h2>Experience</h2>
				<CardList>
					{EXPERIENCE.map(position => (
						<Card external key={position.title} href={position.href}>
							<h3>{position.title}</h3>
							<p className={styles.period}>{position.period}</p>
							<p className={styles.description}>{position.description}</p>
						</Card>
					))}
				</CardList>
			</section>
			<section>
				<h2>This site</h2>
				<p>
					This site is built with{' '}
					<TextLink external href='https://vite.dev/' translate='no'>Vite</TextLink> and{' '}
					<TextLink external href='https://react.dev/' translate='no'>React</TextLink>,
					and hosted on Cloudflare Pages. You can view the source{' '}
					<TextLink external href='https://github.com/ebrahim37/blog'>here</TextLink>.
				</p>
			</section>
		</div>
	</>
);
