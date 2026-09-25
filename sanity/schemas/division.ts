export default {
  name: 'division',
  title: 'Division',
  type: 'document',
  fields: [
    { name: 'title', title: 'Division Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3 },
    { name: 'icon', title: 'Icon Identifier', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },

    // Page Specific Content
    { name: 'heroTitle', title: 'Hero Heading', type: 'string' },
    { name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 },
    { name: 'heroCtaText', title: 'Hero CTA Button Text', type: 'string' },
    { name: 'heroCtaLink', title: 'Hero CTA Button Link', type: 'string' },

    { name: 'aboutBadge', title: 'About Section Badge', type: 'string' },
    { name: 'aboutTitle', title: 'About Section Title', type: 'string' },
    {
      name: 'aboutParagraphs',
      title: 'About Section Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    },

    {
      name: 'lifecycleStages',
      title: 'Lifecycle Stages (e.g. Information Lifecycle)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Stage ID', type: 'string' },
            { name: 'number', title: 'Stage Number', type: 'string' },
            { name: 'label', title: 'Stage Label', type: 'string' },
            { name: 'desc', title: 'Stage Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },

    {
      name: 'faqs',
      title: 'Division FAQs',
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
      subtitle: 'headline',
    },
  },
};
