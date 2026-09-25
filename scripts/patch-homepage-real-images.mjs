import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { createClient } from '@sanity/client';
import { readFileSync, createReadStream } from 'fs';
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

async function main() {
  const hp = await client.fetch('*[_type == "homePage"][0]');
  const cards = hp.services?.cards || [];

  // Card 0: Information Management
  if (!cards[0].image?.asset?._ref) {
    console.log('Uploading document-storage-warehouse.jpg for card 0...');
    const asset0 = await client.assets.upload('image', createReadStream('public/images/services/document-storage-warehouse.jpg'), {
      filename: 'document-storage-warehouse.jpg',
    });
    cards[0].image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset0._id },
    };
    console.log('Card 0 image attached:', asset0._id);
  }

  // Card 1: IT Lifecycle Services
  if (!cards[1].image?.asset?._ref) {
    console.log('Uploading image2.jpg for card 1...');
    const asset1 = await client.assets.upload('image', createReadStream('public/images/services/image2.jpg'), {
      filename: 'image2.jpg',
    });
    cards[1].image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset1._id },
    };
    console.log('Card 1 image attached:', asset1._id);
  }

  // Card 2: Secure Shredding
  if (!cards[2].image?.asset?._ref) {
    console.log('Uploading process-step-3-sanitise.jpg for card 2...');
    const asset2 = await client.assets.upload('image', createReadStream('public/images/services/process-step-3-sanitise.jpg'), {
      filename: 'process-step-3-sanitise.jpg',
    });
    cards[2].image = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset2._id },
    };
    console.log('Card 2 image attached:', asset2._id);
  }

  await client.patch(hp._id).set({ 'services.cards': cards }).commit();
  console.log('✓ Successfully attached all images to homePage cards in Sanity!');
}

main().catch(console.error);
