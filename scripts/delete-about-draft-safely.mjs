import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'techsteps',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  console.log('--- PRE-DELETION AUDIT ---');
  // Confirm total count of documents of type aboutPage
  const aboutDocs = await client.fetch('*[_type == "aboutPage"]{ _id, _type, _updatedAt }');
  console.log('Documents of _type == "aboutPage":', aboutDocs);

  // Read the published document before deletion to create a fingerprint snapshot
  const publishedBefore = await client.getDocument('aboutPage');
  console.log('Published aboutPage ID:', publishedBefore._id);
  console.log('Published aboutPage updatedAt:', publishedBefore._updatedAt);
  console.log('Published aboutPage rev:', publishedBefore._rev);

  // Check draft existence
  const draftBefore = await client.getDocument('drafts.aboutPage');
  if (!draftBefore) {
    throw new Error('drafts.aboutPage does not exist! Aborting.');
  }
  console.log('Draft exists to be deleted:', draftBefore._id, 'updatedAt:', draftBefore._updatedAt);

  console.log('--- EXECUTING DELETION OF drafts.aboutPage ONLY ---');
  const deleteResult = await client.delete('drafts.aboutPage');
  console.log('Sanity delete response:', deleteResult);

  console.log('--- POST-DELETION VERIFICATION ---');
  // 1. Check draft is gone
  const draftAfter = await client.getDocument('drafts.aboutPage');
  console.log('drafts.aboutPage exists after delete?', !!draftAfter);

  // 2. Check published document is present and unchanged
  const publishedAfter = await client.getDocument('aboutPage');
  console.log('published aboutPage exists after delete?', !!publishedAfter);
  console.log('published aboutPage _rev unchanged?', publishedBefore._rev === publishedAfter._rev);
  console.log('published aboutPage _updatedAt unchanged?', publishedBefore._updatedAt === publishedAfter._updatedAt);

  // 3. Check remaining aboutPage documents
  const aboutDocsAfter = await client.fetch('*[_type == "aboutPage"]{ _id, _type, _updatedAt }');
  console.log('Remaining aboutPage documents:', aboutDocsAfter);
}

main().catch(err => {
  console.error('Operation failed:', err);
  process.exit(1);
});
