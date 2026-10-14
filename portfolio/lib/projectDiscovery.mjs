import { execSync } from "node:child_process";

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
];
