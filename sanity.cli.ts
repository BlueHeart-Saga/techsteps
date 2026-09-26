import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'zjv69ibt',
    dataset: process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'techsteps',
  },
  deployment: {
    appId: 'qya3cdy9r610mfdi1uqyvz4h',
    autoUpdates: true,
  },
});
