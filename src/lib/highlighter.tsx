import type { CSSProperties } from 'react';
import { bundledLanguages, codeToTokens, type BundledLanguage } from 'shiki';

export const highlightCode = async (code: string, lang: string) => {
	if (!(lang in bundledLanguages))
		return null;

	const { tokens } = await codeToTokens(code, {
		lang: lang as BundledLanguage,
		themes: {
			light: 'vitesse-light',
			dark: 'vitesse-dark'
		},
		defaultColor: false
	});

	return tokens.map(line => line.map((token, i) => 
		<span key={i} style={token.htmlStyle as CSSProperties} className='text-(--shiki-light) dark:text-(--shiki-dark)'>
			{token.content}
		</span>
	));
};
