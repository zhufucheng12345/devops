// Creates a new draft post: npm run new -- "My Post Title"
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
	console.error('Usage: npm run new -- "My Post Title"');
	process.exit(1);
}

const slug =
	title
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '') || `post-${Date.now()}`;
const file = join('src', 'content', 'posts', `${slug}.md`);

if (existsSync(file)) {
	console.error(`${file} already exists.`);
	process.exit(1);
}

// Local calendar date (toISOString() would give the UTC date, which can be off by one day).
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
writeFileSync(
	file,
	`---
title: ${JSON.stringify(title)}
description: ""
pubDate: ${today}
tags: []
draft: true
---

Write your post here.
`,
);
console.log(`✔ Created ${file} (draft: true — set it to false to publish)`);
