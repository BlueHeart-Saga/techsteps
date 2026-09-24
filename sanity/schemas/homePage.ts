import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',

    fields: [
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

                defineField({
                    name: 'highlightOne',
                    title: 'Highlighted Text 1',
                    type: 'string',
                    description: 'Example: IT asset disposal',
                }),

                defineField({
                    name: 'highlightTwo',
                    title: 'Highlighted Text 2',
                    type: 'string',
                    description: 'Example: secure IT asset disposition services',
                }),

                defineField({
                    name: 'highlightThree',
                    title: 'Highlighted Text 3',
                    type: 'string',
                    description: 'Example: GDPR compliance',
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
                                    name: 'number',
                                    title: 'Step Number',
                                    type: 'string',
                                    description: 'Example: 1',
                                }),

                                defineField({
                                    name: 'title',
                                    title: 'Step Title',
                                    type: 'string',
                                    description: 'Example: COLLECT',
                                }),

                                defineField({
                                    name: 'description',
                                    title: 'Step Description',
                                    type: 'string',
                                }),

                                defineField({
                                    name: 'badge',
                                    title: 'Phase Badge',
                                    type: 'string',
                                    description: 'Example: PHASE 01 • COLLECT',
                                }),
                            ],

                            preview: {
                                select: {
                                    number: 'number',
                                    title: 'title',
                                    description: 'description',
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