"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Keyboard, Mousewheel, A11y, FreeMode, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import {
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Globe,
  Layers,
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

/**
 * Clean Card Media Header optimized for Draggable Swiper
 * Allows dragging the entire card while enabling click-to-zoom in Lightbox
 */
function ProjectCardMedia({
  project,
  index,
  total,
  onOpenLightbox,
}: {
  project: VerifiedProject;
  index: number;
  total: number;
  onOpenLightbox: (payload: LightboxPayload) => void;
}) {
  const [selectedScreenIdx, setSelectedScreenIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const images = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image];

  const currentUrl = images[selectedScreenIdx] || images[0] || project.image;
  const meta = getScreenshotMeta(currentUrl, project.category);

  return (
    <div className="swiper-card-media-col">
      <div
        className="swiper-card-media-frame"
        onClick={() =>
          onOpenLightbox({
            images,
            index: selectedScreenIdx,
            projectName: project.name,
            category: project.category,
            liveUrl: project.liveUrl,
          })
        }
        title="Click to view full-resolution screenshot"
      >
        {/* Skeleton Shimmer */}
        {!isLoaded && <div className="swiper-skeleton-shimmer" aria-hidden="true" />}

        {/* Top Badges */}
        <div className="swiper-card-top-badges">
          <div className="swiper-top-left-group">
            <span className="swiper-card-index-pill">
              #{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="swiper-card-status-pill">
              <span className="status-live-dot" aria-hidden="true" />
              <span>{project.status}</span>
            </span>
          </div>

          <button
            type="button"
            className="swiper-card-zoom-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox({
                images,
                index: selectedScreenIdx,
                projectName: project.name,
                category: project.category,
                liveUrl: project.liveUrl,
              });
            }}
            title="Inspect Full-Resolution Screenshot"
            aria-label="Inspect Full-Resolution Screenshot"
          >
            <Maximize2 size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Media Image */}
        <Image
          src={currentUrl}
          alt={`${project.name} - ${meta.label}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`swiper-project-image ${meta.icon === "store" ? "swiper-project-image-contain" : "swiper-project-image-cover"}`}
          priority={index < 2}
          draggable={false}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
        <div className="swiper-project-media-overlay" />

        {/* Bottom Source Badge & Multiple Screen Thumbnails */}
        <div className="swiper-card-media-bottom">
          <span className="swiper-source-badge">
            {meta.icon === "store" ? (
              <Smartphone size={11} aria-hidden="true" />
            ) : (
              <Globe size={11} aria-hidden="true" />
            )}
            <span>{meta.label}</span>
          </span>

          {images.length > 1 && (
            <div
              className="swiper-thumb-dots"
              onClick={(e) => e.stopPropagation()}
              role="tablist"
              aria-label="Screenshot previews"
            >
              {images.slice(0, 5).map((img, dotIdx) => (
                <button
                  key={img + dotIdx}
                  type="button"
                  role="tab"
                  aria-selected={dotIdx === selectedScreenIdx}
                  className={`swiper-thumb-dot ${dotIdx === selectedScreenIdx ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenIdx(dotIdx);
                  }}
                  title={`View screen ${dotIdx + 1} of ${images.length}`}
                  aria-label={`View screen ${dotIdx + 1} of ${images.length}`}
                />
              ))}
              {images.length > 5 && (
                <span className="swiper-thumb-more">+{images.length - 5}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Swiper Project Card Component
 */
function ProjectSwiperCard({
  project,
  index,
  total,
  onOpenLightbox,
}: {
  project: VerifiedProject;
  index: number;
  total: number;
  onOpenLightbox: (payload: LightboxPayload) => void;
}) {
  return (
    <div className="verified-project-swiper-card">
      {/* Media Header */}
      <ProjectCardMedia
        project={project}
        index={index}
        total={total}
        onOpenLightbox={onOpenLightbox}
      />

      {/* Card Content Column */}
      <div className="swiper-card-content-col">
        {/* Category & Status Row */}
        <div className="swiper-card-meta-row">
          <span className="swiper-card-category-badge">{project.category}</span>
          <span className="swiper-card-verified-tag">
            <CheckCircle2 size={12} aria-hidden="true" />
            <span>Verified Live</span>
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="swiper-card-title-group">
          <h3 className="swiper-card-project-name">{project.name}</h3>
          <p className="swiper-card-tagline">{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="swiper-card-desc">{project.description}</p>

        {/* Role & Architecture Highlights */}
        {project.architecture && (
          <div className="swiper-card-arch-box">
            <span className="arch-label">Architecture:</span>
            <p className="arch-text">{project.architecture}</p>
          </div>
        )}

        {/* Technology Stack Pills */}
        <div className="swiper-card-stack-row">
          {project.stack.map((tech) => (
            <span key={tech} className="swiper-tech-chip">
              {tech}
            </span>
          ))}
        </div>

        {/* Key Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="swiper-card-metrics-grid">
            {project.metrics.map((m) => (
              <div key={m.label} className="swiper-metric-item">
                <span className="swiper-metric-value">{m.value}</span>
                <span className="swiper-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions Row */}
        <div className="swiper-card-actions-row">
          <div className="swiper-actions-left">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="swiper-action-btn-primary"
                title={`Visit live production for ${project.name}`}
              >
                <span>
                  {project.category === "Mobile App"
                    ? "Google Play Store"
                    : "Verified Live System"}
                </span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            )}

            {project.secondaryUrl && (
              <a
                href={project.secondaryUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="swiper-action-btn-secondary"
                title={project.secondaryUrl.label}
              >
                <span>{project.secondaryUrl.label}</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
          </div>

          {project.role && (
            <span className="swiper-role-pill" title={project.role}>
              {project.role.split("(")[0].trim()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

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
      const matchArch = project.architecture?.toLowerCase().includes(q);
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

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
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

          {/* Header Action: Explore All Projects */}
          <div className="projects-header-actions">
            <Link
              href="/projects"
              className="btn-outline-sm all-projects-badge-btn"
              title="Explore all verified projects on dedicated grid page"
            >
              <span>Explore All Projects ({VERIFIED_PROJECTS.length})</span>
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
                  onClick={() => setActiveCategory(cat)}
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

        {/* Counter & Drag Guide Row */}
        <div className="projects-counter-row">
          <div className="counter-left-group">
            <span className="counter-text">
              Showing <strong>{filteredProjects.length}</strong> verified production {filteredProjects.length === 1 ? "project" : "projects"}
            </span>

            {filteredProjects.length > 0 && (
              <span className="drag-helper-text">
                <GripHorizontal size={14} className="inline-drag-icon" aria-hidden="true" />
                <span>Drag with mouse &bull; Swipe on mobile &bull; Trackpad scroll</span>
              </span>
            )}
          </div>

          {filteredProjects.length > 0 && (
            <div className="swiper-nav-controls">
              <span className="card-counter-indicator" aria-live="polite">
                {String(activeSlideIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>

              <div className="swiper-arrow-buttons">
                <button
                  ref={prevBtnRef}
                  type="button"
                  className="swiper-arrow-btn"
                  onClick={handlePrev}
                  disabled={isBeginning}
                  aria-label="Previous project slide"
                  title="Previous slide (Left Arrow)"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  ref={nextBtnRef}
                  type="button"
                  className="swiper-arrow-btn"
                  onClick={handleNext}
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

        {/* Draggable Swiper Gallery */}
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
        ) : (
          <div className="projects-swiper-wrapper">
            <Swiper
              modules={[Navigation, Pagination, Keyboard, Mousewheel, A11y, FreeMode, Scrollbar]}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={handleSlideChange}
              grabCursor={true}
              simulateTouch={true}
              touchEventsTarget="container"
              touchRatio={1.3}
              threshold={5}
              preventClicks={true}
              preventClicksPropagation={false}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.85,
                momentumBounce: true,
                momentumVelocityRatio: 0.9,
              }}
              speed={480}
              resistance={true}
              resistanceRatio={0.78}
              keyboard={{ enabled: true, onlyInViewport: true }}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 1 }}
              scrollbar={{
                draggable: true,
                hide: false,
                el: ".projects-swiper-scrollbar",
              }}
              watchSlidesProgress={true}
              breakpoints={{
                0: {
                  slidesPerView: 1.15,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.7,
                  spaceBetween: 22,
                },
                1024: {
                  slidesPerView: 2.35,
                  spaceBetween: 28,
                },
                1440: {
                  slidesPerView: 2.85,
                  spaceBetween: 32,
                },
              }}
              className="projects-main-swiper"
            >
              {filteredProjects.map((project, idx) => (
                <SwiperSlide key={project.id} className="project-swiper-slide">
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.985 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(idx * 0.07, 0.3),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="swiper-card-shell"
                  >
                    <ProjectSwiperCard
                      project={project}
                      index={idx}
                      total={filteredProjects.length}
                      onOpenLightbox={(payload) => setLightbox(payload)}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Interactive Swiper Scrollbar */}
            <div className="projects-swiper-scrollbar-container">
              <div className="projects-swiper-scrollbar" />
            </div>
          </div>
        )}

        {/* Verification Footnote & All Projects Link */}
        <div className="projects-bottom-cta-row">
          <div className="projects-audit-footnote">
            <CheckCircle2 size={16} className="audit-check-icon" aria-hidden="true" />
            <span>
              Production Verification Standard: Displaying exclusively verified, live production projects with active endpoints.
            </span>
          </div>

          <Link
            href="/projects"
            className="btn-primary-sm projects-all-link-btn"
            title="Explore all verified production projects on dedicated grid page"
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
              className="screenshot-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-header">
                <div>
                  <h3 className="lightbox-title">{lightbox.projectName}</h3>
                  <p className="lightbox-meta">
                    Screenshot {lightbox.index + 1} of {lightbox.images.length} &bull; {lightbox.category}
                  </p>
                </div>

                <div className="lightbox-actions">
                  {lightbox.liveUrl && (
                    <a
                      href={lightbox.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lightbox-live-link"
                    >
                      <span>Visit Live</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="lightbox-close-btn"
                    aria-label="Close screenshot modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="lightbox-stage">
                <Image
                  src={lightbox.images[lightbox.index] || lightbox.images[0]}
                  alt={`${lightbox.projectName} - Full resolution`}
                  fill
                  sizes="95vw"
                  className="lightbox-img"
                  priority
                />
              </div>

              {lightbox.images.length > 1 && (
                <div className="lightbox-thumbnails-bar">
                  {lightbox.images.map((img, tIdx) => (
                    <button
                      key={img + tIdx}
                      type="button"
                      className={`lightbox-thumb-btn ${tIdx === lightbox.index ? "lightbox-thumb-active" : ""}`}
                      onClick={() => setLightbox({ ...lightbox, index: tIdx })}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${tIdx + 1}`}
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
