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

async function run() {
  const leadership = await client.fetch('*[_id == "leadershipPage" || _type == "leadershipPage"][0]');
  console.log('Leadership Page doc:');
  console.log(JSON.stringify(leadership, null, 2));
}

run().catch(console.error);
