export default {
  name: 'sector',
  title: 'Sector',
  type: 'document',
  fields: [
    { name: 'title', title: 'Sector Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'tagline', title: 'Tagline', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroAlt', title: 'Hero Image Alt Text', type: 'string' },
    {
      name: 'complianceStandards',
      title: 'Compliance Standards & Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'challenges',
      title: 'Industry Challenges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Challenge Title', type: 'string' },
            { name: 'description', title: 'Challenge Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'solutions',
      title: 'Tailored Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Solution Title', type: 'string' },
            { name: 'description', title: 'Solution Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'securityConsiderations',
      title: 'Key Security Considerations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'howTechstepsHelps', title: 'How Techsteps Helps', type: 'text', rows: 4 },
    {
      name: 'keyBenefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'relevantServices',
      title: 'Relevant Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
    {
      name: 'faqs',
      title: 'Sector Specific FAQs',
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
    { name: 'metaTitle', title: 'SEO Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 3 },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
    },
  },
};
