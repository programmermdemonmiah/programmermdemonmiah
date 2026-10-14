import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { validateSafeUrl } from "./security.mjs";

const root = process.cwd();
const screenshotsDir = path.join(root, "public", "screenshots");

// Locate available browser executable
function getBrowserExecutablePath() {
  const candidates = [
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Brave Browser",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

/**
 * Captures live desktop and mobile screenshots with SSRF protection and caching
 */
export async function captureLiveWebsiteScreenshots(url, slug, options = {}) {
  // Ensure output directory
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const desktopFile = path.join(screenshotsDir, `${slug}-desktop.png`);
  const mobileFile = path.join(screenshotsDir, `${slug}-mobile.png`);

  const desktopRelPath = `/screenshots/${slug}-desktop.png`;
  const mobileRelPath = `/screenshots/${slug}-mobile.png`;

  // Check cache (if files exist and younger than 7 days)
  const maxAgeMs = (options.maxAgeDays || 7) * 24 * 60 * 60 * 1000;
  if (!options.force && fs.existsSync(desktopFile) && fs.existsSync(mobileFile)) {
    const stat = fs.statSync(desktopFile);
    if (Date.now() - stat.mtimeMs < maxAgeMs) {
      return {
        success: true,
        cached: true,
        desktop: desktopRelPath,
        mobile: mobileRelPath,
      };
    }
  }

  // 1. SSRF Safety Verification
  const check = await validateSafeUrl(url);
  if (!check.valid) {
    console.warn(`[SSRF Blocked] URL rejected: ${url} (${check.reason})`);
    return { success: false, error: check.reason };
  }

  // 2. Browser Executable
  const execPath = getBrowserExecutablePath();
  if (!execPath) {
    console.warn("[Screenshot Engine] No compatible Chromium executable found on system.");
    return { success: false, error: "No Chromium executable available" };
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: execPath,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--hide-scrollbars",
      ],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(15000);

    // Desktop Screenshot (1280 x 800)
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });
    await page.goto(check.url, { waitUntil: "networkidle2" });
    await page.screenshot({ path: desktopFile, type: "png" });

    // Mobile Screenshot (390 x 844)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.screenshot({ path: mobileFile, type: "png" });

    await browser.close();

    return {
      success: true,
      cached: false,
      desktop: desktopRelPath,
      mobile: mobileRelPath,
    };
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error(`[Screenshot Failed for ${slug}]`, err.message);
    return { success: false, error: err.message };
  }
}
