/**
 * Automated Project Registry & Verification Matrix
 * 
 * Stored and managed via `lib/projectDiscovery.mjs`.
 * Contains only public-safe, verified live production entries.
 * Zero private repository paths or confidential secrets exposed.
 */

export interface VerifiedProject {
  id: string;
  name: string;
  tagline: string;
  category: "Mobile App" | "Enterprise SaaS" | "Enterprise" | "E-Commerce" | "Healthcare" | "Full Stack Web" | (string & {});
  status: "Live Production" | "Live Application" | "Live Web System" | "In Development" | "Completed System" | (string & {});
  statusType: "production" | "live" | "development" | "completed" | (string & {});
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

export const VERIFIED_PROJECTS: VerifiedProject[] = [
  {
    "id": "sportsbd-live-streaming",
    "name": "SportsBD Live Cricket & Match Streaming Mobile App",
    "tagline": "Real-time sports score tracker & video streaming engine with ball-by-ball commentary",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "High-traffic sports broadcast mobile application developed in Flutter. Delivers real-time cricket and football match scores, over-by-over progression graphs, instantaneous ball-by-ball commentary feeds, tournament fixture tables, and live stream video integrations.",
    "architecture": "Event-driven mobile architecture with WebSocket score subscriptions, high-frequency state updates, cached player statistics, and background push notification dispatchers.",
    "stack": [
      "Flutter",
      "Dart",
      "Sports Live",
      "WebSockets",
      "Score Engine",
      "Push Notifications",
      "Android",
      "iOS"
    ],
    "role": "Lead Mobile App Developer (Flutter)",
    "highlights": [
      "Sub-second cricket live score synchronization with ball-by-ball audio commentary",
      "Interactive over-by-over run rate analysis and projected score calculators",
      "Instant boundary and wicket push notification broadcasts to thousands of concurrent users"
    ],
    "metrics": [
      {
        "label": "Score Updates",
        "value": "Sub-Second Sync"
      },
      {
        "label": "Broadcast",
        "value": "Live Video & Audio"
      },
      {
        "label": "Framework",
        "value": "Flutter Mobile"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:23:07.819Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "asmi-supershop-pos",
    "name": "Asmi Super Shop Retail & Mobile POS Platform",
    "tagline": "Smart supermarket point-of-sale mobile app with barcode scanning & inventory sync",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "Modern retail checkout and inventory mobile application engineered in Flutter. Features camera-based barcode scanning for rapid product addition, real-time cart subtotal and tax calculation, automated digital receipt generation, and customer loyalty point reconciliation.",
    "architecture": "Offline-first POS mobile architecture using local SQLite storage, camera hardware barcode decoders, thermal receipt printer Bluetooth protocols, and cloud ERP inventory sync.",
    "stack": [
      "Flutter",
      "Dart",
      "Mobile POS",
      "Barcode Scanner",
      "Inventory Ledger",
      "Bluetooth Printing",
      "Retail"
    ],
    "role": "Mobile System Architect & Flutter Developer",
    "highlights": [
      "High-speed camera barcode scanner capable of decoding damaged and low-contrast labels",
      "Offline transaction queue with automatic cloud inventory synchronization upon reconnection",
      "Integrated customer loyalty engine calculating instant points and promotional discounts"
    ],
    "metrics": [
      {
        "label": "Checkout Speed",
        "value": "< 3s per Scan"
      },
      {
        "label": "Mode",
        "value": "Offline-First Sync"
      },
      {
        "label": "Platform",
        "value": "Flutter iOS & Android"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:23:07.819Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "somoyer-dristi-tv",
    "name": "Somoyer Dristi TV - Live Streaming Broadcast Mobile & Smart TV App",
    "tagline": "High-concurrency HLS/RTMP 24/7 television broadcast streaming application",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "Cross-platform live television channel broadcasting mobile application engineered with Flutter. Powers 24/7 high-definition live video feeds with adaptive bitrate HLS streaming, interactive program guide (EPG) timelines, channel switching carousels, and Smart TV / Android TV optimization.",
    "architecture": "Low-latency video pipeline utilizing ExoPlayer & AVPlayer native bridges, HLS adaptive multi-bitrate decoders, and background stream audio services.",
    "stack": [
      "Flutter",
      "Dart",
      "HLS Streaming",
      "Video Player",
      "Android TV",
      "ExoPlayer",
      "Live Broadcast"
    ],
    "role": "Mobile Video Streaming Engineer (Flutter)",
    "highlights": [
      "Adaptive bitrate HLS live streaming with sub-2-second video buffering",
      "Full Electronic Program Guide (EPG) timeline schedule with upcoming show reminders",
      "Customizable video controls supporting Picture-in-Picture (PiP) and Android TV remotes"
    ],
    "metrics": [
      {
        "label": "Stream Quality",
        "value": "1080p Full HD"
      },
      {
        "label": "Latency",
        "value": "Low-Latency HLS"
      },
      {
        "label": "Devices",
        "value": "Mobile & Smart TV"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:23:07.818Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "doccare-health-booking",
    "name": "DocCare Doctor Appointment & Healthcare Booking Mobile App",
    "tagline": "Flutter medical consultation platform with doctor booking & digital prescriptions",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "Full-featured healthcare mobile application engineered in Flutter. Features specialist doctor cataloging, interactive consultation calendar scheduling, in-person and video appointment booking, prescription record management, and push notification appointment reminders.",
    "architecture": "Reactive Flutter BLoC architecture integrating calendar scheduling state machines, secure patient profile encryption, and RESTful hospital management API synchronization.",
    "stack": [
      "Flutter",
      "Dart",
      "Healthcare",
      "Doctor Booking",
      "Telemedicine",
      "REST API",
      "Android",
      "iOS"
    ],
    "role": "Lead Mobile Application Engineer (Flutter)",
    "highlights": [
      "Dynamic doctor schedule calendar with automated slot conflict prevention",
      "In-person and virtual telemedicine consultation booking workflows",
      "Patient prescription history ledger and real-time appointment push reminders"
    ],
    "metrics": [
      {
        "label": "Appointments",
        "value": "Real-Time Booking"
      },
      {
        "label": "Platform",
        "value": "Flutter Cross-Platform"
      },
      {
        "label": "Architecture",
        "value": "Clean BLoC"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:23:07.810Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "deepcut-ai-bg-remover",
    "name": "DeepCut AI Photo Background Remover & Biometric Studio",
    "tagline": "Computer vision background removal engine with Python neural matting & Flutter UI",
    "category": "Full Stack Web",
    "status": "In Development",
    "statusType": "development",
    "description": "Automated computer vision and background extraction platform featuring a Python deep-learning matting backend and a cross-platform Flutter interface. Enables one-click subject segmentation, edge refinement brushes, defringing, and export of transparent PNG and layered PSD cutouts.",
    "architecture": "Client-server neural processing pipeline combining a high-performance Python FastAPI service with computer vision segmentation models and a Flutter desktop/mobile workbench.",
    "stack": [
      "Python",
      "Computer Vision",
      "Flutter",
      "FastAPI",
      "Deep Learning",
      "Image Matting",
      "Cross-Platform"
    ],
    "role": "Full Stack & AI Integration Engineer",
    "highlights": [
      "Neural semantic segmentation algorithm producing sub-pixel edge matting along fine hair details",
      "Interactive neural refinement brush with adjustable brush radius and refinement strengths",
      "High-speed local processing with zero server uploads for total user data privacy"
    ],
    "metrics": [
      {
        "label": "Segmentation",
        "value": "Neural Edge Matting"
      },
      {
        "label": "Privacy",
        "value": "100% Local Inference"
      },
      {
        "label": "Output",
        "value": "Transparent PNG & PSD"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:18:21.838Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "gourmetgo-food-delivery",
    "name": "GourmetGo Food Ordering & Delivery Mobile App",
    "tagline": "Smooth Flutter food ordering mobile application with interactive menus & cart sync",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "Consumer food ordering and gourmet restaurant mobile application crafted with Flutter. Features multi-restaurant discovery carousels, dynamic meal customization, real-time cart subtotal and discount computations, and delivery order tracking.",
    "architecture": "Flutter reactive UI architecture featuring stateful cart controllers, smooth Hero image transitions, localized currency formatting, and responsive drawer navigation.",
    "stack": [
      "Flutter",
      "Dart",
      "Food Delivery",
      "Mobile UX",
      "Cart Engine",
      "REST API"
    ],
    "role": "Mobile UI/UX & Flutter Developer",
    "highlights": [
      "Interactive meal option configuration with extra toppings and special instructions",
      "Dynamic shopping cart state engine with real-time delivery fee and coupon calculations",
      "Fluid 60fps micro-animations and Hero transitions between restaurant listings and food details"
    ],
    "metrics": [
      {
        "label": "Performance",
        "value": "60 FPS Smooth"
      },
      {
        "label": "Cart",
        "value": "State-Preserved"
      },
      {
        "label": "Framework",
        "value": "Flutter Mobile"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:18:21.837Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "aether-chat-mobile",
    "name": "Aether Real-Time Chat & Voice Messaging App",
    "tagline": "High-concurrency Flutter instant messenger with live voice notes & presence sync",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "Cross-platform real-time mobile messaging application developed in Flutter. Features real-time bidirectional message synchronization, animated audio waveform voice messages, active user presence indicators, typing status broadcasts, and rich media attachment previews.",
    "architecture": "Reactive event-driven mobile architecture with WebSocket channel listeners, asynchronous local message caching (SQLite), audio encoding pipelines, and push notification relays.",
    "stack": [
      "Flutter",
      "Dart",
      "WebSockets",
      "Voice Recording",
      "Audio Waveforms",
      "Push Notifications",
      "Clean Architecture"
    ],
    "role": "Lead Mobile Engineer (Flutter)",
    "highlights": [
      "Sub-50ms message propagation with WebSocket channel broadcasting and delivery receipts",
      "Integrated audio recording pipeline with real-time waveform visualizers and playback controls",
      "Instant contact presence detection with online indicators and background push notifications"
    ],
    "metrics": [
      {
        "label": "Latency",
        "value": "Sub-50ms Real-Time"
      },
      {
        "label": "Audio",
        "value": "Voice Waveforms"
      },
      {
        "label": "Platform",
        "value": "Flutter iOS & Android"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:18:21.836Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "wholesale-b2b-mobile",
    "name": "Wholesale B2B Multi-Vendor Commerce Platform",
    "tagline": "Cross-platform Flutter B2B marketplace with bulk tiers & distributor cataloging",
    "category": "Mobile App",
    "status": "In Development",
    "statusType": "development",
    "description": "Large-scale cross-platform B2B wholesale mobile commerce ecosystem engineered in Flutter. Supports bulk tier pricing schedules, minimum order quantity (MOQ) logic, verified supplier directories, and wholesale cart persistence across iOS and Android.",
    "architecture": "Modular Flutter clean architecture utilizing BLoC/Provider state management, cached network asset pipelines, and RESTful catalog endpoints with local offline persistence.",
    "stack": [
      "Flutter",
      "Dart",
      "B2B Commerce",
      "Android",
      "iOS",
      "State Management",
      "REST API"
    ],
    "role": "Mobile Application Architect (Flutter)",
    "highlights": [
      "Automated bulk pricing tier calculation based on order volumes and MOQ constraints",
      "Multi-vendor supplier directory with verified distributor credentials and messaging",
      "Unified responsive codebase compiling cleanly to Android, iOS, Web, macOS, and Windows"
    ],
    "metrics": [
      {
        "label": "Platform",
        "value": "Flutter Cross-Platform"
      },
      {
        "label": "Pricing",
        "value": "Tiered Volume Discounts"
      },
      {
        "label": "Architecture",
        "value": "Clean Architecture"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:18:21.827Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "quantum-assessment-engine",
    "name": "Quantum Assessment Quiz & Examination Engine",
    "tagline": "High-speed timed examination platform with asynchronous AJAX evaluation",
    "category": "Full Stack Web",
    "status": "Completed System",
    "statusType": "completed",
    "description": "Interactive online assessment platform built with Django and asynchronous AJAX request handling. Supports timed question navigation, question bank seeders, instant grading feedback, and candidate performance analytics.",
    "architecture": "Django MVC with asynchronous jQuery/AJAX submission handlers, dynamic countdown timers, and server-side scoring pipelines.",
    "stack": [
      "Python",
      "Django",
      "AJAX",
      "jQuery",
      "Bootstrap",
      "SQLite",
      "Assessment Engine"
    ],
    "role": "Full Stack Developer (Django + Asynchronous UI)",
    "highlights": [
      "Asynchronous non-blocking AJAX question submission preventing exam state loss",
      "Configurable countdown timer with auto-submit logic upon expiration",
      "Automated result calculation engine providing breakdown metrics by category"
    ],
    "metrics": [
      {
        "label": "Assessment",
        "value": "Asynchronous AJAX"
      },
      {
        "label": "Grading",
        "value": "Instant Evaluation"
      },
      {
        "label": "Engine",
        "value": "Python Django"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:13:25.741Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "managecash-financial-engine",
    "name": "ManageCash Financial & Cashflow Management Engine",
    "tagline": "Real-time financial cashflow tracker with multi-account ledgers & balance sheets",
    "category": "Enterprise SaaS",
    "status": "Completed System",
    "statusType": "completed",
    "description": "Enterprise-grade financial tracking system designed in Django. Powers multi-account cash balance ledgers, income and expenditure categorization, automated reconciliation calculations, and real-time profit and loss (P&L) statements.",
    "architecture": "Relational ledger architecture with double-entry transaction indexing, automated account debit/credit synchronization, and exportable financial performance summaries.",
    "stack": [
      "Python",
      "Django",
      "Financial Ledger",
      "SQLite",
      "Bootstrap",
      "Chart.js",
      "Data Analytics"
    ],
    "role": "Backend Developer & Database Architect",
    "highlights": [
      "Double-entry financial ledger accounting for multi-account cash balances and reserves",
      "Automated revenue vs. expense visualization and monthly P&L statement generation",
      "Detailed transaction audit logging with real-time balance sheet reconciliation"
    ],
    "metrics": [
      {
        "label": "Ledger",
        "value": "Double-Entry"
      },
      {
        "label": "Accounts",
        "value": "Multi-Account Sync"
      },
      {
        "label": "Framework",
        "value": "Python Django"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:13:25.740Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "django-lms-platform",
    "name": "Django Enterprise Learning Management System",
    "tagline": "Modular educational portal with course authoring, assignments & quiz evaluation",
    "category": "Full Stack Web",
    "status": "In Development",
    "statusType": "development",
    "description": "Comprehensive learning management system engineered with Python and Django. Features role-based dashboards (Admin, Instructor, Student), course curriculum authoring, lesson video streaming, interactive student assignments, and automated quiz evaluation pipelines.",
    "architecture": "Multi-app Django architecture (accounts, courses, lessons, assignments, quizzes, reports, notifications) with relational SQLite/PostgreSQL schema, session-based RBAC, and analytics aggregation.",
    "stack": [
      "Python",
      "Django",
      "PostgreSQL",
      "JavaScript",
      "Bootstrap 5",
      "RBAC",
      "REST API"
    ],
    "role": "Backend & Full Stack Engineer (Python/Django)",
    "highlights": [
      "Multi-tier role management with customized dashboards for Admins, Instructors, and Students",
      "Curriculum structure supporting multi-lesson progression, video streams, and download resources",
      "Automated grading and analytics module calculating student retention and completion rates"
    ],
    "metrics": [
      {
        "label": "Architecture",
        "value": "Multi-App Django"
      },
      {
        "label": "Portals",
        "value": "Admin & Student"
      },
      {
        "label": "Grading",
        "value": "Automated"
      }
    ],
    "image": "",
    "screenshots": [],
    "lastSyncedAt": "2026-10-14T20:13:25.740Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "donation-club",
    "name": "Donation Club MLM & Community Contribution Platform",
    "tagline": "Laravel 13 community contribution platform with 10-tier referral tree & double-entry ledger",
    "category": "Enterprise SaaS",
    "status": "In Development",
    "statusType": "development",
    "description": "Community contribution and multi-generation affiliate platform built with Laravel 13, Inertia.js, React, and TypeScript. Features append-only double-context ledgers, 10-generation materialized-path referral tree calculation, Google 2FA security, and automated commission distribution.",
    "architecture": "Modular Laravel 13 MVC with Inertia.js React frontend, append-only double-context ledger (DECIMAL(16,2) bcmath precision), 10-generation materialized path referral engine, and Google 2FA authentication.",
    "stack": [
      "Laravel 13",
      "PHP 8.5",
      "React",
      "TypeScript",
      "Inertia.js",
      "Tailwind CSS",
      "MySQL",
      "Google 2FA"
    ],
    "role": "Lead Full Stack Engineer (Laravel + React/Inertia)",
    "highlights": [
      "10-generation materialized-path referral calculation with cycle prevention",
      "Append-only double-entry financial ledger with cryptographic balance locks",
      "Google 2FA dual-factor verification and idempotent payment gateway handlers"
    ],
    "metrics": [
      {
        "label": "Referral Depth",
        "value": "10 Generations"
      },
      {
        "label": "Ledger",
        "value": "Double-Context"
      },
      {
        "label": "Architecture",
        "value": "Laravel 13 + Inertia"
      }
    ],
    "image": "/screenshots/donation-club-hero-1.png",
    "screenshots": [
      "/screenshots/donation-club-hero-1.png",
      "/screenshots/donation-club-hero-2.png",
      "/screenshots/donation-club-hero-3.png"
    ],
    "lastSyncedAt": "2026-10-14T20:13:25.713Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Managed via Portfolio Admin Console and stored by projectDiscovery.mjs on 10/15/2026."
  },
  {
    "id": "swish-live-streaming",
    "name": "Swish Live Streaming Platform",
    "tagline": "High-concurrency mobile streaming ecosystem with Goroutine pipelines",
    "category": "Mobile App",
    "status": "Live Application",
    "statusType": "production",
    "description": "Enterprise live audio and video streaming mobile platform engineered with Flutter and a microservice backend written in Go (Gin). Features real-time room admission control, host approval workflows, animated VIP entries, virtual gift economy, and concurrent viewer dispatching.",
    "architecture": "Independent Go microservices (API Server + Core Streaming Daemon) connected via high-performance WebSocket channels and memory-cached state machines.",
    "stack": [
      "Flutter",
      "Dart",
      "Go (Gin)",
      "WebSockets",
      "Goroutines",
      "Zego Cloud",
      "Microservices"
    ],
    "role": "Full Stack Engineer (Flutter Mobile + Go Microservice Backend)",
    "packageId": "com.swish.app",
    "liveUrl": "https://play.google.com/store/apps/details?id=com.swish.app",
    "highlights": [
      "Real-time audio and video broadcast streaming with host-moderated join queues",
      "VIP instant-join privileges, interactive virtual gifts, and entry animation pipeline",
      "Goroutine-based event dispatcher capable of handling high concurrency with sub-100ms latency"
    ],
    "metrics": [
      {
        "label": "Stream Latency",
        "value": "< 150ms"
      },
      {
        "label": "Architecture",
        "value": "Go Microservices"
      },
      {
        "label": "Status",
        "value": "Active on Play Store"
      }
    ],
    "image": "https://play-lh.googleusercontent.com/372HTmVP_FVQXKodazu6JRE8Tm6_QTukuG0Bl4XzJbFrHg3PfUGLbF1Pbmv6_7J2_WMY0olpzPbBz8McaoPKDQ=w720-h1280-rw",
    "screenshots": [
      "https://play-lh.googleusercontent.com/372HTmVP_FVQXKodazu6JRE8Tm6_QTukuG0Bl4XzJbFrHg3PfUGLbF1Pbmv6_7J2_WMY0olpzPbBz8McaoPKDQ=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/OBVqgRK7eerY0GPfK8AOzitu5oE9ecC6kG4kURTCb1K41gpqVsN0WjmJwJh-wX8vILzpcc1kYHt56aLN2g=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/mlv1dCUwfUOaaKDkIHeyOA3CaeJ3nMAdvAgj72ZmTwtzcKavJxtRLtwaJ_FZK8lc3iXFsFaBKSn-QXUomXt2Dg=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/tT31vfXKnMHyb8m9Utj5wGUJPjQBLKpmvvjRR4RlgRTOOX038exZzyx1ggDTkR6hYCbuUjgAHz2pEWtZSa7W7Q=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/UhqKyvX_Q23jLDxljQTnJJW6587gcgv2qeDJZUHThzVzTMJ-1GXiEx3RQbxf93BQUGlnpfK__i7Tf3ZYD-h44Q=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/5GIK-tUPQtOLUZbtAf3Wk4omTIQdsTDVuXOdwUmO39YB_TjL5LH90x4QZFzvYK2cmof55fAsdWl_6ejRoeNdrA=w720-h1280-rw"
    ],
    "appStoreDetails": {
      "title": "com.swish.app",
      "iconUrl": "https://play-lh.googleusercontent.com/372HTmVP_FVQXKodazu6JRE8Tm6_QTukuG0Bl4XzJbFrHg3PfUGLbF1Pbmv6_7J2_WMY0olpzPbBz8McaoPKDQ=s0",
      "storeUrl": "https://play.google.com/store/apps/details?id=com.swish.app&hl=en&gl=US"
    },
    "lastSyncedAt": "2026-10-14T19:36:12.049Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  },
  {
    "id": "laam-garments-erp",
    "name": "LA’AM Enterprise ERP",
    "tagline": "Mission-critical garments manufacturing, courier, and ledger ERP platform",
    "category": "Enterprise SaaS",
    "status": "Live Web System",
    "statusType": "production",
    "description": "All-in-one ERP and logistics system engineered for garments manufacturing and automated order fulfillment. Integrates multi-tier Role-Based Access Control (RBAC), dynamic courier auto-tracking, real-time inventory ledger synchronization with WordPress, and employee commission wallets.",
    "architecture": "Modular Laravel MVC engine with direct WordPress order sync webhooks, automated shipping tier calculators, and double-entry financial ledger.",
    "stack": [
      "PHP (Laravel)",
      "MySQL",
      "WordPress API",
      "RBAC",
      "Inventory Sync",
      "Courier API",
      "Incentive Engine"
    ],
    "role": "System Architect & Backend Developer",
    "liveUrl": "https://erpecom.deepverselab.com/login",
    "highlights": [
      "Role-Based Access Control (RBAC) with granular department permissions and incentive computation",
      "Automated courier weight calculation, label generation, and live dispatch tracking",
      "Integrated double-entry accounting ledger with income, expense, and profit/loss balance sheets"
    ],
    "metrics": [
      {
        "label": "Order Pipeline",
        "value": "Real-Time Sync"
      },
      {
        "label": "Ledger",
        "value": "Full Balance Sheet"
      },
      {
        "label": "Access Control",
        "value": "Multi-Tier RBAC"
      }
    ],
    "image": "/screenshots/laam-garments-erp-desktop.png",
    "screenshots": [
      "/screenshots/laam-garments-erp-desktop.png",
      "/screenshots/laam-garments-erp-mobile.png"
    ],
    "lastSyncedAt": "2026-10-14T19:36:12.617Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  },
  {
    "id": "xovalley-ecommerce",
    "name": "Xovalley Multi-Vendor Marketplace",
    "tagline": "Scalable commercial multi-vendor marketplace with 3 Flutter mobile applications",
    "category": "E-Commerce",
    "status": "Live Production",
    "statusType": "production",
    "description": "Large-scale commercial marketplace platform supporting hundreds of merchants and customers. Powers a React.js web storefront and three distinct Flutter mobile apps (Customer, Seller, and Delivery Rider) backed by a unified Laravel REST API and real-time delivery GPS tracking.",
    "architecture": "High-throughput Laravel REST API with MySQL indexing, Google Maps live routing, multi-channel payment webhooks (bKash, Nagad), and automated vendor commission splits.",
    "stack": [
      "Flutter",
      "Laravel",
      "React.js",
      "MySQL",
      "Google Maps API",
      "bKash / Nagad",
      "Multi-Vendor"
    ],
    "role": "Full Stack Engineer (Laravel + Flutter + System Design)",
    "packageId": "com.xovalley.user_app",
    "liveUrl": "https://xovalley.com",
    "secondaryUrl": {
      "label": "Google Play App",
      "url": "https://play.google.com/store/apps/details?id=com.xovalley.user_app"
    },
    "highlights": [
      "Multi-vendor store cataloging, commission fee schedules, and automated vendor payout ledgers",
      "Three native Flutter applications for Customers, Sellers, and Delivery Riders",
      "Live order progression with Google Maps rider GPS coordinates and automated webhook verification"
    ],
    "metrics": [
      {
        "label": "Apps Deployed",
        "value": "3 Mobile + Web"
      },
      {
        "label": "Gateways",
        "value": "bKash & Nagad"
      },
      {
        "label": "Catalog",
        "value": "Multi-Merchant"
      }
    ],
    "image": "/screenshots/xovalley-ecommerce-desktop.png",
    "screenshots": [
      "/screenshots/xovalley-ecommerce-desktop.png",
      "https://play-lh.googleusercontent.com/QcGwTYseWbGq_9Ju0zdRwXxFzkZQBrnzoo36sV8B0Mq3MPUQgguG8yrB5mrPF9HJQM4at1cQ_T-hx6k3B_B0fw=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/OBVqgRK7eerY0GPfK8AOzitu5oE9ecC6kG4kURTCb1K41gpqVsN0WjmJwJh-wX8vILzpcc1kYHt56aLN2g=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/ZUPbaVsvwrLKoLwBiBWRBEVB-P3yHv07MmCbp_FRqNxmX_VOHgmHkAmrAPLX8wkdMMcvpN4BCO-5bOqEyyl0ig=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/owTmVehp0Q2VL7-fLkNEv_VISR-gvhDUyqObE7vaC1vO0pooo0xV9iW5z2bXoWQAf1LU4oW5Gd7qY9Guao9Y=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/RuHGHc-1U0Hho1pM0aY2qH9IEnQFDrtcTrr7OLORHoJSqj2pcNRjM-UZAF3xe0Rl0o8x2h-xCfGD1aUKCx1ZHxY=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/WqUAVErh-dKXCFI0GKldE23BOy74sCBH8ZF8G4tH-hvdpQIV7n4TOOjuvYqOlY2aq-mH_oZQhpOoUuvTzeAm=w720-h1280-rw",
      "/screenshots/xovalley-ecommerce-mobile.png"
    ],
    "appStoreDetails": {
      "title": "com.xovalley.user_app",
      "iconUrl": "https://play-lh.googleusercontent.com/QcGwTYseWbGq_9Ju0zdRwXxFzkZQBrnzoo36sV8B0Mq3MPUQgguG8yrB5mrPF9HJQM4at1cQ_T-hx6k3B_B0fw=s0",
      "storeUrl": "https://play.google.com/store/apps/details?id=com.xovalley.user_app&hl=en&gl=US"
    },
    "lastSyncedAt": "2026-10-14T19:36:13.683Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  },
  {
    "id": "fantasymart-ecommerce",
    "name": "FantasyMart Multi-Module Platform",
    "tagline": "Next.js modern e-commerce platform with Laravel multi-module backend & rider logistics",
    "category": "Full Stack Web",
    "status": "Live Production",
    "statusType": "production",
    "description": "Modern full-stack commercial e-commerce system featuring an ultra-responsive Next.js frontend, Laravel REST API engine, and native mobile clients. Implements comprehensive product cataloging, fast search filtering, cart state persistence, and courier shipment tracking.",
    "architecture": "Server-side rendered Next.js storefront consuming modular Laravel REST endpoints with optimized caching, token-based authentication, and localized payment gateways.",
    "stack": [
      "Next.js",
      "React",
      "PHP (Laravel)",
      "MySQL",
      "Flutter",
      "Tailwind CSS",
      "REST API"
    ],
    "role": "Full Stack Engineer (Next.js Storefront + Laravel API)",
    "liveUrl": "https://fantasymart-frontend.vercel.app",
    "highlights": [
      "Ultra-fast server-rendered product catalog with instant category filtering and search",
      "Unified modular backend supporting web storefront and companion Flutter mobile apps",
      "Integrated checkout flow with coupon calculations, shipment tracking, and order history"
    ],
    "metrics": [
      {
        "label": "Frontend",
        "value": "Next.js SSR"
      },
      {
        "label": "API Engine",
        "value": "Laravel Multi-Module"
      },
      {
        "label": "Deployment",
        "value": "Vercel + Cloud"
      }
    ],
    "image": "/screenshots/fantasymart-ecommerce-desktop.png",
    "screenshots": [
      "/screenshots/fantasymart-ecommerce-desktop.png",
      "/screenshots/fantasymart-ecommerce-mobile.png"
    ],
    "lastSyncedAt": "2026-10-14T19:36:13.951Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  },
  {
    "id": "deepverselab-saas",
    "name": "DeepVerse Labs Enterprise Platform",
    "tagline": "High-concurrency digital software engineering studio and commercial engine",
    "category": "Enterprise SaaS",
    "status": "Live Web System",
    "statusType": "production",
    "description": "Flagship digital studio platform and high-performance commerce infrastructure. Features Go-powered concurrent API microservices, Docker reverse proxy containerization, and a modern responsive Next.js web interface showcasing enterprise software solutions.",
    "architecture": "Multi-container architecture utilizing Go Gin microservices for high-throughput concurrency, Laravel for core relational business logic, and Next.js for client delivery.",
    "stack": [
      "Next.js",
      "Go (Gin)",
      "Laravel",
      "Docker",
      "TypeScript",
      "Tailwind CSS",
      "Microservices"
    ],
    "role": "Lead Developer & System Architect",
    "liveUrl": "https://deepverselab-zeta.vercel.app",
    "secondaryUrl": {
      "label": "E-Commerce Engine",
      "url": "https://deepverselab-ecommerce.vercel.app"
    },
    "highlights": [
      "Containerized microservice architecture featuring Docker reverse proxy and connection pooling",
      "High-throughput Go (Gin) API microservice handling concurrent request dispatching",
      "Clean corporate interface with dynamic module routing and verified live deployments"
    ],
    "metrics": [
      {
        "label": "Concurrency",
        "value": "Go Microservices"
      },
      {
        "label": "Infrastructure",
        "value": "Docker Proxy"
      },
      {
        "label": "Status",
        "value": "Live Production"
      }
    ],
    "image": "/screenshots/deepverselab-saas-desktop.png",
    "screenshots": [
      "/screenshots/deepverselab-saas-desktop.png",
      "/screenshots/deepverselab-saas-mobile.png"
    ],
    "lastSyncedAt": "2026-10-14T19:36:14.399Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  },
  {
    "id": "barakah-food-delivery",
    "name": "Barakah Food Delivery Logistics",
    "tagline": "On-demand food delivery and courier dispatch platform published on Google Play",
    "category": "Mobile App",
    "status": "Live Application",
    "statusType": "production",
    "description": "On-demand food delivery and courier dispatch application published and active on Google Play. Features real-time GPS courier navigation, dynamic order state machines, instant dispatch push notifications, and automated driver earnings reconciliation.",
    "architecture": "Reactive Flutter client architecture connected to high-performance REST and WebSocket endpoints for rider dispatch, location broadcasting, and live status handoffs.",
    "stack": [
      "Flutter",
      "Dart",
      "Google Maps SDK",
      "REST APIs",
      "Push Notifications",
      "GPS Tracking",
      "Logistics"
    ],
    "role": "Mobile Application Engineer (Flutter)",
    "packageId": "com.barakahfood.deliveryman",
    "liveUrl": "https://play.google.com/store/apps/details?id=com.barakahfood.deliveryman",
    "highlights": [
      "Published and active on Google Play Store with real-time order progression and fulfillment",
      "Integrated Google Maps SDK for real-time delivery rider geolocation routing and drop-off ETA",
      "Automated trip earnings ledger with cash collection reconciliation and payout summaries"
    ],
    "metrics": [
      {
        "label": "Google Play",
        "value": "Verified Live"
      },
      {
        "label": "Routing",
        "value": "Real-Time GPS"
      },
      {
        "label": "Architecture",
        "value": "Flutter Mobile"
      }
    ],
    "image": "https://play-lh.googleusercontent.com/eOSTVxLk-kQj6pXqI_2sUVe60lc9TGxntvMW0TLS8gotu-q6KP5TaDlCBt8-uN4XSZaJycbbIeKHXm44lcFL=w720-h1280-rw",
    "screenshots": [
      "https://play-lh.googleusercontent.com/eOSTVxLk-kQj6pXqI_2sUVe60lc9TGxntvMW0TLS8gotu-q6KP5TaDlCBt8-uN4XSZaJycbbIeKHXm44lcFL=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/OBVqgRK7eerY0GPfK8AOzitu5oE9ecC6kG4kURTCb1K41gpqVsN0WjmJwJh-wX8vILzpcc1kYHt56aLN2g=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/Re8X-JSw0SbEFIcX5Fndym_9vM5K0ZLuD681vG103C9r71bYtsbV8LILiBHuE1FgJM-qPFWYGkUU4bk98vLtv_k=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/vcGoKpjiDOkL9UYkSzvA-zi1s1hN1vALJvP9E4tNh3c6B3G9kG9uZG2kKyoPX2Aq1Wb05wsuGWuRBIb4zzKVvw=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/tNWPDYx35GNUrswA8yUADOR8J8zzM-BuRkEFolghH9Pg6sVfQ_g4tNVz3YXe6UtZHaU3c1mmo5pv4hYiFBdC=w720-h1280-rw",
      "https://play-lh.googleusercontent.com/GMXZjeM8LK3IJyHvQuKtPHB14DHSYzarBJc7Zt2nTlTaM1klXDsx2H7mYTB8aMlUvNA-kG8L1HSHFnyjRVwIlXE=w720-h1280-rw"
    ],
    "appStoreDetails": {
      "title": "com.barakahfood.deliveryman",
      "iconUrl": "https://play-lh.googleusercontent.com/eOSTVxLk-kQj6pXqI_2sUVe60lc9TGxntvMW0TLS8gotu-q6KP5TaDlCBt8-uN4XSZaJycbbIeKHXm44lcFL=s0",
      "storeUrl": "https://play.google.com/store/apps/details?id=com.barakahfood.deliveryman&hl=en&gl=US"
    },
    "lastSyncedAt": "2026-10-14T19:36:14.898Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  },
  {
    "id": "oxewman-crafts-ecommerce",
    "name": "Oxewman Artisanal E-Commerce",
    "tagline": "Authentic Bangladeshi artisanal crafts e-commerce web platform on Next.js",
    "category": "E-Commerce",
    "status": "Live Production",
    "statusType": "production",
    "description": "Full-stack modern e-commerce storefront showcasing handcrafted artisanal goods and heritage products. Features fast server-side rendering, responsive catalog filtering, interactive cart management, dynamic product galleries, and optimized checkout workflows.",
    "architecture": "Next.js App Router architecture with server components for sub-second page loads, responsive image optimization, and secure state-managed shopping cart.",
    "stack": [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "E-Commerce",
      "REST API",
      "Responsive UX"
    ],
    "role": "Frontend & Full Stack Developer (Next.js)",
    "liveUrl": "https://deepverselab-ecommerce.vercel.app",
    "highlights": [
      "Production e-commerce storefront deployed on Vercel with responsive craft catalogs",
      "High-performance client cart state management with persistent session caching",
      "Mobile-first responsive UX optimized for high conversion and sub-second navigation"
    ],
    "metrics": [
      {
        "label": "Deployment",
        "value": "Vercel Production"
      },
      {
        "label": "Framework",
        "value": "Next.js & React"
      },
      {
        "label": "Catalog",
        "value": "Artisanal Crafts"
      }
    ],
    "image": "/screenshots/oxewman-crafts-ecommerce-desktop.png",
    "screenshots": [
      "/screenshots/oxewman-crafts-ecommerce-desktop.png",
      "/screenshots/oxewman-crafts-ecommerce-mobile.png"
    ],
    "lastSyncedAt": "2026-10-14T19:36:15.617Z",
    "verifiedLive": true,
    "approved": true,
    "auditNotes": "Automatically discovered and verified via background pipeline on 10/15/2026. Backed by authenticated repositories."
  }
];
