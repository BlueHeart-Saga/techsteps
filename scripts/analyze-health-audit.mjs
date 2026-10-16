import fs from 'fs';
import path from 'path';

// Load schema files to extract defined fields for each document type
const schemasDir = 'sanity/schemas';
const schemaFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const schemaDefinitions = {};

for (const file of schemaFiles) {
  const content = fs.readFileSync(path.join(schemasDir, file), 'utf8');
  // extract name: '...'
  const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
  if (nameMatch) {
    const docName = nameMatch[1];
    // extract all field names in fields: [...]
    // A simple regex approach to find name: 'fieldName'
    const fieldNames = new Set();
    const fieldMatches = [...content.matchAll(/name:\s*['"]([a-zA-Z0-9_-]+)['"]/g)];
    for (const m of fieldMatches) {
      if (m[1] !== docName) {
        fieldNames.add(m[1]);
      }
    }
    schemaDefinitions[docName] = Array.from(fieldNames);
  }
}

console.log('Detected schemas:', Object.keys(schemaDefinitions));

const data = JSON.parse(fs.readFileSync('scripts/dataset-health-audit.json', 'utf8'));

console.log('\n=============================================');
console.log('1. AUDIT OF ALL 5 DRAFT DOCUMENTS:');
console.log('=============================================');

for (const d of data.drafts) {
  console.log(`\nDraft ID: ${d.draftId}`);
  console.log(`Base ID: ${d.publishedId}`);
  console.log(`Type: ${d.type}`);
  console.log(`Last Modified: ${d.draftUpdatedAt}`);
  console.log(`Published Exists: ${d.publishedExists} (Published updatedAt: ${d.publishedUpdatedAt})`);
  
  const schemaFields = schemaDefinitions[d.type] || [];
  const unknownFields = d.draftKeys.filter(k => !schemaFields.includes(k));
  console.log(`Schema fields count for ${d.type}: ${schemaFields.length}`);
  console.log(`Draft keys:`, d.draftKeys);
  console.log(`Unknown root fields:`, unknownFields);

  // Compare draft vs published content
  const draftDate = new Date(d.draftUpdatedAt);
  const pubDate = d.publishedUpdatedAt ? new Date(d.publishedUpdatedAt) : null;
  let recency = 'No published version';
  if (pubDate) {
    if (draftDate > pubDate) recency = `NEWER than published by ${Math.round((draftDate - pubDate)/(1000*60))} mins`;
    else if (draftDate < pubDate) recency = `OLDER than published by ${Math.round((pubDate - draftDate)/(1000*60*60*24))} days`;
    else recency = 'IDENTICAL timestamp';
  }
  console.log(`Recency: ${recency}`);
}

console.log('\n=============================================');
console.log('2. AUDIT OF TARGET SINGLETON DOCUMENTS:');
console.log('=============================================');

for (const s of data.singletons) {
  console.log(`\nSingleton: ${s.id} (Expected Type: ${s.expectedType})`);
  console.log(`Published Exists: ${s.publishedExists} (Type: ${s.actualPublishedType}, Updated: ${s.publishedUpdatedAt})`);
  console.log(`Draft Exists: ${s.draftExists} (Updated: ${s.draftUpdatedAt})`);
  
  const schemaFields = schemaDefinitions[s.expectedType] || [];
  const unknownPubFields = s.publishedKeys.filter(k => !schemaFields.includes(k));
  console.log(`Published unknown fields:`, unknownPubFields.length > 0 ? unknownPubFields : 'NONE (PASS)');
}
