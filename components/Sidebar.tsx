import Image from 'next/image';

const sidebarStyles = `
  .sidebar-wrap {
    width: 306px;
    flex-shrink: 0;
    font-family: 'IBM Plex Sans',sans-serif;
  }
  .sidebar-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 306px;
    height: 48.2px;
    background-color: #007B8B;
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    margin-bottom: 9px;
    box-sizing: border-box;
    transition: background-color 0.25s ease, color 0.25s ease;
  }
  .sidebar-submit:hover {
    background-color: #ffffff;
    color: #007B8B;
    text-decoration: underline;
    border: 2px solid #007B8B;
    text-decoration-color: #007B8B;
  }
  .sidebar-indexed-by {
    width: 306px;
    height: 53.6px;
    background-color: #007B8B;
    color: #fff;
    text-align: center;
    font-weight: 700;
    font-size: 1.35rem;
    line-height: 53.6px;
    box-sizing: border-box;
  }
  .sidebar-logo-card {
    width: 304.4px;
    height: 699.65px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 24px 16px 16px 16px;
    overflow: hidden;
  }
  @media (max-width: 900px) {
    .sidebar-wrap,
    .sidebar-submit,
    .sidebar-indexed-by,
    .sidebar-logo-card {
      width: 100%;
    }
    .sidebar-logo-card {
      height: auto;
      gap: 28px;
    }
  }
`;

export default function Sidebar({ sjrScore = '0.27', quartile = 'Q3' }: { sjrScore?: string; quartile?: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sidebarStyles }} />

      <div className="sidebar-wrap">
        {/* Submit Manuscript — 306 x 48.2 */}
        <a href="/" className="sidebar-submit">
          Submit Manuscript
        </a>

        {/* Indexed By — 304.4 x 53.6 */}
        <div className="sidebar-indexed-by">
          Indexed By
        </div>

        {/* Logo card — 304.4 x 699.65 */}
        <div className="sidebar-logo-card">

          {/* Scopus */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/logos/scopus.png"
              alt="Elsevier Scopus"
              width={160}
              height={100}
              style={{ objectFit: 'contain', width: '160px', height: '100px' }}
            />
          </div>

          {/* Engineering Village */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/logos/ei.png"
              alt="Engineering Village"
              width={160}
              height={110}
              style={{ objectFit: 'contain', width: '160px', height: '110px' }}
            />
          </div>

          {/* Google Scholar */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/logos/google-scholar.png"
              alt="Google Scholar"
              width={180}
              height={70}
              style={{ objectFit: 'contain', width: '180px', height: '70px' }}
            />
          </div>

          {/* CrossRef DOI */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/logos/doi-crossref.png"
              alt="DOI CrossRef"
              width={130}
              height={90}
              style={{ objectFit: 'contain', width: '130px', height: '90px' }}
            />
          </div>

          {/* SJR Badge */}
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Image
              src="/logos/sjr-badge.png"
              alt="SJR Badge"
              width={200}
              height={200}
              style={{ objectFit: 'contain', width: '200px', height: '200px' }}
            />
          </div>

        </div>
      </div>
    </>
  );
}