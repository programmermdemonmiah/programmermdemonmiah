"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ArrowUpRight,
  Github,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
} from "lucide-react";

export type PortfolioProject = {
  number: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  liveUrl: string;
  liveLabel?: string;
  screenshot?: string;
};

const PROJECTS: PortfolioProject[] = [
  {
    number: "01",
    name: "Photo Background Remover",
    category: "AI & Image Processing",
    summary: "A Python utility for removing image backgrounds and exploring practical automated image-processing workflows.",
    stack: ["Python", "Image Processing", "OpenCV"],
    liveUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    liveLabel: "View repository",
    screenshot: "/projects/photo-bg-remover.svg",
  },
  {
    number: "02",
    name: "Passport Photo AI",
    category: "AI & Tools",
    summary: "A Python project exploring AI-assisted passport-photo preparation, facial alignment, and image workflows.",
    stack: ["Python", "AI", "Image Processing"],
    liveUrl: "https://github.com/programmermdemonmiah/passport_photo_ai",
    liveLabel: "View repository",
  },
  {
    number: "03",
    name: "Learning Management System",
    category: "Web Applications",
    summary: "A Django-based learning management system project for education-oriented workflows, student rosters, and server-rendered templates.",
    stack: ["Python", "Django", "PostgreSQL", "Web"],
    liveUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    liveLabel: "View repository",
  },
  {
    number: "04",
    name: "Login UI Flow",
    category: "Mobile",
    summary: "A Flutter UI system focusing on smooth authentication, password-recovery screens, and responsive layout guidelines.",
    stack: ["Flutter", "Dart", "UI Architecture"],
    liveUrl: "https://github.com/programmermdemonmiah/login-ui",
    liveLabel: "View repository",
  },
  {
    number: "05",
    name: "Django Todo API",
    category: "Backend & APIs",
    summary: "A Django REST Framework API practice project implementing task-oriented endpoints, filtering, and data operations.",
    stack: ["Python", "Django REST", "REST APIs"],
    liveUrl: "https://github.com/programmermdemonmiah/django_todo_api_test",
    liveLabel: "View repository",
  },
  {
    number: "06",
    name: "Donation Club",
    category: "Web Applications",
    summary: "A PHP web application project handling donation-club workflows, transaction logs, and member management.",
    stack: ["PHP", "MySQL", "Web Application"],
    liveUrl: "https://github.com/programmermdemonmiah/donation_club",
    liveLabel: "View repository",
  },
  {
    number: "07",
    name: "Todo App",
    category: "Mobile",
    summary: "A lightweight cross-platform mobile task-list application for organizing daily schedules and persistent local state.",
    stack: ["Flutter", "Dart", "Productivity"],
    liveUrl: "https://github.com/programmermdemonmiah/todo_app",
    liveLabel: "View repository",
  },
  {
    number: "08",
    name: "Calorie Count",
    category: "Web Applications",
    summary: "A Django web platform focused on calorie counting, nutritional logging, and meal tracking analytics.",
    stack: ["Python", "Django", "Web"],
    liveUrl: "https://github.com/programmermdemonmiah/calorie_count",
    liveLabel: "View repository",
  },
  {
    number: "09",
    name: "Ecom Matrix",
    category: "Commerce",
    summary: "An e-commerce repository architecture supporting multi-vendor shopping, product catalogs, and mobile-friendly carts.",
    stack: ["Flutter", "Dart", "E-commerce", "Mobile"],
    liveUrl: "https://github.com/programmermdemonmiah/ecom_matrix",
    liveLabel: "View repository",
    screenshot: "/projects/ecom-matrix.svg",
  },
  {
    number: "10",
    name: "Daily Income Expense",
    category: "Tools & Utilities",
    summary: "A financial tracking project centered on logging daily cash inflows, recurring expenses, and categorization summaries.",
    stack: ["Python", "Finance", "Web App"],
    liveUrl: "https://github.com/programmermdemonmiah/daily_income_expose",
    liveLabel: "View repository",
  },
  {
    number: "11",
    name: "Rajbari Builder",
    category: "Mobile",
    summary: "A Flutter hybrid WebView application delivering responsive real-estate web services to mobile environments.",
    stack: ["Flutter", "Dart", "WebView"],
    liveUrl: "https://github.com/programmermdemonmiah/rajbari_builder",
    liveLabel: "View repository",
  },
  {
    number: "12",
    name: "Wempro Company Task",
    category: "Backend & APIs",
    summary: "A focused development task repository demonstrating software architecture, Git versioning, and clean coding deliverables.",
    stack: ["Software Engineering", "Git", "APIs"],
    liveUrl: "https://github.com/programmermdemonmiah/wempro-company-task",
    liveLabel: "View repository",
  },
  {
    number: "13",
    name: "Recipe Project",
    category: "Web Applications",
    summary: "A web platform for cataloging, categorizing, and searching culinary recipes with responsive layout presentation.",
    stack: ["Web Development", "PHP", "Database"],
    liveUrl: "https://github.com/programmermdemonmiah/recipe_project",
    liveLabel: "View repository",
  },
  {
    number: "14",
    name: "Cash Management System",
    category: "Tools & Utilities",
    summary: "A cash management system tailored for tracking business registers, audit logs, and account balances.",
    stack: ["Finance", "Data Tracking", "Application"],
    liveUrl: "https://github.com/programmermdemonmiah/cash_management",
    liveLabel: "View repository",
  },
  {
    number: "15",
    name: "My Shop WebView",
    category: "Commerce",
    summary: "A Flutter mobile wrapper delivering a tailored e-commerce shop experience with offline fallback resilience.",
    stack: ["Flutter", "Dart", "WebView", "Commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/my_shop_webview",
    liveLabel: "View repository",
  },
  {
    number: "16",
    name: "WhatsApp WebView",
    category: "Mobile",
    summary: "A WebView-focused Flutter mobile application project exploring modern mobile container wrappers.",
    stack: ["Flutter", "Dart", "WebView"],
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp_webview",
    liveLabel: "View repository",
  },
  {
    number: "17",
    name: "Library Management System",
    category: "Web Applications",
    summary: "A Django-based library management platform built with server-rendered views, book catalogs, and lending tracking.",
    stack: ["Python", "Django", "HTML/CSS", "Relational DB"],
    liveUrl: "https://github.com/programmermdemonmiah/libary_management_system",
    liveLabel: "View repository",
  },
  {
    number: "18",
    name: "Wholesale Shop WebView",
    category: "Commerce",
    summary: "A Flutter WebView application for bulk purchasing and commercial wholesale operations on mobile devices.",
    stack: ["Flutter", "Dart", "WebView", "E-commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop_webView",
    liveLabel: "View repository",
  },
  {
    number: "19",
    name: "Django Modules",
    category: "Backend & APIs",
    summary: "A repository of reusable Django modular patterns, authentication hooks, and backend architecture examples.",
    stack: ["Python", "Django", "Backend Architecture"],
    liveUrl: "https://github.com/programmermdemonmiah/django_module",
    liveLabel: "View repository",
  },
  {
    number: "20",
    name: "Calculator",
    category: "Tools & Utilities",
    summary: "A fast, clean arithmetic calculator app implemented with Flutter, emphasizing responsive layout precision.",
    stack: ["Flutter", "Dart", "Mobile UI"],
    liveUrl: "https://github.com/programmermdemonmiah/calculator",
    liveLabel: "View repository",
  },
  {
    number: "21",
    name: "Wholesale Shop",
    category: "Commerce",
    summary: "A native Flutter commerce project exploring bulk pricing structures, cart management, and product catalogues.",
    stack: ["Flutter", "Dart", "E-commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    liveLabel: "View repository",
  },
  {
    number: "22",
    name: "WhatsApp Clone UI",
    category: "Mobile",
    summary: "A Flutter mobile interface study reproducing complex messaging layouts, chat lists, status bars, and interaction states.",
    stack: ["Flutter", "Dart", "UI Design", "Mobile"],
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp-clone",
    liveLabel: "View repository",
  },
  {
    number: "23",
    name: "Quiz Application",
    category: "Web Applications",
    summary: "A dynamic Django educational platform supporting interactive timed quizzes, answer scoring, and review history.",
    stack: ["Python", "Django", "Web App"],
    liveUrl: "https://github.com/programmermdemonmiah/quiz_application",
    liveLabel: "View repository",
  },
  {
    number: "24",
    name: "Food Delivery App UI",
    category: "Mobile",
    summary: "A Flutter mobile UI architecture exploring food delivery menus, restaurant profiles, and checkout workflows.",
    stack: ["Flutter", "Dart", "Mobile UI"],
    liveUrl: "https://github.com/programmermdemonmiah/Food-App",
    liveLabel: "View repository",
  },
  {
    number: "25",
    name: "Blog Platform",
    category: "Web Applications",
    summary: "A content management web application with clean article formatting, category indexing, and SEO meta structure.",
    stack: ["HTML", "CSS", "Web Development"],
    liveUrl: "https://github.com/programmermdemonmiah/blog_project",
    liveLabel: "View repository",
  },
  {
    number: "26",
    name: "Django Portfolio",
    category: "Web Applications",
    summary: "An early developer portfolio template built with Django template inheritance and custom styling rules.",
    stack: ["Python", "Django", "HTML/CSS"],
    liveUrl: "https://github.com/programmermdemonmiah/portofilo_website_django",
    liveLabel: "View repository",
  },
  {
    number: "27",
    name: "Al Hadith",
    category: "Mobile",
    summary: "A Flutter content application presenting indexed Islamic Hadith chapters with search and reading conveniences.",
    stack: ["Flutter", "Dart", "Content App"],
    liveUrl: "https://github.com/programmermdemonmiah/al_hadith",
    liveLabel: "View repository",
  },
  {
    number: "28",
    name: "Samir Imperia Real Estate",
    category: "Web Applications",
    summary: "A real-estate and interior design showcase web project with property galleries and inquiry channels.",
    stack: ["Web Development", "Real Estate UI", "JavaScript"],
    liveUrl: "https://github.com/programmermdemonmiah/samirimperia-realstate-interior",
    liveLabel: "View repository",
  },
  {
    number: "29",
    name: "DeepVerse Lab",
    category: "Tools & Utilities",
    summary: "An open engineering repository under the DeepVerse Lab ecosystem demonstrating software architecture experiments.",
    stack: ["Software Development", "GitHub", "Architecture"],
    liveUrl: "https://github.com/programmermdemonmiah/deepverselab",
    liveLabel: "View repository",
    screenshot: "/projects/deepverselab.svg",
  },
  {
    number: "30",
    name: "Chats App",
    category: "Mobile",
    summary: "A Flutter instant-messaging interface concept exploring conversation lists, message bubbles, and mobile gestures.",
    stack: ["Flutter", "Dart", "Chat UI", "Mobile"],
    liveUrl: "https://github.com/programmermdemonmiah/Chats-App",
    liveLabel: "View repository",
  },
  {
    number: "31",
    name: "Betikrom Fashion WebView",
    category: "Commerce",
    summary: "A Flutter mobile web-view container connecting a fashion e-commerce storefront with native device capabilities.",
    stack: ["Flutter", "Dart", "WebView", "E-commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/betikromfashion_web_view",
    liveLabel: "View repository",
  },
];

const CATEGORIES = ["All", "Mobile", "Backend & APIs", "Web Applications", "Commerce", "Tools & Utilities"];
const ITEMS_PER_PAGE = 6;

function ProjectCard({ project }: { project: PortfolioProject }) {
  const [imgError, setImgError] = useState(false);

  // Generate GitHub OpenGraph URL if no custom screenshot is specified
  const ogPreview = useMemo(() => {
    if (project.screenshot) return project.screenshot;
    const match = project.liveUrl.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/i);
    return match ? `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}` : null;
  }, [project.screenshot, project.liveUrl]);

  return (
    <article className="project-card">
      {/* Visual Header / Preview */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card-media"
        aria-label={`Open ${project.name} repository on GitHub`}
      >
        {ogPreview && !imgError ? (
          <img
            src={ogPreview}
            alt={`${project.name} preview`}
            className="project-card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-card-placeholder">
            <div className="placeholder-pattern" aria-hidden="true" />
            <div className="placeholder-content">
              <span className="placeholder-num">{project.number}</span>
              <h4 className="placeholder-title">{project.name}</h4>
              <span className="placeholder-stack">{project.stack.slice(0, 2).join(" · ")}</span>
            </div>
          </div>
        )}
        <div className="project-media-shade" aria-hidden="true" />
        <span className="project-category-badge">{project.category}</span>
        <span className="project-view-icon" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </a>

      {/* Details Body */}
      <div className="project-card-body">
        <div className="project-card-header">
          <h3 className="project-card-title">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>
          <span className="project-card-number">{project.number}</span>
        </div>

        <p className="project-card-summary">{project.summary}</p>

        {/* Tech Tags */}
        <div className="project-card-tags" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Link */}
        <div className="project-card-footer">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-repo-link"
          >
            <Github size={14} aria-hidden="true" />
            <span>{project.liveLabel || "View on GitHub"}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      if (activeCategory !== "All") {
        if (activeCategory === "Mobile" && !/mobile|flutter|dart|webview/i.test(`${project.category} ${project.stack.join(" ")}`)) {
          return false;
        }
        if (activeCategory === "Backend & APIs" && !/backend|api|rest|django/i.test(`${project.category} ${project.stack.join(" ")}`)) {
          return false;
        }
        if (activeCategory === "Web Applications" && !/web|django|html|css|app/i.test(`${project.category} ${project.stack.join(" ")}`)) {
          return false;
        }
        if (activeCategory === "Commerce" && !/commerce|shop|ecom/i.test(`${project.category} ${project.stack.join(" ")}`)) {
          return false;
        }
        if (activeCategory === "Tools & Utilities" && !/tool|utility|finance|calculator|ai|image/i.test(`${project.category} ${project.stack.join(" ")}`)) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const searchable = `${project.name} ${project.category} ${project.summary} ${project.stack.join(" ")}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  // Reset pagination when search or category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Paginated items
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <section className="projects-section" id="projects" aria-label="Selected Projects Portfolio">
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-header-row">
          <div>
            <p className="section-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Verified Portfolio
            </p>
            <h2 className="section-title">
              Selected <span>projects.</span>
            </h2>
            <p className="section-subtitle">
              Explore real GitHub repositories built across mobile, backend APIs, web applications, and developer tools.
            </p>
          </div>
          <div className="projects-header-action">
            <a
              href="https://github.com/programmermdemonmiah?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-sm"
            >
              <Github size={15} aria-hidden="true" />
              <span>All 31+ Repositories</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-toolbar">
          {/* Categories */}
          <div className="category-tabs" role="tablist" aria-label="Filter projects by domain">
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

          {/* Search Bar */}
          <div className="project-search-wrap">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              className="project-search-input"
              placeholder="Search by name, tech or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search portfolio projects"
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

        {/* Results Counter */}
        <div className="projects-counter-row">
          <span className="counter-text">
            Showing <strong>{filteredProjects.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length)}</strong> of{" "}
            <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
          {activeCategory !== "All" && (
            <span className="counter-filter-tag">
              Filter: <strong>{activeCategory}</strong>
            </span>
          )}
        </div>

        {/* Projects Grid */}
        {paginatedProjects.length > 0 ? (
          <div className="projects-grid">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.number + project.name} project={project} />
            ))}
          </div>
        ) : (
          <div className="projects-empty-state">
            <FolderGit2 size={36} className="empty-icon" aria-hidden="true" />
            <h3 className="empty-title">No projects found</h3>
            <p className="empty-desc">
              No repositories matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeCategory}&rdquo;.
            </p>
            <button
              type="button"
              className="btn-outline-sm empty-reset-btn"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setCurrentPage(1);
              }}
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <nav className="projects-pagination" aria-label="Projects pagination">
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              <span>Previous</span>
            </button>

            <div className="pagination-pages" aria-label="Page numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-num-btn ${isActive ? "pagination-num-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
