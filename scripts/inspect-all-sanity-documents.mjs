import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: process.env.SANITY_DATASET || 'techsteps',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  const allDocs = await client.fetch('*[!(_id in path("drafts.**"))]{ _id, _type, title, name, slug }');
  console.log(`=== TOTAL PUBLISHED SANITY DOCUMENTS: ${allDocs.length} ===`);
  
  const grouped = {};
  for (const doc of allDocs) {
    if (!grouped[doc._type]) grouped[doc._type] = [];
    grouped[doc._type].push(doc);
  }

  for (const [type, docs] of Object.entries(grouped)) {
    console.log(`\nType: ${type} (${docs.length})`);
    for (const d of docs) {
      const label = d.title || d.name || d.slug?.current || d._id;
      console.log(`  - ID: ${d._id.padEnd(30)} | ${label}`);
    }
  }
}

main().catch(console.error);
