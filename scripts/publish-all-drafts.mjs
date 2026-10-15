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

async function publishDrafts() {
  const drafts = await client.fetch('*[_id in path("drafts.**")]');
  console.log(`Found ${drafts.length} draft documents.`);

  for (const draft of drafts) {
    const publishedId = draft._id.replace('drafts.', '');
    const exists = await client.fetch('*[_id == $id][0]', { id: publishedId });
    if (!exists) {
      const { _id, ...cleanDoc } = draft;
      await client.createOrReplace({ _id: publishedId, ...cleanDoc });
      console.log(`Published draft ${draft._id} -> ${publishedId}`);
    } else {
      console.log(`Published version already exists for ${publishedId}`);
    }
  }
}

publishDrafts().catch(console.error);
