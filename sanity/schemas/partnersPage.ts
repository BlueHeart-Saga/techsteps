import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'partnersPage',
  title: 'Partners & Associations Page',
  type: 'document',

  fields: [
    // SEO
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      initialValue: 'Partners & Associations — TechSteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Explore TechSteps strategic technology partners, industry associations, and public framework memberships driving responsible IT asset management across the UK.',
    }),

    // Hero Section
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'STRATEGIC ALLIANCES & ACCREDITATIONS',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'Partners & Associations',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Collaborating with world-class security vendors, environmental bodies, and statutory governance frameworks to uphold the UK’s highest chain-of-custody standards.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Nationwide Assured Alliances',
    }),

    // Partners Directory
    defineField({
      name: 'partners',
      title: 'Partners & Industry Alliances',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Partner / Body Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({ name: 'authority', title: 'Accrediting Authority / Standard', type: 'string' }),
            defineField({ name: 'logoUrl', title: 'Logo Image URL', type: 'string' }),
            defineField({ name: 'logo', title: 'Logo Image (Upload)', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'desc', title: 'Detailed Description', type: 'text', rows: 3 }),
            defineField({ name: 'quote', title: 'Highlight Quote / Statement', type: 'text', rows: 2 }),
            defineField({ name: 'badge', title: 'Pill Badge Text', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
            },
          },
        },
      ],
    }),

    // Collaborative Impact Stats
    defineField({
      name: 'stats',
      title: 'Collaborative Impact Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Stat Value (e.g. 100%, 0)', type: 'string' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
            defineField({ name: 'description', title: 'Context / Explanation', type: 'string' }),
          ],
        },
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Partnership & Framework FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'metaTitle',
    },
  },
});
