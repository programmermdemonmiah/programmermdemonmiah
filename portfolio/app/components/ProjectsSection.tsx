"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Search,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  CreditCard,
  Smartphone,
  Globe,
  Layers,
  ShieldCheck,
  Github,
  CheckCircle2,
} from "lucide-react";

import { VERIFIED_PROJECTS, type VerifiedProject } from "@/app/data/projectRegistry";

const CATEGORIES = ["All", "Mobile App", "Enterprise SaaS", "E-Commerce", "Healthcare", "Full Stack Web"] as const;

interface ProjectCardContentProps {
  project: VerifiedProject;
  index: number;
  total: number;
  layout?: "card" | "grid";
}

function ProjectCardContent({ project, index, total, layout = "card" }: ProjectCardContentProps) {
  const isGrid = layout === "grid";

  return (
    <div className={`verified-project-card ${isGrid ? "verified-project-grid-card" : "verified-project-deck-card"}`}>
      {/* Media Column / Area */}
      <div className="project-media-col">
        <div className="project-media-frame">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="project-image"
            priority={index < 2}
          />
          <div className="project-media-overlay" />

          {/* Top Floating Badges */}
          <div className="project-media-top-badges">
            <span className="project-index-pill">
              #{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="project-status-pill">
              <span className="status-live-dot" aria-hidden="true" />
              <span>{project.status}</span>
            </span>
          </div>

          {/* Category Chip */}
          <div className="project-media-bottom-chip">
            <span className="project-category-chip">{project.category}</span>
          </div>
        </div>

        {/* Quick Highlights Box under media */}
        <div className="project-highlights-box">
          <p className="project-highlights-title">
            <ShieldCheck size={14} className="highlights-icon" aria-hidden="true" />
            <span>Verified System Capabilities</span>
          </p>
          <ul className="project-highlights-list">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Column */}
      <div className="project-content-col">
        {/* Title & Tagline */}
        <div className="project-header-block">
          <div className="project-meta-row">
            <span className="project-role-badge">{project.role}</span>
          </div>
          <h3 className="project-title">{project.name}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>

        {/* Narrative Description */}
        <p className="project-narrative">{project.description}</p>

        {/* Architecture Callout */}
        <div className="project-arch-box">
          <span className="arch-box-label">System Architecture:</span>
          <p className="arch-box-text">{project.architecture}</p>
        </div>

        {/* Tech Stack Chips */}
        <div className="project-tech-section">
          <span className="tech-section-label">Technologies:</span>
          <div className="project-tech-tags">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="project-metrics-grid">
          {project.metrics.map((m, mi) => (
            <div key={mi} className="metric-cell">
              <span className="metric-label">{m.label}</span>
              <strong className="metric-val">{m.value}</strong>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="project-actions-row">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-primary"
            >
              {project.category === "Mobile App" ? (
                <Smartphone size={15} aria-hidden="true" />
              ) : (
                <Globe size={15} aria-hidden="true" />
              )}
              <span>{project.category === "Mobile App" ? "Google Play Store" : "Verified Live System"}</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}

          {project.secondaryUrl && (
            <a
              href={project.secondaryUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-secondary"
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>{project.secondaryUrl.label}</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-ghost"
              title="View Public Source Code on GitHub"
            >
              <Github size={15} aria-hidden="true" />
              <span>Public GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Framer Motion Animation Variants for the Upper & Bottom Card Swap
const cardVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.94,
    rotateX: direction > 0 ? 6 : -6,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28,
    },
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    zIndex: 10,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -110 : 110,
    opacity: 0,
    scale: 0.92,
    rotateX: direction > 0 ? -8 : 8,
    zIndex: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28,
    },
  }),
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isThrottledRef = useRef(false);

  // Filter only approved, verified projects from registry
  const filteredProjects = useMemo(() => {
    return VERIFIED_PROJECTS.filter((project) => {
      if (!project.approved) return false;

      if (activeCategory !== "All" && project.category !== activeCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const searchable = `${project.name} ${project.category} ${project.description} ${project.architecture} ${project.role} ${project.stack.join(" ")}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= filteredProjects.length) {
      setCurrentIndex(Math.max(0, filteredProjects.length - 1));
    }
  }, [filteredProjects.length, currentIndex]);

  const handleNextCard = useCallback(() => {
    if (isThrottledRef.current || filteredProjects.length <= 1) return;
    if (currentIndex < filteredProjects.length - 1) {
      isThrottledRef.current = true;
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => {
        isThrottledRef.current = false;
      }, 420);
    }
  }, [currentIndex, filteredProjects.length]);

  const handlePrevCard = useCallback(() => {
    if (isThrottledRef.current || filteredProjects.length <= 1) return;
    if (currentIndex > 0) {
      isThrottledRef.current = true;
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => {
        isThrottledRef.current = false;
      }, 420);
    }
  }, [currentIndex, filteredProjects.length]);

  const handleJumpToCard = (index: number) => {
    if (index === currentIndex || isThrottledRef.current) return;
    isThrottledRef.current = true;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => {
      isThrottledRef.current = false;
    }, 420);
  };

  // Wheel listener: card wise swap on scroll
  const handleDeckWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (viewMode !== "card") return;
    if (Math.abs(e.deltaY) > 35) {
      if (e.deltaY > 0) {
        handleNextCard();
      } else {
        handlePrevCard();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "card") return;
      if (e.key === "ArrowDown") {
        handleNextCard();
      } else if (e.key === "ArrowUp") {
        handlePrevCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, handleNextCard, handlePrevCard]);

  const currentProject = filteredProjects[currentIndex];
  const nextProject = currentIndex + 1 < filteredProjects.length ? filteredProjects[currentIndex + 1] : null;
  const secondNextProject = currentIndex + 2 < filteredProjects.length ? filteredProjects[currentIndex + 2] : null;

  return (
    <section className="projects-section" id="projects" aria-label="Verified Production Projects">
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-header-row">
          <div>
            <p className="section-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Verified Production &amp; Commercial Systems
            </p>
            <h2 className="section-title">
              Featured <span>real projects.</span>
            </h2>
            <p className="section-subtitle">
              Audited production platforms, enterprise ERPs, live streaming media engines, and high-concurrency microservices.
            </p>
          </div>

          {/* View Mode Toggle: Card Swapper vs Grid */}
          <div className="view-mode-toggle" role="group" aria-label="View mode toggle">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "card" ? "view-mode-btn-active" : ""}`}
              onClick={() => setViewMode("card")}
              title="Upper & Bottom Card Deck Swapper"
              aria-pressed={viewMode === "card"}
            >
              <CreditCard size={14} aria-hidden="true" />
              <span>Card Swapper Deck</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "grid" ? "view-mode-btn-active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
              aria-pressed={viewMode === "grid"}
            >
              <LayoutGrid size={14} aria-hidden="true" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Categories & Search */}
        <div className="projects-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Filter verified projects by category">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab ${isActive ? "category-tab-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentIndex(0);
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="project-search-wrap">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              className="project-search-input"
              placeholder="Search verified projects by technology or role..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              aria-label="Search verified projects"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentIndex(0);
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter & Card Swap Navigator Row */}
        <div className="projects-counter-row">
          <span className="counter-text">
            Showing <strong>{filteredProjects.length}</strong> verified production {filteredProjects.length === 1 ? "project" : "projects"}
            {viewMode === "card" && filteredProjects.length > 0 && (
              <span className="vertical-deck-status">
                {" · "}
                <strong>Card {currentIndex + 1} of {filteredProjects.length}</strong>
                {" · Swap Upper / Bottom"}
              </span>
            )}
          </span>

          {viewMode === "card" && filteredProjects.length > 0 && (
            <div className="card-swap-controls">
              <button
                type="button"
                className="card-swap-arrow-btn"
                onClick={handlePrevCard}
                disabled={currentIndex === 0}
                aria-label="Previous card (swap down from top)"
                title="Swap Upper Card (ArrowUp)"
              >
                <ChevronUp size={18} aria-hidden="true" />
                <span className="swap-btn-label">Upper Card</span>
              </button>

              <span className="card-counter-indicator" aria-live="polite">
                {String(currentIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                className="card-swap-arrow-btn"
                onClick={handleNextCard}
                disabled={currentIndex === filteredProjects.length - 1}
                aria-label="Next card (swap up to top)"
                title="Swap Bottom Card (ArrowDown)"
              >
                <span className="swap-btn-label">Bottom Card</span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Project Card System Display */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty-state">
            <Layers size={36} className="empty-icon" aria-hidden="true" />
            <p className="empty-title">No verified projects matched your criteria</p>
            <p className="empty-sub">Try selecting another category or clearing your search query.</p>
            <button
              type="button"
              className="btn-outline-sm mt-3"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setCurrentIndex(0);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "card" ? (
          <div className="card-system-stage" onWheel={handleDeckWheel}>
            {/* Quick Card Thumb Selector */}
            <div className="card-deck-selector-row" role="tablist" aria-label="Jump directly to project card">
              {filteredProjects.map((p, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleJumpToCard(idx)}
                    className={`card-deck-chip ${isActive ? "card-deck-chip-active" : ""}`}
                    title={p.name}
                  >
                    <span className="chip-num">#{String(idx + 1).padStart(2, "0")}</span>
                    <span className="chip-name">{p.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* 3D Stack Container */}
            <div className="card-deck-stack-area">
              {/* Stack Layer 2 (Deepest Preview Card) */}
              {secondNextProject && (
                <div className="deck-ghost-card deck-ghost-card-2" aria-hidden="true">
                  <div className="ghost-header">
                    <span className="ghost-num">#{String(currentIndex + 3).padStart(2, "0")}</span>
                    <span className="ghost-name">{secondNextProject.name}</span>
                  </div>
                </div>
              )}

              {/* Stack Layer 1 (Immediate Next Preview Card) */}
              {nextProject && (
                <div
                  className="deck-ghost-card deck-ghost-card-1"
                  onClick={handleNextCard}
                  title="Click to swap to this card"
                  aria-hidden="true"
                >
                  <div className="ghost-header">
                    <span className="ghost-num">#{String(currentIndex + 2).padStart(2, "0")}</span>
                    <span className="ghost-name">{nextProject.name}</span>
                    <span className="ghost-pill">Next in Deck ↓</span>
                  </div>
                </div>
              )}

              {/* Foreground Animated Active Card */}
              <AnimatePresence custom={direction} mode="wait">
                {currentProject && (
                  <motion.div
                    key={currentProject.id}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="deck-active-card-motion"
                  >
                    <ProjectCardContent
                      project={currentProject}
                      index={currentIndex}
                      total={filteredProjects.length}
                      layout="card"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Action Hint */}
            <div className="card-deck-hint-bar">
              <span className="hint-chip">
                <span>Use</span>
                <kbd>▲ Upper</kbd>
                <kbd>▼ Bottom</kbd>
                <span>Buttons or Mouse Wheel to Swap Cards</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="projects-grid-container">
            {filteredProjects.map((project, idx) => (
              <ProjectCardContent
                key={project.id}
                project={project}
                index={idx}
                total={filteredProjects.length}
                layout="grid"
              />
            ))}
          </div>
        )}

        {/* Audit Verification Footnote */}
        <div className="projects-audit-footnote">
          <CheckCircle2 size={16} className="audit-check-icon" aria-hidden="true" />
          <span>
            Strict Repository Audit Enforced: Displaying exclusively verified, live production systems with verified HTTP 200 endpoints. Unverified experiments, forks, and non-disclosed private repositories are omitted.
          </span>
        </div>
      </div>
    </section>
  );
}
