'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About the journal', href: 'https://www.scopus.com/sourceid/94558' },
  { label: 'Archives', href: '/' },
  { label: 'Aims & Scope', href: '/' },
  { label: 'Special Issues', href: '/' },
  { label: 'Indexing', href: '/' },
  { label: 'Contact', href: '/' },
];

const headerStyles = `
  .journal-header-wrap {
    width: 100%;
    background-color: #ffffff;
    font-family: 'IBM Plex Sans', sans-serif;
    display: flex;
    justify-content: center;
  }
  .journal-header {
    width: 1275px;
    max-width: 100%;
    background-color: #007B8B;
  }

  /* Title row */
  .header-title-row {
    background-color: #007B8B;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-title-text {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: center;
  }

  /* Hamburger row — hidden on desktop, shows on mobile below title */
  .hamburger-row {
    display: none;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    border-top: 1.5px solid #ffffff;
    background-color: #007B8B;
    cursor: pointer;
  }
  .hamburger-btn {
    background: none;
    border: 2px solid #ffffff;
    cursor: pointer;
    padding: 6px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 2px;
  }
  .hamburger-btn span {
    display: block;
    width: 22px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
  }

  /* Desktop nav */
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
    border-right: 1.5px solid rgba(255,255,255,0.35);
    text-decoration: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Sans', sans-serif;
    transition: background-color 0.25s ease, color 0.25s ease;
  }
  .header-nav-link:first-child {
    border-left: 1.5px solid rgba(255,255,255,0.35);
  }
  .header-nav-link:hover {
    background-color: #ffffff;
    color: #000000;
  }

  /* Mobile nav dropdown */
  .mobile-nav {
    display: none;
    flex-direction: column;
    width: 100%;
  }
  .mobile-nav.open {
    display: flex;
  }
  .mobile-nav-link {
    color: #ffffff;
    font-size: 15px;
    font-weight: 400;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.25);
    text-decoration: none;
    text-align: center;
    font-family: 'IBM Plex Sans', sans-serif;
    display: block;
  }
  .mobile-nav-link:hover {
    background-color: rgba(255,255,255,0.12);
  }

  /* Mobile breakpoint */
  @media (max-width: 768px) {
    .header-title-text {
      font-size: 1rem;
    }
    .hamburger-row {
      display: flex;
    }
    .header-nav-row {
      display: none;
    }
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />

      <div className="journal-header-wrap">
        <header className="journal-header">

          {/* Title row */}
          <div className="header-title-row">
            <span className="header-title-text">
              JOURNAL OF BASIC SCIENCE AND ENGINEERING
            </span>
          </div>

          {/* Hamburger row — centered below title, mobile only */}
          <div className="hamburger-row" onClick={() => setMenuOpen(!menuOpen)}>
            <button className="hamburger-btn" aria-label="Toggle navigation">
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="header-nav-row">
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} className="header-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile nav dropdown */}
          <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        </header>
      </div>
    </>
  );
}