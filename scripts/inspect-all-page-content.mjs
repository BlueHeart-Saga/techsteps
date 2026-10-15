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
  console.log('=== INSPECTING ALL SANITY SINGLETONS ===');
  const types = [
    'homePage',
    'aboutPage',
    'leadershipPage',
    'investorsPage',
    'sustainabilityPage',
    'contactPage',
    'faqPage',
    'globalPresencePage',
    'peopleCulturePage',
    'requestCollectionPage',
    'servicesPage',
    'sectorsPage',
    'siteSettings'
  ];

  for (const t of types) {
    const doc = await client.fetch(`*[_type == "${t}" && !(_id in path("drafts.**"))][0]`);
    console.log(`\n--- Type: ${t} (ID: ${doc?._id}) ---`);
    if (!doc) {
      console.log('  NOT FOUND');
      continue;
    }
    console.log('  Keys:', Object.keys(doc));
    if (doc.hero) console.log('  Hero:', doc.hero);
    if (doc.metaTitle) console.log('  metaTitle:', doc.metaTitle);
  }
}

main().catch(console.error);
