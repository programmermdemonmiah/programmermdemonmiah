import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDiscoveredProjects } from "@/lib/projectDiscovery.mjs";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Admin Console — Portfolio Project Management | MD. Emon Miah",
  description: "Secure Auth.js administration console for managing verified production projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const initialProjects = getDiscoveredProjects();

  return (
    <AdminDashboardClient
      initialProjects={initialProjects}
      user={{
        name: session.user.name,
        email: session.user.email,
        role: (session.user as { role?: unknown }).role,
      }}
    />
  );
}
