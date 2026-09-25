export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Service Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'division', title: 'Operational Division', type: 'reference', to: [{ type: 'division' }], validation: (Rule: any) => Rule.required() },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroAlt', title: 'Hero Image Alt Text', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3 },
    { name: 'customerProblem', title: 'Customer Problem', type: 'text', rows: 4 },
    { name: 'solution', title: 'Our Solution', type: 'text', rows: 4 },

    // Deep Service Details Content (matching serviceDetails.ts)
    { name: 'heroTag', title: 'Hero Tag', type: 'string' },
    { name: 'heroTitle', title: 'Hero Title', type: 'string' },
    { name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 },

    { name: 'aboutBadge', title: 'About Badge', type: 'string' },
    { name: 'aboutTitle', title: 'About Title', type: 'string' },
    {
      name: 'aboutParagraphs',
      title: 'About Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    },
    {
      name: 'aboutBullets',
      title: 'About Bullets',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'aboutImage', title: 'About Section Image URL', type: 'string' },
    { name: 'aboutImageAlt', title: 'About Section Image Alt', type: 'string' },

    { name: 'whyTitle', title: 'Why Choose Section Title', type: 'string' },
    { name: 'whySubtitle', title: 'Why Choose Section Subtitle', type: 'text', rows: 2 },
    {
      name: 'whyPoints',
      title: 'Why Choose Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number (e.g. 01)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },

    { name: 'processBadge', title: 'Process Section Badge', type: 'string' },
    { name: 'processTitle', title: 'Process Section Title', type: 'string' },
    { name: 'processSubtitle', title: 'Process Section Subtitle', type: 'text', rows: 2 },
    {
      name: 'processSteps',
      title: 'Detailed Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number (e.g. 01)', type: 'string' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },

    { name: 'businessNeedsTitle', title: 'Business Needs Section Title', type: 'string' },
    { name: 'businessNeedsSubtitle', title: 'Business Needs Section Subtitle', type: 'text', rows: 2 },
    {
      name: 'businessNeedsCards',
      title: 'Business Needs Sector Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card Title', type: 'string' },
            { name: 'description', title: 'Card Description', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon (e.g. legal, health, finance, corporate)', type: 'string' },
          ],
        },
      ],
    },

    { name: 'faqBadge', title: 'FAQ Badge', type: 'string' },
    { name: 'faqTitle', title: 'FAQ Title', type: 'string' },
    { name: 'faqSubtitle', title: 'FAQ Subtitle', type: 'text', rows: 2 },

    {
      name: 'keyBenefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'process',
      title: 'Certified Process Steps (Legacy)',
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
            { name: 'tag', title: 'Category Tag', type: 'string' },
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
  preview: {
    select: {
      title: 'title',
      division: 'division.title',
    },
    prepare({ title, division }: any) {
      return {
        title: title || 'Service',
        subtitle: division ? `Division: ${division}` : 'Service Specification',
      };
    },
  },
};
