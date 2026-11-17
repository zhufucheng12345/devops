import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export interface TagInfo {
	name: string;
	slug: string;
	count: number;
}

/** All published posts, newest first. Drafts are included only in dev mode. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postUrl(post: Post): string {
	return `/posts/${post.id}/`;
}

/** URL-safe tag slug. Keeps Unicode letters (e.g. Chinese) so non-English tags work. */
export function tagSlug(tag: string): string {
	return (
		tag
			.trim()
			.toLowerCase()
			.replace(/[^\p{L}\p{N}]+/gu, '-')
			.replace(/^-+|-+$/g, '') || 'tag'
	);
}

export function tagUrl(tag: string): string {
	return `/tags/${tagSlug(tag)}/`;
}

/** Unique tags across posts, sorted by post count then name. */
export function getTags(posts: Post[]): TagInfo[] {
	const map = new Map<string, TagInfo>();
	for (const post of posts) {
		for (const name of new Set(post.data.tags)) {
			const slug = tagSlug(name);
			const entry = map.get(slug) ?? { name, slug, count: 0 };
			entry.count += 1;
			map.set(slug, entry);
		}
	}
	return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Rough plain-text version of a Markdown body, for reading time and search. */
export function stripMarkdown(md = ''): string {
	return md
		.replace(/^---[\s\S]*?---/, '') // stray frontmatter
		.replace(/```[\s\S]*?```/g, ' ') // fenced code
		.replace(/<[^>]+>/g, ' ') // html / mdx tags
		.replace(/^\s*(import|export)\s.*$/gm, ' ') // mdx imports
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
		.replace(/[`*_~>#|-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힯]/g;

/** Estimated reading time in minutes. Handles both English words and CJK characters. */
export function readingTime(md = ''): number {
	const code = (md.match(/```[\s\S]*?```/g) ?? []).join(' ');
	const text = stripMarkdown(md);
	const cjkChars = (text.match(CJK) ?? []).length;
	const words = text.replace(CJK, ' ').split(/\s+/).filter(Boolean).length;
	const codeLines = code.split('\n').length - 1;
	return Math.max(1, Math.round(words / 230 + cjkChars / 400 + codeLines / 60));
}
