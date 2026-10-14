"use client";

import { useState, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Search,
  ArrowUpRight,
  ExternalLink,
  Smartphone,
  Globe,
  Radio,
  Layers,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Building2,
  Wallet,
  CheckCircle2,
} from "lucide-react";

export type RealProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  role: string;
  stack: string[];
  summary: string;
  architecture: string;
  features: string[];
  liveWebUrl?: string;
  playStoreUrl?: string;
  image: string;
  icon: typeof Smartphone;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
};

// Real Production & Commercial Systems from CV
const REAL_PROJECTS: RealProject[] = [
  {
    id: "live-streaming",
    number: "01",
    title: "Live Streaming Mobile Platform",
    category: "Mobile & Real-time",
    role: "Full Stack Engineer (Flutter + Go Microservice Backend)",
    stack: ["Flutter", "Go (Golang)", "WebSockets", "Microservices", "Live Audio/Video", "Clean Architecture"],
    summary:
      "A high-concurrency live streaming mobile platform built with a high-performance Flutter client and separate Go-based microservices (API Server and Streaming Core Backend).",
    architecture:
      "Event-driven architecture with low-latency WebSockets handling live chat, viewer presence, room state transitions, and high concurrency via Go routines.",
    features: [
      "Real-time audio & video live broadcasting and interactive viewer rooms",
      "Live room join/leave workflow with host-controlled approval",
      "VIP instant join & premium tier access permissions",
      "Virtual gift economy with animated live rankings & entry visuals",
      "High-throughput concurrency handling thousands of concurrent listeners",
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    icon: Radio,
    accentColor: "#F87171",
    badgeBg: "rgba(239, 68, 68, 0.16)",
    badgeBorder: "rgba(239, 68, 68, 0.45)",
  },
  {
    id: "xovalley-ecom",
    number: "02",
    title: "Xovalley — Multi Vendor E-commerce",
    category: "Commerce & Fintech",
    role: "Full Stack Engineer (Laravel + Flutter + System Design)",
    stack: ["Flutter", "Laravel", "React.js", "MySQL", "bKash / Nagad", "Multi-Vendor"],
    summary:
      "An end-to-end multi-vendor e-commerce commercial ecosystem consisting of customer, vendor, and delivery partner mobile applications connected to a centralized Laravel API engine.",
    architecture:
      "Unified REST API backend powering React.js web interfaces and 3 separate Flutter applications with real-time delivery tracking and wallet payout automation.",
    features: [
      "Multi-vendor marketplace, cataloging, & commission automation",
      "Tri-app ecosystem: Customer App, Seller App & Delivery Man App",
      "Multi-channel payment gateway integration (bKash, Nagad, Cards)",
      "Real-time delivery status, rider location, and order tracking",
      "Affiliate marketing engine, referral tracking & automated payouts",
    ],
    liveWebUrl: "https://xovalley.com",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.xovalley.user_app",
    image: "https://xovalley.com/storage/company/2026-04-17-69e249a72131a.webp",
    icon: Globe,
    accentColor: "#60A5FA",
    badgeBg: "rgba(96, 165, 250, 0.16)",
    badgeBorder: "rgba(96, 165, 250, 0.45)",
  },
  {
    id: "araco-health",
    number: "03",
    title: "ARACO Healthcare Ecosystem",
    category: "Healthcare & Telemedicine",
    role: "Full Stack Engineer (Flutter + Django + System Design)",
    stack: ["Flutter (GetX)", "Django", "Zego Cloud", "WebRTC", "Telemedicine", "POS"],
    summary:
      "A comprehensive digital healthcare platform combining an online pharmacy, teleconsultation audio/video calling, and clinical laboratory appointments.",
    architecture:
      "Flutter mobile app using GetX state architecture integrated with Zego Cloud WebRTC media pipelines and a Django administration backend.",
    features: [
      "Doctor appointment booking & encrypted video/audio consultations",
      "Online pharmacy with digital prescription upload & order fulfillment",
      "Lab test bookings with caregiver home collection workflow",
      "Digital lab report delivery & automated patient history records",
      "Hospital administrator POS, inventory control & billing system",
    ],
    liveWebUrl: "https://araco.com.bd",
    image: "https://araco.com.bd/media/branding/header_logo_20251220132256_logo-2.png",
    icon: Smartphone,
    accentColor: "#2DD4BF",
    badgeBg: "rgba(45, 212, 191, 0.16)",
    badgeBorder: "rgba(45, 212, 191, 0.45)",
  },
  {
    id: "laam-erp",
    number: "04",
    title: "LA’AM Enterprise Garments ERP",
    category: "Enterprise ERP",
    role: "System Architect & Backend Developer",
    stack: ["PHP (Laravel)", "MySQL", "WordPress API", "RBAC", "Inventory Sync", "Courier API"],
    summary:
      "A comprehensive Enterprise Resource Planning platform for managing multi-tier employee permissions, garments e-commerce order pipelines, and warehouse operations.",
    architecture:
      "Direct WordPress plugin integration for real-time order intake, inventory auto-sync, and automated courier tracking pipelines.",
    features: [
      "Employee RBAC & team permission tier management",
      "Automated incentive calculation engine per employee & product",
      "Courier auto-tracking with dynamic weight-based shipping calculation",
      "Comprehensive accounting ledger (income, expense, profit/loss)",
      "Employee wallet balance system & executive business intelligence dashboards",
    ],
    liveWebUrl: "https://erpecom.deepverselab.com/login",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    icon: Layers,
    accentColor: "#34D399",
    badgeBg: "rgba(52, 211, 153, 0.16)",
    badgeBorder: "rgba(52, 211, 153, 0.45)",
  },
  {
    id: "propeta-realestate",
    number: "05",
    title: "Propeta — Real Estate Platform",
    category: "Mobile & Real-time",
    role: "Full Stack Engineer (Flutter + Django + System Design)",
    stack: ["Flutter", "Django REST", "PostgreSQL", "Geolocation", "Clean Architecture"],
    summary:
      "A modern cross-platform property discovery and real estate portal connecting buyers, tenants, verified realtors, and property agencies.",
    architecture:
      "Clean MVC backend architecture with geocoded spatial search, agent portfolio management, and mobile state caching.",
    features: [
      "Property listing and multi-criteria spatial search & filtering",
      "Agent-based listing management with verification workflows",
      "Direct realtor messaging and schedule viewing inquiries",
      "High-resolution image galleries and interactive amenity breakdowns",
      "API-driven architecture with clean Service/Repository patterns",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    icon: Building2,
    accentColor: "#FBBF24",
    badgeBg: "rgba(251, 191, 36, 0.16)",
    badgeBorder: "rgba(251, 191, 36, 0.45)",
  },
  {
    id: "cashmart-banking",
    number: "06",
    title: "CashMart — Digital Banking & Wallet",
    category: "Commerce & Fintech",
    role: "Backend Engineer (Django API) & Mobile Developer",
    stack: ["Flutter", "Django (Python)", "JWT & OTP", "QR Payments", "Fintech"],
    summary:
      "A mobile fintech banking and commerce ecosystem providing digital wallet transfers, merchant QR cashouts, and automated ledger reporting.",
    architecture:
      "Secure transaction pipeline with multi-factor OTP authentication, double-entry wallet ledger, and cryptographic QR code generation.",
    features: [
      "Instant peer-to-peer wallet transfers & balance management",
      "Merchant QR code scanner for instant cashless checkouts",
      "Detailed statement history with exportable PDF financial reports",
      "Profit sharing earning logic & tiered deposit reward incentives",
      "High-security OTP verification and fraud-prevention logging",
    ],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    icon: Wallet,
    accentColor: "#C084FC",
    badgeBg: "rgba(192, 132, 252, 0.16)",
    badgeBorder: "rgba(192, 132, 252, 0.45)",
  },
];

const CATEGORIES = [
  "All",
  "Mobile & Real-time",
  "Commerce & Fintech",
  "Healthcare & Telemedicine",
  "Enterprise ERP",
];

function RealProjectCard({ project }: { project: RealProject }) {
  const Icon = project.icon;

  return (
    <article className="real-project-showcase-card" style={{ borderColor: project.badgeBorder }}>
      {/* Media Preview Column */}
      <div className="real-card-media-col">
        <img
          src={project.image}
          alt={`${project.title} live system preview`}
          className="real-card-img"
          loading="lazy"
        />
        <div className="real-card-media-overlay" aria-hidden="true" />

        <div className="real-card-badge-header">
          <span
            className="real-card-cat-badge"
            style={{
              color: project.accentColor,
              backgroundColor: project.badgeBg,
              borderColor: project.badgeBorder,
            }}
          >
            <Icon size={13} aria-hidden="true" />
            <span>{project.category}</span>
          </span>
          <span className="real-card-num">{project.number}</span>
        </div>
      </div>

      {/* Content Column */}
      <div className="real-card-body-col">
        <div className="real-card-header">
          <div>
            <span className="real-card-role" style={{ color: project.accentColor }}>
              {project.role}
            </span>
            <h3 className="real-card-title">{project.title}</h3>
          </div>
        </div>

        <p className="real-card-summary">{project.summary}</p>

        {/* Architecture Highlight Box */}
        <div className="real-arch-box">
          <span className="arch-label">SYSTEM ARCHITECTURE</span>
          <p className="arch-text">{project.architecture}</p>
        </div>

        {/* Key Features List */}
        <ul className="real-card-features">
          {project.features.map((feat, i) => (
            <li key={i}>
              <CheckCircle2 size={14} className="feature-check-icon" style={{ color: project.accentColor }} aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Pills */}
        <div className="real-card-tags" aria-label="Technologies used">
          {project.stack.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="real-card-actions">
          {project.playStoreUrl && (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-sm"
            >
              <Smartphone size={14} aria-hidden="true" />
              <span>Google Play App</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
          {project.liveWebUrl && (
            <a
              href={project.liveWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-sm"
            >
              <Globe size={14} aria-hidden="true" />
              <span>Live Web Portal</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredProjects = useMemo(() => {
    return REAL_PROJECTS.filter((project) => {
      if (activeCategory !== "All" && project.category !== activeCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const searchable = `${project.title} ${project.category} ${project.summary} ${project.role} ${project.stack.join(" ")}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(0);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setActiveIndex(0);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  };

  return (
    <section className="projects-section" id="projects" aria-label="Real Production Projects">
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-header-row">
          <div>
            <p className="section-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Production Systems &amp; Commercial Platforms
            </p>
            <h2 className="section-title">
              Featured <span>real projects.</span>
            </h2>
            <p className="section-subtitle">
              Commercial production ecosystems, fintech platforms, live streaming systems, and enterprise ERP solutions.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle" role="group" aria-label="View mode toggle">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "slider" ? "view-mode-btn-active" : ""}`}
              onClick={() => setViewMode("slider")}
              title="Upper & Bottom Swiper Deck"
              aria-pressed={viewMode === "slider"}
            >
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span>Upper &amp; Bottom Swiper</span>
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
          <div className="category-tabs" role="tablist" aria-label="Filter real projects by domain">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab ${isActive ? "category-tab-active" : ""}`}
                  onClick={() => handleCategoryChange(cat)}
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
              placeholder="Search by name, role or tech..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search real projects"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter & Swiper Controls Row */}
        <div className="projects-counter-row">
          <span className="counter-text">
            Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? "commercial project" : "commercial projects"}
            {viewMode === "slider" && filteredProjects.length > 0 && (
              <span className="vertical-deck-status">
                {" · "}
                <strong>Project {activeIndex + 1} of {filteredProjects.length}</strong>
                {" · Swipe Up / Down or Scroll"}
              </span>
            )}
          </span>

          {viewMode === "slider" && filteredProjects.length > 0 && (
            <div className="swiper-nav-controls">
              <button
                type="button"
                className="swiper-arrow-btn swiper-up-custom"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={activeIndex === 0}
                aria-label="Previous project (Upper)"
                title="Upper project"
              >
                <ChevronUp size={18} aria-hidden="true" />
              </button>
              <span className="swiper-counter-pill">
                {String(activeIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="swiper-arrow-btn swiper-down-custom"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={activeIndex >= filteredProjects.length - 1}
                aria-label="Next project (Bottom)"
                title="Bottom project"
              >
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Content: Upper & Bottom Swiper Deck OR Grid View */}
        {filteredProjects.length > 0 ? (
          viewMode === "slider" ? (
            <div className="projects-vertical-container">
              <Swiper
                modules={[Navigation, Pagination, A11y, Keyboard, Mousewheel]}
                direction="vertical"
                slidesPerView={1}
                spaceBetween={24}
                mousewheel={{
                  forceToAxis: true,
                  releaseOnEdges: true,
                }}
                grabCursor={true}
                keyboard={{ enabled: true }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }}
                className="projects-vertical-swiper"
              >
                {filteredProjects.map((project) => (
                  <SwiperSlide key={project.id} className="project-vertical-slide">
                    <RealProjectCard project={project} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="real-projects-grid">
              {filteredProjects.map((project) => (
                <RealProjectCard key={project.id} project={project} />
              ))}
            </div>
          )
        ) : (
          <div className="projects-empty-state">
            <Sparkles size={36} className="empty-icon" aria-hidden="true" />
            <h3 className="empty-title">No projects matched</h3>
            <p className="empty-desc">
              No real projects matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeCategory}&rdquo;.
            </p>
            <button
              type="button"
              className="btn-outline-sm empty-reset-btn"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
