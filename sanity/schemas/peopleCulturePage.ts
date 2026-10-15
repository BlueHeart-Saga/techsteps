import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'peopleCulturePage',
  title: 'Our People & Culture Page',
  type: 'document',
  fields: [
    // 1. SEO
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      initialValue: 'Our People & Culture — TechSteps UK',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'Discover the culture, people, and values powering TechSteps UK. Security-vetted professionals dedicated to responsible technology lifecycle management.',
    }),

    // 2. HERO
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'OUR PEOPLE & CULTURE' }),
        defineField({ name: 'title', title: 'Title (Part 1)', type: 'string', initialValue: 'Powered by people.' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Title (Part 2)', type: 'string', initialValue: 'Defined by purpose.' }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Behind every securely retired device and every sustainable outcome is a dedicated team of security-vetted specialists, engineers and logistics professionals.',
        }),
        defineField({ name: 'imageUrl', title: 'Hero Image URL', type: 'string', initialValue: '/images/about/who-we-are-technician.png' }),
        defineField({ name: 'image', title: 'Hero Image (Upload)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', initialValue: 'TechSteps technician handling technology equipment' }),
      ],
    }),

    // 3. OUR PEOPLE
    defineField({
      name: 'people',
      title: 'Our People Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'THE TEAM BEHIND THE STANDARDS' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Expertise that safeguards' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'every step.' }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        }),
        defineField({
          name: 'stats',
          title: 'Team & Compliance Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Stat Value', type: 'string' }),
                defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
                defineField({ name: 'subtext', title: 'Subtext / Detail', type: 'string' }),
              ],
            },
          ],
        }),
        defineField({ name: 'imageUrl', title: 'Section Image URL', type: 'string', initialValue: '/images/brand/milestone-team.jpg' }),
        defineField({ name: 'image', title: 'Section Image (Upload)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', initialValue: 'TechSteps operational team' }),
      ],
    }),

    // 4. OUR CULTURE
    defineField({
      name: 'culture',
      title: 'Our Culture Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'OUR VALUES IN PRACTICE' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'A culture built on trust,' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'precision and care.' }),
        defineField({ name: 'subtitle', title: 'Subtitle Description', type: 'text', rows: 2 }),
        defineField({
          name: 'pillars',
          title: 'Culture Pillars',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
                defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'icon', title: 'Icon identifier / Badge', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // 5. HOW WE WORK
    defineField({
      name: 'howWeWork',
      title: 'How We Work Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'OUR COLLABORATIVE APPROACH' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'How our teams deliver' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'consistent excellence.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'steps',
          title: 'Workflow Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'stepNumber', title: 'Step Number', type: 'string' }),
                defineField({ name: 'title', title: 'Step Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'badge', title: 'Highlight Badge', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // 6. LEARNING & DEVELOPMENT
    defineField({
      name: 'learningDevelopment',
      title: 'Learning & Development Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'CONTINUOUS IMPROVEMENT' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Investing in our people,' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'mastering standards.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Growth & Training Programs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Program Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'badge', title: 'Category Badge', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // 7. PEOPLE, PLANET & PROGRESS
    defineField({
      name: 'peoplePlanetProgress',
      title: 'People, Planet & Progress Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'SUSTAINABILITY & PURPOSE' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'People. Planet.' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'Progress.' }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        }),
        defineField({
          name: 'metrics',
          title: 'Impact Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Metric Number (e.g. 100K+)', type: 'string' }),
                defineField({ name: 'label', title: 'Metric Label', type: 'string' }),
              ],
            },
          ],
        }),
        defineField({ name: 'imageUrl', title: 'Impact Image URL', type: 'string', initialValue: '/images/about/People. Planet. Progress. (1).webp' }),
        defineField({ name: 'image', title: 'Impact Image (Upload)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', initialValue: 'People, Planet, Progress impact visualization' }),
      ],
    }),

    // 8. CTA
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Join Us in Shaping a Responsible Technology Lifecycle' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Discover career opportunities with TechSteps or partner with our team of security and sustainability specialists.',
        }),
        defineField({ name: 'primaryText', title: 'Primary Button Text', type: 'string', initialValue: 'Contact Our Team' }),
        defineField({ name: 'primaryHref', title: 'Primary Button URL', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'secondaryText', title: 'Secondary Button Text', type: 'string', initialValue: 'Explore Sustainability' }),
        defineField({ name: 'secondaryHref', title: 'Secondary Button URL', type: 'string', initialValue: '/sustainability' }),
      ],
    }),
  ],
});
