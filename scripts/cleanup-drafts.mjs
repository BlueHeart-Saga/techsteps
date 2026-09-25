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
  const drafts = await client.fetch('*[_id in path("drafts.**")]{ _id }');
  console.log(`Found ${drafts.length} drafts:`, drafts.map(d => d._id).join(', '));
  for (const d of drafts) {
    console.log(`Deleting ${d._id}...`);
    await client.delete(d._id);
  }
  console.log('✓ Cleaned up all drafts in dataset.');
}

main().catch(console.error);
