import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'techsteps',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function compareServices() {
  const serviceIds = [
    'srv-disposal-services',
    'srv-it-relocations-specialist',
    'srv-ultra-secure-hard-drive-destruction'
  ];

  const analysis = {};

  for (const id of serviceIds) {
    const draftId = `drafts.${id}`;
    const draft = await client.getDocument(draftId);
    const published = await client.getDocument(id);

    console.log(`\n========================================`);
    console.log(`Inspecting: ${id}`);
    console.log(`Draft updated: ${draft._updatedAt}`);
    console.log(`Published updated: ${published._updatedAt}`);

    const keys = new Set([...Object.keys(draft), ...Object.keys(published)]);
    const fieldComparisons = [];

    for (const key of keys) {
      if (key.startsWith('_')) continue;

      const inDraft = key in draft;
      const inPub = key in published;
      const draftVal = draft[key];
      const pubVal = published[key];

      const same = JSON.stringify(draftVal) === JSON.stringify(pubVal);

      if (!same) {
        fieldComparisons.push({
          key,
          inDraft,
          inPub,
          draftValue: draftVal,
          publishedValue: pubVal
        });
      }
    }

    analysis[id] = {
      draftUpdatedAt: draft._updatedAt,
      publishedUpdatedAt: published._updatedAt,
      totalDiffFields: fieldComparisons.length,
      fieldComparisons
    };
  }

  fs.writeFileSync('scripts/service-drafts-comparison.json', JSON.stringify(analysis, null, 2));
  console.log('Saved comparison to scripts/service-drafts-comparison.json');
}

compareServices().catch(console.error);
