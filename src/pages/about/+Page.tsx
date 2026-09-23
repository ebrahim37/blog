import { For } from 'solid-js';
import { useConfig } from 'vike-solid/useConfig';

import { ExternalLinkIcon } from '~/components/Icons.tsx';

const RESUME_LINK = 'https://drive.google.com/file/d/1ZqPFToCU4kQDG6dCo4Z0z7QGLY_1xBYG/view';

const EXPERIENCE = [
	{
		title: 'Coding Data Annotator @ DataAnnotation',
		period: '03/2024 - present',
		description: 'Evaluate, compare, and improve code-focused LLM output across languages, frameworks, databases, and developer tooling. The work ranges from checking correctness to rewriting answers into complete, production-quality solutions.',
		href: 'https://www.dataannotation.tech/',
	},
	{
		title: 'Undergraduate Research Assistant @ Queen’s University',
		period: '05/2025 - 08/2025',
		description: 'Worked under Professor Juergen Dingel in the MASE Lab, building a Python MCP server for TELUS’s corporate GitLab. It exposed repository tools with pagination, rate-limit handling, caching, structured logging, and onboarding documentation.',
		href: 'https://labs.cs.queensu.ca/mase/',
	},
	{
		title: 'Full-stack Developer Intern @ Myadcenter Inc.',
		period: '08/2021 - 01/2022',
		description: 'Worked in a small Scrum team migrating a legacy PHP application to a Next.js, Express, and Redux stack. Daily stand-ups coordinated the rewrite across roughly five developers and a team lead.',
		href: 'https://www.crunchbase.com/organization/myadcenter',
	},
];

export function Page() {
	useConfig()({
		title: 'About | Ebrahim Haghshenas',
		description: 'About Ebrahim Haghshenas.',
	});

	return (
		<>
			<h1 class='page-heading'>about/</h1>
			<div class='about-content'>
				<section>
					<h2 class='content-heading'>Ebrahim Haghshenas</h2>
					<p class='mb-4'>
						I’m a new grad software engineer interested in full-stack systems, Linux infrastructure, developer tooling, and building software that stays understandable.
					</p>
					<div class='flex flex-wrap gap-4'>
						<a class='text-link' href={RESUME_LINK} target='_blank' rel='noreferrer'>resume<span class='sr-only'>, opens in a new tab</span></a>
						<a class='text-link' href='mailto:sayhi@ebra.dev'>email</a>
					</div>
				</section>

				<section aria-labelledby='experience-heading'>
					<h2 id='experience-heading' class='content-heading'>Experience</h2>
					<ul class='card-list experience-list'>
						<For each={EXPERIENCE}>{position =>
							<li>
								<a class='list-card' href={position.href} target='_blank' rel='noreferrer'>
									<div class='flex items-start justify-between gap-3'>
										<div class='min-w-0 flex-1'>
											<h3 class='card-title'>{position.title}</h3>
											<p class='mt-1 text-xs text-(--gray) tabular-nums'>{position.period}</p>
											<p class='mt-2 text-sm text-(--gray)'>{position.description}</p>
										</div>
										<ExternalLinkIcon />
									</div>
								</a>
							</li>
						}</For>
					</ul>
				</section>

				<section>
					<h2 class='content-heading'>This site</h2>
					<p>
						This site is built with <a class='text-link' href='https://www.solidjs.com/' target='_blank' rel='noreferrer' translate='no'>SolidJS</a>, <a class='text-link' href='https://vike.dev/' target='_blank' rel='noreferrer' translate='no'>Vike</a>, and <a class='text-link' href='https://tailwindcss.com/' target='_blank' rel='noreferrer' translate='no'>Tailwind CSS</a>. It is generated as a static site and deployed with Cloudflare Pages. Its visual design is inspired by <a class='text-link' href='https://maxleiter.com/' target='_blank' rel='noreferrer'>Max Leiter’s website</a>. You can view the source <a class='text-link' href='https://github.com/ebrahim37/blog' target='_blank' rel='noreferrer'>here</a>.
					</p>
				</section>
			</div>
		</>
	);
}
