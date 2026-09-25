import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(`${home}/.config/sanity/config.json`, 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function run() {
  const ndjsonPath = resolve('sanity-seed.ndjson');
  const lines = readFileSync(ndjsonPath, 'utf8')
    .split('\n')
    .filter((line) => line.trim().length > 0);

  console.log(`Found ${lines.length} documents in ${ndjsonPath} to push...`);

  let count = 0;
  // Process in batches of 10
  const batchSize = 10;
  for (let i = 0; i < lines.length; i += batchSize) {
    const chunk = lines.slice(i, i + batchSize).map((l) => JSON.parse(l));
    const tx = client.transaction();
    for (const doc of chunk) {
      tx.createOrReplace(doc);
    }
    await tx.commit();
    count += chunk.length;
    console.log(`Pushed ${count}/${lines.length} documents...`);
  }

  console.log('Successfully pushed all seeded documents to Sanity dataset "techsteps"!');
}

run().catch((err) => {
  console.error('Error pushing documents to Sanity:', err);
  process.exit(1);
});
