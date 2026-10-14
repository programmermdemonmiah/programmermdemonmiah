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

export const VERIFIED_PROJECTS: VerifiedProject[] = [
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
