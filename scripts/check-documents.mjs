import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));

export const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function main() {
  const hp = await client.fetch('*[_type == "homePage"][0]');
  console.log('=== HOMEPAGE DOC ===');
  console.log(JSON.stringify(hp, null, 2));

  const about = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('=== ABOUTPAGE DOC ===');
  console.log(Object.keys(about || {}));

  const settings = await client.fetch('*[_type == "siteSettings"][0]');
  console.log('=== SITESETTINGS DOC ===');
  console.log(Object.keys(settings || {}));

  const services = await client.fetch('*[_type == "service"]{ _id, title, slug }');
  console.log('=== SERVICES COUNT ===', services.length);

  const sectors = await client.fetch('*[_type == "sector"]{ _id, title, slug }');
  console.log('=== SECTORS COUNT ===', sectors.length);

  const articles = await client.fetch('*[_type == "article"]{ _id, title, slug }');
  console.log('=== ARTICLES COUNT ===', articles.length);

  const caseStudies = await client.fetch('*[_type == "caseStudy"]{ _id, title, slug }');
  console.log('=== CASE STUDIES COUNT ===', caseStudies.length);
}

main().catch(console.error);
