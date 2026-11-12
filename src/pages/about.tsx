import { ExternalItem, ItemDescription, ItemTitle } from '@/components/item';
import { PageHeading } from '@/components/page-heading';
import { TextLink } from '@/components/text-link';
import { ItemGroup } from '@/components/shad/item';

const RESUME_LINK = 'https://drive.google.com/file/d/1ZqPFToCU4kQDG6dCo4Z0z7QGLY_1xBYG/view';

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

const Heading = ({ children }: { children: string }) => (
	<h2 className='mb-3 font-mono text-xl font-bold text-primary'>{children}</h2>
);

export default function About() {
	return (
		<>
			<title>About | ebra.dev</title>
			<meta
				name='description'
				content='Ebrahim Haghshenas is a software engineer and AI training specialist who builds full-stack systems, developer tools, and infrastructure.'
			/>
			<PageHeading>about/</PageHeading>
			<div className='flex flex-col gap-6 leading-relaxed text-muted-foreground'>
				<section>
					<Heading>Ebrahim Haghshenas</Heading>
					<p>
						I’m a new grad software engineer interested in full-stack systems,
						Linux infrastructure, developer tooling, and building software
						that stays understandable.
					</p>
					<div className='mt-4 flex flex-wrap gap-4'>
						<TextLink external href='https://github.com/ebrahim37'>github</TextLink>
						<TextLink external href='https://www.linkedin.com/in/ebrahim-hagh'>
							linkedin
						</TextLink>
						<TextLink href='mailto:sayhi@ebra.dev'>email</TextLink>
						<TextLink external href={RESUME_LINK}>resume</TextLink>
					</div>
				</section>
				<section>
					<Heading>Experience</Heading>
					<ItemGroup className='gap-2'>
						{EXPERIENCE.map(position => (
							<ExternalItem key={position.title} href={position.href}>
								<ItemTitle>{position.title}</ItemTitle>
								<p className='text-xs text-muted-foreground tabular-nums'>
									{position.period}
								</p>
								<ItemDescription className='mt-1'>
									{position.description}
								</ItemDescription>
							</ExternalItem>
						))}
					</ItemGroup>
				</section>
				<section>
					<Heading>This site</Heading>
					<p>
						This site is built with{' '}
						<TextLink external href='https://waku.gg/' translate='no'>Waku</TextLink> and{' '}
						<TextLink external href='https://ui.shadcn.com/' translate='no'>shadcn/ui</TextLink>,
						and hosted on Cloudflare Pages. You can view the source{' '}
						<TextLink external href='https://github.com/ebrahim37/blog'>here</TextLink>.
					</p>
				</section>
			</div>
		</>
	);
}
