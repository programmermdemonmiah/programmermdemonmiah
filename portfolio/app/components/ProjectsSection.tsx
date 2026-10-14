"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Search,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  CreditCard,
  Smartphone,
  Globe,
  Layers,
  ShieldCheck,
  Github,
  CheckCircle2,
  Monitor,
  Maximize2,
  X,
} from "lucide-react";

import { VERIFIED_PROJECTS, type VerifiedProject } from "@/app/data/projectRegistry";

const CATEGORIES = ["All", "Mobile App", "Enterprise SaaS", "E-Commerce", "Healthcare", "Full Stack Web"] as const;

interface LightboxPayload {
  images: string[];
  index: number;
  projectName: string;
  category: string;
  liveUrl?: string;
}

interface ProjectCardContentProps {
  project: VerifiedProject;
  index: number;
  total: number;
  layout?: "card" | "grid";
  onOpenLightbox: (payload: LightboxPayload) => void;
}

function getScreenshotMeta(url: string, category: string) {
  if (url.includes("-desktop.png")) {
    return { label: "Live Desktop Screenshot", icon: "desktop" as const };
  }
  if (url.includes("-mobile.png")) {
    return { label: "Live Mobile View", icon: "mobile" as const };
  }
  if (url.includes("play-lh.googleusercontent.com") || url.includes("googleplay")) {
    return { label: "Verified Google Play Store", icon: "store" as const };
  }
  if (url.includes("mzstatic.com") || url.includes("apple.com")) {
    return { label: "Verified Apple App Store", icon: "store" as const };
  }
  if (category === "Mobile App") {
    return { label: "Mobile App Screen", icon: "mobile" as const };
  }
  return { label: "Live System Capture", icon: "desktop" as const };
}

function ProjectScreenshotCarousel({
  screenshots,
  fallbackImage,
  projectName,
  category,
  onOpenLightbox,
  priority = false,
  cardIndex,
  totalCards,
  status,
}: {
  screenshots: string[];
  fallbackImage: string;
  projectName: string;
  category: string;
  onOpenLightbox: (idx: number) => void;
  priority?: boolean;
  cardIndex: number;
  totalCards: number;
  status: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const images = screenshots && screenshots.length > 0 ? screenshots : [fallbackImage];
  const currentUrl = images[activeIdx] || fallbackImage;
  const meta = getScreenshotMeta(currentUrl, category);

  // Reset loading shimmer whenever image changes
  useEffect(() => {
    setIsLoaded(false);
  }, [currentUrl]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSlideDirection(-1);
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSlideDirection(1);
    setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSlideDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 32 : -32,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.32,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -32 : 32,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.22,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="project-screenshot-carousel">
      {/* Top Floating Badges */}
      <div className="project-media-top-badges">
        <div className="project-top-badges-left">
          <span className="project-index-pill">
            #{String(cardIndex + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
          </span>
          <span className="project-status-pill">
            <span className="status-live-dot" aria-hidden="true" />
            <span>{status}</span>
          </span>
        </div>

        <button
          type="button"
          className="carousel-zoom-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(activeIdx);
          }}
          title="Inspect Full-Resolution Screenshot"
          aria-label="Inspect Full-Resolution Screenshot"
        >
          <Maximize2 size={13} aria-hidden="true" />
        </button>
      </div>

      {/* Main Image Stage with Drag / Swipe and Smooth Slide Transition */}
      <motion.div
        className="carousel-image-stage"
        onClick={() => onOpenLightbox(activeIdx)}
        title="Click to view full-resolution screenshot (Drag or swipe to browse)"
        drag={images.length > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -35 || info.velocity.x < -300) {
            handleNext();
          } else if (info.offset.x > 35 || info.velocity.x > 300) {
            handlePrev();
          }
        }}
      >
        {/* Skeleton Shimmer Loading Placeholder */}
        {!isLoaded && <div className="carousel-skeleton-shimmer" aria-hidden="true" />}

        <AnimatePresence custom={slideDirection} mode="wait">
          <motion.div
            key={currentUrl}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="carousel-slide-motion-wrapper"
          >
            <Image
              src={currentUrl}
              alt={`${projectName} - ${meta.label} (${activeIdx + 1}/${images.length})`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className={`project-image ${meta.icon === "store" ? "project-image-contain" : "project-image-cover"}`}
              priority={priority}
              onLoad={() => setIsLoaded(true)}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
            <div className="project-media-overlay" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Multi-Screen Navigation Arrows */}
      {images.length > 1 && (
        <div className="carousel-nav-arrows">
          <button
            type="button"
            className="carousel-nav-btn carousel-nav-prev"
            onClick={handlePrev}
            aria-label="Previous screenshot"
            title="Previous screenshot"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="carousel-nav-btn carousel-nav-next"
            onClick={handleNext}
            aria-label="Next screenshot"
            title="Next screenshot"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Bottom Bar: Source Tag & Dot Indicators */}
      <div className="carousel-bottom-bar">
        <span className="carousel-source-badge">
          {meta.icon === "desktop" && <Monitor size={12} aria-hidden="true" />}
          {meta.icon === "mobile" && <Smartphone size={12} aria-hidden="true" />}
          {meta.icon === "store" && <ShieldCheck size={12} aria-hidden="true" />}
          <span>{meta.label}</span>
          {images.length > 1 && (
            <span style={{ opacity: 0.7, marginLeft: 3 }}>
              ({activeIdx + 1}/{images.length})
            </span>
          )}
        </span>

        {images.length > 1 && (
          <div className="carousel-dots-wrap" role="tablist" aria-label="Screenshots">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`carousel-dot-btn ${dotIdx === activeIdx ? "carousel-dot-active" : ""}`}
                onClick={(e) => handleDotClick(e, dotIdx)}
                title={`View screenshot ${dotIdx + 1} of ${images.length}`}
                aria-label={`View screenshot ${dotIdx + 1} of ${images.length}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCardContent({ project, index, total, layout = "card", onOpenLightbox }: ProjectCardContentProps) {
  const isGrid = layout === "grid";
  const allScreens = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.image];

  return (
    <div className={`verified-project-card ${isGrid ? "verified-project-grid-card" : "verified-project-deck-card"}`}>
      {/* Media Column / Area */}
      <div className="project-media-col">
        <div className="project-media-frame">
          <ProjectScreenshotCarousel
            screenshots={allScreens}
            fallbackImage={project.image}
            projectName={project.name}
            category={project.category}
            status={project.status}
            cardIndex={index}
            totalCards={total}
            priority={index < 2}
            onOpenLightbox={(imgIdx) => {
              onOpenLightbox({
                images: allScreens,
                index: imgIdx,
                projectName: project.name,
                category: project.category,
                liveUrl: project.liveUrl,
              });
            }}
          />
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
              <ExternalLink size={13} className="btn-arrow-icon" aria-hidden="true" />
            </a>
          )}

          {project.secondaryUrl && (
            <a
              href={project.secondaryUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-secondary"
            >
              <span>{project.secondaryUrl.label}</span>
              <ExternalLink size={14} className="btn-arrow-icon" aria-hidden="true" />
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
              <ExternalLink size={12} className="btn-arrow-icon" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Framer Motion Animation Variants for the Upper & Bottom Card Swap
const cardVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.94,
    rotateX: direction > 0 ? 6 : -6,
    transition: {
      type: "spring" as const,
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
      type: "spring" as const,
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
      type: "spring" as const,
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
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);
  const isThrottledRef = useRef(false);

  // Lightbox keyboard navigation & body lock
  useEffect(() => {
    if (lightbox) {
      const handleLightboxKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setLightbox(null);
        } else if (e.key === "ArrowLeft") {
          setLightbox((prev) =>
            prev ? { ...prev, index: prev.index > 0 ? prev.index - 1 : prev.images.length - 1 } : null
          );
        } else if (e.key === "ArrowRight") {
          setLightbox((prev) =>
            prev ? { ...prev, index: prev.index < prev.images.length - 1 ? prev.index + 1 : 0 } : null
          );
        }
      };
      window.addEventListener("keydown", handleLightboxKey);
      return () => window.removeEventListener("keydown", handleLightboxKey);
    }
  }, [lightbox]);

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

  // Keyboard navigation for card deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "card" || lightbox !== null) return;
      if (e.key === "ArrowDown") {
        handleNextCard();
      } else if (e.key === "ArrowUp") {
        handlePrevCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, lightbox, handleNextCard, handlePrevCard]);

  const currentProject = filteredProjects[currentIndex];
  const nextProject = currentIndex + 1 < filteredProjects.length ? filteredProjects[currentIndex + 1] : null;
  const secondNextProject = currentIndex + 2 < filteredProjects.length ? filteredProjects[currentIndex + 2] : null;

  return (
    <section className="projects-section" id="projects" aria-label="Verified Production Projects">
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-header-row">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </motion.div>

          {/* Header Actions: View Mode Toggle & All Projects Link */}
          <div className="projects-header-actions">
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

            <Link
              href="/projects"
              className="btn-outline-sm all-projects-badge-btn"
              title="Explore all verified projects on dedicated page"
            >
              <span>All Projects</span>
              <ExternalLink size={13} aria-hidden="true" />
            </Link>
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
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="category-tab-active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="category-tab-label">{cat}</span>
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
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card-system-stage"
            onWheel={handleDeckWheel}
          >
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
                      onOpenLightbox={(payload) => setLightbox(payload)}
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
          </motion.div>
        ) : (
          <div className="projects-grid-container">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(idx * 0.08, 0.4),
                  ease: [0.16, 1, 0.3, 1],
                }}
                layout
                className="grid-card-motion-wrapper"
              >
                <ProjectCardContent
                  project={project}
                  index={idx}
                  total={filteredProjects.length}
                  layout="grid"
                  onOpenLightbox={(payload) => setLightbox(payload)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Project Verification Footnote & All Projects CTA */}
        <div className="projects-bottom-cta-row">
          <div className="projects-audit-footnote">
            <CheckCircle2 size={16} className="audit-check-icon" aria-hidden="true" />
            <span>
              Production Verification Standard: Displaying exclusively verified, live production projects with active endpoints. Drafts and non-public work are omitted.
            </span>
          </div>

          <Link
            href="/projects"
            className="btn-primary-sm projects-all-link-btn"
            title="Explore all verified production projects on dedicated page"
          >
            <span>Explore All Projects ({VERIFIED_PROJECTS.length})</span>
            <ExternalLink size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Fullscreen High-Resolution Screenshot Lightbox Modal */}
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
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="screenshot-lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="lightbox-header">
                <div className="lightbox-title-area">
                  <h4 className="lightbox-project-name">{lightbox.projectName}</h4>
                  <span className="lightbox-source-pill">
                    {getScreenshotMeta(lightbox.images[lightbox.index], lightbox.category).label}
                  </span>
                  <span className="lightbox-counter-pill">
                    {lightbox.index + 1} / {lightbox.images.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setLightbox(null)}
                  aria-label="Close screenshot preview"
                  title="Close preview (Esc)"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Lightbox Stage */}
              <div className="lightbox-stage">
                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    className="lightbox-nav-btn lightbox-nav-prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: prev.index > 0 ? prev.index - 1 : prev.images.length - 1,
                            }
                          : null
                      );
                    }}
                    aria-label="Previous screenshot"
                    title="Previous (ArrowLeft)"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                )}

                <div className="lightbox-image-wrap">
                  <Image
                    key={lightbox.images[lightbox.index]}
                    src={lightbox.images[lightbox.index]}
                    alt={`${lightbox.projectName} - ${lightbox.index + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    className="lightbox-nav-btn lightbox-nav-next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: prev.index < prev.images.length - 1 ? prev.index + 1 : 0,
                            }
                          : null
                      );
                    }}
                    aria-label="Next screenshot"
                    title="Next (ArrowRight)"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Lightbox Footer */}
              <div className="lightbox-footer">
                <div className="lightbox-hint">
                  <span>Keyboard:</span>
                  <kbd>←</kbd>
                  <kbd>→</kbd>
                  <span>to browse,</span>
                  <kbd>Esc</kbd>
                  <span>to close</span>
                </div>

                {lightbox.liveUrl && (
                  <a
                    href={lightbox.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lightbox-action-link"
                  >
                    <span>Visit Live Target</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
