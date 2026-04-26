import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About the journal', href: '/about' },
  { label: 'Archives', href: '/archives' },
  { label: 'Aims & Scope', href: '/aims-scope' },
  { label: 'Special Issues', href: '/special-issues' },
  { label: 'Indexing', href: '/indexing' },
  { label: 'Contact', href: '/contact' },
];

const headerStyles = `
  .journal-header-wrap {
    width: 100%;
    background-color: #ffffff;
    font-family: 'IBM Plex Sans',sans-serif;
    display: flex;
    justify-content: center;
  }
  .journal-header {
    width: 1275px;
    max-width: 100%;
    background-color: #007B8B;
  }
  .header-title-row {
    background-color: #007B8B;
    padding: 1px 0;
    text-align: center;
  }
  .header-title-text {
    display: inline-block;
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 4px 20px;
  }
  .header-nav-row {
    display: flex;
    width: 100%;
    background-color: #007B8B;
    border-top: 1.5px solid #ffffff;
  }
  .header-nav-link {
    flex: 1;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    font-weight: 400;
    padding: 12px 6px;
    border-right: 1.5px solid;
    text-decoration: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Sans',sans-serif;
  }
  .header-nav-link:first-child {
    border-left: 1px solid rgba(255,255,255,0.35);
  }
  .header-nav-link:hover {
    background-color: rgba(255,255,255,0.12);
  }
`;

export default function Header() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />

      <div className="journal-header-wrap">
        <header className="journal-header">
          <div className="header-title-row">
            <span className="header-title-text">
              JOURNAL OF BASIC SCIENCE AND ENGINEERING
            </span>
          </div>
          <nav className="header-nav-row">
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} className="header-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
      </div>
    </>
  );
}