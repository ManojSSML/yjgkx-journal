import { client } from './sanity';

// Journal Info
export async function getJournalInfo() {
  return client.fetch(
    `*[_type == "journalInfo"][0]{
      chineseTitle, publisher, issn,
      subjectArea, email, sjrScore, quartile, year, currentIssueLabel
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

// Current Issue
export async function getCurrentIssue() {
  return client.fetch(
    `*[_type == "issue"] | order(volume desc, number desc)[0]{
      volume, number, year,
      "articles": articles[]->{
        _id, title, authors, pageStart, pageEnd,
        "pdfUrl": select(
          defined(pdfExternalUrl) => pdfExternalUrl,
          defined(pdfFile.asset) => pdfFile.asset->url,
          null
        ),
        "pdfRef": pdfFile.asset->_id,
        slug
      }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

// Navigation
export async function getNavigation() {
  return client.fetch(
    `*[_type == "navigation"][0]{ links[]{ label, href } }`,
    {},
    { next: { revalidate: 0 } }
  );
}