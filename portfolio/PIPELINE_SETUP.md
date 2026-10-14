# Automated Live Project Discovery & Screenshot Pipeline

This document describes the architecture, security practices, configuration, background synchronization, and verification workflow for the Automated Portfolio Project Discovery System.

---

## 1. System Overview

The system automates the discovery, verification, app-store listing resolution, screenshot capturing, and presentation of authentic, live production systems developed by **Md. Emon Miah**.

```
                           ┌───────────────────────────────┐
                           │ Authenticated GitHub Account  │
                           │  (All authorized private/org) │
                           └───────────────┬───────────────┘
                                           │
                                           ▼
                           ┌───────────────────────────────┐
                           │   GitHub Discovery Engine     │
                           │ (lib/projectDiscovery.mjs)    │
                           └───────────────┬───────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
     ┌─────────────────────────────┐               ┌─────────────────────────────┐
     │  App Store Metadata Resolver│               │ Automated Screenshot Engine │
     │  (Google Play & Apple Store)│               │  (Headless Brave/Chromium)  │
     │  (lib/appStoreResolver.mjs) │               │(lib/screenshotEngine.mjs)   │
     └──────────────┬──────────────┘               └──────────────┬──────────────┘
                    │                                             │
                    └──────────────────────┬──────────────────────┘
                                           │
                                           ▼
                           ┌───────────────────────────────┐
                           │ SSRF & Privacy Sanitize Layer │
                           │     (lib/security.mjs)        │
                           └───────────────┬───────────────┘
                                           │
                                           ▼
                           ┌───────────────────────────────┐
                           │ Verified Project Registry DB  │
                           │(app/data/discoveredProjects)  │
                           │(app/data/projectRegistry.ts)  │
                           └───────────────┬───────────────┘
                                           │
                                           ▼
                           ┌───────────────────────────────┐
                           │  Next.js 3D Deck Card Swapper │
                           │  + Interactive Carousel       │
                           │  + High-Res Lightbox Modal    │
                           └───────────────────────────────┘
```

---

## 2. Security & Strict Privacy Architecture

### Zero Public Disclosure Policy
- **No Private URLs or Git Names**: Private repository names (e.g., internal staging repo names), commit hashes, internal paths, and Git SSH/HTTPS URLs are strictly stripped before writing public data structures.
- **No Token Leakage**: GitHub personal access tokens (`GITHUB_TOKEN`, `GH_TOKEN`), SSH keys, and system secrets are never passed to the client-side bundle or public JSON.
- **Automated Privacy Assertion**: `yarn test` scans all output files (`discoveredProjects.json` and `projectRegistry.ts`) and fails if any private repository name, token pattern, or local path is detected.

### SSRF (Server-Side Request Forgery) Protection
Before capturing any website screenshot or dispatching automated probes:
- Private IPv4 ranges are blocked (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`).
- IPv6 loopback (`::1`) and link-local addresses (`fe80:`, `fc00:`, `fd00:`) are blocked.
- Hostnames matching `localhost`, `*.local`, `*.internal`, or cloud metadata endpoints are rejected.
- Non-HTTP/HTTPS schemes (`file://`, `ftp://`, `javascript:`, `gopher://`) are rejected.
- Non-standard ports (e.g., internal databases like 3306, 5432, 6379, 27017) are blocked.

---

## 3. Real Project Discovery & Store Scrapers

### Mobile Applications (Google Play & Apple App Store)
- Extracts the verified Android package name (e.g. `com.swish.app`, `com.xovalley.user_app`).
- Scrapes the official Google Play listing for verified high-resolution screenshot URLs (`play-lh.googleusercontent.com`), app icon, title, and public store URL.
- Queries iTunes Search API (`https://itunes.apple.com/lookup?bundleId=...`) for Apple App Store apps.
- Discovered store screenshots are prioritized in the card carousel.

### Live Websites (Headless Browser Worker)
- Validates the live production URL and executes automated captures with `puppeteer-core` driving Chromium/Brave.
- Dual captures generated for every project:
  - **Desktop View**: 1280 x 800 (1.5x DPR)
  - **Mobile View**: 390 x 844 (iPhone 14/15 viewport, 2x DPR)
- Stored locally in `public/screenshots/` with a 7-day disk cache to prevent redundant browser invocations.

---

## 4. Execution & Background Synchronization

### Manual Sync (CLI)
To run the automated discovery pipeline manually:
```bash
yarn sync
```
*or directly with Node:*
```bash
node scripts/sync-projects.mjs
```

### Scheduled Sync via Cron
To run synchronization daily in the background:
```bash
# Edit crontab
crontab -e

# Run pipeline daily at 03:00 AM
0 3 * * * cd /Users/md.emonmiah/Desktop/Next.js/programmermdemonmiah/portfolio && /usr/local/bin/yarn sync >> /tmp/portfolio-sync.log 2>&1
```

### Secure Admin API Endpoint
Trigger background discovery programmatically via webhook or CI/CD:

```bash
# Check status and last sync time
curl -X GET http://localhost:3000/api/sync-projects

# Trigger background synchronization
curl -X POST http://localhost:3000/api/sync-projects \
  -H "Authorization: Bearer <ADMIN_SYNC_SECRET>"
```

Set `ADMIN_SYNC_SECRET` in your `.env.local` to restrict trigger access.

---

## 5. UI Features & Design Aesthetics

- **Brand Colors**: Primary red (`#E53935`) on ultra-deep dark backdrop (`#0C0C0C`).
- **Card-System 3D Swapper**: Upper & bottom swapping cards driven by mouse wheel, keyboard arrows (`▲` / `▼`), and previous/next buttons.
- **Multi-Screen Carousel**: Each project card features an embedded gallery allowing visitors to inspect desktop, mobile, and app store screenshots.
- **High-Definition Lightbox Modal**: Clicking any screenshot or the zoom button launches a fullscreen preview with keyboard arrow controls (`←` / `→`) and direct links to live targets.
- **Strict Repository Audit Footnote**: Informs visitors that displayed systems are verified production deployments with verified HTTP 200 endpoints.

---

## 6. Automated Testing

Run the automated test suite anytime with:
```bash
yarn test
```

The test suite validates:
1. SSRF prevention and IP filter accuracy.
2. Google Play and Apple App Store metadata resolvers.
3. Disk screenshot existence and minimum file size integrity.
4. Unique canonical project grouping (duplicate prevention).
5. Strict privacy leak assertions (zero tokens, zero private paths, zero git URLs in public outputs).
