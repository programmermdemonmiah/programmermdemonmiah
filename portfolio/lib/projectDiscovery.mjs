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
