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
  const existingSectors = await client.fetch('*[_type == "sector"]{_id, "slug": slug.current, title}');
  console.log('Existing Sanity Sectors count:', existingSectors.length);
  existingSectors.forEach(s => console.log(` - [${s.slug}] ${s.title}`));
}

main().catch(console.error);
