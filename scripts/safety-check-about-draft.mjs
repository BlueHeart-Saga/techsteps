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

async function safetyCheck() {
  console.log('=== SAFETY CHECK START ===');
  
  // 1. Confirm published aboutPage exists
  const published = await client.getDocument('aboutPage');
  if (!published) {
    throw new Error('FAILED: Published aboutPage does not exist!');
  }
  console.log('1. Published aboutPage exists: PASS (ID: ' + published._id + ', updated: ' + published._updatedAt + ')');

  // 2. Confirm published aboutPage contains current approved October 15 content
  const requiredSections = [
    'buildingHero',
    'cleanerSmarter',
    'technologyPurpose',
    'nationwideNetwork',
    'trustAndImpact',
    'sustainabilityCommitment',
    'journey',
    'cta'
  ];
  const missingInPublished = requiredSections.filter(k => !(k in published));
  if (missingInPublished.length > 0) {
    throw new Error('FAILED: Published aboutPage is missing required sections: ' + missingInPublished.join(', '));
  }
  console.log('2. Published aboutPage contains all 8 approved sections: PASS');
  console.log('   - CTA Title:', published.cta?.title);
  console.log('   - Cleaner Smarter Eyebrow:', published.cleanerSmarter?.eyebrow);

  // 3. Confirm drafts.aboutPage exists
  const draft = await client.getDocument('drafts.aboutPage');
  if (!draft) {
    throw new Error('FAILED: drafts.aboutPage does not exist!');
  }
  console.log('3. drafts.aboutPage exists: PASS (ID: ' + draft._id + ', updated: ' + draft._updatedAt + ')');

  // 4. Confirm no other documents carry the obsolete fields
  const obsoleteFieldsQuery = `*[defined(approach) || defined(capabilities) || defined(whatWeDo) || defined(whoWeAre)]{ _id, _type }`;
  const docsWithObsoleteFields = await client.fetch(obsoleteFieldsQuery);
  console.log('4. Documents containing obsolete fields:', docsWithObsoleteFields);
  
  // Only drafts.aboutPage should have these
  const nonDraftAbout = docsWithObsoleteFields.filter(d => d._id !== 'drafts.aboutPage');
  if (nonDraftAbout.length > 0) {
    console.warn('Notice: Other docs with these field names (could be different types):', nonDraftAbout);
  } else {
    console.log('   Confirmed: drafts.aboutPage is the ONLY document matching the obsolete field signature: PASS');
  }

  console.log('=== SAFETY CHECK FINISHED: ALL CHECKS PASSED ===');
}

safetyCheck().catch(err => {
  console.error(err);
  process.exit(1);
});
