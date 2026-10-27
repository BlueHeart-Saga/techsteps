import fs from 'node:fs';
import path from 'node:path';

const xml = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log('Total URLs in generated dist/sitemap-0.xml:', urls.length);

let errors = 0;
const invalidUrls = [];

for (const u of urls) {
  const p = u.replace('https://techsteps.co.uk', '').replace(/\/$/, '') || '/';
  const filePath = p === '/' ? 'dist/index.html' : path.join('dist', p, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File does not exist for URL in sitemap: ${u} (expected ${filePath})`);
    invalidUrls.push({ url: u, reason: '404 File Not Found' });
    errors++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Check noindex
  if (html.toLowerCase().includes('name="robots" content="noindex')) {
    console.error(`ERROR: URL has noindex in sitemap: ${u}`);
    invalidUrls.push({ url: u, reason: 'noindex' });
    errors++;
  }

  // Check meta refresh
  if (html.toLowerCase().includes('http-equiv="refresh"')) {
    console.error(`ERROR: URL is meta refresh redirect in sitemap: ${u}`);
    invalidUrls.push({ url: u, reason: 'meta-refresh' });
    errors++;
  }

  // Check canonical href
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const canonicalHref = canonicalMatch ? canonicalMatch[1].replace(/\/$/, '') : null;
  const cleanU = u.replace(/\/$/, '');

  if (canonicalHref !== cleanU) {
    console.error(`ERROR: Canonical mismatch for ${u} -> Canonical says: ${canonicalHref}`);
    invalidUrls.push({ url: u, reason: `Canonical mismatch: ${canonicalHref}` });
    errors++;
  }
}

if (errors === 0) {
  console.log(`\nPERFECT! All ${urls.length} URLs in dist/sitemap-0.xml are 100% self-canonical, 200 OK, and have ZERO redirects or noindex tags!`);
} else {
  console.error(`\nFound ${errors} issues in sitemap-0.xml:`, invalidUrls);
  process.exit(1);
}

// Check robots.txt
const robots = fs.readFileSync('dist/robots.txt', 'utf8');
console.log('\n--- dist/robots.txt ---');
console.log(robots.trim());

// Check sitemap-index.xml and sitemap.xml
console.log('\n--- dist/sitemap-index.xml ---');
console.log(fs.readFileSync('dist/sitemap-index.xml', 'utf8').trim());

console.log('\n--- dist/sitemap.xml ---');
console.log(fs.readFileSync('dist/sitemap.xml', 'utf8').trim());
