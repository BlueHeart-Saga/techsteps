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
  const hpById = await client.fetch('*[_id == "homePage"][0]');
  console.log('Doc with _id == "homePage":', hpById ? hpById._id : 'DOES NOT EXIST');
  if (hpById) {
    console.log('LIFECYCLE:', JSON.stringify(hpById.lifecycle, null, 2));
  }
}

main().catch(console.error);
