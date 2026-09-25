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
  console.log('=== DETAILED SANITY STUDIO EDITABLE CONTENT AUDIT ===\n');

  // 1. Site Settings
  const settings = await client.fetch('*[_type == "siteSettings"][0]');
  console.log('1. Site Settings & Navigation (documentId: "siteSettings")');
  console.log(`   Company: "${settings.companyName}" | Legal: "${settings.legalName}"`);
  console.log(`   Address: ${settings.address?.street}, ${settings.address?.city}, ${settings.address?.postcode}`);
  console.log(`   Phone: ${settings.phone} | Email: ${settings.email}`);
  console.log(`   MainNav Items (${settings.mainNav?.length}): ${settings.mainNav?.map(m => m.label).join(', ')}`);
  console.log(`   Footer Services (${settings.footerServices?.length}): ${settings.footerServices?.map(m => m.label).join(', ')}`);
  console.log(`   Footer Legal (${settings.footerLegal?.length}): ${settings.footerLegal?.map(m => m.label).join(', ')}`);
  console.log(`   Copyright: "${settings.footerCopyright}"\n`);

  // 2. Home Page
  const home = await client.fetch('*[_id == "homePage"][0]');
  console.log('2. Home Page Content & Hero (documentId: "homePage")');
  console.log(`   Hero Eyebrow: "${home.hero?.eyebrow}"`);
  console.log(`   Hero Heading: "${home.hero?.heading}"`);
  console.log(`   Hero Description: "${home.hero?.description?.slice(0, 60)}..."`);
  console.log(`   Intro Heading: "${home.intro?.heading}"`);
  console.log(`   Intro Text: "${home.intro?.description?.slice(0, 70)}..."`);
  console.log(`   Statistics Count: ${home.statistics?.length}`);
  console.log(`   Services Eyebrow: "${home.services?.eyebrow}" | Heading: "${home.services?.heading}"`);
  console.log(`   Services Cards (${home.services?.cards?.length}): ${home.services?.cards?.map(c => `"${c.title}" (hasImage: ${Boolean(c.image?.asset)})`).join(', ')}`);
  console.log(`   Lifecycle Heading: "${home.lifecycle?.heading}" | Steps: ${home.lifecycle?.steps?.length}`);
  console.log(`   CTA Heading: "${home.cta?.heading}" | Button: "${home.cta?.primaryButtonText}"\n`);

  // 3. About Us Page
  const about = await client.fetch('*[_id == "aboutPage"][0]');
  console.log('3. About Us Page (documentId: "aboutPage")');
  console.log(`   Meta Title: "${about.metaTitle}"`);
  console.log(`   Hero Headline: "${about.hero?.headline}"`);
  console.log(`   Hero Description: "${about.hero?.description?.slice(0, 60)}..."`);
  console.log(`   Who We Are Headline: "${about.whoWeAre?.headline}" | Highlights: ${about.whoWeAre?.highlights?.length}`);
  console.log(`   What We Do Items: ${about.whatWeDo?.items?.length} (${about.whatWeDo?.items?.map(i => i.title).join(', ')})`);
  console.log(`   Approach Steps: ${about.approach?.steps?.length} (${about.approach?.steps?.map(s => s.title).join(', ')})`);
  console.log(`   Capabilities Items: ${about.capabilities?.items?.length}`);
  console.log(`   Statistics: ${about.statistics?.length} items`);
  console.log(`   CTA Headline: "${about.cta?.headline}" | Phone: "${about.cta?.phone}"\n`);

  // 4. FAQ Page
  const faq = await client.fetch('*[_id == "faqPage"][0]');
  console.log('4. FAQ Page (documentId: "faqPage")');
  console.log(`   Hero Title: "${faq.hero?.title}" | Subheading: "${faq.hero?.subheading?.slice(0, 60)}..."`);
  console.log(`   Categories (${faq.categories?.length}): ${faq.categories?.map(c => c.name).join(', ')}`);
  console.log(`   Items: ${faq.items?.length} questions & answers populated`);
  console.log(`   Sample Q1: "${faq.items?.[0]?.question}"\n`);

  // 5. Sustainability Page
  const sust = await client.fetch('*[_id == "sustainabilityPage"][0]');
  console.log('5. Sustainability Page (documentId: "sustainabilityPage")');
  console.log(`   Hero Title: "${sust.hero?.title}"`);
  console.log(`   Metrics (${sust.metrics?.length}): ${sust.metrics?.map(m => `${m.number}${m.suffix} ${m.label}`).join(', ')}`);
  console.log(`   Approach Steps (${sust.approach?.steps?.length}): ${sust.approach?.steps?.map(s => s.title).join(', ')}`);
  console.log(`   ESG Pillars: ${sust.esgPillars?.length}\n`);

  // 6. Investors Page
  const inv = await client.fetch('*[_id == "investorsPage"][0]');
  console.log('6. Investors Page (documentId: "investorsPage")');
  console.log(`   Hero Title: "${inv.hero?.title}"`);
  console.log(`   Stats (${inv.stats?.length}): ${inv.stats?.map(s => `${s.prefix}${s.value}${s.suffix} ${s.title}`).join(', ')}`);
  console.log(`   Strategic Pillars (${inv.strategicPillars?.length}): ${inv.strategicPillars?.map(p => p.title).join(', ')}`);
  console.log(`   IR Contact: "${inv.irContact?.name}" (${inv.irContact?.email})\n`);

  // 7. Contact Page
  const contact = await client.fetch('*[_id == "contactPage"][0]');
  console.log('7. Contact Page (documentId: "contactPage")');
  console.log(`   Hero Title: "${contact.hero?.title}" | Form Heading: "${contact.formSection?.heading}"`);
  console.log(`   Direct Lines (${contact.directLines?.length}): ${contact.directLines?.map(d => `${d.title} (${d.phone})`).join(', ')}\n`);

  // 8. Request Collection Page
  const reqCol = await client.fetch('*[_id == "requestCollectionPage"][0]');
  console.log('8. Request Collection Page (documentId: "requestCollectionPage")');
  console.log(`   Hero Title: "${reqCol.hero?.title}" | Description: "${reqCol.hero?.description?.slice(0, 60)}..."`);
  console.log(`   SLA Guarantees (${reqCol.slaGuarantees?.length}): ${reqCol.slaGuarantees?.map(s => s.title).join(', ')}\n`);

  // 9. Operational Divisions (4)
  const divs = await client.fetch('*[_type == "division"] | order(order asc){ _id, title, "slug": slug.current, headline }');
  console.log(`9. Operational Divisions (${divs.length} documents):`);
  for (const d of divs) {
    console.log(`   • [${d.slug}] ${d.title} — "${d.headline}"`);
  }
  console.log();

  // 10. Certified Services (27)
  const srvs = await client.fetch('*[_type == "service"] | order(title asc){ _id, title, "slug": slug.current, summary, customerProblem, solution, keyBenefits, process, faqs }');
  console.log(`10. Certified Services (${srvs.length} documents):`);
  console.log(`   All ${srvs.length} have summary: ${srvs.every(s => Boolean(s.summary))}`);
  console.log(`   All ${srvs.length} have customerProblem: ${srvs.every(s => Boolean(s.customerProblem))}`);
  console.log(`   All ${srvs.length} have solution: ${srvs.every(s => Boolean(s.solution))}`);
  console.log(`   All ${srvs.length} have keyBenefits: ${srvs.every(s => s.keyBenefits?.length > 0)}`);
  console.log(`   All ${srvs.length} have process: ${srvs.every(s => s.process?.length > 0)}`);
  console.log(`   Sample service titles: ${srvs.slice(0, 5).map(s => s.title).join(', ')}... and ${srvs.length - 5} more.\n`);

  // 11. Industry Sectors (8)
  const secs = await client.fetch('*[_type == "sector"] | order(title asc){ _id, title, "slug": slug.current, tagline, summary, challenges, solutions }');
  console.log(`11. Industry Sectors (${secs.length} documents):`);
  for (const s of secs) {
    console.log(`   • [${s.slug}] ${s.title} — "${s.tagline?.slice(0, 60)}..." (challenges: ${s.challenges?.length || 0})`);
  }
  console.log();

  // 12. Articles & Insights (2)
  const arts = await client.fetch('*[_type == "article"]{ _id, title, "slug": slug.current, author, publishedDate }');
  console.log(`12. Articles & Insights (${arts.length} documents):`);
  for (const a of arts) {
    console.log(`   • [${a.slug}] "${a.title}" by ${a.author} (${a.publishedDate})`);
  }
  console.log();

  // 13. Case Studies (2)
  const cs = await client.fetch('*[_type == "caseStudy"]{ _id, title, "slug": slug.current, clientIndustry, challenge }');
  console.log(`13. Enterprise Case Studies (${cs.length} documents):`);
  for (const c of cs) {
    console.log(`   • [${c.slug}] "${c.title}" (${c.clientIndustry})`);
  }
  console.log();

  // 14. Testimonials (6)
  const tms = await client.fetch('*[_type == "testimonial"] | order(order asc){ author, role, company, rating }');
  console.log(`14. Client Testimonials (${tms.length} documents):`);
  for (const t of tms) {
    console.log(`   • ${t.author}, ${t.role} (${t.company}) — ${t.rating} stars`);
  }
  console.log();

  // 15. Stats & Badges (4)
  const stats = await client.fetch('*[_type == "stat"] | order(displayOrder asc){ label, value, prefix, suffix }');
  console.log(`15. Accreditation Badges & Stats (${stats.length} documents):`);
  for (const st of stats) {
    console.log(`   • ${st.prefix}${st.value}${st.suffix} — ${st.label}`);
  }
}

main().catch(console.error);
