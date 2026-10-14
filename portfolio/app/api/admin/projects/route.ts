import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getDiscoveredProjects,
  saveProjectToDiscovery,
  deleteProjectFromDiscovery,
} from "@/lib/projectDiscovery.mjs";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/projects - Retrieve all stored projects from app/data
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const projects = getDiscoveredProjects();
    return NextResponse.json({
      success: true,
      total: projects.length,
      projects,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/admin/projects - Add or update a project via projectDiscovery.mjs
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body || !body.name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const savedProject = await saveProjectToDiscovery(body);
    return NextResponse.json({
      success: true,
      project: savedProject,
      message: "Project successfully stored to data folder via projectDiscovery.mjs",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to store project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/projects?id=... - Delete a project from app/data
 */
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const result = await deleteProjectFromDiscovery(id);
    return NextResponse.json({
      success: true,
      deletedId: id,
      remaining: result.remaining,
      message: "Project removed and data folder updated",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
