import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',

    fields: [
        defineField({
            name: 'metaTitle',
            title: 'SEO Meta Title',
            type: 'string',
            description: 'Browser tab and search engine title',
        }),
        defineField({
            name: 'metaDescription',
            title: 'SEO Meta Description',
            type: 'text',
            rows: 3,
            description: 'Search engine description snippet',
        }),

        // =========================================================
        // HERO SECTION
        // =========================================================
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'eyebrow',
                    title: 'Eyebrow / Small Heading',
                    type: 'string',
                    description: 'Example: SUSTAINABLE IT RECYCLING',
                }),

                defineField({
                    name: 'heading',
                    title: 'Main Heading',
                    type: 'string',
                    description: 'Example: GIVING TECHNOLOGY A SECOND LIFE',
                }),

                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 3,
                }),

                defineField({
                    name: 'image',
                    title: 'Hero Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }),

                defineField({
                    name: 'imageAlt',
                    title: 'Hero Image Alt Text',
                    type: 'string',
                }),

                defineField({
                    name: 'buttonText',
                    title: 'Button Text',
                    type: 'string',
                }),

                defineField({
                    name: 'buttonLink',
                    title: 'Button Link',
                    type: 'string',
                }),

                defineField({
                    name: 'secondaryButtonText',
                    title: 'Secondary Button Text',
                    type: 'string',
                    initialValue: 'Contact Us',
                }),

                defineField({
                    name: 'secondaryButtonLink',
                    title: 'Secondary Button Link',
                    type: 'string',
                    initialValue: '/contact',
                }),

                defineField({
                    name: 'bgImageUrl',
                    title: 'Hero Desktop Background Image URL',
                    type: 'string',
                    initialValue: '/images/brand/hero section.webp',
                }),

                defineField({
                    name: 'mobileWorkerImageUrl',
                    title: 'Hero Mobile Worker Image URL',
                    type: 'string',
                    initialValue: '/images/brand/hero-worker-mobile.webp',
                }),
            ],
        }),

        // =========================================================
        // INTRODUCTION SECTION
        // =========================================================
        defineField({
            name: 'intro',
            title: 'Introduction Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    description: 'Example: Secure ITAD Services in the UK',
                }),

                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 6,
                }),
            ],
        }),

        // =========================================================
        // STATISTICS
        // =========================================================
        defineField({
            name: 'statistics',
            title: 'Homepage Statistics',
            type: 'array',
            of: [
                defineField({
                    name: 'stat',
                    title: 'Statistic',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'number',
                            title: 'Number',
                            type: 'string',
                            description: 'Example: 100',
                        }),

                        defineField({
                            name: 'suffix',
                            title: 'Suffix',
                            type: 'string',
                            description: 'Example: %, M+, +',
                        }),

                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'Example: Secure Disposal',
                        }),
                    ],

                    preview: {
                        select: {
                            number: 'number',
                            suffix: 'suffix',
                            label: 'label',
                        },
                        prepare({ number, suffix, label }) {
                            return {
                                title: `${number || ''}${suffix || ''}`,
                                subtitle: label || '',
                            };
                        },
                    },
                }),
            ],
        }),

        // =========================================================
        // SERVICES SECTION
        // =========================================================
        defineField({
            name: 'services',
            title: 'Services Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'eyebrow',
                    title: 'Small Heading',
                    type: 'string',
                    description: 'Example: OUR SERVICES',
                }),

                defineField({
                    name: 'heading',
                    title: 'Main Heading',
                    type: 'string',
                    description:
                        'Example: SOLUTIONS FOR THE COMPLETE BUSINESS LIFECYCLE',
                }),

                defineField({
                    name: 'cards',
                    title: 'Service Cards',
                    type: 'array',
                    of: [
                        defineField({
                            name: 'card',
                            title: 'Service Card',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'divisionNumber',
                                    title: 'Division Number',
                                    type: 'string',
                                    description: 'Example: DIVISION 01',
                                }),

                                defineField({
                                    name: 'title',
                                    title: 'Title',
                                    type: 'string',
                                }),

                                defineField({
                                    name: 'description',
                                    title: 'Description',
                                    type: 'text',
                                    rows: 3,
                                }),

                                defineField({
                                    name: 'image',
                                    title: 'Card Image',
                                    type: 'image',
                                    options: {
                                        hotspot: true,
                                    },
                                }),

                                defineField({
                                    name: 'imageAlt',
                                    title: 'Image Alt Text',
                                    type: 'string',
                                }),

                                defineField({
                                    name: 'buttonText',
                                    title: 'Button Text',
                                    type: 'string',
                                    initialValue: 'Explore',
                                }),

                                defineField({
                                    name: 'link',
                                    title: 'Card Link',
                                    type: 'string',
                                }),
                            ],

                            preview: {
                                select: {
                                    title: 'title',
                                    subtitle: 'divisionNumber',
                                    media: 'image',
                                },
                            },
                        }),
                    ],
                }),

                defineField({
                    name: 'viewAllText',
                    title: 'View All Button Text',
                    type: 'string',
                    description: 'Example: EXPLORE ALL 27 CERTIFIED SERVICES →',
                }),

                defineField({
                    name: 'viewAllLink',
                    title: 'View All Button Link',
                    type: 'string',
                }),
            ],
        }),

        // =========================================================
        // LIFECYCLE SECTION
        // =========================================================
        defineField({
            name: 'lifecycle',
            title: 'Certified Lifecycle Process',
            type: 'object',
            fields: [
                defineField({
                    name: 'eyebrow',
                    title: 'Small Heading',
                    type: 'string',
                }),

                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    description: 'Example: Our Certified Lifecycle Process',
                }),

                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 3,
                }),

                defineField({
                    name: 'image',
                    title: 'Lifecycle Process Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }),

                defineField({
                    name: 'imageAlt',
                    title: 'Lifecycle Image Alt Text',
                    type: 'string',
                }),

                defineField({
                    name: 'steps',
                    title: 'Lifecycle Steps',
                    type: 'array',
                    of: [
                        defineField({
                            name: 'step',
                            title: 'Lifecycle Step',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'stepNumber',
                                    title: 'Step Number',
                                    type: 'string',
                                    description: 'Example: 01',
                                }),

                                defineField({
                                    name: 'title',
                                    title: 'Step Title',
                                    type: 'string',
                                    description: 'Example: Discovery & Concept',
                                }),

                                defineField({
                                    name: 'headline',
                                    title: 'Headline',
                                    type: 'string',
                                }),

                                defineField({
                                    name: 'description',
                                    title: 'Full Description',
                                    type: 'text',
                                    rows: 3,
                                }),

                                defineField({
                                    name: 'image',
                                    title: 'Step Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                }),

                                defineField({
                                    name: 'imageAlt',
                                    title: 'Image Alt Text',
                                    type: 'string',
                                }),

                                defineField({
                                    name: 'iconImage',
                                    title: 'Step Thumbnail / Icon',
                                    type: 'image',
                                    options: { hotspot: true },
                                }),

                                defineField({
                                    name: 'badge',
                                    title: 'Phase Badge',
                                    type: 'string',
                                    description: 'Example: PHASE 01 // AUDIT',
                                }),
                            ],

                            preview: {
                                select: {
                                    number: 'stepNumber',
                                    title: 'title',
                                    description: 'headline',
                                },
                                prepare({ number, title, description }) {
                                    return {
                                        title: `${number || ''}. ${title || ''}`,
                                        subtitle: description || '',
                                    };
                                },
                            },
                        }),
                    ],
                }),
            ],
        }),

        // =========================================================
        // WHY CHOOSE TECHSTEPS SECTION
        // =========================================================
        defineField({
            name: 'whyChoose',
            title: 'Why Choose Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'eyebrow',
                    title: 'Eyebrow',
                    type: 'string',
                    initialValue: 'PROVEN EXCELLENCE',
                }),
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    initialValue: 'Why Choose TechSteps?',
                }),
                defineField({
                    name: 'description',
                    title: 'Description Paragraph',
                    type: 'text',
                    rows: 3,
                    initialValue: 'TechSteps combines secure handling, reliable service, complete lifecycle solutions, and sustainability to deliver dependable IT asset management for organisations across the UK.',
                }),
                defineField({
                    name: 'features',
                    title: 'Feature Points',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'number', title: 'Index Number', type: 'string' }),
                                defineField({ name: 'title', title: 'Feature Title', type: 'string' }),
                                defineField({ name: 'description', title: 'Feature Description', type: 'text', rows: 2 }),
                            ],
                        },
                    ],
                }),
                defineField({
                    name: 'imageUrl',
                    title: 'Image URL',
                    type: 'string',
                    initialValue: '/images/services/why choose us.webp',
                }),
                defineField({
                    name: 'image',
                    title: 'Image (Upload)',
                    type: 'image',
                    options: { hotspot: true },
                }),
                defineField({
                    name: 'imageAlt',
                    title: 'Image Alt Text',
                    type: 'string',
                    initialValue: 'TechSteps team collaborating on certified IT lifecycle and compliance solutions',
                }),
            ],
        }),

        // =========================================================
        // SECTORS SECTION
        // =========================================================
        defineField({
            name: 'sectorsSection',
            title: 'Sectors We Serve Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    initialValue: 'Supporting Businesses Across Every Sector',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 3,
                    initialValue: 'TechSteps provides secure, sustainable, and reliable IT asset lifecycle, certified data destruction, and compliance-driven solutions across different industries.',
                }),
            ],
        }),

        // =========================================================
        // CTA SECTION
        // =========================================================
        defineField({
            name: 'cta',
            title: 'Final CTA Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                }),

                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 4,
                }),

                defineField({
                    name: 'primaryButtonText',
                    title: 'Primary Button Text',
                    type: 'string',
                }),

                defineField({
                    name: 'primaryButtonLink',
                    title: 'Primary Button Link',
                    type: 'string',
                }),

                defineField({
                    name: 'secondaryButtonText',
                    title: 'Secondary Button Text',
                    type: 'string',
                }),

                defineField({
                    name: 'secondaryButtonLink',
                    title: 'Secondary Button Link',
                    type: 'string',
                }),
            ],
        }),
    ],
});