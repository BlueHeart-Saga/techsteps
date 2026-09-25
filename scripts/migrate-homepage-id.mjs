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
  const oldDoc = await client.fetch('*[_type == "homePage" && _id != "homePage"][0]');
  if (!oldDoc) {
    console.log('No old homePage document found. Maybe already migrated?');
    return;
  }

  console.log(`Found old homePage doc with ID: ${oldDoc._id}`);
  const { _id, _rev, _createdAt, _updatedAt, _system, ...content } = oldDoc;

  const newDoc = {
    _id: 'homePage',
    _type: 'homePage',
    ...content,
  };

  console.log('Creating document with _id: "homePage"...');
  await client.createOrReplace(newDoc);
  console.log('Created _id: "homePage". Deleting old UUID doc...');
  await client.delete(oldDoc._id);

  console.log('✓ Successfully migrated homePage document to _id: "homePage"!');

  const check = await client.fetch('*[_id == "homePage"][0]{ _id, hero, intro }');
  console.log('Verification check on new doc:', check._id, 'hero:', check.hero?.heading);
}

main().catch(console.error);
