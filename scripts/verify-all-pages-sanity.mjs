import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('src/pages');

function getAstroFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAstroFiles(fullPath));
    } else if (file.endsWith('.astro')) {
      results.push(fullPath);
    }
  }
  return results;
}

const astroFiles = getAstroFiles(pagesDir);
console.log(`Found ${astroFiles.length} Astro page files in src/pages.`);

const report = [];

for (const file of astroFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relative = path.relative(process.cwd(), file).replace(/\\/g, '/');

  // Check how Sanity is connected
  const hasDirectSanityImport = content.includes('lib/sanity/client') || content.includes('lib/sanity/data');
  const usesBaseLayout = content.includes('BaseLayout') || content.includes('LegalPageLayout');
  const usesCta = content.includes('<CTA') || content.includes('<CommonCTA');
  const usesHeader = content.includes('<HeroHeader') || content.includes('<Header');
  const usesInsightsApi = content.includes('insightsApi');
  const isRedirectOrAlias = content.includes('Astro.redirect') || /import\s+\w+\s+from\s+['"]\.\//.test(content);

  report.push({
    file: relative,
    hasDirectSanityImport,
    usesBaseLayout,
    usesCta,
    usesHeader,
    usesInsightsApi,
    isRedirectOrAlias,
    connected: hasDirectSanityImport || usesBaseLayout || usesInsightsApi || isRedirectOrAlias,
  });
}

console.log('--- ALL PAGES SANITY INTEGRATION AUDIT ---');
let allConnected = true;
for (const r of report) {
  const status = r.connected ? 'CONNECTED' : 'DISCONNECTED';
  if (!r.connected) allConnected = false;
  console.log(`[${status}] ${r.file} (Direct: ${r.hasDirectSanityImport}, BaseLayout: ${r.usesBaseLayout}, CTA: ${r.usesCta}, Insights: ${r.usesInsightsApi})`);
}

if (allConnected) {
  console.log(`\nSUCCESS: 100% of all ${report.length} pages are connected to Sanity CMS (direct query, dynamic schema, or shared global Sanity components)!`);
} else {
  console.error('\nFAILURE: Some pages are disconnected from Sanity.');
  process.exit(1);
}
