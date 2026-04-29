import { toProxyUrl } from '../lib/pdfProxy';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  pageStart: number;
  pageEnd: number;
  pdfUrl?: string;
  pdfRef?: string;
  slug?: { current: string };
}

const articleCardStyles = `
  .article-title-link {
    color: #131F69;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .article-title-link:hover {
    color: #007b8b;
    text-decoration: underline;
    text-decoration-color: #007b8b;
  }
`;

export default function ArticleCard({ article }: { article: Article }) {
  const authorStr = Array.isArray(article.authors) ? article.authors.join(', ') : '';
  const articleHref = article.slug?.current ? `/articles/${article.slug.current}` : '#';
  const pdfHref = toProxyUrl(article.pdfUrl);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: articleCardStyles }} />
      <div style={{ marginBottom: '24px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1px', lineHeight: 1.4 }}>
          <a href={articleHref} className="article-title-link">{article.title}</a>
        </h3>
        {authorStr && (
          <p style={{ fontSize: '16px', color: '#444', marginBottom: '4px' }}>{authorStr}</p>
        )}
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
          Pages: {article.pageStart}-{article.pageEnd}
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#0d7070', color: '#fff', fontSize: '14px',
            fontWeight: '600', padding: '5px 14px', borderRadius: '2px', display: 'inline-block',
          }}
        >
          PDF
        </a>
      </div>
    </>
  );
}