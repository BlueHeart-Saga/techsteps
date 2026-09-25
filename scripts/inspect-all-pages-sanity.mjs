import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const configPath = process.env.USERPROFILE + '/.config/sanity/config.json';
let token = process.env.SANITY_API_TOKEN;
if (fs.existsSync(configPath)) {
  const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = conf.authToken || token;
}

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token,
  useCdn: false
});

async function main() {
  const sust = await client.fetch('*[_type == "sustainabilityPage"][0]');
  console.log('=== SUSTAINABILITY PAGE ===');
  console.log('Keys:', Object.keys(sust || {}));
  console.log('Hero:', sust?.hero);
  console.log('Approach:', JSON.stringify(sust?.approach, null, 2));

  const inv = await client.fetch('*[_type == "investorsPage"][0]');
  console.log('\n=== INVESTORS PAGE ===');
  console.log('Keys:', Object.keys(inv || {}));
  console.log('Hero:', inv?.hero);
  console.log('Businesses:', JSON.stringify(inv?.businesses, null, 2));
  console.log('ESG Pillars:', JSON.stringify(inv?.esgPillars, null, 2));

  const divisions = await client.fetch('*[_type == "division"]{_id, title, slug, order, description, icon}');
  console.log('\n=== DIVISIONS ===', divisions.length);
  divisions.forEach(d => console.log(d));

  const services = await client.fetch('*[_type == "service"]{_id, title, slug, division->{title, slug}}');
  console.log('\n=== SERVICES ===', services.length);
  console.log('Sample services:', services.slice(0, 3));

  const sectors = await client.fetch('*[_type == "sector"]{_id, title, slug}');
  console.log('\n=== SECTORS ===', sectors.length);

  const contact = await client.fetch('*[_type == "contactPage"][0]');
  console.log('\n=== CONTACT PAGE ===');
  console.log('Keys:', Object.keys(contact || {}));

  const reqCol = await client.fetch('*[_type == "requestCollectionPage"][0]');
  console.log('\n=== REQUEST COLLECTION PAGE ===');
  console.log('Keys:', Object.keys(reqCol || {}));

  const faq = await client.fetch('*[_type == "faqPage"][0]');
  console.log('\n=== FAQ PAGE ===');
  console.log('Keys:', Object.keys(faq || {}));

  const legalDocs = await client.fetch('*[_type in ["legalPage", "policy", "page"]]{_id, _type, title, slug}');
  console.log('\n=== LEGAL DOCS ===', legalDocs);
}

main().catch(console.error);
