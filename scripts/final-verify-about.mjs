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

async function verify() {
  console.log('--- FINAL POST-DELETION VERIFICATION ---');
  
  // 1. Check published document
  const published = await client.getDocument('aboutPage');
  console.log('1. Published aboutPage present:', !!published);
  console.log('   - ID:', published?._id);
  console.log('   - Updated at:', published?._updatedAt);
  console.log('   - Rev:', published?._rev);
  console.log('   - Building hero image:', published?.buildingHero?.imageUrl);
  console.log('   - Technology purpose headline:', published?.technologyPurpose?.headline);
  console.log('   - Trust and impact cards:', published?.trustAndImpact?.cards?.length);
  console.log('   - Sustainability metrics:', published?.sustainabilityCommitment?.metrics?.length);
  console.log('   - Journey milestones:', published?.journey?.milestones?.length);
  console.log('   - CTA title:', published?.cta?.title);

  // 2. Check draft document
  const draft = await client.getDocument('drafts.aboutPage');
  console.log('2. Draft drafts.aboutPage exists:', !!draft);

  // 3. Check for any other drafts of aboutPage
  const allDraftsOfAbout = await client.fetch('*[_type == "aboutPage" && _id in path("drafts.**")]');
  console.log('3. Any remaining drafts of aboutPage:', allDraftsOfAbout);

  // 4. Confirm total count of aboutPage documents
  const allAboutDocs = await client.fetch('*[_type == "aboutPage"]{ _id }');
  console.log('4. Total aboutPage documents in dataset:', allAboutDocs);
}

verify().catch(console.error);
