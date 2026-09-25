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
  const singletons = [
    'siteSettings',
    'homePage',
    'aboutPage',
    'faqPage',
    'sustainabilityPage',
    'investorsPage',
    'contactPage',
    'requestCollectionPage',
  ];

  console.log('=== CHECKING SINGLETON DOCUMENT IDS ===');
  for (const type of singletons) {
    const docs = await client.fetch(`*[_type == "${type}" && !(_id in path("drafts.**"))]{ _id, _type }`);
    console.log(`Type: ${type.padEnd(24)} | Found: ${docs.length} | IDs: ${docs.map(d => d._id).join(', ')}`);
  }
}

main().catch(console.error);
