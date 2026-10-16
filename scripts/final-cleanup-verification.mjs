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

async function runVerification() {
  console.log('=== FINAL COMPREHENSIVE SANITY DATASET VERIFICATION ===');

  // 1. FAQ Document Verification
  const faq = await client.getDocument('faqPage');
  console.log('\n1. FAQ Document:');
  console.log('   - Exists:', !!faq);
  console.log('   - Hero field present:', 'hero' in (faq || {}));
  console.log('   - categories count:', faq?.categories?.length);
  console.log('   - items count:', faq?.items?.length);
  console.log('   - contactCard heading:', faq?.contactCard?.heading);
  console.log('   - metaTitle:', faq?.metaTitle);
  console.log('   - metaDescription present:', !!faq?.metaDescription);

  // 2. Service drafts verification
  const deletedDraftIds = [
    'drafts.srv-disposal-services',
    'drafts.srv-it-relocations-specialist',
    'drafts.srv-ultra-secure-hard-drive-destruction'
  ];
  console.log('\n2. Deleted Stale Service Drafts:');
  for (const id of deletedDraftIds) {
    const doc = await client.getDocument(id);
    console.log(`   - ${id}: ${doc === null ? 'NOT FOUND (PASS)' : 'STILL EXISTS (FAIL)'}`);
  }

  // 3. Published service counterparts
  const pubServiceIds = [
    'srv-disposal-services',
    'srv-it-relocations-specialist',
    'srv-ultra-secure-hard-drive-destruction'
  ];
  console.log('\n3. Published Service Counterparts:');
  for (const id of pubServiceIds) {
    const doc = await client.getDocument(id);
    console.log(`   - ${id}: Exists: ${!!doc}, slug: ${doc?.slug?.current}, image: ${doc?.aboutImage}`);
  }

  // 4. Protected Drafts Verification
  console.log('\n4. Protected Drafts:');
  const invDraft = await client.getDocument('drafts.investorsPage');
  console.log(`   - drafts.investorsPage: Exists: ${!!invDraft}, Updated: ${invDraft?._updatedAt}`);
  const docDraft = await client.getDocument('drafts.srv-document-storage');
  console.log(`   - drafts.srv-document-storage: Exists: ${!!docDraft}, Updated: ${docDraft?._updatedAt}`);

  // 5. Total remaining drafts in entire dataset
  const allRemainingDrafts = await client.fetch('*[_id in path("drafts.**")]{ _id, _type, _updatedAt }');
  console.log('\n5. All Remaining Drafts in Dataset:');
  console.log(allRemainingDrafts);

  // 6. Check total documents
  const allDocs = await client.fetch('*[]{ _id, _type }');
  console.log(`\n6. Dataset Totals: Total Documents = ${allDocs.length} (Published = ${allDocs.length - allRemainingDrafts.length}, Drafts = ${allRemainingDrafts.length})`);
}

runVerification().catch(console.error);
