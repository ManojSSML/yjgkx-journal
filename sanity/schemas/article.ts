export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
  name: 'doi',
  title: 'DOI',
  type: 'string',
  description: 'Full DOI URL, e.g. https://doi.org/10.10399/JBSE.2026122934',
},
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'pageStart', title: 'Page Start', type: 'number' },
    { name: 'pageEnd', title: 'Page End', type: 'number' },
    {
      name: 'pdfFile',
      title: 'PDF File (Upload here)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Upload the PDF directly',
    },
    {
      name: 'pdfExternalUrl',
      title: 'PDF External URL (optional)',
      type: 'string',
      description: 'Only if PDF is hosted externally',
    },
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 4,
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: { title: 'title', authors: 'authors' },
    prepare({ title, authors }: any) {
      const sub = Array.isArray(authors) ? authors.slice(0, 2).join(', ') : '';
      return { title, subtitle: sub };
    },
  },
};
