import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/dataset-health-audit.json', 'utf8'));

// Inspect faqPage published document
const faq = data.singletons.find(s => s.id === 'faqPage');
console.log('=== faqPage published content ===');
console.log('Keys:', faq.publishedKeys);
console.log('hero value:', JSON.stringify(faq.pubDoc.hero, null, 2));

// Inspect the 4 service drafts vs published
console.log('\n=== Service Drafts Inspection ===');
for (const d of data.drafts) {
  if (d.type === 'service') {
    console.log(`\n--- Draft: ${d.draftId} ---`);
    console.log(`Draft updated: ${d.draftUpdatedAt}`);
    console.log(`Pub updated: ${d.publishedUpdatedAt}`);
    
    // Check what is different between draft and published
    const draftDoc = d.draftContentSample;
    const pubDoc = d.publishedContentSample;
    
    const diffKeys = [];
    const allKeys = new Set([...Object.keys(draftDoc), ...Object.keys(pubDoc)]);
    for (const k of allKeys) {
      if (k.startsWith('_')) continue;
      const strDraft = JSON.stringify(draftDoc[k]);
      const strPub = JSON.stringify(pubDoc[k]);
      if (strDraft !== strPub) {
        diffKeys.push({
          key: k,
          draftPreview: strDraft ? strDraft.slice(0, 60) : 'undefined',
          pubPreview: strPub ? strPub.slice(0, 60) : 'undefined',
        });
      }
    }
    console.log(`Total field differences: ${diffKeys.length}`);
    console.log('Sample differences:', diffKeys.slice(0, 5));
  }
}

// Inspect investorsPage draft vs published
console.log('\n=== investorsPage Draft Inspection ===');
const invDraft = data.drafts.find(d => d.type === 'investorsPage');
if (invDraft) {
  console.log(`Draft updated: ${invDraft.draftUpdatedAt}`);
  console.log(`Pub updated: ${invDraft.publishedUpdatedAt}`);
  const draftDoc = invDraft.draftContentSample;
  const pubDoc = invDraft.publishedContentSample;
  const diffKeys = [];
  const allKeys = new Set([...Object.keys(draftDoc), ...Object.keys(pubDoc)]);
  for (const k of allKeys) {
    if (k.startsWith('_')) continue;
    const strDraft = JSON.stringify(draftDoc[k]);
    const strPub = JSON.stringify(pubDoc[k]);
    if (strDraft !== strPub) {
      diffKeys.push({
        key: k,
        draftPreview: strDraft ? strDraft.slice(0, 60) : 'undefined',
        pubPreview: strPub ? strPub.slice(0, 60) : 'undefined',
      });
    }
  }
  console.log(`Total field differences: ${diffKeys.length}`);
  console.log('Differences:', diffKeys);
}
