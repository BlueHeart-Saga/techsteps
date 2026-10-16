import fs from 'fs';

const analysis = JSON.parse(fs.readFileSync('scripts/service-drafts-comparison.json', 'utf8'));

for (const [id, data] of Object.entries(analysis)) {
  console.log(`\n======================================================`);
  console.log(`SERVICE: ${id}`);
  console.log(`Draft Modified: ${data.draftUpdatedAt}`);
  console.log(`Published Modified: ${data.publishedUpdatedAt}`);
  console.log(`Total Differing Fields: ${data.totalDiffFields}`);
  console.log(`======================================================`);

  for (const diff of data.fieldComparisons) {
    console.log(`\nField: "${diff.key}"`);
    console.log(`- Draft Value:    `, typeof diff.draftValue === 'object' ? JSON.stringify(diff.draftValue).slice(0, 100) : diff.draftValue);
    console.log(`- Published Value:`, typeof diff.publishedValue === 'object' ? JSON.stringify(diff.publishedValue).slice(0, 100) : diff.publishedValue);
  }
}
