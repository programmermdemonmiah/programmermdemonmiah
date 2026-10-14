import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { fetchGooglePlayDetails, fetchAppleAppStoreDetails } from "@/lib/appStoreResolver.mjs";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const packageId = searchParams.get("packageId");
  const bundleId = searchParams.get("bundleId");

  if (!packageId && !bundleId) {
    return NextResponse.json({ error: "packageId or bundleId is required" }, { status: 400 });
  }

  try {
    if (packageId) {
      const details = await fetchGooglePlayDetails(packageId);
      return NextResponse.json({ success: true, details });
    }
    if (bundleId) {
      const details = await fetchAppleAppStoreDetails(bundleId);
      return NextResponse.json({ success: true, details });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Resolver failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
