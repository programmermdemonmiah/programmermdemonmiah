"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  Layers,
  CheckCircle2,
  Maximize2,
  X,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Server,
  ShoppingBag,
  Activity,
  Globe,
  Lock,
  Code2,
} from "lucide-react";
import { VERIFIED_PROJECTS } from "../data/projectRegistry";

function getHostname(url?: string): string {
  if (!url) return "production-verified.system";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || "production-verified.system";
  }
}

function getCategoryTheme(category: string) {
  switch (category) {
    case "Mobile App":
      return {
        key: "mobile",
        className: "card-theme-mobile",
        accent: "#10B981",
        border: "rgba(16, 185, 129, 0.4)",
        badgeBg: "rgba(16, 185, 129, 0.14)",
        badgeText: "#34D399",
        badgeBorder: "rgba(16, 185, 129, 0.32)",
        typeLabel: "Native Mobile App",
        icon: Smartphone,
      };
    case "Enterprise SaaS":
    case "Enterprise":
      return {
        key: "saas",
        className: "card-theme-saas",
        accent: "#A855F7",
        border: "rgba(168, 85, 247, 0.4)",
        badgeBg: "rgba(168, 85, 247, 0.14)",
        badgeText: "#C084FC",
        badgeBorder: "rgba(168, 85, 247, 0.32)",
        typeLabel: "Enterprise Platform",
        icon: Server,
      };
    case "E-Commerce":
      return {
        key: "ecom",
        className: "card-theme-ecom",
        accent: "#F59E0B",
        border: "rgba(245, 158, 11, 0.4)",
        badgeBg: "rgba(245, 158, 11, 0.14)",
        badgeText: "#FBBF24",
        badgeBorder: "rgba(245, 158, 11, 0.32)",
        typeLabel: "Commerce Ecosystem",
        icon: ShoppingBag,
      };
    default:
      return {
        key: "web",
        className: "card-theme-web",
        accent: "#38BDF8",
        border: "rgba(56, 189, 248, 0.4)",
        badgeBg: "rgba(56, 189, 248, 0.14)",
        badgeText: "#38BDF8",
        badgeBorder: "rgba(56, 189, 248, 0.32)",
        typeLabel: "Full Stack Architecture",
        icon: Code2,
      };
  }
}

const CATEGORIES = [
  "All",
  "Mobile App",
  "Enterprise SaaS",
  "E-Commerce",
  "Full Stack Web",
] as const;

export default function AllProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightbox, setLightbox] = useState<{
    url: string;
    title: string;
    alt: string;
  } | null>(null);

  // Filter projects by active category and search term
  const filteredProjects = useMemo(() => {
    return VERIFIED_PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = project.name.toLowerCase().includes(q);
      const matchTagline = project.tagline.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchRole = project.role.toLowerCase().includes(q);
      const matchStack = project.stack.some((s) => s.toLowerCase().includes(q));

      return matchName || matchTagline || matchDesc || matchRole || matchStack;
    });
  }, [activeCategory, searchQuery]);

  // Counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: VERIFIED_PROJECTS.length };
    for (const cat of CATEGORIES) {
      if (cat !== "All") {
        counts[cat] = VERIFIED_PROJECTS.filter((p) => p.category === cat).length;
      }
    }
    return counts;
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Mobile App":
        return <Smartphone size={13} aria-hidden="true" />;
      case "Enterprise SaaS":
        return <Server size={13} aria-hidden="true" />;
      case "E-Commerce":
        return <ShoppingBag size={13} aria-hidden="true" />;
      case "Healthcare":
        return <Activity size={13} aria-hidden="true" />;
      default:
        return <Globe size={13} aria-hidden="true" />;
    }
  };

  return (
    <div className="all-projects-page">
      {/* Main Container */}
      <main className="section-container all-projects-main">
        {/* Breadcrumb Bar */}
        <nav className="projects-breadcrumb-bar no-print" aria-label="Breadcrumb">
          <Link href="/" className="projects-breadcrumb-link">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">All Projects</span>
        </nav>
        {/* Page Title & Eyebrow */}
        <section className="all-projects-hero">
          <div className="section-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Production-Verified Portfolio
          </div>
          <h1 className="section-title">
            All <span>Projects.</span>
          </h1>
          <p className="section-subtitle">
            Explore the verified catalog of live mobile applications, high-concurrency microservices, enterprise SaaS platforms, and full-stack solutions built by MD. Emon Miah.
          </p>
        </section>

        {/* Toolbar: Category Filters & Search Bar */}
        <section className="all-projects-toolbar" aria-label="Filter and search projects">
          <div className="category-tabs" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab ${isActive ? "category-tab-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeAllProjectsCat"
                      className="category-tab-active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="category-tab-label">
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                    <span className="cat-count-badge">({count})</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="project-search-wrap">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              className="project-search-input"
              placeholder="Search by technology (e.g., Flutter, Go, Gin, Laravel, PostgreSQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search all projects"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </section>

        {/* Results Counter Row */}
        <div className="projects-counter-row">
          <span className="counter-text">
            Showing <strong>{filteredProjects.length}</strong> of <strong>{VERIFIED_PROJECTS.length}</strong> verified production {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
          {searchQuery && (
            <button
              type="button"
              className="btn-outline-sm py-1 px-2 text-xs"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty-state">
            <Layers size={40} className="empty-icon" aria-hidden="true" />
            <p className="empty-title">No projects match your search criteria</p>
            <p className="empty-sub">
              Try adjusting your query or resetting category filters to see all production systems.
            </p>
            <button
              type="button"
              className="btn-outline-sm mt-3"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="all-projects-grid">
            {filteredProjects.map((project, idx) => {
              const theme = getCategoryTheme(project.category);
              const CategoryIcon = theme.icon;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.48,
                    delay: Math.min((idx % 3) * 0.08, 0.25),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`all-project-card ${theme.className}`}
                  style={{ borderColor: theme.border }}
                >
                  {/* Visual Media Header */}
                  <div className="all-project-media">
                    {/* Device Mockup Top Bar */}
                    {project.category === "Mobile App" ? (
                      <div className="mobile-phone-frame-bezel">
                        <div className="mobile-phone-notch-bar">
                          <span className="mobile-speaker-pill" />
                          <span className="mobile-lens-dot" />
                        </div>
                      </div>
                    ) : (
                      <div className="browser-window-header">
                        <div className="browser-window-dots">
                          <span className="browser-dot dot-close" />
                          <span className="browser-dot dot-min" />
                          <span className="browser-dot dot-max" />
                        </div>
                        <div className="browser-url-pill">
                          <Lock size={10} className="browser-lock-icon" aria-hidden="true" />
                          <span>{getHostname(project.liveUrl)}</span>
                        </div>
                      </div>
                    )}

                    <Image
                      src={project.image}
                      alt={`${project.name} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="all-project-img"
                      priority={idx < 2}
                    />
                    <div className="all-project-media-overlay" />

                    {/* Status & Category Pills */}
                    <div className="all-project-media-badges">
                      <span className="project-status-pill status-pill-live">
                        <span className="status-dot" aria-hidden="true" />
                        {project.status}
                      </span>
                      <span
                        className="project-category-pill"
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.badgeText,
                          borderColor: theme.badgeBorder,
                        }}
                      >
                        <CategoryIcon size={12} className="inline-category-icon" aria-hidden="true" />
                        {project.category}
                      </span>
                    </div>

                  {/* Lightbox trigger */}
                  <button
                    type="button"
                    className="media-zoom-btn"
                    onClick={() =>
                      setLightbox({
                        url: project.image,
                        title: project.name,
                        alt: `${project.name} full preview`,
                      })
                    }
                    title="View Full Resolution Screenshot"
                    aria-label={`Enlarge screenshot for ${project.name}`}
                  >
                    <Maximize2 size={15} aria-hidden="true" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="all-project-body">
                  <header className="all-project-header">
                    <h2 className="all-project-title">{project.name}</h2>
                    <p className="all-project-tagline">{project.tagline}</p>
                  </header>

                  {/* Role Badge */}
                  <div className="all-project-role">
                    <span className="role-label">Role:</span>
                    <span className="role-value">{project.role}</span>
                  </div>

                  {/* Description */}
                  <p className="all-project-desc">{project.description}</p>

                  {/* Architecture Spotlight */}
                  <div className="all-project-arch">
                    <div className="arch-label">
                      <Sparkles size={12} className="arch-icon" aria-hidden="true" />
                      <span>Architecture:</span>
                    </div>
                    <p className="arch-text">{project.architecture}</p>
                  </div>

                  {/* Metrics Bar */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="all-project-metrics-grid">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="all-project-metric-item">
                          <span className="metric-val">{metric.value}</span>
                          <span className="metric-lbl">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="all-project-tech-stack" aria-label="Technologies used">
                    {project.stack.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="all-project-highlights">
                      <span className="highlights-heading">Key Production Capabilities:</span>
                      <ul className="highlights-list">
                        {project.highlights.map((item, hIdx) => (
                          <li key={hIdx}>
                            <CheckCircle2 size={13} className="highlight-icon" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Card Actions Footer */}
                  <footer className="all-project-footer">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-sm"
                        style={{
                          background: `linear-gradient(135deg, ${theme.accent} 0%, #991B1B 100%)`,
                          borderColor: theme.accent,
                        }}
                        title={`Open live project for ${project.name}`}
                      >
                        <span>
                          {project.category === "Mobile App"
                            ? project.packageId
                              ? "Open on Google Play"
                              : "Mobile App Repository"
                            : project.liveUrl.includes("github.com")
                            ? "GitHub Repository"
                            : "Launch Live System"}
                        </span>
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    )}

                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-sm"
                        title={project.secondaryUrl.label}
                      >
                        <span>{project.secondaryUrl.label}</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                  </footer>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

        {/* Verification Guarantee Footnote */}
        <div className="all-projects-audit-notice">
          <CheckCircle2 size={18} className="audit-check-icon" aria-hidden="true" />
          <div>
            <strong>Production Verification Standard:</strong> All projects listed in this catalog represent verified, live commercial platforms, published mobile apps, and enterprise backends developed by MD. Emon Miah.
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="screenshot-lightbox-backdrop"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="screenshot-lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="screenshot-lightbox-header">
                <span className="lightbox-title">{lightbox.title}</span>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setLightbox(null)}
                  aria-label="Close image lightbox"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="screenshot-lightbox-img-wrap">
                <Image
                  src={lightbox.url}
                  alt={lightbox.alt}
                  fill
                  sizes="90vw"
                  className="screenshot-lightbox-img"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Footer */}
      <footer className="all-projects-footer no-print">
        <div className="section-container all-projects-footer-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} MD. Emon Miah. Full Stack Mobile &amp; Backend Engineer.
          </p>
          <div className="footer-links">
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/projects" className="footer-link">All Projects</Link>
            <Link href="/cv" className="footer-link">Curriculum Vitae</Link>
            <Link href="/#contact" className="footer-link">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
