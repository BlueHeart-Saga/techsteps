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
  const doc = await client.fetch('*[_id == "aboutPage"][0]');
  console.log('Top level keys of published aboutPage:', Object.keys(doc));
  fs.writeFileSync('scripts/published-aboutPage.json', JSON.stringify(doc, null, 2), 'utf8');
  console.log('Written to scripts/published-aboutPage.json');
}

main().catch(console.error);
