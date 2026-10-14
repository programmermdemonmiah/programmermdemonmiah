import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { isPrivateIp, validateSafeUrl } from "../lib/security.mjs";
import { fetchGooglePlayDetails, fetchAppleAppStoreDetails } from "../lib/appStoreResolver.mjs";

const rootDir = process.cwd();

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    process.stdout.write(`  ⏳ ${name}... `);
    await fn();
    console.log(`\x1b[32m✔ PASSED\x1b[0m`);
    passed++;
  } catch (err) {
    console.log(`\x1b[31m✖ FAILED\x1b[0m`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

async function runAllTests() {
  console.log("\n========================================================");
  console.log("   AUTOMATED PORTFOLIO DISCOVERY & SECURITY TEST SUITE   ");
  console.log("========================================================\n");

  // SUITE 1: SSRF & URL Security
  console.log("\x1b[1m[Suite 1: SSRF & URL Security Validator]\x1b[0m");
  
  await test("Detects IPv4 loopback (127.0.0.1) as private", () => {
    assert.equal(isPrivateIp("127.0.0.1"), true);
  });

  await test("Detects IPv4 subnet 10.0.0.0/8 as private", () => {
    assert.equal(isPrivateIp("10.0.4.15"), true);
  });

  await test("Detects IPv4 subnet 192.168.0.0/16 as private", () => {
    assert.equal(isPrivateIp("192.168.1.1"), true);
  });

  await test("Detects IPv4 subnet 172.16.0.0/12 as private", () => {
    assert.equal(isPrivateIp("172.20.0.1"), true);
  });

  await test("Detects AWS/GCP cloud metadata IP (169.254.169.254) as private", () => {
    assert.equal(isPrivateIp("169.254.169.254"), true);
  });

  await test("Detects IPv6 loopback (::1) as private", () => {
    assert.equal(isPrivateIp("::1"), true);
  });

  await test("Identifies public internet IPs as safe (8.8.8.8, 1.1.1.1)", () => {
    assert.equal(isPrivateIp("8.8.8.8"), false);
    assert.equal(isPrivateIp("1.1.1.1"), false);
  });

  await test("Blocks localhost hostname in validateSafeUrl", async () => {
    const res = await validateSafeUrl("http://localhost:3000/api");
    assert.equal(res.valid, false);
    assert.match(res.reason, /hostname/i);
  });

  await test("Blocks non-HTTP/HTTPS protocols (ftp://, file://)", async () => {
    const res1 = await validateSafeUrl("file:///etc/passwd");
    assert.equal(res1.valid, false);
    const res2 = await validateSafeUrl("ftp://test.com/file");
    assert.equal(res2.valid, false);
  });

  await test("Blocks non-standard internal ports (e.g. 3306 MySQL, 6379 Redis)", async () => {
    const res = await validateSafeUrl("http://example.com:6379");
    assert.equal(res.valid, false);
    assert.match(res.reason, /port/i);
  });

  await test("Approves legitimate public web addresses (https://xovalley.com)", async () => {
    const res = await validateSafeUrl("https://xovalley.com");
    assert.equal(res.valid, true);
    assert.match(res.url, /^https:\/\/xovalley\.com/);
  });

  // SUITE 2: App Store Metadata & Scraper
  console.log("\n\x1b[1m[Suite 2: App Store Metadata & Real Screenshot Resolver]\x1b[0m");

  await test("Fetches authentic Google Play screenshots for com.swish.app", async () => {
    const details = await fetchGooglePlayDetails("com.swish.app");
    assert.equal(details.verified, true);
    assert.equal(details.platform, "android");
    assert.ok(details.screenshotUrls.length >= 1, "Should contain at least 1 screenshot");
    assert.match(details.screenshotUrls[0], /play-lh\.googleusercontent\.com/);
    assert.ok(details.storeUrl.includes("com.swish.app"));
  });

  await test("Fetches authentic Google Play screenshots for com.xovalley.user_app", async () => {
    const details = await fetchGooglePlayDetails("com.xovalley.user_app");
    assert.equal(details.verified, true);
    assert.ok(details.screenshotUrls.length >= 1);
    assert.match(details.screenshotUrls[0], /play-lh\.googleusercontent\.com/);
  });

  await test("Safely handles nonexistent package IDs without throwing", async () => {
    const details = await fetchGooglePlayDetails("com.fake.nonexistent.app.pkg.xyz123");
    assert.equal(details.verified, false);
    assert.ok(details.error);
  });

  await test("Safely handles Apple App Store queries for unlisted IDs", async () => {
    const details = await fetchAppleAppStoreDetails("com.fake.nonexistent.app.pkg.xyz123");
    assert.equal(details.verified, false);
  });

  // SUITE 3: Screenshot Storage & Caching
  console.log("\n\x1b[1m[Suite 3: Screenshot Storage, Dimensions & Caching]\x1b[0m");

  const expectedScreenshots = [
    "araco-healthcare-desktop.png",
    "araco-healthcare-mobile.png",
    "deepverselab-saas-desktop.png",
    "deepverselab-saas-mobile.png",
    "fantasymart-ecommerce-desktop.png",
    "fantasymart-ecommerce-mobile.png",
    "laam-garments-erp-desktop.png",
    "laam-garments-erp-mobile.png",
    "xovalley-ecommerce-desktop.png",
    "xovalley-ecommerce-mobile.png",
  ];

  for (const filename of expectedScreenshots) {
    await test(`Cached screenshot exists on disk: ${filename}`, () => {
      const filePath = path.join(rootDir, "public", "screenshots", filename);
      assert.ok(fs.existsSync(filePath), `File should exist at ${filePath}`);
      const stats = fs.statSync(filePath);
      assert.ok(stats.size > 2000, `File size (${stats.size} bytes) should be genuine image`);
    });
  }

  // SUITE 4: Duplicate Detection & Canonical Grouping
  console.log("\n\x1b[1m[Suite 4: Project Aggregation & Duplicate Prevention]\x1b[0m");

  await test("Canonical database contains verified distinct projects", () => {
    const dbPath = path.join(rootDir, "app", "data", "discoveredProjects.json");
    assert.ok(fs.existsSync(dbPath));
    const projects = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, "Project IDs must be unique (no duplicates)");
    assert.ok(projects.length >= 5, "Must discover all primary projects");
  });

  // SUITE 5: Strict Privacy & Confidential Data Protection
  console.log("\n\x1b[1m[Suite 5: Strict Privacy & Leak Prevention Assertions]\x1b[0m");

  await test("Zero private git repo URLs or internal source paths in discoveredProjects.json", () => {
    const jsonPath = path.join(rootDir, "app", "data", "discoveredProjects.json");
    const content = fs.readFileSync(jsonPath, "utf-8");

    // Prohibit private GitHub links (e.g., git@github.com, raw git repo URLs, tokens)
    assert.doesNotMatch(content, /git@github\.com/, "Must not contain SSH git URLs");
    assert.doesNotMatch(content, /ghp_[A-Za-z0-9_]{36}/, "Must not contain GitHub personal access tokens");
    assert.doesNotMatch(content, /github_pat_[A-Za-z0-9_]+/, "Must not contain fine-grained PAT tokens");
    assert.doesNotMatch(content, /\/Users\/md\.emonmiah/, "Must not contain absolute local user paths");
    assert.doesNotMatch(content, /_repoKeywords/, "Must strip internal repository keywords");
  });

  await test("Zero confidential tokens or private paths in projectRegistry.ts", () => {
    const regPath = path.join(rootDir, "app", "data", "projectRegistry.ts");
    const content = fs.readFileSync(regPath, "utf-8");

    assert.doesNotMatch(content, /git@github\.com/, "Must not contain SSH git URLs");
    assert.doesNotMatch(content, /ghp_[A-Za-z0-9_]{36}/, "Must not contain GitHub PATs");
    assert.doesNotMatch(content, /\/Users\/md\.emonmiah/, "Must not contain local filesystem paths");
    assert.doesNotMatch(content, /_repoKeywords/, "Must not contain internal repo keywords");
  });

  await test("All approved projects have polished, professional presentation data", () => {
    const jsonPath = path.join(rootDir, "app", "data", "discoveredProjects.json");
    const projects = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    for (const p of projects) {
      assert.ok(p.name && p.name.length > 3, `${p.id} must have a polished title`);
      assert.ok(!p.name.includes("_") && !p.name.includes("/"), `${p.id} title must not look like a raw repo name`);
      assert.ok(p.description && p.description.length > 20, `${p.id} must have a descriptive summary`);
      assert.ok(Array.isArray(p.stack) && p.stack.length > 0, `${p.id} must specify technology stack`);
      assert.ok(Array.isArray(p.screenshots) && p.screenshots.length > 0, `${p.id} must have at least 1 verified screenshot`);
      assert.equal(p.verifiedLive, true, `${p.id} must be verified live`);
    }
  });

  console.log("\n========================================================");
  console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
