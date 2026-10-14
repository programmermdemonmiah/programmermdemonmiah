import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD. Emon Miah — Software Engineer & Product Builder",
  description: "Portfolio of MD. Emon Miah: mobile applications, backend systems, real-time platforms, and full-stack product engineering.",
  openGraph: { title: "MD. Emon Miah — Software Engineer", description: "Flutter, Go, Next.js, Laravel, realtime systems, and full-stack product engineering.", type: "website", images: [{ url: "https://github.com/programmermdemonmiah.png?size=640", width: 640, height: 640, alt: "MD. Emon Miah" }] },
  twitter: { card: "summary", title: "MD. Emon Miah — Software Engineer", description: "Flutter, Go, Next.js, Laravel, realtime systems, and full-stack product engineering.", images: ["https://github.com/programmermdemonmiah.png?size=640"] },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { themeColor: "#0C0C0C", width: "device-width", initialScale: 1 };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
