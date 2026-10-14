"use client";

import { useState } from "react";
import ThreeDModel from "./components/ThreeDModel";
import MarqueeSection from "./components/MarqueeSection";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Radio,
  Search,
  Smartphone,
  X,
  Database,
} from "lucide-react";

type PortfolioProject = {
  number: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  tone: string;
  liveUrl?: string | null;
  liveLabel?: string | null;
  screenshot?: string | null;
};

const projects: PortfolioProject[] = [
  {
    number: "01",
    name: "Photo Background Remover",
    category: "IMAGE UTILITY",
    summary: "A Python utility for removing image backgrounds and exploring practical image-processing workflows.",
    stack: ["Python","Image Processing"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    liveLabel: "View repository"
  },
  {
    number: "02",
    name: "Passport Photo AI",
    category: "AI IMAGE TOOL",
    summary: "A Python project exploring AI-assisted passport-photo preparation and image workflows.",
    stack: ["Python","AI","Image Processing"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/passport_photo_ai",
    liveLabel: "View repository"
  },
  {
    number: "03",
    name: "Learning Management System",
    category: "EDUCATION · WEB APP",
    summary: "A Django-based learning management system project for education-oriented workflows and server-rendered pages.",
    stack: ["Python","Django","Web"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    liveLabel: "View repository"
  },
  {
    number: "04",
    name: "Login UI",
    category: "MOBILE UI",
    summary: "A Flutter UI project focused on login and password-recovery screens.",
    stack: ["Flutter","Dart","UI Design"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/login-ui",
    liveLabel: "View repository"
  },
  {
    number: "05",
    name: "Django Todo API",
    category: "REST API",
    summary: "A Django API practice project for task-oriented endpoints and data operations.",
    stack: ["Python","Django","REST API"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/django_todo_api_test",
    liveLabel: "View repository"
  },
  {
    number: "06",
    name: "Donation Club",
    category: "DONATION MANAGEMENT",
    summary: "A PHP web application project for donation-club workflows.",
    stack: ["PHP","Web Application"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/donation_club",
    liveLabel: "View repository"
  },
  {
    number: "07",
    name: "Todo App",
    category: "TASK MANAGEMENT",
    summary: "A lightweight task-list application for organizing everyday tasks.",
    stack: ["Flutter","Dart","Productivity"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/todo_app",
    liveLabel: "View repository"
  },
  {
    number: "08",
    name: "Calorie Count",
    category: "HEALTH · WEB APP",
    summary: "A Django web project focused on calorie-counting and food-tracking workflows.",
    stack: ["Python","Django","Web"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/calorie_count",
    liveLabel: "View repository"
  },
  {
    number: "09",
    name: "Ecom Matrix",
    category: "E-COMMERCE",
    summary: "A commerce project repository for a multi-vendor shopping experience.",
    stack: ["E-commerce","Flutter","Mobile"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/ecom_matrix",
    liveLabel: "View repository"
  },
  {
    number: "10",
    name: "Daily Income Expense",
    category: "PERSONAL FINANCE",
    summary: "A project centered on tracking daily income and expenses.",
    stack: ["Python","Finance","Web App"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/daily_income_expose",
    liveLabel: "View repository"
  },
  {
    number: "11",
    name: "Rajbari Builder",
    category: "BUSINESS · WEBVIEW",
    summary: "A Flutter WebView application project for bringing a web experience to mobile.",
    stack: ["Flutter","Dart","WebView"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/rajbari_builder",
    liveLabel: "View repository"
  },
  {
    number: "12",
    name: "Wempro Company Task",
    category: "DEVELOPMENT TASK",
    summary: "A focused development-task repository; the source contains the implementation and deliverables.",
    stack: ["Software Development","Git"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/wempro-company-task",
    liveLabel: "View repository"
  },
  {
    number: "13",
    name: "Recipe Project",
    category: "FOOD · WEB APP",
    summary: "A project for organizing and presenting recipe-related content and workflows.",
    stack: ["Web Development","Recipes"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/recipe_project",
    liveLabel: "View repository"
  },
  {
    number: "14",
    name: "Cash Management",
    category: "FINANCE · SOFTWARE",
    summary: "A cash-management project focused on recording and organizing financial activity.",
    stack: ["Finance","Application"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/cash_management",
    liveLabel: "View repository"
  },
  {
    number: "15",
    name: "My Shop WebView",
    category: "MOBILE COMMERCE",
    summary: "A Flutter WebView project that wraps a shop experience for mobile access.",
    stack: ["Flutter","Dart","WebView"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/my_shop_webview",
    liveLabel: "View repository"
  },
  {
    number: "16",
    name: "WhatsApp WebView",
    category: "WEBVIEW APP",
    summary: "A WebView-focused mobile repository. Review its source for the exact supported workflow.",
    stack: ["Flutter","WebView","Mobile"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp_webview",
    liveLabel: "View repository"
  },
  {
    number: "17",
    name: "Library Management System",
    category: "LIBRARY · WEB APP",
    summary: "A Django-based library-management project built with server-rendered templates.",
    stack: ["Python","Django","HTML"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/libary_management_system",
    liveLabel: "View repository"
  },
  {
    number: "18",
    name: "Wholesale Shop WebView",
    category: "MOBILE COMMERCE",
    summary: "A Flutter WebView project for accessing a wholesale-shop experience on mobile.",
    stack: ["Flutter","Dart","WebView"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop_webView",
    liveLabel: "View repository"
  },
  {
    number: "19",
    name: "Django Modules",
    category: "BACKEND LEARNING",
    summary: "Django module experiments and reusable learning examples.",
    stack: ["Python","Django"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/django_module",
    liveLabel: "View repository"
  },
  {
    number: "20",
    name: "Calculator",
    category: "UTILITY APP",
    summary: "A compact calculator project focused on a familiar everyday utility workflow.",
    stack: ["Flutter","Dart","Utility"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/calculator",
    liveLabel: "View repository"
  },
  {
    number: "21",
    name: "Wholesale Shop",
    category: "E-COMMERCE · MOBILE",
    summary: "A Flutter shopping project focused on a wholesale-commerce experience.",
    stack: ["Flutter","Dart","E-commerce"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    liveLabel: "View repository"
  },
  {
    number: "22",
    name: "WhatsApp Clone UI",
    category: "MESSAGING · UI CONCEPT",
    summary: "A Flutter messaging-interface concept focused on UI patterns, not an official WhatsApp integration.",
    stack: ["Flutter","Dart","UI Design"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp-clone",
    liveLabel: "View repository"
  },
  {
    number: "23",
    name: "Quiz Application",
    category: "QUIZ · WEB APP",
    summary: "A Django project for interactive question-and-answer workflows.",
    stack: ["Python","Django","Education"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/quiz_application",
    liveLabel: "View repository"
  },
  {
    number: "24",
    name: "Food App",
    category: "FOOD · MOBILE APP",
    summary: "A Flutter project exploring food-service interface patterns and mobile user flows.",
    stack: ["Flutter","Dart","Mobile UI"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/Food-App",
    liveLabel: "View repository"
  },
  {
    number: "25",
    name: "Blog Project",
    category: "CONTENT · WEB APP",
    summary: "A web project for presenting written content through a simple website structure.",
    stack: ["HTML","Web Development"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/blog_project",
    liveLabel: "View repository"
  },
  {
    number: "26",
    name: "Django Portfolio Website",
    category: "PERSONAL PORTFOLIO",
    summary: "An earlier portfolio website built with Django templates.",
    stack: ["Python","Django","HTML/CSS"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/portofilo_website_django",
    liveLabel: "View repository"
  },
  {
    number: "27",
    name: "Al Hadith",
    category: "CONTENT · MOBILE",
    summary: "A Flutter project related to Al Hadith content and mobile presentation.",
    stack: ["Flutter","Dart","Content App"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/al_hadith",
    liveLabel: "View repository"
  },
  {
    number: "28",
    name: "Samir Imperia Real Estate & Interior",
    category: "REAL ESTATE · WEB",
    summary: "A real-estate and interior-design website project.",
    stack: ["Web Development","Real Estate","Interior"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/samirimperia-realstate-interior",
    liveLabel: "View repository"
  },
  {
    number: "29",
    name: "DeepVerse Lab",
    category: "SOFTWARE & PRODUCTS",
    summary: "A repository under the DeepVerse Lab name. Open the source to explore its actual implementation.",
    stack: ["Software Development","GitHub"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/deepverselab",
    liveLabel: "View repository"
  },
  {
    number: "30",
    name: "Chats App",
    category: "MESSAGING · MOBILE",
    summary: "A Flutter chat-app project exploring messaging-oriented screens and mobile interaction flows.",
    stack: ["Flutter","Dart","Chat UI"],
    tone: "neutral",
    liveUrl: "https://github.com/programmermdemonmiah/Chats-App",
    liveLabel: "View repository"
  },
  {
    number: "31",
    name: "Betikrom Fashion WebView",
    category: "FASHION · MOBILE COMMERCE",
    summary: "A Flutter WebView project for accessing a fashion-shopping website through a mobile app.",
    stack: ["Flutter","Dart","WebView","E-commerce"],
    tone: "red",
    liveUrl: "https://github.com/programmermdemonmiah/betikromfashion_web_view",
    liveLabel: "View repository"
  }
];

const services = [
  {
    number: "01",
    title: "Mobile applications",
    description:
      "Flutter applications with clear user flows, maintainable state management, and a focus on everyday usability.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Backend development",
    description:
      "APIs and business logic built with Go, Gin, GORM, PHP, and Laravel.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Web applications",
    description:
      "Next.js products, internal dashboards, and full-stack features connected to real backend services.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Realtime features",
    description:
      "Chat, presence, notifications, WebSocket events, and live-streaming integrations.",
    icon: Radio,
  },
  {
    number: "05",
    title: "Delivery and infrastructure",
    description:
      "Database design, Docker, Linux deployment, and CI/CD for applications in production.",
    icon: Database,
  },
];

const projectFilters = ["All", "Mobile", "Web", "Commerce", "AI & Tools", "Realtime"];

function ContactLink({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? "button button-compact" : "button"} href="mailto:contact.mdemonmiah@gmail.com">
      Contact me <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <motion.article className="project-card" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
      <a
        className={`project-art art-${project.tone}`}
        href={project.liveUrl || "#contact"}
        target={project.liveUrl ? "_blank" : undefined}
        rel={project.liveUrl ? "noreferrer" : undefined}
        aria-label={project.liveUrl ? `Open ${project.name} on GitHub` : project.name}
      >
        {project.screenshot ? (
          <img src={project.screenshot} alt={`${project.name} preview`} loading="lazy" />
        ) : (
          <div className="project-art-fallback">
            <span>{project.number}</span>
            <strong>{project.name}</strong>
            <small>{project.stack.join(" · ")}</small>
          </div>
        )}
        <span className="project-category">{project.category}</span>
        <ArrowUpRight className="project-arrow" size={20} aria-hidden="true" />
      </a>

      <div className="project-details">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <span>{project.number}</span>
        </div>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="Technologies">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.liveLabel || "View repository"} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <span>Private repository</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const visibleProjects = projects.filter((project) => {
    const text = [
      project.name,
      project.category,
      project.summary,
      ...project.stack,
    ]
      .join(" ")
      .toLowerCase();

    if (search.trim() && !text.includes(search.trim().toLowerCase())) {
      return false;
    }

    if (activeFilter === "All") return true;
    if (activeFilter === "Mobile") return /flutter|mobile|dart|webview/.test(text);
    if (activeFilter === "Web") return /web|django|next\.js|react|html|css|php|website|portfolio/.test(text);
    if (activeFilter === "Commerce") return /commerce|shop|shopping|store|ecom|wholesale|fashion/.test(text);
    if (activeFilter === "AI & Tools") return /ai|image|photo|utility|calculator|python/.test(text);
    if (activeFilter === "Realtime") return /realtime|real-time|livekit|websocket|streaming|chat|messaging/.test(text);
    return true;
  });

  return (
    <main>
      <header className="site-header" id="top">
        <nav className="navigation" aria-label="Main navigation">
          <a className="brand" href="#top">
            <span className="brand-mark">EM</span>
            <span>
              MD. EMON MIAH
              <small>Software Engineer</small>
            </span>
          </a>

          <div className={menuOpen ? "nav-links nav-links-open" : "nav-links"}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Expertise</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>

          <ContactLink compact />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Software engineer · Bangladesh</p>
            <h1>Building software<br />that <span>works.</span></h1>
            <p className="hero-description">
              I build mobile apps, backend services, and web products—from the first screen to deployment.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">View my work <ArrowUpRight size={16} /></a>
              <a className="text-link" href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub profile
              </a>
            </div>
            <ul className="tech-list" aria-label="Main technologies">
              <li>Flutter</li><li>Go</li><li>Next.js</li><li>Laravel</li>
            </ul>
          </div>
          <ThreeDModel />
        </div>
      </header>

      <MarqueeSection />

      <section className="about section" id="about">
        <div className="section-heading">
          <p className="eyebrow">A little about me</p>
          <h2>Engineering with<br /><span>purpose.</span></h2>
        </div>
        <div className="about-copy">
          <p>
            I work across mobile, backend, and web development. My day-to-day work includes building Flutter apps, designing APIs, connecting services, and making sure the pieces work well together.
          </p>
          <p>
            I value readable code, sensible architecture, and solutions that are practical to maintain after release.
          </p>
          <div className="social-links">
            <a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
            <a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading">
          <p className="eyebrow">What I work on</p>
          <h2>Areas of <span>expertise.</span></h2>
        </div>
        <div className="service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article className="service-row" key={service.number} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: Number(service.number) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-heading projects-heading">
          <div>
            <p className="eyebrow">Selected repositories</p>
            <h2>Things I’ve <span>built.</span></h2>
          </div>
          <a className="text-link" href="https://github.com/programmermdemonmiah?tab=repositories" target="_blank" rel="noreferrer">
            All GitHub repositories <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="project-tools">
          <div className="project-filters" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "filter-button active" : "filter-button"}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <label className="project-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects or technologies"
            />
          </label>
          <p className="results-count">{visibleProjects.length} of {projects.length} repositories</p>
        </div>

        {visibleProjects.length ? (
          <div className="projects-grid">
            {visibleProjects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        ) : (
          <p className="empty-state">No matching repositories. Try a different search.</p>
        )}
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <p className="eyebrow">Have a project in mind?</p>
          <h2>Let’s talk about<br /><span>what’s next.</span></h2>
          <p>For work enquiries, reach me by email.</p>
          <ContactLink />
        </div>
        <div className="footer-bottom">
          <a className="brand" href="#top"><span className="brand-mark">EM</span><span>MD. EMON MIAH<small>Software Engineer</small></span></a>
          <span>© {new Date().getFullYear()} MD. Emon Miah</span>
          <div className="footer-socials">
            <a href="https://github.com/programmermdemonmiah" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/mdemonmiah" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="mailto:contact.mdemonmiah@gmail.com" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
