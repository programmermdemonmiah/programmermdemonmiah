"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Keyboard, Mousewheel, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Search,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Smartphone,
  Globe,
  Layers,
  ShoppingBag,
  Lock,
  Server,
  Code2,
  CheckCircle2,
  Maximize2,
  X,
  ArrowDownUp,
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

/**
 * Vertical Swiper Project Card Component
 * Uses a rhythmic alternating layout on desktop and stacked on mobile,
 * designed with tailored device frames and distinct category palettes.
 */
function VerticalSwiperCard({
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
  const theme = getCategoryTheme(project.category);
  const CategoryIcon = theme.icon;
  const isAlternate = index % 2 === 1;

  return (
    <div
      className={`vertical-swiper-project-card ${theme.className} ${
        isAlternate ? "vertical-swiper-card-reverse" : ""
      }`}
    >
      {/* Left Column: Media & Verified Screenshots */}
      <div className="vertical-card-media-col">
        <div
          className="vertical-card-media-frame"
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
          {!isLoaded && <div className="vertical-skeleton-shimmer" aria-hidden="true" />}

          {/* Authentic Device Frame Mockup Header */}
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

          {/* Top Badges */}
          <div className="vertical-media-top-badges">
            <div className="vertical-top-left-group">
              <span className="vertical-index-pill">
                #{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="vertical-status-pill">
                <span className="status-live-dot" aria-hidden="true" />
                <span>{project.status}</span>
              </span>
            </div>

            <button
              type="button"
              className="vertical-zoom-btn"
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

          {/* Main Screenshot Image */}
          <Image
            src={currentUrl}
            alt={`${project.name} - ${meta.label}`}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={`vertical-project-image ${
              meta.icon === "store" ? "vertical-project-image-contain" : "vertical-project-image-cover"
            }`}
            priority={index === 0}
            draggable={false}
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
          <div className="vertical-media-overlay" />

          {/* Bottom Bar: Source Tag & Multi-Screen Thumbnails */}
          <div className="vertical-media-bottom-bar">
            <span className="vertical-source-badge">
              {meta.icon === "store" ? (
                <Smartphone size={11} aria-hidden="true" />
              ) : (
                <Globe size={11} aria-hidden="true" />
              )}
              <span>{meta.label}</span>
            </span>

            {images.length > 1 && (
              <div
                className="vertical-thumb-dots"
                onClick={(e) => e.stopPropagation()}
                role="tablist"
                aria-label="Screenshot thumbnails"
              >
                {images.slice(0, 6).map((img, dotIdx) => (
                  <button
                    key={img + dotIdx}
                    type="button"
                    role="tab"
                    aria-selected={dotIdx === selectedScreenIdx}
                    className={`vertical-thumb-dot ${dotIdx === selectedScreenIdx ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScreenIdx(dotIdx);
                    }}
                    title={`View screen ${dotIdx + 1} of ${images.length}`}
                    aria-label={`View screen ${dotIdx + 1} of ${images.length}`}
                  />
                ))}
                {images.length > 6 && (
                  <span className="vertical-thumb-more">+{images.length - 6}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Project Information & Actions */}
      <div className="vertical-card-info-col">
        {/* Category & Status */}
        <div className="vertical-info-meta-row">
          <span
            className="vertical-category-badge"
            style={{
              borderColor: theme.badgeBorder,
              color: theme.badgeText,
              backgroundColor: theme.badgeBg,
            }}
          >
            <CategoryIcon size={12} className="inline-category-icon" aria-hidden="true" />
            <span>{project.category}</span>
          </span>
          <span className="vertical-verified-badge" style={{ borderColor: theme.badgeBorder }}>
            <CheckCircle2 size={12} aria-hidden="true" style={{ color: theme.accent }} />
            <span>{theme.typeLabel}</span>
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="vertical-title-group">
          <h3 className="vertical-project-name">{project.name}</h3>
          <p className="vertical-project-tagline">{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="vertical-project-desc">{project.description}</p>

        {/* Architecture & Infrastructure Box */}
        {project.architecture && (
          <div className="vertical-arch-box" style={{ borderLeftColor: theme.accent }}>
            <span className="arch-label" style={{ color: theme.badgeText }}>
              Architecture:
            </span>
            <p className="arch-text">{project.architecture}</p>
          </div>
        )}

        {/* Technology Stack Pills */}
        <div className="vertical-stack-wrap">
          {project.stack.map((tech) => (
            <span key={tech} className="vertical-tech-chip">
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="vertical-metrics-grid">
            {project.metrics.map((m) => (
              <div key={m.label} className="vertical-metric-box">
                <span className="metric-val" style={{ color: theme.badgeText }}>
                  {m.value}
                </span>
                <span className="metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions Row */}
        <div className="vertical-card-actions">
          <div className="vertical-actions-left">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vertical-action-btn-primary"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent} 0%, #991B1B 100%)`,
                  borderColor: theme.accent,
                }}
                title={`Visit live production for ${project.name}`}
              >
                <span>
                  {project.category === "Mobile App"
                    ? project.liveUrl.includes("play.google")
                      ? "Google Play Store"
                      : "Mobile App Repository"
                    : project.liveUrl.includes("github.com")
                    ? "GitHub Repository"
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
                className="vertical-action-btn-secondary"
                title={project.secondaryUrl.label}
              >
                <span>{project.secondaryUrl.label}</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            )}
          </div>

          {project.role && (
            <span className="vertical-role-pill" title={project.role}>
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

  // Handle slide change in vertical Swiper
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

        {/* Counter & Vertical Swiper Controls Bar */}
        <div className="projects-counter-row">
          <div className="counter-left-group">
            <span className="counter-text">
              Showing <strong>{filteredProjects.length}</strong> verified production {filteredProjects.length === 1 ? "project" : "projects"}
            </span>

            {filteredProjects.length > 0 && (
              <span className="drag-helper-text">
                <ArrowDownUp size={14} className="inline-drag-icon" aria-hidden="true" />
                <span>Swipe bottom to top &bull; Drag vertically with mouse or touch</span>
              </span>
            )}
          </div>

          {filteredProjects.length > 0 && (
            <div className="vertical-swiper-nav-controls">
              <span className="card-counter-indicator" aria-live="polite">
                {String(activeSlideIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>

              <div className="vertical-arrow-buttons">
                <button
                  type="button"
                  className="vertical-arrow-btn"
                  onClick={handlePrev}
                  disabled={isBeginning}
                  aria-label="Previous project slide (Up)"
                  title="Previous project (Swipe Down / Up Arrow)"
                >
                  <ChevronUp size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="vertical-arrow-btn"
                  onClick={handleNext}
                  disabled={isEnd}
                  aria-label="Next project slide (Down / Swipe Up)"
                  title="Next project (Swipe Up / Down Arrow)"
                >
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom-to-Top Vertical Swiper Container */}
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
          <div className="vertical-swiper-outer-wrapper">
            <Swiper
              modules={[Navigation, Pagination, Keyboard, Mousewheel, A11y]}
              direction="vertical"
              slidesPerView={1}
              spaceBetween={20}
              speed={540}
              grabCursor={true}
              simulateTouch={true}
              touchEventsTarget="container"
              touchRatio={1.25}
              threshold={5}
              preventClicks={true}
              preventClicksPropagation={false}
              resistance={true}
              resistanceRatio={0.75}
              keyboard={{ enabled: true, onlyInViewport: true }}
              mousewheel={{ releaseOnEdges: true, sensitivity: 1 }}
              pagination={{
                clickable: true,
                el: ".vertical-swiper-pagination",
                bulletClass: "vertical-swiper-bullet",
                bulletActiveClass: "vertical-swiper-bullet-active",
              }}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={handleSlideChange}
              className="vertical-main-swiper"
            >
              {filteredProjects.map((project, idx) => (
                <SwiperSlide key={project.id} className="vertical-swiper-slide">
                  <div className="vertical-slide-motion-wrapper">
                    <VerticalSwiperCard
                      project={project}
                      index={idx}
                      total={filteredProjects.length}
                      onOpenLightbox={(payload) => setLightbox(payload)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Vertical Swiper Pagination on Right Side */}
            <div className="vertical-swiper-pagination" aria-label="Project slide navigation" />
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
