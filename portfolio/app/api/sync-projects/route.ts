import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

import { type VerifiedProject } from "@/app/data/projectRegistry";

export const dynamic = "force-dynamic";

export async function GET() {
  const root = process.cwd();
  const jsonPath = path.join(root, "app", "data", "discoveredProjects.json");
  const screenshotsDir = path.join(root, "public", "screenshots");

  let projects: VerifiedProject[] = [];
  if (fs.existsSync(jsonPath)) {
    try {
      projects = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as VerifiedProject[];
    } catch {
      // ignore
    }
  }

  let screenshotFiles: string[] = [];
  if (fs.existsSync(screenshotsDir)) {
    screenshotFiles = fs.readdirSync(screenshotsDir);
  }

  return NextResponse.json({
    status: "healthy",
    totalProjects: projects.length,
    lastSyncedAt: projects[0]?.lastSyncedAt || null,
    totalCachedScreenshots: screenshotFiles.length,
    screenshots: screenshotFiles,
    projects: projects.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      status: p.status,
      screenshotCount: p.screenshots?.length || 0,
      verifiedLive: p.verifiedLive,
    })),
  });
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.ADMIN_SYNC_SECRET || "local-dev-sync-key";

  // Check auth if production secret set
  if (process.env.ADMIN_SYNC_SECRET && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Trigger sync in background process
  const root = process.cwd();
  const scriptPath = path.join(root, "scripts", "sync-projects.mjs");

  exec(`node "${scriptPath}"`, (err, stdout, _stderr) => {
    if (err) {
      console.error("[API Sync Error]", err);
    } else {
      console.log("[API Sync Finished]", stdout);
    }
  });

  return NextResponse.json({
    message: "Automated project discovery and screenshot sync initiated in background.",
    status: "processing",
    timestamp: new Date().toISOString(),
  });
}
