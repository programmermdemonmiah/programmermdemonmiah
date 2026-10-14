"use client";

import { useEffect } from "react";
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

function getPlatformPills(project: VerifiedProject): string[] {
  const pills: string[] = [];
  const s = project.stack.map((t) => t.toLowerCase());

  if (project.category === "Mobile App" || s.includes("flutter") || s.includes("dart")) {
    pills.push("Android Mobile", "iOS Mobile");
    if (project.stack.some((t) => t.toLowerCase().includes("tv"))) {
      pills.push("Android Smart TV");
    }
  }

  if (s.includes("next.js") || s.includes("react") || s.includes("vue") || s.includes("laravel") || s.includes("django")) {
    pills.push("Responsive Web UI");
  }

  if (s.includes("go (gin)") || s.includes("microservices") || s.includes("docker") || s.includes("websockets")) {
    pills.push("High-Concurrency Microservices");
  }

  if (pills.length === 0) {
    pills.push("Full Stack Software Platform");
  }

  return pills;
}

export default function ProjectDetailsModal({
  project,
  onClose,
  onOpenLightbox,
}: ProjectDetailsModalProps) {
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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  const CategoryIcon = getCategoryIcon(project.category);
  const platforms = getPlatformPills(project);
  const hasRealScreenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0;

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
            <div className="modal-platform-row" aria-label="Platform availability">
              <span className="platform-row-label">Platform Targets:</span>
              <div className="platform-chips">
                {platforms.map((p) => (
                  <span key={p} className="platform-chip">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Media Showcase (Real Screenshots or Clean In-Development State) */}
            <div className="modal-media-showcase">
              {hasRealScreenshots ? (
                <div className="modal-screenshots-grid">
                  {project.screenshots.map((img, sIdx) => (
                    <div
                      key={img + sIdx}
                      className="modal-screenshot-frame"
                      onClick={() =>
                        onOpenLightbox?.({
                          images: project.screenshots,
                          index: sIdx,
                          projectName: project.name,
                          category: project.category,
                          liveUrl: project.liveUrl,
                        })
                      }
                      title="Inspect full-resolution screenshot"
                    >
                      <Image
                        src={img}
                        alt={`${project.name} verified screenshot ${sIdx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="modal-screenshot-img"
                      />
                      <div className="modal-screenshot-overlay">
                        <Maximize2 size={16} aria-hidden="true" />
                        <span>Enlarge Screenshot</span>
                      </div>
                    </div>
                  ))}
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
                    Source code and architectural structure are authenticated in internal GitHub
                    repositories. Live UI capture will be published following production store/domain release.
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

                {/* Verified Endpoints & Actions */}
                <div className="modal-actions-card">
                  <h3 className="spec-subheading">Verified Endpoints</h3>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-sm modal-action-btn"
                    >
                      <span>
                        {project.packageId
                          ? "Open Google Play Store Listing"
                          : "Launch Verified Live System"}
                      </span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}

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

                  {!project.liveUrl && !project.secondaryUrl && (
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
