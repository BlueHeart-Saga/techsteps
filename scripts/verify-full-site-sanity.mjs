import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  console.log('=== VERIFYING SANITY DOCUMENTS ===');
  
  // 1. Home and About
  const home = await client.fetch('*[_type == "homePage"][0]');
  console.log('HomePage exists:', !!home, '| Hero Heading:', home?.hero?.heading, '| MetaTitle:', home?.metaTitle);
  
  const about = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('AboutPage exists:', !!about, '| Hero Heading:', about?.hero?.heading);

  // 2. Divisions
  const divisions = await client.fetch('*[_type == "division"]{_id, title, slug, heroTitle, aboutTitle, "stagesCount": count(lifecycleStages), "faqsCount": count(faqs)}');
  console.log(`\nDivisions count: ${divisions.length}`);
  divisions.forEach(d => {
    console.log(` - [${d.slug.current}] ${d.title}: heroTitle="${d.heroTitle?.slice(0,30)}...", stages=${d.stagesCount}, faqs=${d.faqsCount}`);
  });

  // 3. Services
  const services = await client.fetch('*[_type == "service"]{_id, title, slug, "hasWhyPoints": count(whyPoints) > 0, "hasProcessSteps": count(processSteps) > 0, "hasFaqs": count(faqs) > 0}');
  console.log(`\nServices count: ${services.length}`);
  const sampleSrv = services[0];
  console.log(` Sample service: ${sampleSrv.title} (slug: ${sampleSrv.slug.current}) - whyPoints: ${sampleSrv.hasWhyPoints}, process: ${sampleSrv.hasProcessSteps}, faqs: ${sampleSrv.hasFaqs}`);

  // 4. Investors
  const investors = await client.fetch('*[_type == "investorsPage"][0]{title, "bizCount": count(businesses), "esgCount": count(esgPillars)}');
  console.log(`\nInvestorsPage: businesses=${investors?.bizCount}, esgPillars=${investors?.esgCount}`);

  // 5. Sustainability
  const sustainability = await client.fetch('*[_type == "sustainabilityPage"][0]{title, "stepsCount": count(approach.steps)}');
  console.log(`\nSustainabilityPage: approach.steps count=${sustainability?.stepsCount}`);

  // 6. Legal Pages
  const legalPages = await client.fetch('*[_type == "legalPage"]{slug, title, "sectionsCount": count(sections)}');
  console.log(`\nLegalPages count: ${legalPages.length}`);
  legalPages.forEach(lp => {
    console.log(` - [${lp.slug.current}] ${lp.title}: ${lp.sectionsCount} sections`);
  });

  // 7. Test Live Dev Server rendering
  console.log('\n=== TESTING ASTRO DEV SERVER RENDERING (http://localhost:3000) ===');
  const urlsToTest = [
    { url: 'http://localhost:3000/sustainability', check: 'Zero-Landfill Guarantee', desc: 'Sustainability circular steps' },
    { url: 'http://localhost:3000/investors', check: 'Environmental Stewardship', desc: 'Investors ESG pillar' },
    { url: 'http://localhost:3000/privacy-policy', check: 'Categories of Information We Collect', desc: 'Privacy Policy Sanity section' },
    { url: 'http://localhost:3000/terms-and-conditions', check: 'Scope & Application of Terms', desc: 'Terms & Conditions Sanity section' },
    { url: 'http://localhost:3000/it-lifecycle-services-destruction', check: 'Sustainable, Secure IT Asset Management', desc: 'IT Lifecycle division page' },
    { url: 'http://localhost:3000/services/it-lifecycle', check: 'Sustainable, Secure IT Asset Management', desc: 'IT Lifecycle services route' },
    { url: `http://localhost:3000/services/${sampleSrv.slug.current}`, check: sampleSrv.title, desc: 'Service detail page' },
    { url: 'http://localhost:3000/information-management', check: 'Information Management Built Around Your Business', desc: 'Information Management division' },
    { url: 'http://localhost:3000/secure-shredding-document-integrity', check: 'Certified Data Destruction Built for Total Peace of Mind', desc: 'Secure Shredding division' },
    { url: 'http://localhost:3000/moving-relocation-services', check: 'Precision Relocation Engineered for Critical Infrastructure', desc: 'Moving & Relocation division' },
  ];

  for (const item of urlsToTest) {
    try {
      const res = await fetch(item.url);
      const text = await res.text();
      const passed = text.includes(item.check);
      console.log(` ${passed ? '✓' : '✗'} [${res.status}] ${item.desc} (${item.url}) - Matched text: "${item.check.slice(0, 30)}..."? ${passed}`);
    } catch (err) {
      console.error(` ✗ Failed to fetch ${item.url}:`, err.message);
    }
  }

  console.log('\n=== VERIFICATION COMPLETE ===');
}

main().catch(console.error);
