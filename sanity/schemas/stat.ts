export default {
  name: 'stat',
  title: 'Statistic',
  type: 'document',
  fields: [
    { name: 'label', title: 'Metric Label', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'value', title: 'Value (e.g. 100, 99.9, 24/7)', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'prefix', title: 'Prefix (e.g. £, >)', type: 'string' },
    { name: 'suffix', title: 'Suffix (e.g. %, +, tonnes)', type: 'string' },
    { name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 1 },
    { name: 'isVisible', title: 'Visible on Live Site', type: 'boolean', initialValue: true },
    { name: 'contextNote', title: 'Context / Verification Note', type: 'string' },
  ],
};
