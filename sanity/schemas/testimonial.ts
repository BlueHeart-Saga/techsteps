import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Author Job Title / Role',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company / Organisation',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      title: 'Industry Sector',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'avatar',
      title: 'Author Photo / Company Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      media: 'avatar',
    },
  },
});
