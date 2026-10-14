"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  Smartphone,
  Server,
  ShoppingBag,
  Code2,
  Lock,
  Cpu,
  ShieldCheck,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { VerifiedProject } from "@/app/data/projectRegistry";

interface ProjectDetailsModalProps {
  project: VerifiedProject | null;
  onClose: () => void;
  onOpenLightbox?: (payload: { images: string[]; index: number; projectName: string; category: string; liveUrl?: string }) => void;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Mobile App":
      return Smartphone;
    case "Enterprise SaaS":
    case "Enterprise":
      return Server;
    case "E-Commerce":
      return ShoppingBag;
    default:
      return Code2;
  }
}

function detectScreenshotPlatform(url: string, projectCategory: string): "web" | "android" | "ios" {
  if (url.includes("play-lh.googleusercontent.com") || url.includes("googleplay")) {
    return "android";
  }
  if (url.includes("mzstatic.com") || url.includes("apple.com")) {
    return "ios";
  }
  if (url.includes("-desktop.png") || url.includes("-mobile.png") || url.includes("vercel.app") || url.includes("deepverselab.com")) {
    return "web";
  }
  if (projectCategory === "Mobile App") {
    return "android";
  }
  return "web";
}

function getScreenshotBadge(url: string): { label: string; icon: "web" | "android" | "ios" } {
  if (url.includes("-desktop.png")) {
    return { label: "Web Desktop View", icon: "web" };
  }
  if (url.includes("-mobile.png")) {
    return { label: "Web Mobile View", icon: "web" };
  }
  if (url.includes("play-lh.googleusercontent.com") || url.includes("googleplay")) {
    return { label: "Google Play Store", icon: "android" };
  }
  if (url.includes("mzstatic.com") || url.includes("apple.com")) {
    return { label: "Apple App Store", icon: "ios" };
  }
  return { label: "Verified Production UI", icon: "web" };
}

export default function ProjectDetailsModal({
  project,
  onClose,
  onOpenLightbox,
}: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setActiveTab("All");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Categorize screenshots by platform
  const categorizedScreenshots = useMemo(() => {
    if (!project) return { all: [], web: [], android: [], ios: [] };

    const all = project.screenshots || [];
    const web: string[] = [];
    const android: string[] = [];
    const ios: string[] = [];

    // Check if project has explicit screenshotsByPlatform
    if (project.screenshotsByPlatform) {
      if (Array.isArray(project.screenshotsByPlatform.web)) {
        web.push(...project.screenshotsByPlatform.web);
      }
      if (Array.isArray(project.screenshotsByPlatform.android)) {
        android.push(...project.screenshotsByPlatform.android);
      }
      if (Array.isArray(project.screenshotsByPlatform.ios)) {
        ios.push(...project.screenshotsByPlatform.ios);
      }
    }

    // Fallback: detect from URLs if screenshotsByPlatform was empty
    if (web.length === 0 && android.length === 0 && ios.length === 0) {
      for (const url of all) {
        const plat = detectScreenshotPlatform(url, project.category);
        if (plat === "web") web.push(url);
        else if (plat === "android") android.push(url);
        else if (plat === "ios") ios.push(url);
      }
    }

    return { all, web, android, ios };
  }, [project]);

  // Tabs to display
  const availableTabs = useMemo(() => {
    const tabs = [];
    const { all, web, android, ios } = categorizedScreenshots;
    if (all.length > 0) {
      tabs.push({ id: "All", label: "All Screenshots", count: all.length });
    }
    if (web.length > 0) {
      tabs.push({ id: "Web", label: "Web UI", count: web.length });
    }
    if (android.length > 0) {
      tabs.push({ id: "Android", label: "Google Play", count: android.length });
    }
    if (ios.length > 0) {
      tabs.push({ id: "iOS", label: "App Store", count: ios.length });
    }
    return tabs;
  }, [categorizedScreenshots]);

  // Current visible screenshots based on active tab
  const displayedScreenshots = useMemo(() => {
    if (activeTab === "Web") return categorizedScreenshots.web;
    if (activeTab === "Android") return categorizedScreenshots.android;
    if (activeTab === "iOS") return categorizedScreenshots.ios;
    return categorizedScreenshots.all;
  }, [activeTab, categorizedScreenshots]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (!project) return null;

  const CategoryIcon = getCategoryIcon(project.category);
  const platforms = project.platforms && project.platforms.length > 0
    ? project.platforms
    : [project.category === "Mobile App" ? "Android" : "Web", "Backend / Cloud"];

  const hasRealScreenshots = displayedScreenshots.length > 0;

  return (
    <AnimatePresence>
      <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="project-modal-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="project-modal-header">
            <div className="modal-header-meta">
              <span className="modal-category-badge">
                <CategoryIcon size={13} className="inline-category-icon" aria-hidden="true" />
                <span>{project.category}</span>
              </span>
              <span className={`modal-status-pill status-${project.statusType || "production"}`}>
                <span className="status-live-dot" aria-hidden="true" />
                <span>{project.status}</span>
              </span>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close project specifications"
              title="Close (Esc)"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="project-modal-body">
            {/* Title & Tagline */}
            <div className="modal-title-section">
              <h2 className="modal-project-title">{project.name}</h2>
              <p className="modal-project-tagline">{project.tagline}</p>
            </div>

            {/* Platform Badges */}
            <div className="modal-platform-row" aria-label="Available verified platforms">
              <span className="platform-row-label">Verified Platforms:</span>
              <div className="platform-chips">
                {platforms.map((p) => (
                  <span key={p} className="platform-chip">
                    <span className="platform-chip-bullet" aria-hidden="true" />
                    <span>{p}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Media Showcase (Platform-Aware Screenshot Gallery or In-Development Stage) */}
            <div className="modal-media-showcase">
              {hasRealScreenshots ? (
                <div className="modal-gallery-wrapper">
                  {/* Gallery Platform Tabs & Controls */}
                  <div className="modal-gallery-top-bar">
                    {availableTabs.length > 1 && (
                      <div className="modal-platform-tabs" role="tablist" aria-label="Platform screenshot filters">
                        {availableTabs.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === t.id}
                            className={`modal-platform-tab ${activeTab === t.id ? "active" : ""}`}
                            onClick={() => setActiveTab(t.id)}
                          >
                            <span>{t.label}</span>
                            <span className="tab-count">({t.count})</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="modal-gallery-nav-btns">
                      <span className="gallery-drag-hint">Drag or swipe to explore</span>
                      <button
                        type="button"
                        className="gallery-nav-btn"
                        onClick={() => scrollGallery("left")}
                        aria-label="Scroll screenshots left"
                      >
                        <ChevronLeft size={15} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="gallery-nav-btn"
                        onClick={() => scrollGallery("right")}
                        aria-label="Scroll screenshots right"
                      >
                        <ChevronRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Drag/Swipe Screenshot Track */}
                  <div
                    ref={trackRef}
                    className={`modal-gallery-track ${isMouseDown ? "is-dragging" : ""}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {displayedScreenshots.map((img, sIdx) => {
                      const badge = getScreenshotBadge(img);
                      return (
                        <div
                          key={img + sIdx}
                          className="modal-gallery-card"
                          onClick={() => {
                            if (!hasDragged) {
                              onOpenLightbox?.({
                                images: displayedScreenshots,
                                index: sIdx,
                                projectName: project.name,
                                category: project.category,
                                liveUrl: project.webUrl || project.googlePlayUrl || project.liveUrl,
                              });
                            }
                          }}
                          title="Click to zoom screenshot (or drag to scroll)"
                        >
                          <Image
                            src={img}
                            alt={`${project.name} verified UI screenshot ${sIdx + 1}`}
                            fill
                            sizes="(max-width: 768px) 85vw, 420px"
                            className="modal-gallery-img"
                            draggable={false}
                          />
                          <div className="modal-gallery-overlay">
                            <Maximize2 size={16} aria-hidden="true" />
                            <span>Enlarge UI</span>
                          </div>

                          <div className="modal-gallery-card-badge">
                            {badge.icon === "android" ? (
                              <Smartphone size={11} aria-hidden="true" />
                            ) : (
                              <Globe size={11} aria-hidden="true" />
                            )}
                            <span>{badge.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="modal-preview-unavailable-box">
                  <div className="unavailable-icon-circle">
                    <CategoryIcon size={34} aria-hidden="true" />
                  </div>
                  <h4 className="unavailable-title">
                    {project.status === "In Development"
                      ? "Application Currently In Active Development"
                      : "Production Architecture Verified in Codebase"}
                  </h4>
                  <p className="unavailable-desc">
                    Source code and architectural structure are authenticated across internal GitHub
                    repositories. Live UI capture will be automatically synchronized upon production store/domain release.
                  </p>
                  <div className="unavailable-rule-notice">
                    <ShieldCheck size={14} aria-hidden="true" />
                    <span>Real-Data Guarantee: No AI mockups or placeholder graphics are displayed.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Specifications Grid */}
            <div className="modal-specs-columns">
              {/* Left Column: Description & Architecture */}
              <div className="modal-specs-left">
                <div className="modal-spec-block">
                  <h3 className="spec-heading">System Overview</h3>
                  <p className="spec-text">{project.description}</p>
                </div>

                {project.architecture && (
                  <div className="modal-spec-block arch-spec-block">
                    <h3 className="spec-heading">
                      <Cpu size={14} className="spec-heading-icon" aria-hidden="true" />
                      <span>Architecture &amp; System Design</span>
                    </h3>
                    <p className="spec-text arch-text">{project.architecture}</p>
                  </div>
                )}

                {/* Key Production Capabilities / Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="modal-spec-block">
                    <h3 className="spec-heading">Production Capabilities &amp; Verified Features</h3>
                    <ul className="modal-highlights-list">
                      {project.highlights.map((h, hIdx) => (
                        <li key={hIdx}>
                          <CheckCircle2 size={14} className="highlight-check-icon" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Stack, Metrics & Verified Endpoints */}
              <div className="modal-specs-right">
                {/* Engineering Role */}
                {project.role && (
                  <div className="modal-role-card">
                    <span className="role-lbl">Engineering Role</span>
                    <span className="role-val">{project.role}</span>
                  </div>
                )}

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="modal-metrics-card">
                    <h3 className="spec-subheading">Performance Metrics</h3>
                    <div className="modal-metrics-grid">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="modal-metric-item">
                          <span className="modal-metric-val">{m.value}</span>
                          <span className="modal-metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology Matrix */}
                <div className="modal-tech-card">
                  <h3 className="spec-subheading">Technology Matrix</h3>
                  <div className="modal-tech-chips">
                    {project.stack.map((t) => (
                      <span key={t} className="modal-tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Platform Endpoints & Action Links */}
                <div className="modal-actions-card">
                  <h3 className="spec-subheading">Verified Platform Endpoints</h3>

                  {/* Web Deployment Button */}
                  {project.webUrl && (
                    <a
                      href={project.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-sm modal-action-btn modal-action-btn-web"
                    >
                      <Globe size={14} aria-hidden="true" />
                      <span>Visit Website</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}

                  {/* Google Play Store Button */}
                  {project.googlePlayUrl && (
                    <a
                      href={project.googlePlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-sm modal-action-btn modal-action-btn-play"
                      style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)" }}
                    >
                      <Smartphone size={14} aria-hidden="true" />
                      <span>Google Play</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}

                  {/* Apple App Store Button */}
                  {project.appStoreUrl && (
                    <a
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-sm modal-action-btn modal-action-btn-appstore"
                      style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)" }}
                    >
                      <Smartphone size={14} aria-hidden="true" />
                      <span>App Store</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}

                  {/* Fallback to liveUrl if neither webUrl nor googlePlayUrl is set */}
                  {!project.webUrl && !project.googlePlayUrl && !project.appStoreUrl && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-sm modal-action-btn"
                    >
                      <span>
                        {project.packageId
                          ? "Open Google Play Store"
                          : "Launch Verified Live System"}
                      </span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}

                  {/* Secondary Verified URL */}
                  {project.secondaryUrl && (
                    <a
                      href={project.secondaryUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-sm modal-action-btn"
                    >
                      <span>{project.secondaryUrl.label}</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}

                  {/* Private development indicator */}
                  {!project.webUrl && !project.googlePlayUrl && !project.appStoreUrl && !project.liveUrl && !project.secondaryUrl && (
                    <div className="modal-unreleased-pill">
                      <Lock size={12} aria-hidden="true" />
                      <span>Private Development Codebase</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
