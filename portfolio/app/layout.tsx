import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD. Emon Miah — Software Engineer",
  description: "Portfolio of MD. Emon Miah: mobile applications, backend systems, real-time platforms, and full-stack product engineering.",
  openGraph: { title: "MD. Emon Miah — Software Engineer", description: "Mobile, backend, real-time systems, and full-stack product engineering.", type: "website" },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { themeColor: "#090b0a", width: "device-width", initialScale: 1 };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
