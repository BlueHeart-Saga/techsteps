import fs from 'fs';

const schemasDir = 'sanity/schemas';
const schemaFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const schemaDefinitions = {};

for (const file of schemaFiles) {
  const content = fs.readFileSync(schemasDir + '/' + file, 'utf8');
  const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
  if (nameMatch) {
    const docName = nameMatch[1];
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

const data = JSON.parse(fs.readFileSync('scripts/dataset-health-audit.json', 'utf8'));

// Check every published document in the dataset against its schema
const publishedDocsWithUnknowns = [];
for (const d of data.singletons) {
  if (!d.publishedExists) continue;
  const schemaFields = schemaDefinitions[d.expectedType] || [];
  const unknowns = d.publishedKeys.filter(k => !schemaFields.includes(k));
  if (unknowns.length > 0) {
    publishedDocsWithUnknowns.push({ id: d.id, type: d.expectedType, unknowns });
  }
}

console.log('Singleton published docs with unknown fields:', publishedDocsWithUnknowns);
