import fs from 'fs';
import path from 'path';

const pages = fs.readdirSync('src/pages', { recursive: true })
  .filter(f => f.endsWith('.astro'))
  .map(f => f.replace(/\\/g, '/'));

console.log(`Auditing ${pages.length} pages in src/pages:`);
for (const p of pages) {
  const content = fs.readFileSync(path.join('src/pages', p), 'utf8');
  const frontmatter = content.split('---')[1] || '';
  const sanityImports = (frontmatter.match(/from ['"][^'"]*sanity[^'"]*['"]/g) || []).join(', ');
  const hasSanity = sanityImports.length > 0;
  console.log(`${p}: ${hasSanity ? 'HAS SANITY: ' + sanityImports : 'NO SANITY IMPORT'}`);
}
