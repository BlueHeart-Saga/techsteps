export default {
  name: 'legalPage',
  title: 'Legal & Governance Policy',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'subheading', title: 'Subheading', type: 'text', rows: 3 },
    { name: 'metaTitle', title: 'SEO Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 3 },
    { name: 'complianceBadge', title: 'Compliance Badge Text', type: 'string' },
    { name: 'lastUpdated', title: 'Last Updated Date / Text', type: 'string' },
    {
      name: 'sections',
      title: 'Policy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Section Heading', type: 'string' },
            { name: 'body', title: 'Body Text / Paragraphs', type: 'text', rows: 6 },
            {
              name: 'callout',
              title: 'Callout Box (e.g. Data Controller / Statutory info)',
              type: 'object',
              fields: [
                { name: 'title', title: 'Callout Title', type: 'string' },
                {
                  name: 'items',
                  title: 'Callout Key-Value Items',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'value', title: 'Value', type: 'string' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'cards',
              title: 'Structured Info Cards',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Card Title', type: 'string' },
                    { name: 'description', title: 'Card Description', type: 'text', rows: 3 },
                  ],
                },
              ],
            },
            {
              name: 'listItems',
              title: 'Key Point List Items (Bullet / Numbered)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Bold Label / Prefix', type: 'string' },
                    { name: 'text', title: 'Description Text', type: 'text', rows: 2 },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'body',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'complianceBadge',
    },
  },
};
