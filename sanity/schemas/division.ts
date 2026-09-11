export default {
  name: 'division',
  title: 'Division',
  type: 'document',
  fields: [
    { name: 'title', title: 'Division Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'headline', title: 'Headline', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'icon', title: 'Icon Identifier', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
  },
};
