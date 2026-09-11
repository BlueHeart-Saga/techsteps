import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Techsteps Content Studio',

  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'zjv69ibt',
  dataset: process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'techsteps',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
