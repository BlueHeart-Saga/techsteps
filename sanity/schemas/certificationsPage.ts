import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'certificationsPage',
  title: 'Certifications & Accreditations Page',
  type: 'document',

  fields: [
    // SEO
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      initialValue: 'Certifications & Accreditations — TechSteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Comprehensive register of TechSteps accreditations and certifications including ISO 27001, ISO 9001, ISO 14001, ISO 45001, ADISA, BS EN 15713, and Cyber Essentials Plus.',
    }),

    // Hero Section
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'INDEPENDENTLY AUDITED TRUST',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'Certifications & Accreditations',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Independently audited by UKAS-accredited certification bodies and government authorities, ensuring complete compliance and uncompromised security.',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: '100% Certified Compliance',
    }),

    // Accreditations Directory
    defineField({
      name: 'accreditations',
      title: 'Accreditation Register',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Accreditation Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'categoryGroup',
              title: 'Category Group',
              type: 'string',
              options: {
                list: [
                  { title: 'Security & Sanitisation', value: 'security' },
                  { title: 'Quality & Vetting', value: 'quality' },
                  { title: 'Environmental & ESG', value: 'environmental' },
                  { title: 'Public Sector Frameworks', value: 'public' },
                ],
              },
            }),
            defineField({ name: 'categoryLabel', title: 'Category Label', type: 'string' }),
            defineField({ name: 'authority', title: 'Auditing Authority', type: 'string' }),
            defineField({ name: 'logoUrl', title: 'Logo Image URL', type: 'string' }),
            defineField({ name: 'logo', title: 'Logo Image (Upload)', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'desc', title: 'Detailed Description', type: 'text', rows: 3 }),
            defineField({ name: 'quote', title: 'Highlight Quote / Statement', type: 'text', rows: 2 }),
            defineField({ name: 'standardCode', title: 'Standard Code / Identifier', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'standardCode',
            },
          },
        },
      ],
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Compliance Metrics / Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Stat Value', type: 'string' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
        },
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Certifications & Audit FAQs',
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
