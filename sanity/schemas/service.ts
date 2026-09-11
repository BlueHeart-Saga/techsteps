export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Service Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'division', title: 'Operational Division', type: 'reference', to: [{ type: 'division' }], validation: (Rule: any) => Rule.required() },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroAlt', title: 'Hero Image Alt Text', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'customerProblem', title: 'Customer Problem', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'solution', title: 'Our Solution', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    {
      name: 'keyBenefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'process',
      title: 'Certified Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'number' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'capabilities',
      title: 'Operational Capabilities & Accreditations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
          ],
        },
      ],
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
    {
      name: 'relatedSectors',
      title: 'Target Sectors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sector' }] }],
    },
    { name: 'metaTitle', title: 'SEO Meta Title', type: 'string', validation: (Rule: any) => Rule.max(70) },
    { name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.max(160) },
    { name: 'noIndex', title: 'Exclude from Search Engines (noindex)', type: 'boolean', initialValue: false },
  ],
};
