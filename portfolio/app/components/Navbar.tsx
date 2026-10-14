"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, FileDown } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Projects", href: "/#projects" },
  { label: "All Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "expertise", "projects", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className={`site-header no-print ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="nav-container">
        <Link className="brand" href="/" aria-label="MD. Emon Miah - Home">
          <div className="brand-avatar-box">
            <img
              src="https://github.com/programmermdemonmiah.png"
              alt="MD. Emon Miah"
              className="brand-avatar-img"
              width={38}
              height={38}
            />
          </div>
          <span className="brand-meta">
            <span className="brand-name">MD. EMON MIAH</span>
            <span className="brand-title">Full Stack Mobile &amp; Backend</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <Link
            className="btn-outline-sm cv-btn"
            href="/cv"
            title="View Professional Curriculum Vitae"
          >
            <FileDown size={14} aria-hidden="true" />
            <span>CV</span>
          </Link>
          <a className="btn-primary-sm" href="#contact">
            <span>Get in Touch</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            className="menu-toggle-btn"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`mobile-drawer ${menuOpen ? "mobile-drawer-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-brand">Menu</span>
          <button
            className="mobile-close-btn"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            className="btn-primary mobile-full-btn"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            className="btn-outline mobile-full-btn"
            href="/cv"
            onClick={() => setMenuOpen(false)}
          >
            <FileDown size={16} aria-hidden="true" />
            <span>Curriculum Vitae</span>
          </a>
        </div>
      </div>
    </header>
  );
}
