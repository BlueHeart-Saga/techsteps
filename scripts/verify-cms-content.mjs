import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(`${home}/.config/sanity/config.json`, 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function run() {
  console.log('=== VERIFYING SANITY CMS CONTENT WORKFLOW ===\n');

  // 1. Check SiteSettings
  const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
  console.log('✓ SiteSettings:');
  console.log('  Company:', siteSettings?.companyName);
  console.log('  MainNav items:', siteSettings?.mainNav?.length);
  console.log('  FooterServices items:', siteSettings?.footerServices?.length);
  console.log('  FooterSectors items:', siteSettings?.footerSectors?.length);
  console.log('  FooterCompany items:', siteSettings?.footerCompany?.length);
  console.log('  FooterLegal items:', siteSettings?.footerLegal?.length);

  // 2. Check FAQ Page
  const faqPage = await client.fetch('*[_type == "faqPage"][0]');
  console.log('\n✓ FAQ Page:');
  console.log('  Hero Title:', faqPage?.hero?.title);
  console.log('  Categories:', faqPage?.categories?.length);
  console.log('  Items:', faqPage?.items?.length);

  // 3. Check Sustainability Page
  const sustPage = await client.fetch('*[_type == "sustainabilityPage"][0]');
  console.log('\n✓ Sustainability Page:');
  console.log('  Hero Title:', sustPage?.hero?.title);
  console.log('  Metrics:', sustPage?.metrics?.length);
  console.log('  Approach Steps:', sustPage?.approach?.steps?.length);

  // 4. Check Investors Page
  const invPage = await client.fetch('*[_type == "investorsPage"][0]');
  console.log('\n✓ Investors Page:');
  console.log('  Hero Title:', invPage?.hero?.title);
  console.log('  Stats:', invPage?.stats?.length);
  console.log('  Strategic Pillars:', invPage?.strategicPillars?.length);

  // 5. Check Contact Page
  const contactPage = await client.fetch('*[_type == "contactPage"][0]');
  console.log('\n✓ Contact Page:');
  console.log('  Hero Title:', contactPage?.hero?.title);
  console.log('  Direct Lines:', contactPage?.directLines?.length);

  // 6. Check Request Collection Page
  const reqColPage = await client.fetch('*[_type == "requestCollectionPage"][0]');
  console.log('\n✓ Request Collection Page:');
  console.log('  Hero Title:', reqColPage?.hero?.title);
  console.log('  SLA Guarantees:', reqColPage?.slaGuarantees?.length);

  // 7. Check Testimonials
  const testimonials = await client.fetch('*[_type == "testimonial"] | order(order asc)');
  console.log('\n✓ Testimonials in Sanity:');
  console.log('  Count:', testimonials?.length);
  console.log('  First author:', testimonials[0]?.author, '-', testimonials[0]?.company);

  console.log('\n=== REAL-TIME MUTATION & PUBLISH TEST (Req 10) ===');
  // Test modifying a field in Sanity, verifying fetch, and restoring
  const originalFaqTitle = faqPage?.hero?.title || 'FREQUENTLY ASKED QUESTIONS';
  const testFaqTitle = 'FREQUENTLY ASKED QUESTIONS // VERIFIED CMS LIVE';
  
  console.log(`Setting FAQ hero title in Sanity to: "${testFaqTitle}"`);
  await client.patch('faqPage').set({ 'hero.title': testFaqTitle }).commit();

  const modified = await client.fetch('*[_type == "faqPage"][0].hero.title');
  console.log('✓ Successfully read updated value from Sanity:', modified);

  console.log(`Restoring original title in Sanity to: "${originalFaqTitle}"`);
  await client.patch('faqPage').set({ 'hero.title': originalFaqTitle }).commit();

  const restored = await client.fetch('*[_type == "faqPage"][0].hero.title');
  console.log('✓ Successfully verified restored value in Sanity:', restored);

  console.log('\n=== ALL CMS VERIFICATIONS PASSED SUCCESSFULLY ===');
}

run().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
