export default {
  name: 'article',
  title: 'Article / Insight',
  type: 'document',
  fields: [
    { name: 'title', title: 'Article Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3 },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'author', title: 'Author Name', type: 'string' },
    { name: 'authorRole', title: 'Author Role', type: 'string' },
    { name: 'publishedDate', title: 'Published Date', type: 'date' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'readTime', title: 'Read Time', type: 'string', initialValue: '5 min read' },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    { name: 'metaTitle', title: 'SEO Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 3 },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
};
