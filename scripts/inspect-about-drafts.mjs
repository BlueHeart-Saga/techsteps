import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const configPath = process.env.USERPROFILE + '/.config/sanity/config.json';
let token = process.env.SANITY_API_TOKEN;
if (fs.existsSync(configPath)) {
  const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = conf.authToken || token;
}

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function main() {
  const docs = await client.fetch('*[_id in ["aboutPage", "drafts.aboutPage"]]');
  console.log(`Found ${docs.length} aboutPage documents:`);
  for (const doc of docs) {
    console.log(`\n=================== DOCUMENT: ${doc._id} ===================`);
    console.log('Top level keys:', Object.keys(doc));
    console.log('\nFull JSON:');
    console.log(JSON.stringify(doc, null, 2));
  }
}

main().catch(console.error);
