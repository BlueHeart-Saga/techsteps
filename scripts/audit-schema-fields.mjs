import fs from 'fs';
import path from 'path';

const schemaFiles = fs.readdirSync('sanity/schemas')
  .filter(f => f.endsWith('.ts') && f !== 'index.ts');

console.log('=== AUDITING ALL SANITY SCHEMAS & FIELDS ===');

const allFields = [];

for (const file of schemaFiles) {
  const content = fs.readFileSync(path.join('sanity/schemas', file), 'utf8');
  const typeName = file.replace('.ts', '');
  
  // Extract field names
  const fieldMatches = content.matchAll(/name:\s*['"]([a-zA-Z0-9_-]+)['"]/g);
  for (const m of fieldMatches) {
    const fName = m[1];
    if (fName !== typeName && fName !== 'document' && fName !== 'object') {
      allFields.push({ schema: file, field: fName });
    }
  }
}

console.log(`Total fields found across ${schemaFiles.length} schemas: ${allFields.length}`);

// Check for suspicious field names
const suspicious = allFields.filter(f => 
  f.field.toLowerCase().includes('old') ||
  f.field.toLowerCase().includes('legacy') ||
  f.field.toLowerCase().includes('unused') ||
  f.field.toLowerCase().includes('deprecated') ||
  f.field.toLowerCase().includes('temp') ||
  f.field.toLowerCase().includes('test')
);

console.log('Suspicious field names (old/legacy/unused/deprecated):', suspicious);

// Check if any field is nowhere to be found in src/
const clientTs = fs.readFileSync('src/lib/sanity/client.ts', 'utf8');
const typesTs = fs.readFileSync('src/lib/sanity/types.ts', 'utf8');
const dataTs = fs.readFileSync('src/lib/sanity/data.ts', 'utf8');

// Find fields in each schema and their usage
const schemaUsage = {};
for (const sf of schemaFiles) {
  schemaUsage[sf] = [];
  const content = fs.readFileSync(path.join('sanity/schemas', sf), 'utf8');
  const names = [...content.matchAll(/name:\s*['"]([a-zA-Z0-9_-]+)['"]/g)].map(m => m[1]);
  for (const n of names) {
    if (n === sf.replace('.ts', '') || n === 'document' || n === 'object') continue;
    const inClient = clientTs.includes(n);
    const inTypes = typesTs.includes(n);
    const inData = dataTs.includes(n);
    schemaUsage[sf].push({ field: n, inClient, inTypes, inData });
  }
}

fs.writeFileSync('scripts/schema-fields-usage.json', JSON.stringify(schemaUsage, null, 2));
console.log('Schema fields usage written to scripts/schema-fields-usage.json');
