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
  console.log('=== DUPLICATE DOCUMENT AUDIT ===');
  const allDocs = await client.fetch('*[!(_type match "system.*") && !(_id in path("drafts.**"))]{ _id, _type, title, "slug": slug.current }');

  const byType = {};
  for (const d of allDocs) {
    if (!byType[d._type]) byType[d._type] = [];
    byType[d._type].push(d);
  }

  let duplicatesFound = false;

  for (const [type, docs] of Object.entries(byType)) {
    console.log(`\nType: ${type} (total: ${docs.length})`);
    
    // Check for duplicate slugs
    const slugMap = {};
    for (const d of docs) {
      if (d.slug) {
        if (slugMap[d.slug]) {
          console.warn(`  [DUPLICATE SLUG] in ${type}: "${d.slug}" (_id1: ${slugMap[d.slug]._id}, _id2: ${d._id})`);
          duplicatesFound = true;
        } else {
          slugMap[d.slug] = d;
        }
      }
    }

    // Check for duplicate titles
    const titleMap = {};
    for (const d of docs) {
      if (d.title) {
        if (titleMap[d.title]) {
          console.warn(`  [DUPLICATE TITLE] in ${type}: "${d.title}" (_id1: ${titleMap[d.title]._id}, _id2: ${d._id})`);
          duplicatesFound = true;
        } else {
          titleMap[d.title] = d;
        }
      }
    }
  }

  if (!duplicatesFound) {
    console.log('\n✓ ZERO DUPLICATES FOUND across all documents in Sanity!');
  }
}

main().catch(console.error);
