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
  const docs = await client.fetch('*[_type == "service"]{ _id, title, "slug": slug.current }');
  console.log(`Total services in Sanity: ${docs.length}`);
  const titleCount = {};
  for (const d of docs) {
    titleCount[d.title] = (titleCount[d.title] || 0) + 1;
    if (titleCount[d.title] > 1) {
      console.warn(`Duplicate found: ${d.title} (ID: ${d._id}, slug: ${d.slug})`);
    }
  }

  // Print all services with their ID
  console.log('\nAll service documents:');
  for (const d of docs) {
    console.log(`- ID: ${d._id} | Title: "${d.title}" | Slug: "${d.slug}"`);
  }
}

main().catch(console.error);
