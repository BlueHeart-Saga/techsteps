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

async function inspect() {
  const docs = await client.fetch('*[!(_type match "system.*") && !(_id in path("drafts.**"))]{ _id, _type, title, companyName }');
  const counts = {};
  for (const d of docs) {
    counts[d._type] = (counts[d._type] || 0) + 1;
  }
  console.log('Doc counts by type:\n', JSON.stringify(counts, null, 2));
  console.log('Total documents:', docs.length);

  // List all document IDs and types
  console.log('\nAll Docs Summary:');
  for (const d of docs) {
    console.log(`- [${d._type}] ${d._id} (${d.title || d.companyName || 'no title'})`);
  }
}

inspect().catch(console.error);
