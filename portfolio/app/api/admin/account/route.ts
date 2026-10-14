import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateAdminPassword, getSafeAdminUsers } from "@/lib/authStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const users = getSafeAdminUsers();
  return NextResponse.json({
    success: true,
    users,
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { username, newPassword } = await req.json();

    if (!username || !newPassword || String(newPassword).length < 6) {
      return NextResponse.json(
        { error: "Username and a password of at least 6 characters are required." },
        { status: 400 }
      );
    }

    const updated = updateAdminPassword(username, newPassword);
    if (!updated) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully in app/data/adminAuth.json",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update password";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
