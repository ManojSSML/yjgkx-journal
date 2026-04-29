import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import { notFound } from 'next/navigation';
import { toProxyUrl } from '../../../lib/pdfProxy';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  pageStart: number;
  pageEnd: number;
  doi?: string;
  doiPdfUrl?: string;
  abstract?: string;
  keywords?: string[];
  pdfUrl?: string;
  slug?: { current: string };
}

const fallbackArticle: Article = {
  _id: '1',
  title: 'A Short Review on 2D Mesh Topology for Networks-on-Chip and its Popular Routing strategies',
  authors: ['Abhijit Biswas', 'Sourish Dhar'],
  pageStart: 1,
  pageEnd: 21,
  doi: 'https://doie.org/10.10399/JBSE.2026122934',
  doiPdfUrl: '#',
  abstract: `Networks on Chip (NoCs) have gained popularity as the most dominant interconnect paradigm for many-core and accelerator-rich Systems-on-Chip (SoCs). Among the many topologies available, the two-dimensional (2D) mesh topology serves as the canonical architectural template.\n\nRouting algorithms are classified into deterministic, partially adaptive, fully adaptive, and non-minimal categories. A concise survey of popular routing strategies has been discussed for mesh NoC topology along with the advantages and disadvantages.`,
  keywords: ['Network-On-Chip', 'Routing Algorithm', 'Adaptive', 'Partially Adaptive', 'Hybrid routing'],
  pdfUrl: '#',
  slug: { current: 'a-short-review-on-2d-mesh-topology' },
};

const fallbackJournalInfo = {
  email: 'info@yjgkx.org',
  year: '2026',
  sjrScore: '0.27',
  quartile: 'Q3',
};

const articlePageStyles = `
  .article-page-wrap {
    flex: 1;
    width: 100%;
    max-width: 1296px;
    margin: 0 auto;
    padding: 28px 12px 40px 12px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 16px;
  }
  .article-page-layout {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .article-main {
    flex: 1;
    min-width: 0;
    margin-top: 57.2px;
  }
  .article-title {
    font-size: 22px;
    font-weight: 700;
    color: #1a1a2e;
    line-height: 1.45;
    margin: 0 0 10px 0;
  }
  .article-doi-row {
    font-size: 15px;
    color: #333;
    margin: 0 0 10px 0;
    line-height: 1.5;
  }
  .article-doi-link {
    color: #1155cc;
    text-decoration: none;
    word-break: break-all;
  }
  .article-doi-link:hover { text-decoration: underline; }
  .article-authors {
    font-size: 15px;
    color: #444;
    margin: 0 0 28px 0;
    line-height: 1.5;
  }
  .article-keywords-block { margin-bottom: 28px; }
  .article-section-label {
    font-size: 16px;
    font-weight: 700;
    color: #111;
    margin: 0 0 5px 0;
  }
  .article-keywords-text {
    font-size: 15px;
    color: #333;
    line-height: 1.65;
    margin: 0;
  }
  .article-abstract-block { margin-bottom: 36px; }
  .article-abstract-label {
    font-size: 16px;
    font-weight: 700;
    color: #111;
    margin: 0 0 10px 0;
  }
  .article-abstract-para {
    font-size: 15px;
    color: #333;
    line-height: 1.75;
    margin: 0 0 16px 0;
    text-align: justify;
  }
  .article-abstract-para:last-child { margin-bottom: 0; }
  .article-pdf-btn {
    display: inline-block;
    background-color: #0d7070;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    padding: 10px 32px;
    border-radius: 2px;
    text-decoration: none;
    letter-spacing: 0.04em;
    margin-top: 8px;
  }
  .article-pdf-btn:hover { background-color: #095a5a; }
  @media (max-width: 900px) {
    .article-main { margin-top: 0; }
    .article-page-layout { flex-direction: column; }
  }
`;

async function getArticleData(slug: string) {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { client } = await import('../../../lib/sanity');

      const [article, journalInfo] = await Promise.all([
        client.fetch(
          `*[_type == "article" && slug.current == $slug][0]{
            _id, title, authors, pageStart, pageEnd,
            doi, abstract, keywords, slug,
            "pdfUrl": pdfFile.asset->url,
            "doiPdfUrl": doiPdfFile.asset->url
          }`,
          { slug }
        ),
        client.fetch(`*[_type == "journalInfo"][0]{ email, year, sjrScore, quartile }`),
      ]);

      if (article) {
        return {
          article: {
            ...article,
            // Convert both PDF URLs to proxy URLs at fetch time
            pdfUrl: toProxyUrl(article.pdfUrl),
            doiPdfUrl: toProxyUrl(article.doiPdfUrl),
          },
          journalInfo: journalInfo || fallbackJournalInfo,
          fromSanity: true,
        };
      }
    } catch (e) {
      console.error('Sanity article fetch failed:', e);
    }
  }
  return { article: fallbackArticle, journalInfo: fallbackJournalInfo, fromSanity: false };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { article, journalInfo } = await getArticleData(params.slug);
  if (!article) notFound();

  const authorStr = Array.isArray(article.authors) ? article.authors.join(', ') : '';
  const doiHref = article.doiPdfUrl && article.doiPdfUrl !== '#'
    ? article.doiPdfUrl
    : (article.doi?.startsWith('http') ? article.doi : '#');
  const pdfHref = article.pdfUrl && article.pdfUrl !== '#'
    ? article.pdfUrl
    : doiHref;
  const abstractParagraphs = article.abstract
    ? article.abstract.split(/\n+/).filter((p: string) => p.trim().length > 0)
    : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <style dangerouslySetInnerHTML={{ __html: articlePageStyles }} />
      <main className="article-page-wrap">
        <div className="article-page-layout">
          <div className="article-main">
            <h1 className="article-title">{article.title}</h1>

            {article.doi && (
              <p className="article-doi-row">
                DOI:{' '}
                <a href={doiHref} className="article-doi-link" target="_blank" rel="noopener noreferrer">
                  {article.doi}
                </a>
              </p>
            )}

            {authorStr && <p className="article-authors">{authorStr}</p>}

            {article.keywords && article.keywords.length > 0 && (
              <div className="article-keywords-block">
                <p className="article-section-label">Keywords:</p>
                <p className="article-keywords-text">{article.keywords.join(', ')}</p>
              </div>
            )}

            {abstractParagraphs.length > 0 && (
              <div className="article-abstract-block">
                <p className="article-abstract-label">Abstract:</p>
                {abstractParagraphs.map((para, i) => (
                  <p key={i} className="article-abstract-para">{para}</p>
                ))}
              </div>
            )}

            <a href={pdfHref} className="article-pdf-btn" target="_blank" rel="noopener noreferrer">
              PDF
            </a>
          </div>

          <Sidebar sjrScore={journalInfo?.sjrScore || '0.27'} quartile={journalInfo?.quartile || 'Q3'} />
        </div>
      </main>
      <Footer year={journalInfo?.year || '2026'} email={journalInfo?.email || 'info@yjgkx.org'} />
    </div>
  );
}