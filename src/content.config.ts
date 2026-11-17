import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	// Every .md / .mdx file in src/content/posts becomes a post. The file name is the URL slug.
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			/** Drafts are visible in `npm run dev` but excluded from production builds. */
			draft: z.boolean().default(false),
			/** Optional cover image, relative to the post file, e.g. ../../assets/covers/foo.png */
			cover: image().optional(),
			coverAlt: z.string().default(''),
		}),
});

export const collections = { posts };
