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
  const doc = await client.fetch('*[_type == "aboutPage"][0]');
  console.log('AboutPage keys in Sanity:', Object.keys(doc || {}));
  console.log('hero:', doc?.hero);
  console.log('whoWeAre:', doc?.whoWeAre);
  console.log('whatWeDo:', doc?.whatWeDo);
  console.log('approach:', doc?.approach);
  console.log('cta:', doc?.cta);
}

main().catch(console.error);
