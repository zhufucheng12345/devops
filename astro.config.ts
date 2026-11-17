import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { SITE } from './src/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
	site: SITE.url,
	// Every page is emitted as <route>/index.html, which Nginx serves with `try_files $uri $uri/`.
	build: { format: 'directory' },
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/search/'),
		}),
	],
	markdown: {
		shikiConfig: {
			// Dual themes: light by default, dark colors exposed as CSS variables (see global.css).
			themes: { light: 'github-light', dark: 'github-dark' },
		},
	},
});
