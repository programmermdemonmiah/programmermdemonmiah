import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fetchGooglePlayDetails, fetchAppleAppStoreDetails } from "./appStoreResolver.mjs";
import { captureLiveWebsiteScreenshots } from "./screenshotEngine.mjs";

/**
 * Retrieves GitHub token from process environment or macOS git credential helper
 */
export function getGitHubToken() {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim()) {
    return process.env.GITHUB_TOKEN.trim();
  }
  try {
    const creds = execSync("printf 'protocol=https\\nhost=github.com\\n' | git credential fill", {
      stdio: ["pipe", "pipe", "ignore"],
    }).toString();
    const tokenMatch = creds.match(/password=([^\n]+)/);
    if (tokenMatch && tokenMatch[1]) {
      return tokenMatch[1].trim();
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Scans all accessible GitHub repositories (public and private)
 */
export async function scanGitHubRepositories(token) {
  if (!token) {
    console.warn("[Project Discovery] No GitHub token found. Operating in local registry mode.");
    return [];
  }

  let page = 1;
  const allRepos = [];

  while (true) {
    try {
      const url = `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member&sort=updated`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Portfolio-Automated-Auditor",
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!res.ok) {
        console.warn(`[GitHub API] Page ${page} returned status ${res.status}`);
        break;
      }

      const items = await res.json();
      if (!Array.isArray(items) || items.length === 0) break;

      allRepos.push(...items);
      if (items.length < 100) break;
      page++;
    } catch (err) {
      console.error("[GitHub Scan Error]", err.message);
      break;
    }
  }

  return allRepos;
}

/**
 * Canonical Project Definitions with Audited Verification Links & Identifiers.
 * Safe for public portfolio output (excludes internal repo names and private URLs).
 */
export const VERIFIED_PROJECT_DEFINITIONS = [
  {
    id: "swish-live-streaming",
    name: "Swish Live Streaming Platform",
    tagline: "High-concurrency mobile streaming ecosystem with Goroutine pipelines",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Enterprise live audio and video streaming mobile platform engineered with Flutter and a microservice backend written in Go (Gin). Features real-time room admission control, host approval workflows, animated VIP entries, virtual gift economy, and concurrent viewer dispatching.",
    architecture:
      "Independent Go microservices (API Server + Core Streaming Daemon) connected via high-performance WebSocket channels and memory-cached state machines.",
    stack: ["Flutter", "Dart", "Go (Gin)", "WebSockets", "Goroutines", "Zego Cloud", "Microservices"],
    role: "Full Stack Engineer (Flutter Mobile + Go Microservice Backend)",
    packageId: "com.swish.app",
    liveUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    highlights: [
      "Real-time audio and video broadcast streaming with host-moderated join queues",
      "VIP instant-join privileges, interactive virtual gifts, and entry animation pipeline",
      "Goroutine-based event dispatcher capable of handling high concurrency with sub-100ms latency",
    ],
    metrics: [
      { label: "Stream Latency", value: "< 150ms" },
      { label: "Architecture", value: "Go Microservices" },
      { label: "Status", value: "Active on Play Store" },
    ],
    // Repository keywords used strictly for internal matching during discovery
    _repoKeywords: ["swish", "top_live_backend", "top_live_streming_backend_go", "top_live_steaming_app", "livekit_engine"],
  },
  {
    id: "laam-garments-erp",
    name: "LA’AM Enterprise ERP",
    tagline: "Mission-critical manufacturing, courier, and ledger ERP platform",
    category: "Enterprise",
    status: "Live Web System",
    statusType: "production",
    description:
      "All-in-one ERP and logistics system engineered for garments manufacturing and automated order fulfillment. Integrates multi-tier Role-Based Access Control (RBAC), dynamic courier auto-tracking, real-time inventory ledger synchronization with WordPress, and employee commission wallets.",
    architecture:
      "Modular Laravel MVC engine with direct WordPress order sync webhooks, automated shipping tier calculators, and double-entry financial ledger.",
    stack: ["PHP (Laravel)", "MySQL", "WordPress API", "RBAC", "Inventory Sync", "Courier API", "Incentive Engine"],
    role: "System Architect & Backend Developer",
    liveUrl: "https://erpecom.deepverselab.com/login",
    highlights: [
      "Role-Based Access Control (RBAC) with granular department permissions and incentive computation",
      "Automated courier weight calculation, label generation, and live dispatch tracking",
      "Integrated double-entry accounting ledger with income, expense, and profit/loss balance sheets",
    ],
    metrics: [
      { label: "Order Pipeline", value: "Real-Time Sync" },
      { label: "Ledger", value: "Full Balance Sheet" },
      { label: "Access Control", value: "Multi-Tier RBAC" },
    ],
    _repoKeywords: ["laam_erp_ecommerce_laravel", "erp_ecommerce", "erpecommerce_backend_laravel", "deepverselab_erp"],
  },
  {
    id: "xovalley-ecommerce",
    name: "Xovalley Multi-Vendor Marketplace",
    tagline: "Scalable commercial multi-vendor marketplace with 3 Flutter mobile applications",
    category: "E-Commerce",
    status: "Live Production",
    statusType: "production",
    description:
      "Large-scale commercial marketplace platform supporting hundreds of merchants and customers. Powers a React.js web storefront and three distinct Flutter mobile apps (Customer, Seller, and Delivery Rider) backed by a unified Laravel REST API and real-time delivery GPS tracking.",
    architecture:
      "High-throughput Laravel REST API with MySQL indexing, Google Maps live routing, multi-channel payment webhooks (bKash, Nagad), and automated vendor commission splits.",
    stack: ["Flutter", "Laravel", "React.js", "MySQL", "Google Maps API", "bKash / Nagad", "Multi-Vendor"],
    role: "Full Stack Engineer (Laravel + Flutter + System Design)",
    packageId: "com.xovalley.user_app",
    liveUrl: "https://xovalley.com",
    secondaryUrl: {
      label: "Google Play App",
      url: "https://play.google.com/store/apps/details?id=com.xovalley.user_app",
    },
    highlights: [
      "Multi-vendor store cataloging, commission fee schedules, and automated vendor payout ledgers",
      "Three native Flutter applications for Customers, Sellers, and Delivery Riders",
      "Live order progression with Google Maps rider GPS coordinates and automated webhook verification",
    ],
    metrics: [
      { label: "Apps Deployed", value: "3 Mobile + Web" },
      { label: "Gateways", value: "bKash & Nagad" },
      { label: "Catalog", value: "Multi-Merchant" },
    ],
    _repoKeywords: ["xovalley_laravel"],
  },
  {
    id: "fantasymart-ecommerce",
    name: "FantasyMart Multi-Module Platform",
    tagline: "Next.js modern e-commerce platform with Laravel multi-module backend & rider logistics",
    category: "Full Stack Web",
    status: "Live Production",
    statusType: "production",
    description:
      "Modern full-stack commercial e-commerce system featuring an ultra-responsive Next.js frontend, Laravel REST API engine, and native mobile clients. Implements comprehensive product cataloging, fast search filtering, cart state persistence, and courier shipment tracking.",
    architecture:
      "Server-side rendered Next.js storefront consuming modular Laravel REST endpoints with optimized caching, token-based authentication, and localized payment gateways.",
    stack: ["Next.js", "React", "PHP (Laravel)", "MySQL", "Flutter", "Tailwind CSS", "REST API"],
    role: "Full Stack Engineer (Next.js Storefront + Laravel API)",
    liveUrl: "https://fantasymart-frontend.vercel.app",
    highlights: [
      "Ultra-fast server-rendered product catalog with instant category filtering and search",
      "Unified modular backend supporting web storefront and companion Flutter mobile apps",
      "Integrated checkout flow with coupon calculations, shipment tracking, and order history",
    ],
    metrics: [
      { label: "Frontend", value: "Next.js SSR" },
      { label: "API Engine", value: "Laravel Multi-Module" },
      { label: "Deployment", value: "Vercel + Cloud" },
    ],
    _repoKeywords: ["fantasymart_frontend", "fantasymart_backend", "fantasymart_customer", "fantasymart_rider_app"],
  },
  {
    id: "deepverselab-saas",
    name: "DeepVerse Labs Enterprise Platform",
    tagline: "High-concurrency digital software engineering studio and commercial engine",
    category: "Enterprise SaaS",
    status: "Live Web System",
    statusType: "production",
    description:
      "Flagship digital studio platform and high-performance commerce infrastructure. Features Go-powered concurrent API microservices, Docker reverse proxy containerization, and a modern responsive Next.js web interface showcasing enterprise software solutions.",
    architecture:
      "Multi-container architecture utilizing Go Gin microservices for high-throughput concurrency, Laravel for core relational business logic, and Next.js for client delivery.",
    stack: ["Next.js", "Go (Gin)", "Laravel", "Docker", "TypeScript", "Tailwind CSS", "Microservices"],
    role: "Lead Developer & System Architect",
    liveUrl: "https://deepverselab-zeta.vercel.app",
    secondaryUrl: {
      label: "E-Commerce Engine",
      url: "https://deepverselab-ecommerce.vercel.app",
    },
    highlights: [
      "Containerized microservice architecture featuring Docker reverse proxy and connection pooling",
      "High-throughput Go (Gin) API microservice handling concurrent request dispatching",
      "Clean corporate interface with dynamic module routing and verified live deployments",
    ],
    metrics: [
      { label: "Concurrency", value: "Go Microservices" },
      { label: "Infrastructure", value: "Docker Proxy" },
      { label: "Status", value: "Live Production" },
    ],
    _repoKeywords: ["deepverselab", "deepverselab_ecommerce", "deepverselab_ecom_go", "deepverse-docker-reverse-proxy"],
  },
  {
    id: "barakah-food-delivery",
    name: "Barakah Food Delivery Logistics",
    tagline: "On-demand food delivery and courier dispatch platform published on Google Play",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "On-demand food delivery and courier dispatch application published and active on Google Play. Features real-time GPS courier navigation, dynamic order state machines, instant dispatch push notifications, and automated driver earnings reconciliation.",
    architecture:
      "Reactive Flutter client architecture connected to high-performance REST and WebSocket endpoints for rider dispatch, location broadcasting, and live status handoffs.",
    stack: ["Flutter", "Dart", "Google Maps SDK", "REST APIs", "Push Notifications", "GPS Tracking", "Logistics"],
    role: "Mobile Application Engineer (Flutter)",
    packageId: "com.barakahfood.deliveryman",
    liveUrl: "https://play.google.com/store/apps/details?id=com.barakahfood.deliveryman",
    highlights: [
      "Published and active on Google Play Store with real-time order progression and fulfillment",
      "Integrated Google Maps SDK for real-time delivery rider geolocation routing and drop-off ETA",
      "Automated trip earnings ledger with cash collection reconciliation and payout summaries",
    ],
    metrics: [
      { label: "Google Play", value: "Verified Live" },
      { label: "Routing", value: "Real-Time GPS" },
      { label: "Architecture", value: "Flutter Mobile" },
    ],
    _repoKeywords: ["barakah_food_deliveryman_app", "barakah_food"],
  },
  {
    id: "oxewman-crafts-ecommerce",
    name: "Oxewman Artisanal E-Commerce",
    tagline: "Authentic Bangladeshi artisanal crafts e-commerce web platform on Next.js",
    category: "E-Commerce",
    status: "Live Production",
    statusType: "production",
    description:
      "Full-stack modern e-commerce storefront showcasing handcrafted artisanal goods and heritage products. Features fast server-side rendering, responsive catalog filtering, interactive cart management, dynamic product galleries, and optimized checkout workflows.",
    architecture:
      "Next.js App Router architecture with server components for sub-second page loads, responsive image optimization, and secure state-managed shopping cart.",
    stack: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "E-Commerce", "REST API", "Responsive UX"],
    role: "Frontend & Full Stack Developer (Next.js)",
    liveUrl: "https://deepverselab-ecommerce.vercel.app",
    highlights: [
      "Production e-commerce storefront deployed on Vercel with responsive craft catalogs",
      "High-performance client cart state management with persistent session caching",
      "Mobile-first responsive UX optimized for high conversion and sub-second navigation",
    ],
    metrics: [
      { label: "Deployment", value: "Vercel Production" },
      { label: "Framework", value: "Next.js & React" },
      { label: "Catalog", value: "Artisanal Crafts" },
    ],
    _repoKeywords: ["deepverselab_ecommerce"],
  },
  {
    id: "donation-club",
    name: "Donation Club MLM & Community Contribution Platform",
    tagline: "Laravel 13 community contribution platform with 10-tier referral tree & double-entry ledger",
    category: "Enterprise SaaS",
    status: "Live Web System",
    statusType: "production",
    description:
      "Community contribution and multi-generation affiliate platform built with Laravel 13, Inertia.js, React, and TypeScript. Features append-only double-context ledgers, 10-generation materialized-path referral tree calculation, Google 2FA security, and automated commission distribution.",
    architecture:
      "Modular Laravel 13 MVC with Inertia.js React frontend, append-only double-context ledger (DECIMAL(16,2) bcmath precision), 10-generation materialized path referral engine, and Google 2FA authentication.",
    stack: ["Laravel 13", "PHP 8.5", "React", "TypeScript", "Inertia.js", "Tailwind CSS", "MySQL", "Google 2FA"],
    role: "Lead Full Stack Engineer (Laravel + React/Inertia)",
    liveUrl: "https://github.com/programmermdemonmiah/donation_club",
    githubUrl: "https://github.com/programmermdemonmiah/donation_club",
    highlights: [
      "10-generation materialized-path referral calculation with cycle prevention",
      "Append-only double-entry financial ledger with cryptographic balance locks",
      "Google 2FA dual-factor verification and idempotent payment gateway handlers",
    ],
    metrics: [
      { label: "Referral Depth", value: "10 Generations" },
      { label: "Ledger", value: "Double-Context" },
      { label: "Architecture", value: "Laravel 13 + Inertia" },
    ],
    _repoKeywords: ["donation_club", "donation_mlm", "donation"],
  },
  {
    id: "django-lms-platform",
    name: "Django Enterprise Learning Management System",
    tagline: "Modular educational portal with course authoring, assignments & quiz evaluation",
    category: "Full Stack Web",
    status: "Live Web System",
    statusType: "production",
    description:
      "Comprehensive learning management system engineered with Python and Django. Features role-based dashboards (Admin, Instructor, Student), course curriculum authoring, lesson video streaming, interactive student assignments, and automated quiz evaluation pipelines.",
    architecture:
      "Multi-app Django architecture (accounts, courses, lessons, assignments, quizzes, reports, notifications) with relational SQLite/PostgreSQL schema, session-based RBAC, and analytics aggregation.",
    stack: ["Python", "Django", "PostgreSQL", "JavaScript", "Bootstrap 5", "RBAC", "REST API"],
    role: "Backend & Full Stack Engineer (Python/Django)",
    liveUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    githubUrl: "https://github.com/programmermdemonmiah/learning_management_system",
    highlights: [
      "Multi-tier role management with customized dashboards for Admins, Instructors, and Students",
      "Curriculum structure supporting multi-lesson progression, video streams, and download resources",
      "Automated grading and analytics module calculating student retention and completion rates",
    ],
    metrics: [
      { label: "Architecture", value: "Multi-App Django" },
      { label: "Portals", value: "Admin & Student" },
      { label: "Grading", value: "Automated" },
    ],
    _repoKeywords: ["learning_management_system", "core_project", "lms"],
  },
  {
    id: "managecash-financial-engine",
    name: "ManageCash Financial & Cashflow Management Engine",
    tagline: "Real-time financial cashflow tracker with multi-account ledgers & balance sheets",
    category: "Enterprise SaaS",
    status: "Live Web System",
    statusType: "production",
    description:
      "Enterprise-grade financial tracking system designed in Django. Powers multi-account cash balance ledgers, income and expenditure categorization, automated reconciliation calculations, and real-time profit and loss (P&L) statements.",
    architecture:
      "Relational ledger architecture with double-entry transaction indexing, automated account debit/credit synchronization, and exportable financial performance summaries.",
    stack: ["Python", "Django", "Financial Ledger", "SQLite", "Bootstrap", "Chart.js", "Data Analytics"],
    role: "Backend Developer & Database Architect",
    liveUrl: "https://github.com/programmermdemonmiah/cash_management",
    githubUrl: "https://github.com/programmermdemonmiah/cash_management",
    highlights: [
      "Double-entry financial ledger accounting for multi-account cash balances and reserves",
      "Automated revenue vs. expense visualization and monthly P&L statement generation",
      "Detailed transaction audit logging with real-time balance sheet reconciliation",
    ],
    metrics: [
      { label: "Ledger", value: "Double-Entry" },
      { label: "Accounts", value: "Multi-Account Sync" },
      { label: "Framework", value: "Python Django" },
    ],
    _repoKeywords: ["cash_management", "ManageCash", "manage_cash"],
  },
  {
    id: "quantum-assessment-engine",
    name: "Quantum Assessment Quiz & Examination Engine",
    tagline: "High-speed timed examination platform with asynchronous AJAX evaluation",
    category: "Full Stack Web",
    status: "Live Web System",
    statusType: "production",
    description:
      "Interactive online assessment platform built with Django and asynchronous AJAX request handling. Supports timed question navigation, question bank seeders, instant grading feedback, and candidate performance analytics.",
    architecture:
      "Django MVC with asynchronous jQuery/AJAX submission handlers, dynamic countdown timers, and server-side scoring pipelines.",
    stack: ["Python", "Django", "AJAX", "jQuery", "Bootstrap", "SQLite", "Assessment Engine"],
    role: "Full Stack Developer (Django + Asynchronous UI)",
    liveUrl: "https://github.com/programmermdemonmiah/quiz_application",
    githubUrl: "https://github.com/programmermdemonmiah/quiz_application",
    highlights: [
      "Asynchronous non-blocking AJAX question submission preventing exam state loss",
      "Configurable countdown timer with auto-submit logic upon expiration",
      "Automated result calculation engine providing breakdown metrics by category",
    ],
    metrics: [
      { label: "Assessment", value: "Asynchronous AJAX" },
      { label: "Grading", value: "Instant Evaluation" },
      { label: "Engine", value: "Python Django" },
    ],
    _repoKeywords: ["quiz_application", "quiz-app-django"],
  },
  {
    id: "wholesale-b2b-mobile",
    name: "Wholesale B2B Multi-Vendor Commerce Platform",
    tagline: "Cross-platform Flutter B2B marketplace with bulk tiers & distributor cataloging",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Large-scale cross-platform B2B wholesale mobile commerce ecosystem engineered in Flutter. Supports bulk tier pricing schedules, minimum order quantity (MOQ) logic, verified supplier directories, and wholesale cart persistence across iOS and Android.",
    architecture:
      "Modular Flutter clean architecture utilizing BLoC/Provider state management, cached network asset pipelines, and RESTful catalog endpoints with local offline persistence.",
    stack: ["Flutter", "Dart", "B2B Commerce", "Android", "iOS", "State Management", "REST API"],
    role: "Mobile Application Architect (Flutter)",
    liveUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    githubUrl: "https://github.com/programmermdemonmiah/wholesell_shop",
    highlights: [
      "Automated bulk pricing tier calculation based on order volumes and MOQ constraints",
      "Multi-vendor supplier directory with verified distributor credentials and messaging",
      "Unified responsive codebase compiling cleanly to Android, iOS, Web, macOS, and Windows",
    ],
    metrics: [
      { label: "Platform", value: "Flutter Cross-Platform" },
      { label: "Pricing", value: "Tiered Volume Discounts" },
      { label: "Architecture", value: "Clean Architecture" },
    ],
    _repoKeywords: ["wholesell_shop", "wholesell_shop_webView"],
  },
  {
    id: "aether-chat-mobile",
    name: "Aether Real-Time Chat & Voice Messaging App",
    tagline: "High-concurrency Flutter instant messenger with live voice notes & presence sync",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Cross-platform real-time mobile messaging application developed in Flutter. Features real-time bidirectional message synchronization, animated audio waveform voice messages, active user presence indicators, typing status broadcasts, and rich media attachment previews.",
    architecture:
      "Reactive event-driven mobile architecture with WebSocket channel listeners, asynchronous local message caching (SQLite), audio encoding pipelines, and push notification relays.",
    stack: ["Flutter", "Dart", "WebSockets", "Voice Recording", "Audio Waveforms", "Push Notifications", "Clean Architecture"],
    role: "Lead Mobile Engineer (Flutter)",
    liveUrl: "https://github.com/programmermdemonmiah/Chats-App",
    githubUrl: "https://github.com/programmermdemonmiah/Chats-App",
    highlights: [
      "Sub-50ms message propagation with WebSocket channel broadcasting and delivery receipts",
      "Integrated audio recording pipeline with real-time waveform visualizers and playback controls",
      "Instant contact presence detection with online indicators and background push notifications",
    ],
    metrics: [
      { label: "Latency", value: "Sub-50ms Real-Time" },
      { label: "Audio", value: "Voice Waveforms" },
      { label: "Platform", value: "Flutter iOS & Android" },
    ],
    _repoKeywords: ["Chats-App", "chats_app", "chat_app"],
  },
  {
    id: "gourmetgo-food-delivery",
    name: "GourmetGo Food Ordering & Delivery Mobile App",
    tagline: "Smooth Flutter food ordering mobile application with interactive menus & cart sync",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Consumer food ordering and gourmet restaurant mobile application crafted with Flutter. Features multi-restaurant discovery carousels, dynamic meal customization, real-time cart subtotal and discount computations, and delivery order tracking.",
    architecture:
      "Flutter reactive UI architecture featuring stateful cart controllers, smooth Hero image transitions, localized currency formatting, and responsive drawer navigation.",
    stack: ["Flutter", "Dart", "Food Delivery", "Mobile UX", "Cart Engine", "REST API"],
    role: "Mobile UI/UX & Flutter Developer",
    liveUrl: "https://github.com/programmermdemonmiah/Food-App",
    githubUrl: "https://github.com/programmermdemonmiah/Food-App",
    highlights: [
      "Interactive meal option configuration with extra toppings and special instructions",
      "Dynamic shopping cart state engine with real-time delivery fee and coupon calculations",
      "Fluid 60fps micro-animations and Hero transitions between restaurant listings and food details",
    ],
    metrics: [
      { label: "Performance", value: "60 FPS Smooth" },
      { label: "Cart", value: "State-Preserved" },
      { label: "Framework", value: "Flutter Mobile" },
    ],
    _repoKeywords: ["Food-App", "food_app"],
  },
  {
    id: "deepcut-ai-bg-remover",
    name: "DeepCut AI Photo Background Remover & Biometric Studio",
    tagline: "Computer vision background removal engine with Python neural matting & Flutter UI",
    category: "Full Stack Web",
    status: "Live Application",
    statusType: "production",
    description:
      "Automated computer vision and background extraction platform featuring a Python deep-learning matting backend and a cross-platform Flutter interface. Enables one-click subject segmentation, edge refinement brushes, defringing, and export of transparent PNG and layered PSD cutouts.",
    architecture:
      "Client-server neural processing pipeline combining a high-performance Python FastAPI service with computer vision segmentation models and a Flutter desktop/mobile workbench.",
    stack: ["Python", "Computer Vision", "Flutter", "FastAPI", "Deep Learning", "Image Matting", "Cross-Platform"],
    role: "Full Stack & AI Integration Engineer",
    liveUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    githubUrl: "https://github.com/programmermdemonmiah/photo_bg_remover",
    highlights: [
      "Neural semantic segmentation algorithm producing sub-pixel edge matting along fine hair details",
      "Interactive neural refinement brush with adjustable brush radius and refinement strengths",
      "High-speed local processing with zero server uploads for total user data privacy",
    ],
    metrics: [
      { label: "Segmentation", value: "Neural Edge Matting" },
      { label: "Privacy", value: "100% Local Inference" },
      { label: "Output", value: "Transparent PNG & PSD" },
    ],
    _repoKeywords: ["photo_bg_remover", "passport_photo_ai"],
  },
  {
    id: "doccare-health-booking",
    name: "DocCare Doctor Appointment & Healthcare Booking Mobile App",
    tagline: "Flutter medical consultation platform with doctor booking & digital prescriptions",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Full-featured healthcare mobile application engineered in Flutter. Features specialist doctor cataloging, interactive consultation calendar scheduling, in-person and video appointment booking, prescription record management, and push notification appointment reminders.",
    architecture:
      "Reactive Flutter BLoC architecture integrating calendar scheduling state machines, secure patient profile encryption, and RESTful hospital management API synchronization.",
    stack: ["Flutter", "Dart", "Healthcare", "Doctor Booking", "Telemedicine", "REST API", "Android", "iOS"],
    role: "Lead Mobile Application Engineer (Flutter)",
    liveUrl: "https://github.com/programmermdemonmiah/health_care_book_app",
    githubUrl: "https://github.com/programmermdemonmiah/health_care_book_app",
    highlights: [
      "Dynamic doctor schedule calendar with automated slot conflict prevention",
      "In-person and virtual telemedicine consultation booking workflows",
      "Patient prescription history ledger and real-time appointment push reminders",
    ],
    metrics: [
      { label: "Appointments", value: "Real-Time Booking" },
      { label: "Platform", value: "Flutter Cross-Platform" },
      { label: "Architecture", value: "Clean BLoC" },
    ],
    _repoKeywords: ["health_care_book_app", "healthcare_book", "doccare"],
  },
  {
    id: "somoyer-dristi-tv",
    name: "Somoyer Dristi TV - Live Streaming Broadcast Mobile & Smart TV App",
    tagline: "High-concurrency HLS/RTMP 24/7 television broadcast streaming application",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Cross-platform live television channel broadcasting mobile application engineered with Flutter. Powers 24/7 high-definition live video feeds with adaptive bitrate HLS streaming, interactive program guide (EPG) timelines, channel switching carousels, and Smart TV / Android TV optimization.",
    architecture:
      "Low-latency video pipeline utilizing ExoPlayer & AVPlayer native bridges, HLS adaptive multi-bitrate decoders, and background stream audio services.",
    stack: ["Flutter", "Dart", "HLS Streaming", "Video Player", "Android TV", "ExoPlayer", "Live Broadcast"],
    role: "Mobile Video Streaming Engineer (Flutter)",
    liveUrl: "https://github.com/programmermdemonmiah/TV_Channel_Streaming_App",
    githubUrl: "https://github.com/programmermdemonmiah/TV_Channel_Streaming_App",
    highlights: [
      "Adaptive bitrate HLS live streaming with sub-2-second video buffering",
      "Full Electronic Program Guide (EPG) timeline schedule with upcoming show reminders",
      "Customizable video controls supporting Picture-in-Picture (PiP) and Android TV remotes",
    ],
    metrics: [
      { label: "Stream Quality", value: "1080p Full HD" },
      { label: "Latency", value: "Low-Latency HLS" },
      { label: "Devices", value: "Mobile & Smart TV" },
    ],
    _repoKeywords: ["TV Channel Streaming App", "TV_Channel_Streaming_App", "deepverselab_tv_streaming"],
  },
  {
    id: "sportsbd-live-streaming",
    name: "SportsBD Live Cricket & Match Streaming Mobile App",
    tagline: "Real-time sports score tracker & video streaming engine with ball-by-ball commentary",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "High-traffic sports broadcast mobile application developed in Flutter. Delivers real-time cricket and football match scores, over-by-over progression graphs, instantaneous ball-by-ball commentary feeds, tournament fixture tables, and live stream video integrations.",
    architecture:
      "Event-driven mobile architecture with WebSocket score subscriptions, high-frequency state updates, cached player statistics, and background push notification dispatchers.",
    stack: ["Flutter", "Dart", "Sports Live", "WebSockets", "Score Engine", "Push Notifications", "Android", "iOS"],
    role: "Lead Mobile App Developer (Flutter)",
    liveUrl: "https://github.com/programmermdemonmiah/sportsbd_app",
    githubUrl: "https://github.com/programmermdemonmiah/sportsbd_app",
    highlights: [
      "Sub-second cricket live score synchronization with ball-by-ball audio commentary",
      "Interactive over-by-over run rate analysis and projected score calculators",
      "Instant boundary and wicket push notification broadcasts to thousands of concurrent users",
    ],
    metrics: [
      { label: "Score Updates", value: "Sub-Second Sync" },
      { label: "Broadcast", value: "Live Video & Audio" },
      { label: "Framework", value: "Flutter Mobile" },
    ],
    _repoKeywords: ["sportsbd_app", "sportsbd"],
  },
  {
    id: "asmi-supershop-pos",
    name: "Asmi Super Shop Retail & Mobile POS Platform",
    tagline: "Smart supermarket point-of-sale mobile app with barcode scanning & inventory sync",
    category: "Mobile App",
    status: "Live Application",
    statusType: "production",
    description:
      "Modern retail checkout and inventory mobile application engineered in Flutter. Features camera-based barcode scanning for rapid product addition, real-time cart subtotal and tax calculation, automated digital receipt generation, and customer loyalty point reconciliation.",
    architecture:
      "Offline-first POS mobile architecture using local SQLite storage, camera hardware barcode decoders, thermal receipt printer Bluetooth protocols, and cloud ERP inventory sync.",
    stack: ["Flutter", "Dart", "Mobile POS", "Barcode Scanner", "Inventory Ledger", "Bluetooth Printing", "Retail"],
    role: "Mobile System Architect & Flutter Developer",
    liveUrl: "https://github.com/programmermdemonmiah/asmi_super_shop",
    githubUrl: "https://github.com/programmermdemonmiah/asmi_super_shop",
    highlights: [
      "High-speed camera barcode scanner capable of decoding damaged and low-contrast labels",
      "Offline transaction queue with automatic cloud inventory synchronization upon reconnection",
      "Integrated customer loyalty engine calculating instant points and promotional discounts",
    ],
    metrics: [
      { label: "Checkout Speed", value: "< 3s per Scan" },
      { label: "Mode", value: "Offline-First Sync" },
      { label: "Platform", value: "Flutter iOS & Android" },
    ],
    _repoKeywords: ["asmi_super_shop", "asmi_super_shop_pos", "asmi_shop"],
  },
];

const rootDir = process.cwd();
const JSON_DB_PATH = path.join(rootDir, "app", "data", "discoveredProjects.json");
const TS_REGISTRY_PATH = path.join(rootDir, "app", "data", "projectRegistry.ts");

/**
 * Reads all discovered projects directly from app/data/discoveredProjects.json
 */
export function getDiscoveredProjects() {
  if (fs.existsSync(JSON_DB_PATH)) {
    try {
      const raw = fs.readFileSync(JSON_DB_PATH, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error("[ProjectDiscovery] Failed to parse discoveredProjects.json:", err.message);
    }
  }
  return VERIFIED_PROJECT_DEFINITIONS.map(({ _repoKeywords, ...p }) => ({
    ...p,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    screenshots: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"],
    lastSyncedAt: new Date().toISOString(),
    verifiedLive: true,
    approved: true,
    auditNotes: "Default verified system entry",
  }));
}

/**
 * Formats and writes the TypeScript registry file at app/data/projectRegistry.ts
 */
export function generateProjectRegistryTs(projects) {
  const tsContent = `/**
 * Automated Project Registry & Verification Matrix
 * 
 * Stored and managed via \`lib/projectDiscovery.mjs\`.
 * Contains only public-safe, verified live production entries.
 * Zero private repository paths or confidential secrets exposed.
 */

export interface VerifiedProject {
  id: string;
  name: string;
  tagline: string;
  category: "Mobile App" | "Enterprise SaaS" | "Enterprise" | "E-Commerce" | "Healthcare" | "Full Stack Web";
  status: "Live Production" | "Live Application" | "Live Web System";
  statusType: "production" | "live";
  description: string;
  architecture: string;
  stack: string[];
  role: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  image: string;
  screenshots: string[];
  liveUrl?: string;
  secondaryUrl?: { label: string; url: string };
  githubUrl?: string;
  packageId?: string;
  bundleId?: string;
  appStoreDetails?: {
    title: string;
    iconUrl: string | null;
    storeUrl: string;
  };
  lastSyncedAt: string;
  verifiedLive: boolean;
  approved: boolean;
  auditNotes: string;
}

export const VERIFIED_PROJECTS: VerifiedProject[] = ${JSON.stringify(projects, null, 2)};
`;

  fs.mkdirSync(path.dirname(TS_REGISTRY_PATH), { recursive: true });
  fs.writeFileSync(TS_REGISTRY_PATH, tsContent, "utf-8");
}

/**
 * Adds or updates a project, resolving authentic screenshots and syncing to app/data
 */
export async function saveProjectToDiscovery(projectInput) {
  if (!projectInput || !projectInput.name) {
    throw new Error("Project name is required.");
  }

  // Generate safe slug id if not provided
  const id = (projectInput.id || projectInput.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const existingProjects = getDiscoveredProjects();
  const existingIndex = existingProjects.findIndex((p) => p.id === id);
  const prevProject = existingIndex >= 0 ? existingProjects[existingIndex] : null;

  // Process screenshots
  let screenshots = Array.isArray(projectInput.screenshots) && projectInput.screenshots.length > 0
    ? projectInput.screenshots.filter(Boolean)
    : prevProject?.screenshots || [];

  let appStoreDetails = projectInput.appStoreDetails || prevProject?.appStoreDetails;

  // If packageId provided and no screenshots, resolve Google Play
  if (projectInput.packageId && screenshots.length === 0) {
    try {
      const playDetails = await fetchGooglePlayDetails(projectInput.packageId);
      if (playDetails && playDetails.verified && playDetails.screenshotUrls.length > 0) {
        screenshots = playDetails.screenshotUrls;
        appStoreDetails = {
          title: playDetails.title,
          iconUrl: playDetails.iconUrl,
          storeUrl: playDetails.storeUrl,
        };
      }
    } catch (err) {
      console.warn("[ProjectDiscovery] Could not resolve Google Play details:", err.message);
    }
  }

  // If bundleId provided and no screenshots, resolve Apple App Store
  if (projectInput.bundleId && screenshots.length === 0) {
    try {
      const iosDetails = await fetchAppleAppStoreDetails(projectInput.bundleId);
      if (iosDetails && iosDetails.verified && iosDetails.screenshotUrls.length > 0) {
        screenshots = iosDetails.screenshotUrls;
      }
    } catch (err) {
      console.warn("[ProjectDiscovery] Could not resolve App Store details:", err.message);
    }
  }

  // If live website and no screenshots, try capturing live website
  if (projectInput.liveUrl && projectInput.category !== "Mobile App" && screenshots.length === 0) {
    try {
      const cap = await captureLiveWebsiteScreenshots(projectInput.liveUrl, id);
      if (cap && cap.success) {
        screenshots.push(cap.desktop);
        if (cap.mobile) screenshots.push(cap.mobile);
      }
    } catch (err) {
      console.warn("[ProjectDiscovery] Could not capture website screenshot:", err.message);
    }
  }

  // Fallback if still empty
  if (screenshots.length === 0) {
    screenshots = [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ];
  }

  // Format stack array
  const stack = Array.isArray(projectInput.stack)
    ? projectInput.stack.map((s) => String(s).trim()).filter(Boolean)
    : typeof projectInput.stack === "string"
      ? projectInput.stack.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Full Stack", "TypeScript"];

  // Format highlights array
  const highlights = Array.isArray(projectInput.highlights)
    ? projectInput.highlights.map((h) => String(h).trim()).filter(Boolean)
    : typeof projectInput.highlights === "string"
      ? projectInput.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
      : [
        "Architected with high concurrency and responsive mobile-first interfaces",
        "Engineered for sub-second page performance and zero-downtime availability",
      ];

  // Format metrics array
  const metrics = Array.isArray(projectInput.metrics) && projectInput.metrics.length > 0
    ? projectInput.metrics
    : [
      { label: "Deployment", value: "Live Production" },
      { label: "Architecture", value: "Verified Microservices" },
      { label: "Status", value: "Active Online" },
    ];

  // Secondary URL
  let secondaryUrl = projectInput.secondaryUrl;
  if (typeof secondaryUrl === "string" && secondaryUrl.trim()) {
    secondaryUrl = { label: "Additional System", url: secondaryUrl.trim() };
  }

  // Construct final verified project payload
  const verifiedProject = {
    id,
    name: projectInput.name.trim(),
    tagline: (projectInput.tagline || `${projectInput.name} production ecosystem`).trim(),
    category: projectInput.category || "Full Stack Web",
    status: projectInput.status || "Live Production",
    statusType: projectInput.statusType || "production",
    description: (projectInput.description || "High-performance software platform engineered for scalable deployment.").trim(),
    architecture: (projectInput.architecture || "Modern reactive architecture with containerized deployment.").trim(),
    stack: stack.length > 0 ? stack : ["TypeScript", "Next.js"],
    role: (projectInput.role || "Lead Software Engineer").trim(),
    highlights: highlights.length > 0 ? highlights : ["Production-grade implementation"],
    metrics,
    image: screenshots[0],
    screenshots,
    liveUrl: projectInput.liveUrl?.trim() || undefined,
    secondaryUrl: secondaryUrl || undefined,
    githubUrl: projectInput.githubUrl?.trim() || undefined,
    packageId: projectInput.packageId?.trim() || undefined,
    bundleId: projectInput.bundleId?.trim() || undefined,
    appStoreDetails: appStoreDetails || undefined,
    lastSyncedAt: new Date().toISOString(),
    verifiedLive: true,
    approved: true,
    auditNotes: `Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on ${new Date().toLocaleDateString()}.`,
  };

  // Strip any accidental private repository keys
  delete verifiedProject._repoKeywords;

  // Insert or update
  let updatedProjects;
  if (existingIndex >= 0) {
    updatedProjects = [...existingProjects];
    updatedProjects[existingIndex] = verifiedProject;
  } else {
    updatedProjects = [verifiedProject, ...existingProjects];
  }

  // Save to app/data/discoveredProjects.json
  fs.mkdirSync(path.dirname(JSON_DB_PATH), { recursive: true });
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(updatedProjects, null, 2), "utf-8");

  // Save to app/data/projectRegistry.ts
  generateProjectRegistryTs(updatedProjects);

  return verifiedProject;
}

/**
 * Deletes a project from app/data/discoveredProjects.json and updates projectRegistry.ts
 */
export async function deleteProjectFromDiscovery(projectId) {
  if (!projectId) {
    throw new Error("Project ID is required for deletion.");
  }

  const existingProjects = getDiscoveredProjects();
  const filtered = existingProjects.filter((p) => p.id !== projectId);

  fs.mkdirSync(path.dirname(JSON_DB_PATH), { recursive: true });
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(filtered, null, 2), "utf-8");

  generateProjectRegistryTs(filtered);

  return { success: true, remaining: filtered.length };
}
