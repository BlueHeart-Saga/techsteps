import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { createClient } from '@sanity/client';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
  timeout: 30000,
});

async function run() {
  const allDocs = await client.fetch('*[!(_id in path("drafts.**"))]');
  const idMap = new Map();
  const typeMap = new Map();
  for (const doc of allDocs) {
    idMap.set(doc._id, doc);
    if (!typeMap.has(doc._type)) typeMap.set(doc._type, []);
    typeMap.get(doc._type).push(doc);
  }

  const results = {};

  // 1. Home Page
  const homeDoc = idMap.get('homePage');
  results['Home'] = {
    docId: 'homePage',
    fieldsChecked: {
      'hero.heading': homeDoc?.hero?.heading,
      'hero.eyebrow': homeDoc?.hero?.eyebrow,
      'hero.description': homeDoc?.hero?.description,
      'hero.primaryCtaText': homeDoc?.hero?.primaryCtaText,
      'intro.heading': homeDoc?.intro?.heading,
      'intro.description': homeDoc?.intro?.description,
      'services.heading': homeDoc?.services?.heading,
      'services.cards_count': homeDoc?.services?.cards?.length,
      'lifecycle.steps_count': homeDoc?.lifecycle?.steps?.length,
      'cta.heading': homeDoc?.cta?.heading,
      'metaTitle': homeDoc?.metaTitle,
      'metaDescription': homeDoc?.metaDescription,
    }
  };

  // 2. About Us
  const aboutDoc = idMap.get('aboutPage');
  results['About Us'] = {
    docId: 'aboutPage',
    fieldsChecked: {
      'hero.title': aboutDoc?.hero?.title,
      'hero.eyebrow': aboutDoc?.hero?.eyebrow,
      'whoWeAre.title': aboutDoc?.whoWeAre?.title,
      'whoWeAre.paragraphs_count': aboutDoc?.whoWeAre?.paragraphs?.length,
      'whatWeDo.items_count': aboutDoc?.whatWeDo?.items?.length,
      'approach.steps_count': aboutDoc?.approach?.steps?.length,
      'capabilities.items_count': aboutDoc?.capabilities?.items?.length,
      'statistics_count': aboutDoc?.statistics?.length,
      'cta.title': aboutDoc?.cta?.title,
      'metaTitle': aboutDoc?.metaTitle,
      'metaDescription': aboutDoc?.metaDescription,
    }
  };

  // 3. Divisions
  const divisions = typeMap.get('division') || [];
  results['Divisions'] = divisions.map(d => ({
    id: d._id,
    title: d.title,
    slug: d.slug?.current,
    summary: d.summary,
    headline: d.headline,
  }));

  // 4. Services (all 27)
  const services = typeMap.get('service') || [];
  results['Services'] = {
    total: services.length,
    list: services.map(s => ({
      id: s._id,
      title: s.title,
      slug: s.slug?.current,
      summary: s.summary?.slice(0, 60),
      hasBenefits: !!s.keyBenefits?.length,
      hasProcess: !!s.process?.length,
      hasFaqs: !!s.faqs?.length,
    }))
  };

  // 5. Sectors (8)
  const sectors = typeMap.get('sector') || [];
  results['Sectors'] = {
    total: sectors.length,
    list: sectors.map(s => ({
      id: s._id,
      title: s.title,
      slug: s.slug?.current,
      tagline: s.tagline,
      challenges_count: s.challenges?.length,
      solutions_count: s.solutions?.length,
    }))
  };

  // 6. Investors
  const invDoc = idMap.get('investorsPage');
  results['Investors'] = {
    docId: 'investorsPage',
    fieldsChecked: {
      'hero.title': invDoc?.hero?.title,
      'hero.subheading': invDoc?.hero?.subheading,
      'stats_count': invDoc?.stats?.length,
      'strategicPillars_count': invDoc?.strategicPillars?.length,
      'irContact.name': invDoc?.irContact?.name,
    }
  };

  // 7. Sustainability
  const sustDoc = idMap.get('sustainabilityPage');
  results['Sustainability'] = {
    docId: 'sustainabilityPage',
    fieldsChecked: {
      'hero.title': sustDoc?.hero?.title,
      'hero.subheading': sustDoc?.hero?.subheading,
      'metrics_count': sustDoc?.metrics?.length,
      'approach.steps_count': sustDoc?.approach?.steps?.length,
      'esgPillars_count': sustDoc?.esgPillars?.length,
    }
  };

  // 8. Contact
  const contactDoc = idMap.get('contactPage');
  results['Contact'] = {
    docId: 'contactPage',
    fieldsChecked: {
      'hero.title': contactDoc?.hero?.title,
      'hero.subheading': contactDoc?.hero?.subheading,
      'formSection.heading': contactDoc?.formSection?.heading,
      'directLines_count': contactDoc?.directLines?.length,
    }
  };

  // 9. FAQ
  const faqDoc = idMap.get('faqPage');
  results['FAQ'] = {
    docId: 'faqPage',
    fieldsChecked: {
      'hero.title': faqDoc?.hero?.title,
      'categories_count': faqDoc?.categories?.length,
      'items_count': faqDoc?.items?.length,
    }
  };

  // 10. Site Settings
  const siteDoc = idMap.get('siteSettings');
  results['SiteSettings'] = {
    docId: 'siteSettings',
    fieldsChecked: {
      'companyName': siteDoc?.companyName,
      'phone': siteDoc?.phone,
      'email': siteDoc?.email,
      'mainNav_count': siteDoc?.mainNav?.length,
      'footerServices_count': siteDoc?.footerServices?.length,
      'footerSectors_count': siteDoc?.footerSectors?.length,
      'footerLegal_count': siteDoc?.footerLegal?.length,
    }
  };

  writeFileSync('scripts/deep-content-audit-results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Results written to scripts/deep-content-audit-results.json');
}

run().catch(console.error);
