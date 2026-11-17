/**
 * Site-wide settings. Edit this file to make the blog yours.
 */
export const SITE = {
	/** Public URL of the deployed site (no trailing slash). Used for canonical URLs, RSS and sitemap. */
	url: 'https://example.com',
	title: 'My Blog',
	description: 'Notes on software, infrastructure, and whatever else I am learning.',
	author: '2026316010012-朱富成',
	/** Used for <html lang> and date formatting. */
	lang: 'en',
	locale: 'en-US',
	/** Posts per page on /blog/. */
	postsPerPage: 8,
	/** Number of recent posts shown on the home page. */
	homeRecentPosts: 5,
};

export const NAV_LINKS = [
	{ href: '/blog/', label: 'Blog' },
	{ href: '/tags/', label: 'Tags' },
	{ href: '/archive/', label: 'Archive' },
	{ href: '/about/', label: 'About' },
];

/**
 * Shown on the home page, About page and footer. Remove entries you don't use.
 * icon: github | mail | rss | link (see src/components/Icon.astro)
 */
export const SOCIAL_LINKS: { href: string; label: string; icon: 'github' | 'mail' | 'rss' | 'link' }[] = [
	// Example: { href: 'https://github.com/your-username', label: 'GitHub', icon: 'github' },
];
