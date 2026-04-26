import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import { notFound } from 'next/navigation';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

// ---------- types ----------
interface Article {
  _id: string;
  title: string;
  authors: string[];
  pageStart: number;
  pageEnd: number;
  doi?: string;
  abstract?: string;
  keywords?: string[];
  pdfUrl?: string;
  pdfFile?: { asset: { url: string } };
  slug?: { current: string };
}

// ---------- fallback ----------
const fallbackArticle: Article = {
  _id: '1',
  title: 'A Short Review on 2D Mesh Topology for Networks-on-Chip and its Popular Routing strategies',
  authors: ['Abhijit Biswas', 'Sourish Dhar'],
  pageStart: 1,
  pageEnd: 21,
  doi: 'https://doie.org/10.10399/JBSE.2026122934',
  abstract: `Networks – on – Chip (NoCs) have gained popularity as the most dominant interconnect paradigm for many-core and accelerator-rich Systems-on-Chip (SoCs). Among the many topologies available, the two-dimensional (2D) mesh topology serves as the canonical architectural template. This survey presents a concise review of 2D mesh–based NoC architectures.\n\nRouting algorithms are classified into deterministic, partially adaptive, fully adaptive, and non-minimal categories. A concise survey of popular routing strategy till date has been discussed for mesh NoC topology along with the advantages and disadvantages of the routing strategy.`,
  keywords: ['Network – On – Chip', 'Routing Algorithm', 'Adaptive', 'Partially Adaptive', 'Hybrid routing.'],
  pdfUrl: '#',
  slug: { current: 'a-short-review-on-2d-mesh-topology' },
};

const fallbackJournalInfo = {
  email: 'info@yjgkx.org',
  year: '2026',
  sjrScore: '0.27',
  quartile: 'Q3',
};

// ---------- styles ----------
const articlePageStyles = `
  .article-page-wrap {
    flex: 1;
    width: 100%;
    max-width: 1296px;
    margin: 0 auto;
    padding: 28px 12px 40px 12px;
    font-family: 'IBM Plex Sans', Arial, sans-serif;
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
    /* Submit Manuscript btn = 48.2px height + 9px margin-bottom = 57.2px
       This pushes article content to start level with the Indexed By bar */
    margin-top: 57.2px;
  }

  /* Title */
  .article-title {
    font-size: 22px;
    font-weight: 700;
    color: #5D6778;
    line-height: 1.45;
    margin: 0 0 10px 0;
    font-family: 'IBM Plex Sans', Arial, sans-serif;
  }

  /* DOI */
  .article-doi-row {
    font-size: 15px;
    color: #5D6778;
    margin: 0 0 10px 0;
    line-height: 1.5;
  }
  .article-doi-link {
    color: #1155cc;
    text-decoration: none;
    word-break: break-all;
  }
  .article-doi-link:hover {
    text-decoration: underline;
  }

  /* Authors */
  .article-authors {
    font-size: 15px;
    color: #5D6778;
    margin: 0 0 28px 0;
    line-height: 1.5;
  }

  /* Keywords */
  .article-keywords-block {
    margin-bottom: 28px;
  }
  .article-section-label {
    font-size: 16px;
    font-weight: 700;
    color: #5D6778;
    margin: 0 0 5px 0;
  }
  .article-keywords-text {
    font-size: 16px;
    color: #5D6778;
    line-height: 1.65;
    margin: 0;
  }

  /* Abstract */
  .article-abstract-block {
    margin-bottom: 36px;
  }
  .article-abstract-label {
    font-size: 16px;
    font-weight: 700;
    color: #5D6778;
    margin: 0 0 10px 0;
  }
  .article-abstract-para-indented {
    font-size: 16px;
    color: #5D6778;
    line-height: 1.75;
    margin: 0 0 16px 0;
    text-align: justify;
    padding-left: 12px;
  }
  .article-abstract-para {
    font-size: 16px;
    color: #5D6778;
    line-height: 1.75;
    margin: 0 0 16px 0;
    text-align: justify;
  }
  .article-abstract-para:last-child,
  .article-abstract-para-indented:last-child {
    margin-bottom: 0;
  }


  /* PDF button */
  .article-pdf-btn {
    display: inline-block;
    background-color: #0d7070;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 32px;
    border-radius: 2px;
    text-decoration: none;
    letter-spacing: 0.04em;
    font-family: 'IBM Plex Sans', Arial, sans-serif;
    margin-top: 8px;
  }
  .article-pdf-btn:hover {
    background-color: #095a5a;
  }

  @media (max-width: 900px) {
    .article-main {
      margin-top: 0;
    }
    .article-page-layout {
      flex-direction: column;
    }
  }
`;

// ---------- data fetching ----------
async function getArticleData(slug: string): Promise<{ article: Article; journalInfo: typeof fallbackJournalInfo; fromSanity: boolean }> {
  if (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'
  ) {
    try {
      const { client } = await import('../../../lib/sanity');

      const article = await client.fetch(
        `*[_type == "article" && slug.current == $slug][0]{
          _id,
          title,
          authors,
          pageStart,
          pageEnd,
          doi,
          abstract,
          keywords,
          "pdfUrl": pdfExternalUrl,
          "pdfFileUrl": pdfFile.asset->url,
          slug
        }`,
        { slug }
      );

      const journalInfo = await client.fetch(
        `*[_type == "journalInfo"][0]{ email, year, sjrScore, quartile }`
      );

      console.log('✅ Sanity article fetched:', JSON.stringify(article, null, 2));

      if (article) {
        const resolvedArticle = {
          ...article,
          pdfUrl: article.pdfFileUrl || article.pdfUrl || '#',
        };
        return {
          article: resolvedArticle,
          journalInfo: journalInfo || fallbackJournalInfo,
          fromSanity: true,
        };
      }
    } catch (e) {
      console.error('❌ Sanity article fetch failed:', e);
    }
  }

  return { article: fallbackArticle, journalInfo: fallbackJournalInfo, fromSanity: false };
}

// ---------- page ----------
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { article, journalInfo, fromSanity } = await getArticleData(params.slug);

  if (!article) notFound();

  const authorStr = Array.isArray(article.authors) ? article.authors.join(', ') : '';
  const pdfHref = article.pdfUrl || '#';

  const abstractParagraphs = article.abstract
    ? article.abstract.split(/\n+/).filter((p) => p.trim().length > 0)
    : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <style dangerouslySetInnerHTML={{ __html: articlePageStyles }} />

      <main className="article-page-wrap">
        <div className="article-page-layout">

          {/* ── Main content — starts level with Indexed By ── */}
          <div className="article-main">

            {/* Title */}
            <h1 className="article-title">{article.title}</h1>

            {/* DOI — dynamically from Sanity */}
            {article.doi ? (
              <p className="article-doi-row">
                DOI:{' '}
                <a
                  href={article.doi.startsWith('http') ? article.doi : `https://doi.org/${article.doi}`}
                  className="article-doi-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.doi}
                </a>
              </p>
            ) : fromSanity && process.env.NODE_ENV === 'development' ? (
              <p className="article-doi-missing">
                ⚠️ DOI not set — add it in Sanity Studio → Article → DOI field
              </p>
            ) : null}

            {/* Authors */}
            {authorStr && (
              <p className="article-authors">{authorStr}</p>
            )}

            {/* Keywords */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="article-keywords-block">
                <p className="article-section-label">Keywords:</p>
                <p className="article-keywords-text">
                  {article.keywords.join(', ')}
                </p>
              </div>
            )}

            {/* Abstract */}
            {abstractParagraphs.length > 0 && (
              <div className="article-abstract-block">
                <p className="article-abstract-label">Abstract:</p>
                {abstractParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={i === 0 ? 'article-abstract-para-indented' : 'article-abstract-para'}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* PDF button */}
            <a
              href={pdfHref}
              className="article-pdf-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF
            </a>

          </div>

          {/* ── Sidebar ── */}
          <Sidebar
            sjrScore={journalInfo?.sjrScore || '0.27'}
            quartile={journalInfo?.quartile || 'Q3'}
          />
        </div>
      </main>

      <Footer
        year={journalInfo?.year || '2026'}
        email={journalInfo?.email || 'info@yjgkx.org'}
      />
    </div>
  );
}