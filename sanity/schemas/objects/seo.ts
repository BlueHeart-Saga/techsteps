import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optimal length: 50-60 characters',
      validation: (Rule) => Rule.max(70).warning('Titles longer than 70 characters may be truncated'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optimal length: 150-160 characters',
      validation: (Rule) => Rule.max(160).warning('Descriptions longer than 160 characters may be truncated'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OpenGraph / Social Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Optional: specify only if this page is a duplicate or alias of another',
    }),
    defineField({
      name: 'noIndex',
      title: 'Exclude from Search Engines (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
