import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles('dist');
console.log(`Auditing ${htmlFiles.length} HTML files in dist/ for broken links...`);

// Build a Set of all valid paths in dist
const validRoutes = new Set();
for (const file of htmlFiles) {
  let rel = '/' + path.relative('dist', file).replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (rel === '' || rel === '/index') rel = '/';
  validRoutes.add(rel);
  // Also add with trailing slash or without
  validRoutes.add(rel === '/' ? '/' : rel.replace(/\/$/, ''));
}

// Add static assets (xml, txt, etc.)
validRoutes.add('/sitemap.xml');
validRoutes.add('/sitemap-index.xml');
validRoutes.add('/sitemap-0.xml');
validRoutes.add('/robots.txt');

const brokenLinks = new Map(); // targetUrl -> Set of source pages

for (const file of htmlFiles) {
  const sourceRoute = '/' + path.relative('dist', file).replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/\.html$/, '');
  const content = fs.readFileSync(file, 'utf8');

  // Match all href attributes
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const match of hrefMatches) {
    let href = match[1].trim();

    // Skip javascript:, mailto:, tel:, #, external links, data:, template expressions
    if (
      !href ||
      href.startsWith('javascript:') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:') ||
      href.startsWith('#') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.includes('${')
    ) {
      continue;
    }


    // Clean up anchor and query params
    let cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref === '') cleanHref = '/';
    // Ensure leading slash
    if (!cleanHref.startsWith('/')) {
      cleanHref = '/' + cleanHref;
    }
    // Remove trailing slash for matching unless root
    const normalized = cleanHref === '/' ? '/' : cleanHref.replace(/\/$/, '');

    // Check if it's an asset in public or dist (images, icons, css, js)
    const assetPath = path.join('dist', normalized.slice(1));
    if (fs.existsSync(assetPath)) {
      continue;
    }

    // Check if route exists in validRoutes
    if (!validRoutes.has(normalized)) {
      if (!brokenLinks.has(normalized)) {
        brokenLinks.set(normalized, new Set());
      }
      brokenLinks.get(normalized).add(sourceRoute || '/');
    }
  }
}

console.log(`\n==================================================`);
console.log(`BROKEN LINKS AUDIT RESULTS`);
console.log(`Total unique broken link targets found: ${brokenLinks.size}`);
console.log(`==================================================\n`);

if (brokenLinks.size === 0) {
  console.log('✅ ZERO 404 LINKS FOUND ACROSS ENTIRE BUILT SITE!');
} else {
  for (const [target, sources] of brokenLinks.entries()) {
    console.log(`❌ 404 Link: "${target}"`);
    console.log(`   Found in ${sources.size} pages:`);
    const sourceList = Array.from(sources).slice(0, 5);
    for (const src of sourceList) {
      console.log(`     - ${src}`);
    }
    if (sources.size > 5) {
      console.log(`     ... and ${sources.size - 5} more pages`);
    }
  }
}
