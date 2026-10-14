/**
 * Project Registry & Verification Matrix
 * 
 * Maintained by automated repository auditing and verification.
 * Only projects with "approved: true" and verified live HTTP 200 endpoints
 * are rendered on the public portfolio.
 */

export interface VerifiedProject {
  id: string;
  name: string;
  tagline: string;
  category: "Mobile App" | "Enterprise SaaS" | "E-Commerce" | "Healthcare" | "Full Stack Web";
  status: "Live Production" | "Live Application" | "Live Web System";
  statusType: "production" | "live";
  description: string;
  architecture: string;
  stack: string[];
  role: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  image: string;
  liveUrl?: string;
  secondaryUrl?: { label: string; url: string };
  githubUrl?: string; // Only populated if repo is public and approved
  approved: boolean;
  auditNotes: string;
}

export const VERIFIED_PROJECTS: VerifiedProject[] = [
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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://play.google.com/store/apps/details?id=com.swish.app",
    approved: true,
    auditNotes: "Verified active production app on Google Play Store (HTTP 200). Backed by audited repositories swish and top_live_backend.",
  },
  {
    id: "laam-garments-erp",
    name: "LA’AM Enterprise Garments ERP",
    tagline: "Mission-critical garments manufacturing, courier, and ledger ERP platform",
    category: "Enterprise SaaS",
    status: "Live Web System",
    statusType: "production",
    description:
      "All-in-one ERP and logistics system engineered for garments manufacturing and automated order fulfillment. Integrates multi-tier Role-Based Access Control (RBAC), dynamic courier auto-tracking, real-time inventory ledger synchronization with WordPress, and employee commission wallets.",
    architecture:
      "Modular Laravel MVC engine with direct WordPress order sync webhooks, automated shipping tier calculators, and double-entry financial ledger.",
    stack: ["PHP (Laravel)", "MySQL", "WordPress API", "RBAC", "Inventory Sync", "Courier API", "Incentive Engine"],
    role: "System Architect & Backend Developer",
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://erpecom.deepverselab.com/login",
    approved: true,
    auditNotes: "Verified active production portal at erpecom.deepverselab.com (HTTP 200). Backed by audited repository laam_erp_ecommerce_laravel.",
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
    image: "https://xovalley.com/storage/photos/1/02.jpg",
    liveUrl: "https://xovalley.com",
    secondaryUrl: {
      label: "Google Play App",
      url: "https://play.google.com/store/apps/details?id=com.xovalley.user_app",
    },
    approved: true,
    auditNotes: "Verified live production marketplace (xovalley.com, HTTP 200) and Google Play Store user app (HTTP 200). Backed by audited repository xovalley_laravel.",
  },
  {
    id: "araco-healthcare",
    name: "ARACO Healthcare & Telemedicine",
    tagline: "Integrated healthcare ecosystem with WebRTC consultations and digital pharmacy",
    category: "Healthcare",
    status: "Live Web System",
    statusType: "production",
    description:
      "Comprehensive healthcare platform uniting patients, certified doctors, clinical diagnostic laboratories, and pharmacies. Incorporates digital prescription upload workflows, encrypted video/audio consultations via Zego Cloud WebRTC, and home sample collection scheduling.",
    architecture:
      "Flutter mobile client utilizing reactive GetX state management connected to Zego Cloud WebRTC pipelines and a modular Django administration backend.",
    stack: ["Flutter (GetX)", "Python (Django)", "Zego Cloud WebRTC", "MySQL", "REST API", "POS Billing"],
    role: "Full Stack Engineer (Flutter + Django + System Design)",
    highlights: [
      "Online pharmacy checkout with secure prescription upload and fulfillment dispatch",
      "Encrypted one-to-one video/audio doctor consultations powered by Zego Cloud WebRTC",
      "Clinical lab test home sample collection booking, automated digital report generation, and POS billing",
    ],
    metrics: [
      { label: "Telemedicine", value: "Zego Cloud WebRTC" },
      { label: "Modules", value: "Pharmacy + Clinic" },
      { label: "State", value: "GetX Clean Arch" },
    ],
    image: "https://araco.com.bd/media/service/Screenshot_1.png",
    liveUrl: "https://araco.com.bd",
    approved: true,
    auditNotes: "Verified live telemedicine portal (araco.com.bd, HTTP 200). Backed by audited repositories araco_healthcare and araco_healthcare_backend.",
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
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://fantasymart-frontend.vercel.app",
    approved: true,
    auditNotes: "Verified live web deployment at fantasymart-frontend.vercel.app (HTTP 200). Backed by audited repositories fantasymart_frontend, fantasymart_backend, and fantasymart_customer.",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://deepverselab-zeta.vercel.app",
    secondaryUrl: {
      label: "E-Commerce Engine",
      url: "https://deepverselab-ecommerce.vercel.app",
    },
    approved: true,
    auditNotes: "Verified live production web deployment at deepverselab-zeta.vercel.app (HTTP 200) and deepverselab-ecommerce.vercel.app (HTTP 200). Backed by audited repositories deepverselab, deepverselab_ecommerce, and deepverselab_ecom_go.",
  },
];
