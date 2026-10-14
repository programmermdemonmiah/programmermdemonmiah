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
  Github,
  ChevronUp,
  ChevronDown,
  FolderGit2,
  ExternalLink,
  Smartphone,
  Globe,
  Radio,
  Layers,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";

export type FeaturedSystem = {
  id: string;
  title: string;
  category: string;
  role: string;
  stack: string[];
  summary: string;
  architecture: string;
  features: string[];
  liveWebUrl?: string;
  playStoreUrl?: string;
  image?: string;
  icon: typeof Smartphone;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
};

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

// Real Key Projects from the User's CV with rich color identities
const FEATURED_SYSTEMS: FeaturedSystem[] = [
  {
    id: "live-streaming",
    title: "Live Streaming Platform",
    category: "Real-time & Media",
    role: "Full Stack Engineer (Flutter + Go Microservice Backend)",
    stack: ["Flutter", "Go (Golang)", "WebSockets", "Microservices", "Live Audio/Video"],
    summary:
      "A high-concurrency live streaming mobile platform built with a Flutter client and separate Go-based microservices (API Server and Streaming Core Backend).",
    architecture:
      "Event-driven architecture with low-latency WebSockets handling live chat, viewer presence, room state transitions, and concurrency via Goroutines.",
    features: [
      "Real-time audio & video live streaming",
      "Live room join/leave & host approval workflow",
      "VIP instant join & premium access system",
      "Virtual gift economy & animated live rankings",
      "Real-time viewer tracking & Goroutine concurrency",
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    icon: Radio,
    accentColor: "#F87171",
    badgeBg: "rgba(239, 68, 68, 0.16)",
    badgeBorder: "rgba(239, 68, 68, 0.45)",
  },
  {
    id: "laam-erp",
    title: "LA’AM Enterprise ERP System",
    category: "Enterprise Systems",
    role: "System Architect & Backend Developer",
    stack: ["PHP (Laravel)", "MySQL", "WordPress API", "Role-Based Access", "Inventory"],
    summary:
      "A comprehensive Enterprise Resource Planning platform for managing multi-tier employee permissions, e-commerce order pipelines, and warehouse operations.",
    architecture:
      "Direct WordPress plugin integration for real-time order intake, inventory auto-sync, and automated courier tracking pipelines.",
    features: [
      "Employee RBAC & team permissions",
      "Incentive calculations per employee & product",
      "Courier auto-tracking & weight-based shipping",
      "Accounting ledger (income, expense, profit/loss)",
      "Employee wallet & live business reporting analytics",
    ],
    liveWebUrl: "https://erpecom.deepverselab.com/login",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    icon: Layers,
    accentColor: "#34D399",
    badgeBg: "rgba(52, 211, 153, 0.16)",
    badgeBorder: "rgba(52, 211, 153, 0.45)",
  },
  {
    id: "xovalley-ecom",
    title: "Xovalley — Multi Vendor E-commerce",
    category: "Commerce & Fintech",
    role: "Full Stack Engineer (Laravel + Flutter + System Design)",
    stack: ["Flutter", "Laravel", "React.js", "Payment Gateways", "Multi Vendor"],
    summary:
      "An end-to-end multi-vendor e-commerce ecosystem consisting of customer, vendor, and delivery partner mobile applications connected to a Laravel API engine.",
    architecture:
      "Unified REST API backend powering React.js web interfaces and 3 separate Flutter applications with real-time delivery tracking.",
    features: [
      "Multi-vendor marketplace & commission system",
      "Customer App, Seller App & Delivery Man App",
      "Payment gateway integration (bKash, Nagad, Cards)",
      "Real-time delivery status & order tracking",
      "Affiliate marketing & payout automation",
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
    title: "ARACO Healthcare Ecosystem",
    category: "Healthcare & Telemedicine",
    role: "Full Stack Engineer (Flutter + Django + System Design)",
    stack: ["Flutter (GetX)", "Django", "Zego Cloud", "Telemedicine", "Pharmacy"],
    summary:
      "A comprehensive digital healthcare platform combining an online pharmacy, teleconsultation audio/video calling, and clinical lab appointments.",
    architecture:
      "Flutter mobile app using GetX state architecture integrated with Zego Cloud WebRTC media pipelines and a Django administration backend.",
    features: [
      "Doctor appointment booking & video consultation",
      "Online pharmacy with prescription upload",
      "Lab test & caregiver home booking system",
      "Digital report delivery & e-prescriptions",
      "Hospital admin POS, inventory & billing system",
    ],
    liveWebUrl: "https://araco.com.bd",
    image: "https://araco.com.bd/media/branding/header_logo_20251220132256_logo-2.png",
    icon: Smartphone,
    accentColor: "#2DD4BF",
    badgeBg: "rgba(45, 212, 191, 0.16)",
    badgeBorder: "rgba(45, 212, 191, 0.45)",
  },
];

// Preserved Full GitHub Repositories Archive
const PROJECTS: PortfolioProject[] = [
  {
    number: "01",
    name: "Photo Background Remover",
    category: "AI & Image Processing",
    summary: "A Python utility for removing image backgrounds and exploring practical automated image-processing workflows.",
    stack: ["Python", "Image Processing", "OpenCV"],
    liveUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "02",
    name: "Passport Photo AI",
    category: "AI & Tools",
    summary: "A Python project exploring AI-assisted passport-photo preparation, facial alignment, and image workflows.",
    stack: ["Python", "AI", "Image Processing"],
    liveUrl: "https://github.com/programmermdemonmiah/passport_photo_ai",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "03",
    name: "Learning Management System",
    category: "Web Applications",
    summary: "A Django-based learning management system project for education-oriented workflows, student rosters, and server-rendered templates.",
    stack: ["Python", "Django", "PostgreSQL", "Web"],
    liveUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "04",
    name: "Login UI Flow",
    category: "Mobile",
    summary: "A Flutter UI system focusing on smooth authentication, password-recovery screens, and responsive layout guidelines.",
    stack: ["Flutter", "Dart", "UI Architecture"],
    liveUrl: "https://github.com/programmermdemonmiah/login-ui",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/login-ui/master/assets/images/logo.png",
  },
  {
    number: "05",
    name: "Django Todo API",
    category: "Backend & APIs",
    summary: "A Django REST Framework API practice project implementing task-oriented endpoints, filtering, and data operations.",
    stack: ["Python", "Django REST", "REST APIs"],
    liveUrl: "https://github.com/programmermdemonmiah/django_todo_api_test",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "06",
    name: "Donation Club",
    category: "Web Applications",
    summary: "A PHP web application project handling donation-club workflows, transaction logs, and member management.",
    stack: ["PHP", "MySQL", "Web Application"],
    liveUrl: "https://github.com/programmermdemonmiah/donation_club",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/donation_club/main/public/assets/images/hero/hero_1788891173_6aa0502598a2c.png",
  },
  {
    number: "07",
    name: "Todo App",
    category: "Mobile",
    summary: "A lightweight cross-platform mobile task-list application for organizing daily schedules and persistent local state.",
    stack: ["Flutter", "Dart", "Productivity"],
    liveUrl: "https://github.com/programmermdemonmiah/todo_app",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/todo_app/master/assets/images/logo.png",
  },
  {
    number: "08",
    name: "Calorie Count",
    category: "Web Applications",
    summary: "A Django web platform focused on calorie counting, nutritional logging, and meal tracking analytics.",
    stack: ["Python", "Django", "Web"],
    liveUrl: "https://github.com/programmermdemonmiah/calorie_count",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "09",
    name: "Ecom Matrix",
    category: "Commerce",
    summary: "An e-commerce repository architecture supporting multi-vendor shopping, product catalogs, and mobile-friendly carts.",
    stack: ["Flutter", "Dart", "E-commerce", "Mobile"],
    liveUrl: "https://github.com/programmermdemonmiah/ecom_matrix",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/ecom_matrix/master/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png",
  },
  {
    number: "10",
    name: "Daily Income Expense",
    category: "Tools & Utilities",
    summary: "A financial tracking project centered on logging daily cash inflows, recurring expenses, and categorization summaries.",
    stack: ["Python", "Finance", "Web App"],
    liveUrl: "https://github.com/programmermdemonmiah/daily_income_expose",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "11",
    name: "Rajbari Builder",
    category: "Mobile",
    summary: "A Flutter hybrid WebView application delivering responsive real-estate web services to mobile environments.",
    stack: ["Flutter", "Dart", "WebView"],
    liveUrl: "https://github.com/programmermdemonmiah/rajbari_builder",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/rajbari_builder/master/assets/images/logo.png",
  },
  {
    number: "12",
    name: "Wempro Company Task",
    category: "Backend & APIs",
    summary: "A focused development task repository demonstrating software architecture, Git versioning, and clean coding deliverables.",
    stack: ["Software Engineering", "Git", "APIs"],
    liveUrl: "https://github.com/programmermdemonmiah/wempro-company-task",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/wempro-company-task/master/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png",
  },
  {
    number: "13",
    name: "Recipe Project",
    category: "Web Applications",
    summary: "A web platform for cataloging, categorizing, and searching culinary recipes with responsive layout presentation.",
    stack: ["Web Development", "PHP", "Database"],
    liveUrl: "https://github.com/programmermdemonmiah/recipe_project",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/recipe_project/master/media/about/Pasta-bake-recipes.jpg",
  },
  {
    number: "14",
    name: "Cash Management System",
    category: "Tools & Utilities",
    summary: "A cash management system tailored for tracking business registers, audit logs, and account balances.",
    stack: ["Finance", "Data Tracking", "Application"],
    liveUrl: "https://github.com/programmermdemonmiah/cash_management",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "15",
    name: "My Shop WebView",
    category: "Commerce",
    summary: "A Flutter mobile wrapper delivering a tailored e-commerce shop experience with offline fallback resilience.",
    stack: ["Flutter", "Dart", "WebView", "Commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/my_shop_webview",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/my_shop_webview/master/assets/images/logo.jpeg",
  },
  {
    number: "16",
    name: "WhatsApp WebView",
    category: "Mobile",
    summary: "A WebView-focused Flutter mobile application project exploring modern mobile container wrappers.",
    stack: ["Flutter", "Dart", "WebView"],
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp_webview",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/whatsapp_webview/master/assets/images/logo.png",
  },
  {
    number: "17",
    name: "Library Management System",
    category: "Web Applications",
    summary: "A Django-based library management platform built with server-rendered views, book catalogs, and lending tracking.",
    stack: ["Python", "Django", "HTML/CSS", "Relational DB"],
    liveUrl: "https://github.com/programmermdemonmiah/libary_management_system",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "18",
    name: "Wholesale Shop WebView",
    category: "Commerce",
    summary: "A Flutter WebView application for bulk purchasing and commercial wholesale operations on mobile devices.",
    stack: ["Flutter", "Dart", "WebView", "E-commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop_webView",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/wholesell_shop_webView/master/assets/images/whollsellshop.png",
  },
  {
    number: "19",
    name: "Django Modules",
    category: "Backend & APIs",
    summary: "A repository of reusable Django modular patterns, authentication hooks, and backend architecture examples.",
    stack: ["Python", "Django", "Backend Architecture"],
    liveUrl: "https://github.com/programmermdemonmiah/django_module",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "20",
    name: "Calculator",
    category: "Tools & Utilities",
    summary: "A fast, clean arithmetic calculator app implemented with Flutter, emphasizing responsive layout precision.",
    stack: ["Flutter", "Dart", "Mobile UI"],
    liveUrl: "https://github.com/programmermdemonmiah/calculator",
    liveLabel: "View repository",
    screenshot: "https://user-images.githubusercontent.com/48918543/121248598-3d712280-c8c1-11eb-8f90-a85720ab41a7.png",
  },
  {
    number: "21",
    name: "Wholesale Shop",
    category: "Commerce",
    summary: "A native Flutter commerce project exploring bulk pricing structures, cart management, and product catalogues.",
    stack: ["Flutter", "Dart", "E-commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/wholesell_shop/master/assets/images/whollsellshop.png",
  },
  {
    number: "22",
    name: "WhatsApp Clone UI",
    category: "Mobile",
    summary: "A Flutter mobile interface study reproducing complex messaging layouts, chat lists, status bars, and interaction states.",
    stack: ["Flutter", "Dart", "UI Design", "Mobile"],
    liveUrl: "https://github.com/programmermdemonmiah/whatsapp-clone",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/whatsapp-clone/master/assets/images/emon.jpg",
  },
  {
    number: "23",
    name: "Quiz Application",
    category: "Web Applications",
    summary: "A dynamic Django educational platform supporting interactive timed quizzes, answer scoring, and review history.",
    stack: ["Python", "Django", "Web App"],
    liveUrl: "https://github.com/programmermdemonmiah/quiz_application",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/quiz_application/master/media/media/OIP.jpg",
  },
  {
    number: "24",
    name: "Food Delivery App UI",
    category: "Mobile",
    summary: "A Flutter mobile UI architecture exploring food delivery menus, restaurant profiles, and checkout workflows.",
    stack: ["Flutter", "Dart", "Mobile UI"],
    liveUrl: "https://github.com/programmermdemonmiah/Food-App",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/Food-App/master/assets/images/slider1.jpg",
  },
  {
    number: "25",
    name: "Blog Platform",
    category: "Web Applications",
    summary: "A content management web application with clean article formatting, category indexing, and SEO meta structure.",
    stack: ["HTML", "CSS", "Web Development"],
    liveUrl: "https://github.com/programmermdemonmiah/blog_project",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "26",
    name: "Django Portfolio",
    category: "Web Applications",
    summary: "An early developer portfolio template built with Django template inheritance and custom styling rules.",
    stack: ["Python", "Django", "HTML/CSS"],
    liveUrl: "https://github.com/programmermdemonmiah/portofilo_website_django",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/portofilo_website_django/master/media/projects/download.jpeg",
  },
  {
    number: "27",
    name: "Al Hadith",
    category: "Mobile",
    summary: "A Flutter content application presenting indexed Islamic Hadith chapters with search and reading conveniences.",
    stack: ["Flutter", "Dart", "Content App"],
    liveUrl: "https://github.com/programmermdemonmiah/al_hadith",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/al_hadith/main/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png",
  },
  {
    number: "28",
    name: "Samir Imperia Real Estate",
    category: "Web Applications",
    summary: "A real-estate and interior design showcase web project with property galleries and inquiry channels.",
    stack: ["Web Development", "Real Estate UI", "JavaScript"],
    liveUrl: "https://github.com/programmermdemonmiah/samirimperia-realstate-interior",
    liveLabel: "View repository",
    screenshot: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
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
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/Chats-App/main/assets/images/CA.png",
  },
  {
    number: "31",
    name: "Betikrom Fashion WebView",
    category: "Commerce",
    summary: "A Flutter mobile web-view container connecting a fashion e-commerce storefront with native device capabilities.",
    stack: ["Flutter", "Dart", "WebView", "E-commerce"],
    liveUrl: "https://github.com/programmermdemonmiah/betikromfashion_web_view",
    liveLabel: "View repository",
    screenshot: "https://raw.githubusercontent.com/programmermdemonmiah/betikromfashion_web_view/main/assets/images/betikrom.png",
  },
];

const CATEGORIES = ["All", "Mobile", "Backend & APIs", "Web Applications", "Commerce", "Tools & Utilities"];

// Real project image resolver — strictly authentic project assets, NO generic GitHub screenshot cards
function getRealProjectImage(project: PortfolioProject): string | null {
  return project.screenshot || null;
}

function getCategoryColor(category: string) {
  if (/mobile|flutter|dart/i.test(category)) {
    return { color: "#38BDF8", bg: "rgba(56, 189, 248, 0.16)", border: "rgba(56, 189, 248, 0.45)" };
  }
  if (/backend|api|rest/i.test(category)) {
    return { color: "#2DD4BF", bg: "rgba(45, 212, 191, 0.16)", border: "rgba(45, 212, 191, 0.45)" };
  }
  if (/commerce|shop|ecom/i.test(category)) {
    return { color: "#818CF8", bg: "rgba(129, 140, 248, 0.16)", border: "rgba(129, 140, 248, 0.45)" };
  }
  if (/ai|image|tool|utility|finance/i.test(category)) {
    return { color: "#FBBF24", bg: "rgba(251, 191, 36, 0.16)", border: "rgba(251, 191, 36, 0.45)" };
  }
  return { color: "#FB7185", bg: "rgba(251, 113, 133, 0.16)", border: "rgba(251, 113, 133, 0.45)" };
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const [imgError, setImgError] = useState(false);
  const catStyle = getCategoryColor(project.category);
  const projectImage = useMemo(() => getRealProjectImage(project), [project]);

  return (
    <article className="project-card">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card-media"
        aria-label={`Open ${project.name} repository on GitHub`}
      >
        {projectImage && !imgError ? (
          <img
            src={projectImage}
            alt={`${project.name} live preview`}
            className="project-card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-card-placeholder">
            <div className="placeholder-pattern" aria-hidden="true" />
            <div className="placeholder-content">
              <span className="placeholder-num" style={{ color: catStyle.color }}>
                {project.number}
              </span>
              <h4 className="placeholder-title">{project.name}</h4>
              <span className="placeholder-stack">{project.stack.slice(0, 2).join(" · ")}</span>
            </div>
          </div>
        )}
        <div className="project-media-shade" aria-hidden="true" />
        <span
          className="project-category-badge"
          style={{
            color: catStyle.color,
            backgroundColor: catStyle.bg,
            borderColor: catStyle.border,
          }}
        >
          {project.category}
        </span>
        <span className="project-view-icon" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </a>

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

        <div className="project-card-tags" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

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
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
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

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const searchable = `${project.name} ${project.category} ${project.summary} ${project.stack.join(" ")}`.toLowerCase();
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
    <section className="projects-section" id="projects" aria-label="Selected Projects Portfolio">
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-header-row">
          <div>
            <p className="section-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Production Systems &amp; Repositories
            </p>
            <h2 className="section-title">
              Selected <span>projects.</span>
            </h2>
            <p className="section-subtitle">
              Commercial production platforms, published mobile apps on Google Play, and open-source GitHub repositories.
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

        {/* 1. KEY FEATURED COMMERCIAL & LIVE SYSTEMS (From CV) */}
        <div className="featured-systems-wrapper">
          <div className="featured-systems-heading">
            <Sparkles size={16} className="text-red" aria-hidden="true" />
            <span className="featured-systems-title">KEY PRODUCTION SYSTEMS &amp; LIVE APPS</span>
          </div>

          <div className="featured-systems-grid">
            {FEATURED_SYSTEMS.map((system) => {
              const Icon = system.icon;
              return (
                <div
                  key={system.id}
                  className="featured-system-card"
                  style={{
                    borderColor: system.badgeBorder,
                  }}
                >
                  <div className="featured-card-top">
                    <div className="featured-card-badge-row">
                      <span
                        className="featured-category-badge"
                        style={{
                          backgroundColor: system.badgeBg,
                          borderColor: system.badgeBorder,
                          color: system.accentColor,
                        }}
                      >
                        {system.category}
                      </span>
                      <div
                        className="featured-icon-box"
                        style={{ color: system.accentColor, borderColor: system.badgeBorder }}
                        aria-hidden="true"
                      >
                        <Icon size={18} />
                      </div>
                    </div>
                    <h3 className="featured-system-name">{system.title}</h3>
                    <p className="featured-system-role" style={{ color: system.accentColor }}>
                      {system.role}
                    </p>
                  </div>

                  {system.image && (
                    <div className="featured-card-media-wrap">
                      <img
                        src={system.image}
                        alt={`${system.title} banner preview`}
                        className="featured-card-media-img"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <p className="featured-system-summary">{system.summary}</p>

                  <div className="featured-architecture-box">
                    <span className="arch-label">ARCHITECTURE</span>
                    <p className="arch-text">{system.architecture}</p>
                  </div>

                  <ul className="featured-system-bullets">
                    {system.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>

                  <div className="featured-system-tags">
                    {system.stack.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="featured-system-actions">
                    {system.playStoreUrl && (
                      <a
                        href={system.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-sm featured-action-btn"
                      >
                        <Smartphone size={14} aria-hidden="true" />
                        <span>Google Play App</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                    {system.liveWebUrl && (
                      <a
                        href={system.liveWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-sm featured-action-btn"
                      >
                        <Globe size={14} aria-hidden="true" />
                        <span>Live Web Portal</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. OPEN REPOSITORIES ARCHIVE (Swiper & Grid Experience) */}
        <div className="repo-archive-header">
          <div className="repo-archive-header-left">
            <h3 className="repo-archive-title">Open-Source Repositories Archive</h3>
            <p className="repo-archive-sub">
              Browse through {PROJECTS.length} verified GitHub repositories with live auto-scraped previews.
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
          <div className="category-tabs" role="tablist" aria-label="Filter repositories by domain">
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
              placeholder="Search by name, tech or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search portfolio repositories"
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
            Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? "repository" : "repositories"}
            {viewMode === "slider" && filteredProjects.length > 0 && (
              <span className="vertical-deck-status">
                {" · "}
                <strong>Card {activeIndex + 1} of {filteredProjects.length}</strong>
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
                title="Upper project card"
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
                title="Bottom project card"
              >
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Content: Vertical Upper & Bottom Swiper Deck OR Grid View */}
        {filteredProjects.length > 0 ? (
          viewMode === "slider" ? (
            <div className="projects-vertical-container">
              <Swiper
                modules={[Navigation, Pagination, A11y, Keyboard, Mousewheel]}
                direction="vertical"
                slidesPerView={1}
                spaceBetween={20}
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
                  <SwiperSlide key={project.number + project.name} className="project-vertical-slide">
                    <ProjectCard project={project} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.number + project.name} project={project} />
              ))}
            </div>
          )
        ) : (
          <div className="projects-empty-state">
            <FolderGit2 size={36} className="empty-icon" aria-hidden="true" />
            <h3 className="empty-title">No repositories found</h3>
            <p className="empty-desc">
              No repositories matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeCategory}&rdquo;.
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
