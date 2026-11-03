import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ourCommitmentPage',
  title: 'Our Commitment Page',
  type: 'document',

  fields: [
    // SEO
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      initialValue: 'Our Commitment to Security, Quality & Sustainability — TechSteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'At TechSteps, our commitment goes beyond delivering services. We focus on protecting sensitive information, managing technology responsibly, maintaining operational accountability and helping organisations achieve sustainable outcomes.',
    }),

    // Hero Section
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'CORE VALUES & GOVERNANCE',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'Our Commitment',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'A formal pledge to uncompromising information security, operational excellence, circular resource recovery, and social responsibility across every asset we touch.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Governance, Ethics & Trust',
    }),

    // Commitments
    defineField({
      name: 'commitments',
      title: 'Five Pillar Commitments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
            defineField({ name: 'title', title: 'Commitment Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
            defineField({ name: 'desc', title: 'Detailed Description', type: 'text', rows: 4 }),
            defineField({
              name: 'bullets',
              title: 'Key Assurances (Bullets)',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({ name: 'icon', title: 'Icon Identifier (shield, gear, leaf, users, scale)', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
            },
          },
        },
      ],
    }),

    // Principles
    defineField({
      name: 'principles',
      title: 'Four Core Operational Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Principle Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'icon', title: 'Icon (clipboard-check, eye, trending-up, award)', type: 'string' }),
          ],
        },
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Commitment FAQs',
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
