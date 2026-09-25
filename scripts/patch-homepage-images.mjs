import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { createClient } from '@sanity/client';
import { readFileSync, createReadStream, existsSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function uploadImage(localPath, filename) {
  if (!existsSync(localPath)) {
    console.error('File does not exist:', localPath);
    return null;
  }
  console.log(`Uploading ${localPath}...`);
  const asset = await client.assets.upload('image', createReadStream(localPath), {
    filename,
  });
  console.log(`Uploaded ${filename} -> ${asset._id}`);
  return asset._id;
}

async function main() {
  const hp = await client.fetch('*[_type == "homePage"][0]');
  if (!hp) {
    console.error('homePage document not found!');
    return;
  }

  const cards = hp.services?.cards || [];
  console.log(`Current cards count: ${cards.length}`);

  // Card 0: Information Management -> /images/services/document-storage.jpg
  // Card 1: IT Lifecycle Services & Destruction -> /images/services/itad.jpg
  // Card 2: Secure Shredding & Document Integrity -> /images/services/hard-drive-destruction.jpg
  // Card 3: Moving & Relocation Services -> /images/services/it-relocations.jpg

  const imageFiles = [
    { idx: 0, path: 'public/images/services/document-storage.jpg', name: 'document-storage.jpg' },
    { idx: 1, path: 'public/images/services/itad.jpg', name: 'itad.jpg' },
    { idx: 2, path: 'public/images/services/hard-drive-destruction.jpg', name: 'hard-drive-destruction.jpg' },
    { idx: 3, path: 'public/images/services/it-relocations.jpg', name: 'it-relocations.jpg' },
  ];

  for (const item of imageFiles) {
    if (cards[item.idx]) {
      if (!cards[item.idx].image?.asset?._ref) {
        const assetId = await uploadImage(item.path, item.name);
        if (assetId) {
          cards[item.idx].image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          };
          console.log(`Attached image to card ${item.idx}: ${cards[item.idx].title}`);
        }
      } else {
        console.log(`Card ${item.idx} already has image: ${cards[item.idx].image.asset._ref}`);
      }
    }
  }

  await client.patch(hp._id).set({ 'services.cards': cards }).commit();
  console.log('✓ Successfully updated homePage services cards in Sanity!');
}

main().catch(console.error);
