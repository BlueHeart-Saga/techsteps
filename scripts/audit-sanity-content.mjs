import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function main() {
  console.log('=== SANITY DOCUMENT AUDIT ===');
  
  // 1. Home page
  const homePages = await client.fetch('*[_type == "homePage"]');
  console.log(`\n1. homePage (${homePages.length} found):`);
  for (const hp of homePages) {
    console.log(`  _id: ${hp._id}, has hero: ${Boolean(hp.hero)}, hero.heading: "${hp.hero?.heading || ''}", has intro: ${Boolean(hp.intro)}, services: ${hp.services?.cards?.length || 0}`);
  }

  // 2. About page
  const aboutPages = await client.fetch('*[_type == "aboutPage"]');
  console.log(`\n2. aboutPage (${aboutPages.length} found):`);
  for (const ap of aboutPages) {
    console.log(`  _id: ${ap._id}, heroHeadline: "${ap.heroHeadline || ap.hero?.headline || ''}", whoWeAre: "${ap.whoWeAreHeadline || ap.whoWeAre?.headline || ''}"`);
    console.log(`  keys:`, Object.keys(ap).filter(k => !k.startsWith('_')).join(', '));
  }

  // 3. Site settings
  const settings = await client.fetch('*[_type == "siteSettings"]');
  console.log(`\n3. siteSettings (${settings.length} found):`);
  for (const s of settings) {
    console.log(`  _id: ${s._id}, company: "${s.companyName}", mainNav: ${s.mainNav?.length}, footerServices: ${s.footerServices?.length}, footerLegal: ${s.footerLegal?.length}`);
  }

  // 4. Divisions
  const divs = await client.fetch('*[_type == "division"] | order(order asc)');
  console.log(`\n4. divisions (${divs.length} found):`);
  for (const d of divs) {
    console.log(`  _id: ${d._id}, title: "${d.title}", slug: "${d.slug?.current || d.slug}", headline: "${d.headline || ''}"`);
  }

  // 5. Services
  const srvs = await client.fetch('*[_type == "service"] | order(title asc)');
  console.log(`\n5. services (${srvs.length} found):`);
  const missingProcess = srvs.filter(s => !s.process || s.process.length === 0);
  const missingProblem = srvs.filter(s => !s.customerProblem);
  console.log(`  Total: ${srvs.length}, missing process: ${missingProcess.length}, missing problem: ${missingProblem.length}`);
  if (srvs.length > 0) {
    console.log(`  Sample service [${srvs[0].title}]: benefits=${srvs[0].keyBenefits?.length}, process=${srvs[0].process?.length}, faqs=${srvs[0].faqs?.length}`);
  }

  // 6. Sectors
  const secs = await client.fetch('*[_type == "sector"] | order(title asc)');
  console.log(`\n6. sectors (${secs.length} found):`);
  for (const sc of secs) {
    console.log(`  _id: ${sc._id}, title: "${sc.title}", slug: "${sc.slug?.current || sc.slug}", challenges: ${sc.challenges?.length || 0}`);
  }

  // 7. Others
  const faq = await client.fetch('*[_type == "faqPage"][0]');
  console.log(`\n7. faqPage: items=${faq?.items?.length || 0}, categories=${faq?.categories?.length || 0}`);

  const sust = await client.fetch('*[_type == "sustainabilityPage"][0]');
  console.log(`\n8. sustainabilityPage: metrics=${sust?.metrics?.length || 0}, approachSteps=${sust?.approach?.steps?.length || 0}`);

  const inv = await client.fetch('*[_type == "investorsPage"][0]');
  console.log(`\n9. investorsPage: stats=${inv?.stats?.length || 0}, strategicPillars=${inv?.strategicPillars?.length || 0}`);

  const contact = await client.fetch('*[_type == "contactPage"][0]');
  console.log(`\n10. contactPage: directLines=${contact?.directLines?.length || 0}`);

  const reqCol = await client.fetch('*[_type == "requestCollectionPage"][0]');
  console.log(`\n11. requestCollectionPage: slaGuarantees=${reqCol?.slaGuarantees?.length || 0}`);

  const testimonials = await client.fetch('*[_type == "testimonial"]');
  console.log(`\n12. testimonials: count=${testimonials.length}`);

  const articles = await client.fetch('*[_type == "article"]');
  console.log(`\n13. articles: count=${articles.length}`);

  const caseStudies = await client.fetch('*[_type == "caseStudy"]');
  console.log(`\n14. caseStudies: count=${caseStudies.length}`);

  const stats = await client.fetch('*[_type == "stat"]');
  console.log(`\n15. stats: count=${stats.length}`);
}

main().catch(console.error);
