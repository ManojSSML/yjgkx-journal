export default {
  name: 'journalInfo',
  title: 'Journal Info',
  type: 'document',
  fields: [
    {
      name: 'chineseTitle',
      title: 'Journal Title (shown in header)',
      type: 'string',
      description: 'e.g. Yingyong Jichu yu Gongcheng Kexue Xuebao/Journal of Basic Science and Engineering',
    },
    { name: 'englishTitle', title: 'English Title', type: 'string' },
    { name: 'publisher', title: 'Publisher', type: 'string' },
    { name: 'issn', title: 'ISSN', type: 'string' },
    { name: 'subjectArea', title: 'Subject Area', type: 'string' },
    { name: 'email', title: 'Contact Email', type: 'string' },
    { name: 'sjrScore', title: 'SJR Score', type: 'string' },
    { name: 'quartile', title: 'Quartile (e.g. Q3)', type: 'string' },
    { name: 'year', title: 'Copyright Year', type: 'string' },
    {
      name: 'currentIssueLabel',
      title: 'Current Issue Label',
      type: 'string',
      description: 'e.g. CURRENT ISSUE — shown as section heading above articles',
    },
  ],
};