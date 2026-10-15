import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve, basename } from 'path';

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: process.env.SANITY_DATASET || 'techsteps',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const sectorImageFiles = {
  'defence': 'public/images/sectors/defence(1).webp',
  'nhs': 'public/images/sectors/healthcare.webp',
  'finance': 'public/images/sectors/finance.webp',
  'central-government': 'public/images/sectors/government.webp',
  'education-universities': 'public/images/sectors/education(1).webp',
  'education': 'public/images/sectors/education(1).webp',
  'legal-professional-services': 'public/images/sectors/corporate(1).webp',
  'legal-professional-sector': 'public/images/sectors/corporate(1).webp',
  'manufacturing-engineering': 'public/images/sectors/manufacturing(1).webp',
  'manufacturing': 'public/images/sectors/manufacturing(1).webp',
  'it-technology': 'public/images/sectors/It.webp',
  'technology': 'public/images/sectors/It.webp',
};

async function main() {
  console.log('Querying existing sector documents in Sanity...');
  const sectors = await client.fetch(`*[_type == "sector"]{ _id, title, "slug": slug.current, heroImage }`);
  console.log(`Found ${sectors.length} sector documents:`);
  for (const s of sectors) {
    console.log(` - [${s._id}] slug: "${s.slug}" title: "${s.title}"`);
  }

  // Cache uploaded assets to avoid duplicate uploads
  const assetMap = {};

  for (const s of sectors) {
    const filePath = sectorImageFiles[s.slug];
    if (!filePath) {
      console.log(`No mapping for slug "${s.slug}", skipping...`);
      continue;
    }

    const fullPath = resolve(process.cwd(), filePath);
    if (!assetMap[filePath]) {
      console.log(`Uploading ${filePath} to Sanity asset library...`);
      const fileBuffer = readFileSync(fullPath);
      const asset = await client.assets.upload('image', fileBuffer, {
        filename: basename(fullPath),
        contentType: 'image/webp',
      });
      assetMap[filePath] = asset;
      console.log(`Uploaded asset: ${asset._id} (${asset.url})`);
    }

    const asset = assetMap[filePath];
    console.log(`Patching sector ${s._id} (${s.slug}) with asset ${asset._id}...`);
    await client
      .patch(s._id)
      .set({
        heroImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit();
    console.log(`Sector ${s.slug} patched successfully.`);
  }

  console.log('Done patching Sanity sectors!');
}

main().catch(console.error);
