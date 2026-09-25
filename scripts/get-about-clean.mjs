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
  const doc = await client.fetch('*[_type == "aboutPage"][0]{ metaTitle, metaDescription, hero, whoWeAre, whatWeDo, approach, capabilities, statistics, cta }');
  console.log('=== ABOUT PAGE FIELDS IN SANITY ===');
  console.log(JSON.stringify(doc, null, 2));
}

main().catch(console.error);
