import fs from 'node:fs';
import path from 'node:path';

// Helper to extract text nodes from an astro file
function extractAstroText(content) {
  // strip frontmatter
  const body = content.replace(/^---[\s\S]*?---/, '');
  // strip comments
  const noComments = body.replace(/<!--[\s\S]*?-->/g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  
  // match HTML tags with text content
  const matches = [];
  const tagRegex = /<([a-zA-Z0-9]+)(?:\s+[^>]*)?>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = tagRegex.exec(noComments)) !== null) {
    const inner = m[2].trim();
    if (!inner.includes('<') && inner.length > 2) {
      matches.push(inner);
    }
  }
  return matches;
}

const auditTargets = [
  { page: 'Home', files: ['src/pages/index.astro', 'src/components/hero/HeroHome.astro', 'src/components/services/ProcessSteps.astro'], docType: 'homePage' },
  { page: 'About Us', files: ['src/pages/about-us.astro'], docType: 'aboutPage' },
  { page: 'Services Index', files: ['src/pages/services/index.astro'], docType: 'division' },
  { page: 'All 4 Division Pages', files: ['src/pages/services/it-lifecycle.astro', 'src/pages/services/information-management.astro', 'src/pages/services/secure-destruction.astro', 'src/pages/services/relocation.astro'], docType: 'division' },
  { page: 'All 27 Service Pages', files: ['src/pages/services/[slug].astro'], docType: 'service' },
  { page: 'Sectors Index', files: ['src/pages/sectors/index.astro'], docType: 'sector' },
  { page: 'All 8 Sector Pages', files: ['src/pages/sectors/[slug].astro'], docType: 'sector' },
  { page: 'Insights Index', files: ['src/pages/insights/index.astro'], docType: 'externalApi' },
  { page: 'All Articles', files: ['src/pages/insights/[slug].astro'], docType: 'article' },
  { page: 'Case Studies', files: ['src/pages/case-studies/index.astro', 'src/pages/case-studies/[slug].astro'], docType: 'caseStudy' },
  { page: 'Testimonials', files: ['src/components/content/Testimonials.astro'], docType: 'testimonial' },
  { page: 'FAQ', files: ['src/pages/faq.astro'], docType: 'faqPage' },
  { page: 'Investors', files: ['src/pages/investors.astro'], docType: 'investorsPage' },
  { page: 'Sustainability', files: ['src/pages/sustainability.astro'], docType: 'sustainabilityPage' },
  { page: 'Contact', files: ['src/pages/contact.astro'], docType: 'contactPage' },
  { page: 'Request a Collection', files: ['src/pages/request-a-collection.astro'], docType: 'requestCollectionPage' },
  { page: 'Request a Quote', files: ['src/pages/request-a-quote.astro', 'src/components/forms/QuoteForm.astro'], docType: 'requestCollectionPage' },
  { page: 'Privacy Policy', files: ['src/pages/privacy-policy.astro'], docType: 'legal' },
  { page: 'Terms & Conditions', files: ['src/pages/terms-and-conditions.astro'], docType: 'legal' },
  { page: 'Cookie Policy', files: ['src/pages/cookie-policy.astro'], docType: 'legal' },
  { page: 'Environmental Policy', files: ['src/pages/environmental-policy.astro'], docType: 'legal' },
  { page: 'Information Security Policy', files: ['src/pages/information-security-policy.astro'], docType: 'legal' },
  { page: 'Modern Slavery Statement', files: ['src/pages/modern-slavery-statement.astro'], docType: 'legal' },
  { page: 'Accessibility', files: ['src/pages/accessibility.astro'], docType: 'legal' },
  { page: '404 Page', files: ['src/pages/404.astro'], docType: 'ui' },
  { page: 'Navbar', files: ['src/components/global/Header.astro', 'src/components/global/HeroHeader.astro'], docType: 'siteSettings' },
  { page: 'Services Mega Menu', files: ['src/components/global/ServicesMegaMenu.astro'], docType: 'ui' },
  { page: 'Sectors Dropdown', files: ['src/components/global/SectorsDropdown.astro'], docType: 'ui' },
  { page: 'Footer', files: ['src/components/global/Footer.astro'], docType: 'siteSettings' },
];

for (const t of auditTargets) {
  let totalTextNodes = 0;
  let dynamicExpressions = 0;
  let hardcodedTextNodes = 0;

  for (const f of t.files) {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf-8');
      const textNodes = extractAstroText(content);
      totalTextNodes += textNodes.length;

      for (const node of textNodes) {
        if (node.includes('{') && node.includes('}')) {
          dynamicExpressions++;
        } else {
          hardcodedTextNodes++;
        }
      }
    }
  }

  console.log(`${t.page} -> Total: ${totalTextNodes}, Dynamic: ${dynamicExpressions}, Hardcoded: ${hardcodedTextNodes}`);
}
