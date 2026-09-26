import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sustainabilityPage',
  title: 'Sustainability & ESG Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'SUSTAINABILITY & ESG' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Circular IT & Zero Landfill Commitment' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Key ESG Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Metric Value', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Context / Subtext', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'lifecycleSteps',
      title: 'Circular Lifecycle Process Steps (7 Steps)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
            defineField({ name: 'desc', title: 'Short Description', type: 'text', rows: 2 }),
            defineField({ name: 'features', title: 'Feature Bullet Points', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'image', title: 'Step Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
            defineField({
              name: 'details',
              title: 'Extended Step Details',
              type: 'object',
              fields: [
                defineField({ name: 'headline', title: 'Headline', type: 'string' }),
                defineField({ name: 'bulletPoints', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'metric', title: 'Key Metric', type: 'string' }),
                defineField({ name: 'metricLabel', title: 'Metric Label', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'badge' },
          },
        },
      ],
    }),
    defineField({
      name: 'esgPillars',
      title: 'ESG Governance Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
            defineField({ name: 'description', title: 'Pillar Description', type: 'text', rows: 3 }),
            defineField({ name: 'tag', title: 'Badge / Tag', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'primaryButtonLabel', title: 'Primary Button Label', type: 'string' }),
        defineField({ name: 'primaryButtonUrl', title: 'Primary Button URL', type: 'string' }),
        defineField({ name: 'secondaryButtonLabel', title: 'Secondary Button Label', type: 'string' }),
        defineField({ name: 'secondaryButtonUrl', title: 'Secondary Button URL', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Sustainability Page',
        subtitle: 'Circular Economy & ESG Framework',
      };
    },
  },
});
