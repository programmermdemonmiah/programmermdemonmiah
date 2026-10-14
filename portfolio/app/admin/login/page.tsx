import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLoginClient from "./AdminLoginClient";

export const metadata = {
  title: "Admin Login — MD. Emon Miah Portfolio",
  description: "Secure Auth.js administrator portal for project and portfolio management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return <AdminLoginClient />;
}
