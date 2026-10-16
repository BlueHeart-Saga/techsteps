import fs from 'fs';
import path from 'path';

// Let's inspect components and pages
const scanDirs = ['src/pages', 'src/components'];
const results = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = filePath.replace(/\\/g, '/');

  // Split frontmatter and template
  const parts = content.split('---');
  const frontmatter = parts.length > 2 ? parts[1] : '';
  const template = parts.length > 2 ? parts.slice(2).join('---') : content;

  // Find static headings
  const headingMatches = [];
  const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = hRegex.exec(template)) !== null) {
    const tag = match[1];
    const inner = match[2].trim();
    // check if it's completely static (doesn't contain { )
    if (!inner.includes('{') && inner.length > 0 && !inner.startsWith('<!--')) {
      headingMatches.push({ tag, text: inner.replace(/\s+/g, ' ') });
    }
  }

  // Find static paragraphs
  const pMatches = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = pRegex.exec(template)) !== null) {
    const inner = match[1].trim();
    if (!inner.includes('{') && inner.length > 5 && !inner.startsWith('<!--')) {
      pMatches.push({ text: inner.replace(/\s+/g, ' ') });
    }
  }

  // Find static buttons / links with direct text
  const btnMatches = [];
  const btnRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  while ((match = btnRegex.exec(template)) !== null) {
    const href = match[1];
    const inner = match[2].trim();
    if (!inner.includes('{') && !inner.includes('<img') && !inner.includes('<svg') && inner.length > 1 && !inner.startsWith('<!--')) {
      btnMatches.push({ href, text: inner.replace(/\s+/g, ' ') });
    }
  }

  // Find static hardcoded arrays in frontmatter
  const hardcodedArrayMatches = [];
  const arrayRegex = /const\s+([A-Za-z0-9_]+)\s*(?::\s*[^=]+)?\s*=\s*\[\s*\{([\s\S]*?)\}\s*\]/g;
  while ((match = arrayRegex.exec(frontmatter)) !== null) {
    const varName = match[1];
    const body = match[2];
    if (body.includes('title:') || body.includes('heading:') || body.includes('name:') || body.includes('text:') || body.includes('description:')) {
      hardcodedArrayMatches.push(varName);
    }
  }

  if (headingMatches.length > 0 || pMatches.length > 0 || btnMatches.length > 0 || hardcodedArrayMatches.length > 0) {
    results.push({
      file: relPath,
      headings: headingMatches,
      paragraphs: pMatches,
      buttons: btnMatches,
      hardcodedArrays: hardcodedArrayMatches
    });
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.astro')) {
      scanFile(full);
    }
  }
}

scanDirs.forEach(walkDir);

console.log(`Found ${results.length} files with static template strings or hardcoded arrays:`);
fs.writeFileSync('scripts/deep-content-audit-results.json', JSON.stringify(results, null, 2));

results.forEach(r => {
  console.log(`\n=== ${r.file} ===`);
  if (r.hardcodedArrays.length) console.log(`  Hardcoded arrays: ${r.hardcodedArrays.join(', ')}`);
  if (r.headings.length) console.log(`  Static headings (${r.headings.length}):`, r.headings.map(h => `<${h.tag}> "${h.text}"`).slice(0, 5));
  if (r.paragraphs.length) console.log(`  Static paragraphs (${r.paragraphs.length}):`, r.paragraphs.map(p => `"${p.text.slice(0, 50)}..."`).slice(0, 3));
  if (r.buttons.length) console.log(`  Static buttons (${r.buttons.length}):`, r.buttons.map(b => `[${b.text}] -> ${b.href}`).slice(0, 4));
});
