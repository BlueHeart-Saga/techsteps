import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'customLink',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page Reference', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalRef',
      title: 'Internal Page',
      type: 'reference',
      to: [
        { type: 'service' },
        { type: 'sector' },
        { type: 'division' },
        { type: 'article' },
        { type: 'caseStudy' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External or Direct URL',
      type: 'string',
      description: 'e.g. /about-us, /contact, or https://...',
      hidden: ({ parent }) => parent?.linkType === 'internal',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'externalUrl',
    },
  },
});
