// Packs the built site in dist/ into release/blog-dist-<timestamp>.tar.gz for upload to the server.
// Usage: npm run package   (runs `astro check` and `astro build` first)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
if (!existsSync(join(dist, 'index.html'))) {
	console.error('dist/index.html not found — run `npm run build` first.');
	process.exit(1);
}

const d = new Date();
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
const outDir = 'release';
const file = join(outDir, `blog-dist-${stamp}.tar.gz`);
mkdirSync(outDir, { recursive: true });

// -C dist . => archive contains the *contents* of dist (index.html at the top level).
execFileSync('tar', ['-czf', file, '-C', dist, '.'], { stdio: 'inherit' });

const kb = (statSync(file).size / 1024).toFixed(1);
console.log(`\n✔ Packaged ${file} (${kb} KB)`);
console.log('  Upload it and extract into your Nginx web root, e.g.:');
console.log(`    scp ${file} user@server:/tmp/`);
console.log(`    ssh user@server 'sudo tar -xzf /tmp/${file.split('/').pop()} -C /var/www/blog'`);
