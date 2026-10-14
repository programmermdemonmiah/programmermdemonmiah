"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Keyboard, Mousewheel, A11y, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Smartphone,
  Globe,
  Layers,
  ShieldCheck,
  Github,
  CheckCircle2,
  Maximize2,
  X,
  GripHorizontal,
} from "lucide-react";

import { VERIFIED_PROJECTS, type VerifiedProject } from "@/app/data/projectRegistry";

const CATEGORIES = ["All", "Mobile App", "Enterprise SaaS", "E-Commerce", "Full Stack Web"] as const;

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
  layout?: "carousel" | "grid";
  onOpenLightbox: (payload: LightboxPayload) => void;
}

function getScreenshotMeta(url: string, category: string) {
  if (url.includes("-desktop.png")) {
    return { label: "Live Desktop View", icon: "desktop" as const };
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
      x: shouldReduceMotion ? 0 : dir > 0 ? 18 : -18,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.12 : 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -18 : 18,
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.18,
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

      {/* Main Image Stage with Crossfade Transition */}
      <div
        className="carousel-image-stage"
        onClick={() => onOpenLightbox(activeIdx)}
        title="Click to inspect full-resolution screenshot"
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`project-image ${meta.icon === "store" ? "project-image-contain" : "project-image-cover"}`}
              priority={priority}
              draggable={false}
              onLoad={() => setIsLoaded(true)}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
            <div className="project-media-overlay" />
          </motion.div>
        </AnimatePresence>
      </div>

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
          {meta.icon === "store" ? (
            <Smartphone size={11} aria-hidden="true" />
          ) : (
            <Globe size={11} aria-hidden="true" />
          )}
          <span>{meta.label}</span>
        </span>

        {images.length > 1 && (
          <div className="carousel-dots-row" role="tablist" aria-label="Screenshots">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                role="tab"
                aria-selected={dotIdx === activeIdx}
                className={`carousel-dot ${dotIdx === activeIdx ? "carousel-dot-active" : ""}`}
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

function ProjectCardContent({
  project,
  index,
  total,
  layout = "carousel",
  onOpenLightbox,
}: ProjectCardContentProps) {
  const isGrid = layout === "grid";
  const allScreens =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image];

  return (
    <div
      className={`verified-project-card ${
        isGrid ? "verified-project-grid-card" : "verified-project-carousel-card"
      }`}
    >
      {/* Media Column / Card Header */}
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
            <span>Verified Capabilities</span>
          </p>
          <ul className="project-highlights-list">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Column / Card Body */}
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

        {/* Action Buttons Row */}
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
              <span>
                {project.category === "Mobile App"
                  ? "Google Play Store"
                  : "Verified Live System"}
              </span>
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

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);

  // Swiper carousel state
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Filter projects by active category and search query
  const filteredProjects = useMemo(() => {
    return VERIFIED_PROJECTS.filter((project) => {
      if (activeCategory !== "All" && project.category !== activeCategory) {
        return false;
      }

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = project.name.toLowerCase().includes(q);
      const matchTag = project.tagline.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchRole = project.role.toLowerCase().includes(q);
      const matchArch = project.architecture.toLowerCase().includes(q);
      const matchStack = project.stack.some((s) => s.toLowerCase().includes(q));

      return matchName || matchTag || matchDesc || matchRole || matchArch || matchStack;
    });
  }, [activeCategory, searchQuery]);

  // Handle slide change in Swiper
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlideIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleCarouselPrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleCarouselNext = () => {
    swiperInstance?.slideNext();
  };

  // Reset swiper to slide 0 when category or search changes
  useEffect(() => {
    if (swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.slideTo(0, 0);
      setActiveSlideIndex(0);
      setIsBeginning(true);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [activeCategory, searchQuery, swiperInstance]);

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
                className={`view-mode-btn ${viewMode === "carousel" ? "view-mode-btn-active" : ""}`}
                onClick={() => setViewMode("carousel")}
                title="Draggable Horizontal Carousel (Mouse / Touch / Trackpad)"
                aria-pressed={viewMode === "carousel"}
              >
                <GripHorizontal size={14} aria-hidden="true" />
                <span>Draggable Carousel</span>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search verified projects"
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
        </div>

        {/* Counter & Drag Navigation Row */}
        <div className="projects-counter-row">
          <span className="counter-text">
            Showing <strong>{filteredProjects.length}</strong> verified production {filteredProjects.length === 1 ? "project" : "projects"}
            {viewMode === "carousel" && filteredProjects.length > 0 && (
              <span className="drag-helper-text">
                {" · "}
                <GripHorizontal size={13} className="inline-drag-icon" aria-hidden="true" />
                <span>Drag horizontally with mouse or swipe</span>
              </span>
            )}
          </span>

          {viewMode === "carousel" && filteredProjects.length > 0 && (
            <div className="carousel-drag-nav-controls">
              <span className="card-counter-indicator" aria-live="polite">
                {String(activeSlideIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>

              <div className="carousel-arrow-buttons">
                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={handleCarouselPrev}
                  disabled={isBeginning}
                  aria-label="Previous project slide"
                  title="Previous slide (Left Arrow)"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={handleCarouselNext}
                  disabled={isEnd}
                  aria-label="Next project slide"
                  title="Next slide (Right Arrow)"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Project Card Presentation Display */}
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
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "carousel" ? (
          <div className="projects-carousel-container">
            <Swiper
              modules={[Navigation, Pagination, Keyboard, Mousewheel, A11y, FreeMode]}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={handleSlideChange}
              grabCursor={true}
              simulateTouch={true}
              touchEventsTarget="container"
              touchRatio={1.2}
              threshold={6}
              preventClicks={true}
              preventClicksPropagation={false}
              speed={520}
              resistance={true}
              resistanceRatio={0.75}
              keyboard={{ enabled: true, onlyInViewport: true }}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 1 }}
              watchSlidesProgress={true}
              breakpoints={{
                0: {
                  slidesPerView: 1.12,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.6,
                  spaceBetween: 22,
                },
                1024: {
                  slidesPerView: 2.25,
                  spaceBetween: 28,
                },
                1400: {
                  slidesPerView: 2.65,
                  spaceBetween: 32,
                },
              }}
              className="projects-draggable-swiper"
            >
              {filteredProjects.map((project, idx) => (
                <SwiperSlide key={project.id} className="project-carousel-slide">
                  <motion.div
                    initial={{ opacity: 0, y: 26, scale: 0.985 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.48,
                      delay: Math.min(idx * 0.08, 0.35),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="carousel-card-motion-shell"
                  >
                    <ProjectCardContent
                      project={project}
                      index={idx}
                      total={filteredProjects.length}
                      layout="carousel"
                      onOpenLightbox={(payload) => setLightbox(payload)}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="projects-grid-container">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 26, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.48,
                  delay: Math.min(idx * 0.08, 0.35),
                  ease: [0.16, 1, 0.3, 1],
                }}
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
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="screenshot-lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="screenshot-lightbox-header">
                <div className="lightbox-title-wrap">
                  <span className="lightbox-project-name">{lightbox.projectName}</span>
                  <span className="lightbox-sep">·</span>
                  <span className="lightbox-counter">
                    Screen {lightbox.index + 1} of {lightbox.images.length}
                  </span>
                </div>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setLightbox(null)}
                  aria-label="Close screenshot modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="screenshot-lightbox-viewport">
                <Image
                  src={lightbox.images[lightbox.index] || lightbox.images[0]}
                  alt={`${lightbox.projectName} high resolution capture`}
                  fill
                  sizes="90vw"
                  className="screenshot-lightbox-img"
                  priority
                />
              </div>

              {/* Lightbox Thumbnails / Next-Prev if multi-screen */}
              {lightbox.images.length > 1 && (
                <div className="lightbox-strip">
                  {lightbox.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`lightbox-thumb-btn ${idx === lightbox.index ? "lightbox-thumb-active" : ""}`}
                      onClick={() => setLightbox({ ...lightbox, index: idx })}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        width={64}
                        height={40}
                        className="lightbox-thumb-img"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
