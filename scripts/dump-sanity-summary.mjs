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
  const docs = await client.fetch('*[!(_id in path("drafts.**"))]');
  console.log(`Loaded ${docs.length} published documents from Sanity.\n`);

  const summary = {};
  for (const doc of docs) {
    if (!summary[doc._type]) summary[doc._type] = [];
    summary[doc._type].push(doc);
  }

  const out = [];

  for (const [type, list] of Object.entries(summary)) {
    out.push(`\n=== TYPE: ${type} (${list.length} docs) ===`);
    for (const d of list) {
      out.push(`ID: ${d._id}`);
      if (d.title) out.push(`  title: "${d.title}"`);
      if (d.name) out.push(`  name: "${d.name}"`);
      if (d.heading) out.push(`  heading: "${d.heading}"`);
      if (d.hero) {
        out.push(`  hero: ${JSON.stringify(d.hero, null, 2).slice(0, 300)}...`);
      }
      const keys = Object.keys(d).filter(k => !k.startsWith('_'));
      out.push(`  fields: [${keys.join(', ')}]`);
    }
  }

  writeFileSync('scripts/sanity-dump-summary.txt', out.join('\n'), 'utf8');
  console.log('Saved summary to scripts/sanity-dump-summary.txt');
}

run().catch(console.error);
