import fs from 'node:fs';
import path from 'node:path';

function checkFile(relPath) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    return { exists: false };
  }
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');

  // Find imports from sanity client
  const hasSanity = content.includes('/sanity/client');
  const sanityCalls = [...content.matchAll(/get[A-Z][a-zA-Z0-9]+/g)].map(m => m[0]);

  // Look for hardcoded headings: <h1>, <h2>, <h3>, <h4>, <p>, <span> with literal text
  const hardcodedElements = [];
  const tagRegex = /<(h[1-6]|p|span|a|button|label|div)(?:\s+[^>]*)?>([^<{]+)<\/\1>/gi;
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const text = match[2].trim();
    // Ignore whitespace, numbers, symbols, single words like &times;, &rarr;
    if (text.length > 3 && !/^(&[a-z]+;|[0-9]+|\/|\+|\*|-)$/.test(text) && !text.startsWith('{') && !text.endsWith('}')) {
      hardcodedElements.push({ tag: match[1], text });
    }
  }

  return {
    exists: true,
    hasSanity,
    sanityCalls: [...new Set(sanityCalls)],
    hardcodedElements,
    lineCount: lines.length
  };
}

const auditTargets = [
  { name: 'Home', files: ['src/pages/index.astro', 'src/components/hero/HeroHome.astro', 'src/components/services/ProcessSteps.astro'] },
  { name: 'About Us', files: ['src/pages/about-us.astro'] },
  { name: 'Services Index', files: ['src/pages/services/index.astro'] },
  { name: 'Division - IT Lifecycle', files: ['src/pages/services/it-lifecycle.astro', 'src/pages/it-lifecycle-services-destruction.astro'] },
  { name: 'Division - Information Mgmt', files: ['src/pages/services/information-management.astro', 'src/pages/information-management.astro'] },
  { name: 'Division - Secure Shredding', files: ['src/pages/services/secure-destruction.astro', 'src/pages/secure-shredding-document-integrity.astro'] },
  { name: 'Division - Moving & Relocation', files: ['src/pages/services/relocation.astro', 'src/pages/moving-relocation-services.astro'] },
  { name: 'Service Detail [slug]', files: ['src/pages/services/[slug].astro'] },
  { name: 'Sectors Index', files: ['src/pages/sectors/index.astro'] },
  { name: 'Sector Detail [slug]', files: ['src/pages/sectors/[slug].astro'] },
  { name: 'Sector Static Pages', files: ['src/pages/sectors/defence.astro', 'src/pages/sectors/nhs.astro', 'src/pages/sectors/finance.astro', 'src/pages/sectors/it-technology.astro', 'src/pages/sectors/central-government.astro', 'src/pages/sectors/education-universities.astro', 'src/pages/sectors/legal-professional-services.astro', 'src/pages/sectors/manufacturing-engineering.astro'] },
  { name: 'Insights Index', files: ['src/pages/insights/index.astro', 'src/pages/insights.astro'] },
  { name: 'Articles', files: ['src/pages/insights/[slug].astro', 'src/pages/articles/[slug].astro'] },
  { name: 'Case Studies', files: ['src/pages/case-studies/index.astro', 'src/pages/case-studies/[slug].astro'] },
  { name: 'FAQ', files: ['src/pages/faq.astro'] },
  { name: 'Investors', files: ['src/pages/investors.astro'] },
  { name: 'Sustainability', files: ['src/pages/sustainability.astro'] },
  { name: 'Contact', files: ['src/pages/contact.astro'] },
  { name: 'Request a Collection', files: ['src/pages/request-a-collection.astro'] },
  { name: 'Request a Quote', files: ['src/pages/request-a-quote.astro', 'src/components/forms/QuoteForm.astro'] },
  { name: 'Legal - Privacy Policy', files: ['src/pages/privacy-policy.astro'] },
  { name: 'Legal - Terms', files: ['src/pages/terms-and-conditions.astro'] },
  { name: 'Legal - Cookie Policy', files: ['src/pages/cookie-policy.astro'] },
  { name: 'Legal - Environmental Policy', files: ['src/pages/environmental-policy.astro'] },
  { name: 'Legal - InfoSec Policy', files: ['src/pages/information-security-policy.astro'] },
  { name: 'Legal - Modern Slavery', files: ['src/pages/modern-slavery-statement.astro'] },
  { name: 'Legal - Accessibility', files: ['src/pages/accessibility.astro'] },
  { name: '404 Page', files: ['src/pages/404.astro'] },
  { name: 'Navbar', files: ['src/components/global/Header.astro', 'src/components/global/HeroHeader.astro'] },
  { name: 'Services Mega Menu', files: ['src/components/global/ServicesMegaMenu.astro'] },
  { name: 'Sectors Dropdown', files: ['src/components/global/SectorsDropdown.astro'] },
  { name: 'Footer', files: ['src/components/global/Footer.astro'] },
];

console.log('=== AUDITING ASTRO FILES FOR HARDCODED TEXT & SANITY INTEGRATION ===\n');

for (const target of auditTargets) {
  console.log(`\n======================================================`);
  console.log(`TARGET: ${target.name}`);
  console.log(`======================================================`);
  for (const f of target.files) {
    const res = checkFile(f);
    if (!res.exists) {
      console.log(`  File: ${f} -> (NOT FOUND)`);
      continue;
    }
    console.log(`  File: ${f} (${res.lineCount} lines)`);
    console.log(`    Sanity connected: ${res.hasSanity} [${res.sanityCalls.join(', ')}]`);
    console.log(`    Hardcoded element count: ${res.hardcodedElements.length}`);
    if (res.hardcodedElements.length > 0) {
      console.log(`    Sample hardcoded elements:`);
      for (const el of res.hardcodedElements.slice(0, 8)) {
        console.log(`      <${el.tag}> ${el.text.slice(0, 70)}`);
      }
      if (res.hardcodedElements.length > 8) {
        console.log(`      ... and ${res.hardcodedElements.length - 8} more`);
      }
    }
  }
}
