export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',

  fields: [
    // =========================================================
    // SEO
    // =========================================================
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    },

    // =========================================================
    // HERO SECTION
    // =========================================================
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'ABOUT TECHSTEPS',
        },
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          rows: 3,
          initialValue:
            'Managing What Matters. Protecting What Comes Next.',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue:
            "We protect your business's critical assets — data, records, and hardware — handled securely and returned to value.",
        },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'imageAlt',
          title: 'Hero Image Alt Text',
          type: 'string',
        },
        {
          name: 'badge',
          title: 'Hero Badge',
          type: 'string',
          initialValue: 'CHAIN OF CUSTODY',
        },
      ],
    },

    // =========================================================
    // WHO WE ARE
    // =========================================================
    {
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'WHO WE ARE',
        },
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Technology With Purpose',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5,
        },
        {
          name: 'image',
          title: 'Who We Are Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
        },

        // Three small highlight items shown below the text
        {
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          validation: (Rule: any) => Rule.max(3),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'icon',
                  title: 'Icon Key',
                  type: 'string',
                  description:
                    'Example: shield, leaf, recycle',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // WHAT WE DO
    // =========================================================
    {
      name: 'whatWeDo',
      title: 'What We Do',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'WHAT WE DO',
        },
        {
          name: 'items',
          title: 'Service Cards',
          type: 'array',
          validation: (Rule: any) => Rule.max(3),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Card Number',
                  type: 'string',
                  placeholder: '01',
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 4,
                },
                {
                  name: 'image',
                  title: 'Card Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'imageAlt',
                  title: 'Image Alt Text',
                  type: 'string',
                },
                {
                  name: 'badge',
                  title: 'Image Badge',
                  type: 'string',
                },
                {
                  name: 'buttonText',
                  title: 'Button Text',
                  type: 'string',
                  initialValue: 'Explore services →',
                },
                {
                  name: 'buttonLink',
                  title: 'Button Link',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // OUR APPROACH
    // =========================================================
    {
      name: 'approach',
      title: 'Our Approach',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'OUR APPROACH',
        },
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Every job runs the same four ways.',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'steps',
          title: 'Approach Steps',
          type: 'array',
          validation: (Rule: any) => Rule.max(4),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Number',
                  type: 'string',
                  placeholder: '01',
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'icon',
                  title: 'Icon Key',
                  type: 'string',
                  description:
                    'Example: shield, lightbulb, recycle, chart',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // OUR CAPABILITIES
    // =========================================================
    {
      name: 'capabilities',
      title: 'Our Capabilities',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'OUR CAPABILITIES',
        },
        {
          name: 'items',
          title: 'Capability Items',
          type: 'array',
          validation: (Rule: any) => Rule.max(4),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'icon',
                  title: 'Icon Key',
                  type: 'string',
                  description:
                    'Example: people, shield, truck, globe',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // STATISTICS
    // =========================================================
    {
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      validation: (Rule: any) => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description:
                'Example: +, %, or leave empty',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },

    // =========================================================
    // FINAL CTA
    // =========================================================
    {
      name: 'cta',
      title: 'Final CTA',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'GET IN TOUCH WITH TECHSTEPS',
        },
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          rows: 2,
          initialValue: "Let's Talk About What Comes Next.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        },
        {
          name: 'image',
          title: 'CTA Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'imageAlt',
          title: 'CTA Image Alt Text',
          type: 'string',
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Talk to Techsteps →',
        },
        {
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string',
          initialValue: '/contact',
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Request a Collection',
        },
        {
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'string',
          initialValue: '/request-a-quote',
        },

        // Contact details shown below CTA
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'hours',
          title: 'Opening Hours',
          type: 'string',
        },
      ],
    },
  ],

  // =========================================================
  // SANITY PREVIEW
  // =========================================================
  preview: {
    select: {
      title: 'hero.headline',
      subtitle: 'hero.eyebrow',
      media: 'hero.image',
    },

    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'About Techsteps',
        subtitle: subtitle || 'About Us Page',
        media,
      };
    },
  },
};