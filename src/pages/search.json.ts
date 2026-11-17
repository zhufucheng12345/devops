import type { APIRoute } from 'astro';
import { getPosts, postUrl, stripMarkdown } from '../utils/posts';

/** Static search index consumed by /search/. Regenerated on every build. */
export const GET: APIRoute = async () => {
	const posts = await getPosts();
	const index = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		tags: post.data.tags,
		date: post.data.pubDate.toISOString(),
		url: postUrl(post),
		content: stripMarkdown(post.body).slice(0, 8000),
	}));
	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
