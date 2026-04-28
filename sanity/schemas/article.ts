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
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'pageStart', title: 'Page Start', type: 'number' },
    { name: 'pageEnd', title: 'Page End', type: 'number' },

    // ── DOI section ──────────────────────────────────────────────
    {
      name: 'doi',
      title: 'DOI Display Text',
      type: 'string',
      description: 'The DOI text shown as the link label, e.g. https://doi.org/10.10399/JBSE.2026122934',
    },
    {
      name: 'doiPdfFile',
      title: 'DOI PDF File',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Upload the PDF that opens when the DOI link is clicked',
    },

    // ── Article PDF (PDF button) ──────────────────────────────────
    {
      name: 'pdfFile',
      title: 'Article PDF File (PDF button)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Upload the PDF that opens when the PDF button is clicked',
    },
    {
      name: 'pdfExternalUrl',
      title: 'Article PDF External URL (optional)',
      type: 'string',
      description: 'Only if PDF is hosted externally. Ignored when a file is uploaded above.',
    },

    // ── Content ───────────────────────────────────────────────────
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 6,
      description: 'Separate paragraphs with a blank line.',
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