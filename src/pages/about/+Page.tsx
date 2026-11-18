import { For } from 'solid-js';
import { useConfig } from 'vike-solid/useConfig';

import styles from './+Page.module.css';
import { Card } from '~/components/Card.tsx';
import { ExternalLink } from '~/components/ExternalLink.tsx';
import { PageHeading } from '~/components/PageHeading.tsx';
import { TextLink } from '~/components/TextLink.tsx';

import { ExternalLinkIcon } from '~/components/Icons.tsx';

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

export function Page() {
	useConfig()({
		title: 'About | Ebrahim Haghshenas',
		description: 'Ebrahim Haghshenas is a software engineer and AI training specialist who builds full-stack systems, developer tools, and infrastructure.',
	});

	return (
		<>
			<PageHeading>about/</PageHeading>
			<div class={styles.content}>
				<section>
					<h2 class={styles.contentHeading}>Ebrahim Haghshenas</h2>
					<p class={styles.intro}>
						I’m a new-grad software engineer interested in full-stack systems, Linux infrastructure, developer tooling, and building software that stays understandable.
					</p>
					<div class={styles.contactLinks}>
						<ExternalLink component={TextLink} href='https://github.com/ebrahim37'>github<span class={styles.visuallyHidden}>, opens in a new tab</span></ExternalLink>
						<ExternalLink component={TextLink} href='https://www.linkedin.com/in/ebrahim-hagh'>linkedin<span class={styles.visuallyHidden}>, opens in a new tab</span></ExternalLink>
						<TextLink href='mailto:sayhi@ebra.dev'>email</TextLink>
						<ExternalLink component={TextLink} href={RESUME_LINK}>resume<span class={styles.visuallyHidden}>, opens in a new tab</span></ExternalLink>
					</div>
				</section>

				<section aria-labelledby='experience-heading'>
					<h2 id='experience-heading' class={styles.contentHeading}>Experience</h2>
					<ul class={styles.experienceList}>
						<For each={EXPERIENCE}>{position =>
							<li>
								<ExternalLink component={Card} href={position.href}>
									<div class={styles.cardInner}>
										<div class={styles.cardBody}>
											<h3>{position.title}</h3>
											<p class={styles.period}>{position.period}</p>
											<p class={styles.description}>{position.description}</p>
										</div>
										<ExternalLinkIcon />
									</div>
								</ExternalLink>
							</li>
						}</For>
					</ul>
				</section>


				<section>
					<h2 class={styles.contentHeading}>This site</h2>
					<div class={styles.siteCopy}>
						<p>
							This site is built with <ExternalLink component={TextLink} href='https://www.solidjs.com/' translate='no'>SolidJS</ExternalLink>+<ExternalLink component={TextLink} href='https://vike.dev/' translate='no'>Vike</ExternalLink> and hosted on Cloudflare Pages. Its visual design is inspired by <ExternalLink component={TextLink} href='https://maxleiter.com/'>Max Leiter’s website</ExternalLink>.
						</p>
						<p>
							You can view the source <ExternalLink component={TextLink} href='https://github.com/ebrahim37/blog'>here</ExternalLink>.
						</p>
					</div>
				</section>
			</div>
		</>
	);
}
