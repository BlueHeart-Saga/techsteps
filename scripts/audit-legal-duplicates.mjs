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
  const docs = await client.fetch('*[_type == "legalPage"]{ _id, title, "slug": slug.current, "sectionsCount": count(sections), _createdAt, _updatedAt }');
  console.log(docs);
}

main().catch(console.error);
