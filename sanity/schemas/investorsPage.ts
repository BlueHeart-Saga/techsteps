import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'investorsPage',
  title: 'Investors Page',
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'INVESTOR RELATIONS' }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Defensible Market Moats & Resilient Returns' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Operational & Financial Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'prefix', title: 'Prefix', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'strategicPillars',
      title: 'Strategic Pillars (Market Moats)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Pillar Number', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'headline', title: 'Headline', type: 'string' }),
            defineField({ name: 'desc', title: 'Short Lead', type: 'string' }),
            defineField({ name: 'detail', title: 'Detail Description', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'investmentCase',
      title: 'Investment Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Highlight Title', type: 'string' }),
            defineField({ name: 'description', title: 'Highlight Description', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'irContact',
      title: 'Investor Relations Contact Info',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'email', title: 'IR Email', type: 'string' }),
        defineField({ name: 'phone', title: 'IR Phone', type: 'string' }),
        defineField({ name: 'address', title: 'Corporate Registrar Address', type: 'text', rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Investors Page',
        subtitle: 'Investment Case & Operational Governance',
      };
    },
  },
});
