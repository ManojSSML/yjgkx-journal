export default {
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    { name: 'volume', title: 'Volume', type: 'number' },
    { name: 'number', title: 'Number', type: 'number' },
    { name: 'year', title: 'Year', type: 'number' },
    {
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    },
  ],
  preview: {
    select: { volume: 'volume', number: 'number', year: 'year' },
    prepare({ volume, number, year }: any) {
      return { title: `Vol. ${volume}, No. ${number} (${year})` };
    },
  },
};
