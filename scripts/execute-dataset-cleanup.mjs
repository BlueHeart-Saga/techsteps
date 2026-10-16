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
  console.log('--- PART 1: REMOVING OBSOLETE HERO FIELD FROM faqPage ---');
  const faqBefore = await client.getDocument('faqPage');
  if (!faqBefore) throw new Error('faqPage not found');
  console.log('faqPage exists before patch. Has hero?', 'hero' in faqBefore);
  console.log('Keys before:', Object.keys(faqBefore));

  // Unset only the hero field
  const patchRes = await client.patch('faqPage').unset(['hero']).commit();
  console.log('Unset hero committed. Transaction ID:', patchRes._rev);

  const faqAfter = await client.getDocument('faqPage');
  console.log('faqPage exists after patch. Has hero?', 'hero' in faqAfter);
  console.log('Keys after:', Object.keys(faqAfter));

  console.log('\n--- PART 4: DELETING 3 CONFIRMED STALE SERVICE DRAFTS ---');
  const draftsToDelete = [
    'drafts.srv-disposal-services',
    'drafts.srv-it-relocations-specialist',
    'drafts.srv-ultra-secure-hard-drive-destruction'
  ];

  for (const draftId of draftsToDelete) {
    const exists = await client.getDocument(draftId);
    console.log(`Checking ${draftId}: exists?`, !!exists);
    if (exists) {
      const del = await client.delete(draftId);
      console.log(`Deleted ${draftId}:`, del);
    }
  }

  console.log('\n--- VERIFICATION OF PROTECTED DRAFTS ---');
  const investorsDraft = await client.getDocument('drafts.investorsPage');
  console.log('drafts.investorsPage exists:', !!investorsDraft, 'updatedAt:', investorsDraft?._updatedAt);
  const docStorageDraft = await client.getDocument('drafts.srv-document-storage');
  console.log('drafts.srv-document-storage exists:', !!docStorageDraft, 'updatedAt:', docStorageDraft?._updatedAt);
}

main().catch(console.error);
