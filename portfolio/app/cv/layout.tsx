import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae — MD. Emon Miah | Senior Mobile & Backend Developer",
  description:
    "Executive Curriculum Vitae of MD. Emon Miah — Full Stack Mobile & Backend Developer specializing in Flutter, Go, Laravel, Python, and Real-Time WebSockets.",
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
