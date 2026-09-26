import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { deskStructure } from './sanity/deskStructure';

const projectId =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
  (typeof process !== 'undefined' && (process.env?.PUBLIC_SANITY_PROJECT_ID || process.env?.SANITY_PROJECT_ID)) ||
  'zjv69ibt';

const dataset =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) ||
  (typeof process !== 'undefined' && (process.env?.PUBLIC_SANITY_DATASET || process.env?.SANITY_DATASET)) ||
  'techsteps';

export default defineConfig({
  name: 'default',
  title: 'Techsteps Content Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
