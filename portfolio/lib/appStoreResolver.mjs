/**
 * App Store Metadata & Real Screenshot Resolver
 * 
 * Extracts verified public screenshots, icons, and listing details from
 * Google Play Store and Apple App Store using authentic package/bundle identifiers.
 */

export async function fetchGooglePlayDetails(packageId) {
  try {
    const storeUrl = `https://play.google.com/store/apps/details?id=${packageId}&hl=en&gl=US`;
    const res = await fetch(storeUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { verified: false, error: `Google Play returned status ${res.status}` };
    }

    const html = await res.text();

    // Extract Application Title
    const titleMatch = html.match(/<h1[^>]*itemprop="name"[^>]*>([^<]+)<\/h1>/i) || html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : packageId;

    // Extract App Icon
    const iconMatch = html.match(/https:\/\/play-lh\.googleusercontent\.com\/[a-zA-Z0-9_\-=]+=(?:s\d+|w\d+-h\d+)/);
    const iconUrl = iconMatch ? iconMatch[0] : null;

    // Extract Real Screenshot URLs (filtering out small icons)
    const matches = [...html.matchAll(/https:\/\/play-lh\.googleusercontent\.com\/([a-zA-Z0-9_\-=]+)/g)].map(
      (m) => m[0]
    );

    const baseKeys = [...new Set(matches.map((u) => u.split("=")[0]))];
    const screenshotUrls = baseKeys
      .filter((k) => k.length > 50)
      .slice(0, 6)
      .map((k) => `${k}=w720-h1280-rw`);

    return {
      verified: true,
      platform: "android",
      packageId,
      title,
      iconUrl,
      storeUrl,
      screenshotUrls,
    };
  } catch (err) {
    return { verified: false, error: err.message };
  }
}

export async function fetchAppleAppStoreDetails(bundleIdOrAppId) {
  try {
    const isNumeric = /^\d+$/.test(bundleIdOrAppId);
    const itunesUrl = isNumeric
      ? `https://itunes.apple.com/lookup?id=${bundleIdOrAppId}`
      : `https://itunes.apple.com/lookup?bundleId=${encodeURIComponent(bundleIdOrAppId)}`;

    const res = await fetch(itunesUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      return { verified: false, error: `App Store API returned status ${res.status}` };
    }

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return { verified: false, error: "No App Store listing found for identifier" };
    }

    const app = data.results[0];
    return {
      verified: true,
      platform: "ios",
      bundleId: app.bundleId,
      title: app.trackName,
      iconUrl: app.artworkUrl512 || app.artworkUrl100,
      storeUrl: app.trackViewUrl,
      screenshotUrls: app.screenshotUrls || [],
    };
  } catch (err) {
    return { verified: false, error: err.message };
  }
}
