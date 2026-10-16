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

async function runAudit() {
  console.log('Fetching all documents from dataset...');
  const allDocs = await client.fetch('*[]{ _id, _type, _createdAt, _updatedAt, _rev }');
  console.log('Total documents in dataset:', allDocs.length);

  const drafts = allDocs.filter(d => d._id.startsWith('drafts.'));
  const published = allDocs.filter(d => !d._id.startsWith('drafts.'));

  console.log('Total drafts:', drafts.length);
  console.log('Total published:', published.length);

  // For each draft, fetch full document
  const draftDetails = [];
  for (const draftMeta of drafts) {
    const draftDoc = await client.getDocument(draftMeta._id);
    const publishedId = draftMeta._id.replace(/^drafts\./, '');
    const publishedDoc = await client.getDocument(publishedId);

    draftDetails.push({
      draftId: draftMeta._id,
      publishedId,
      type: draftMeta._type,
      draftUpdatedAt: draftMeta._updatedAt,
      draftCreatedAt: draftMeta._createdAt,
      publishedExists: !!publishedDoc,
      publishedUpdatedAt: publishedDoc ? publishedDoc._updatedAt : null,
      draftKeys: Object.keys(draftDoc || {}).filter(k => !k.startsWith('_')),
      publishedKeys: publishedDoc ? Object.keys(publishedDoc).filter(k => !k.startsWith('_')) : [],
      draftContentSample: draftDoc,
      publishedContentSample: publishedDoc,
    });
  }

  // Also check singleton documents specifically
  const targetSingletons = [
    { id: 'homePage', type: 'homePage' },
    { id: 'aboutPage', type: 'aboutPage' },
    { id: 'servicesPage', type: 'servicesPage' },
    { id: 'sectorsPage', type: 'sectorsPage' },
    { id: 'contactPage', type: 'contactPage' },
    { id: 'faqPage', type: 'faqPage' },
    { id: 'requestCollectionPage', type: 'requestCollectionPage' },
    { id: 'requestQuotePage', type: 'requestQuotePage' },
    { id: 'leadershipPage', type: 'leadershipPage' },
    { id: 'globalPresencePage', type: 'globalPresencePage' },
    { id: 'peopleCulturePage', type: 'peopleCulturePage' },
    { id: 'sustainabilityPage', type: 'sustainabilityPage' },
    { id: 'investorsPage', type: 'investorsPage' },
    { id: 'siteSettings', type: 'siteSettings' },
  ];

  const singletonDetails = [];
  for (const s of targetSingletons) {
    const pub = await client.getDocument(s.id);
    const dr = await client.getDocument(`drafts.${s.id}`);
    singletonDetails.push({
      id: s.id,
      expectedType: s.type,
      publishedExists: !!pub,
      actualPublishedType: pub?._type,
      publishedUpdatedAt: pub?._updatedAt,
      draftExists: !!dr,
      draftUpdatedAt: dr?._updatedAt,
      publishedKeys: pub ? Object.keys(pub).filter(k => !k.startsWith('_')) : [],
      draftKeys: dr ? Object.keys(dr).filter(k => !k.startsWith('_')) : [],
      pubDoc: pub,
      drDoc: dr
    });
  }

  // Also discover any other page types or singletons in published
  const otherPageDocs = published.filter(d => 
    d._id.toLowerCase().includes('page') || 
    d._type.toLowerCase().includes('page') ||
    ['siteSettings'].includes(d._id)
  );

  const result = {
    totalDocs: allDocs.length,
    drafts: draftDetails,
    singletons: singletonDetails,
    otherPageDocsSummary: otherPageDocs.map(d => ({ id: d._id, type: d._type, updatedAt: d._updatedAt }))
  };

  fs.writeFileSync('scripts/dataset-health-audit.json', JSON.stringify(result, null, 2));
  console.log('Saved audit results to scripts/dataset-health-audit.json');
}

runAudit().catch(console.error);
