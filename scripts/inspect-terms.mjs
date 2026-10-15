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
  const doc1 = await client.getDocument('legal-terms-and-conditions');
  const doc2 = await client.getDocument('legalPage-terms-and-conditions');
  console.log('--- legal-terms-and-conditions ---');
  console.log('sections:', doc1?.sections?.map(s => s.heading));
  console.log('\n--- legalPage-terms-and-conditions ---');
  console.log('sections:', doc2?.sections?.map(s => s.heading));
}

main().catch(console.error);
