import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'leadershipPage',
  title: 'Leadership Page',
  type: 'document',

  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      initialValue: 'Leadership — TechSteps',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Meet the leadership team behind TechSteps and our commitment to secure, responsible and sustainable IT asset management.',
    }),

    // 1. HERO SECTION
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'OUR LEADERSHIP' }),
        defineField({ name: 'title', title: 'Main Heading (Part 1)', type: 'string', initialValue: 'Leadership with' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Text (Part 2)', type: 'string', initialValue: 'purpose.' }),
        defineField({ name: 'subtitle', title: 'Subtitle Description', type: 'text', rows: 3 }),
        defineField({ name: 'imageUrl', title: 'Hero Image URL', type: 'string', initialValue: '/images/leadership/leadership-hero.png' }),
        defineField({ name: 'image', title: 'Hero Image (Sanity Upload)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', initialValue: 'TechSteps leadership team' }),
      ],
    }),

    // 2. INTRO / APPROACH SECTION
    defineField({
      name: 'intro',
      title: 'Intro & Approach Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'OUR APPROACH' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Leadership that puts' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'responsibility into action.' }),
        defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text', rows: 4 }] }),
      ],
    }),

    // 3. TEAM MEMBERS SECTION
    defineField({
      name: 'team',
      title: 'Team Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'THE PEOPLE BEHIND TECHSTEPS' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Experience that' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'moves us forward.' }),
        defineField({ name: 'subtitle', title: 'Subtitle Description', type: 'text', rows: 2 }),
        defineField({
          name: 'members',
          title: 'Leadership Members',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Leader Name', type: 'string', initialValue: 'Leadership Name' }),
                defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
                defineField({ name: 'bio', title: 'Bio Description', type: 'text', rows: 3 }),
                defineField({ name: 'imageUrl', title: 'Photo URL', type: 'string' }),
                defineField({ name: 'image', title: 'Photo (Upload)', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'imageAlt', title: 'Photo Alt Text', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // 4. PRINCIPLES SECTION
    defineField({
      name: 'principles',
      title: 'Guiding Principles Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'WHAT GUIDES US' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Principles that' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'shape our leadership.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'items',
          title: 'Principle Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
                defineField({ name: 'title', title: 'Principle Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),

    // 5. LEADERSHIP IN ACTION
    defineField({
      name: 'action',
      title: 'Leadership in Action Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'LEADERSHIP IN ACTION' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Turning responsible' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'ideas into action.' }),
        defineField({ name: 'badgeNumber', title: 'Badge Number', type: 'string', initialValue: '01' }),
        defineField({ name: 'badgeText', title: 'Badge Text', type: 'string', initialValue: 'ONE TEAM ONE PURPOSE' }),
        defineField({ name: 'imageUrl', title: 'Action Image URL', type: 'string', initialValue: '/images/leadership/leadership-action.webp' }),
        defineField({ name: 'image', title: 'Action Image (Upload)', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', initialValue: 'TechSteps team working together' }),
        defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text', rows: 4 }] }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Talk to our team' }),
        defineField({ name: 'linkUrl', title: 'Link URL', type: 'string', initialValue: '/contact' }),
      ],
    }),

    // 6. OUR COMMITMENT
    defineField({
      name: 'commitment',
      title: 'Our Commitment Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'OUR COMMITMENT' }),
        defineField({ name: 'title', title: 'Heading (Part 1)', type: 'string', initialValue: 'Leading with a focus on' }),
        defineField({ name: 'highlightedTitle', title: 'Highlighted Heading (Part 2)', type: 'string', initialValue: 'what matters most.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'cards',
          title: 'Commitment Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Number (01, 02, 03)', type: 'string' }),
                defineField({ name: 'icon', title: 'Icon (e.g. ♧, ◌, ⌁)', type: 'string' }),
                defineField({ name: 'title', title: 'Card Title', type: 'string' }),
                defineField({ name: 'description', title: 'Card Description', type: 'text', rows: 3 }),
                defineField({ name: 'isFeatured', title: 'Is Featured Card (Center)', type: 'boolean', initialValue: false }),
              ],
            },
          ],
        }),
      ],
    }),

    // 7. CTA
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'CTA Title', type: 'string', initialValue: "Let's Build a More Responsible Technology Future" }),
        defineField({ name: 'description', title: 'CTA Description', type: 'text', rows: 3 }),
        defineField({ name: 'primaryText', title: 'Primary Button Text', type: 'string', initialValue: 'Talk to Our Team' }),
        defineField({ name: 'primaryHref', title: 'Primary Button Link', type: 'string', initialValue: '/contact' }),
        defineField({ name: 'secondaryText', title: 'Secondary Button Text', type: 'string', initialValue: 'Request a Collection' }),
        defineField({ name: 'secondaryHref', title: 'Secondary Button Link', type: 'string', initialValue: '/request-a-collection' }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title ? `Leadership: ${title}` : 'Leadership Page',
        subtitle: subtitle || 'Leadership Team & Commitment',
      };
    },
  },
});
