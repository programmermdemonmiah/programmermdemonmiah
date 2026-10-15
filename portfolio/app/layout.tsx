import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./responsive-fixes.css";
import "./background-fix.css";

export const metadata: Metadata = {
  title: "MD. Emon Miah — Senior Software Engineer | Flutter · Go · Next.js · Laravel",
  description:
    "Portfolio of MD. Emon Miah — Senior Software Engineer specializing in Flutter mobile engineering, Go backend services, Next.js web applications, and real-time systems.",
  keywords: [
    "MD. Emon Miah",
    "Senior Software Engineer",
    "Flutter Developer",
    "Go Engineer",
    "Golang",
    "Next.js",
    "React",
    "Laravel",
    "Backend Engineer",
    "Mobile App Developer",
    "Bangladesh Software Engineer",
  ],
  authors: [{ name: "MD. Emon Miah", url: "https://github.com/programmermdemonmiah" }],
  creator: "MD. Emon Miah",
  openGraph: {
    title: "MD. Emon Miah — Senior Software Engineer",
    description:
      "Full-stack mobile and backend engineer specializing in Flutter, Go, Next.js, and real-time systems.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://github.com/programmermdemonmiah.png",
        width: 400,
        height: 400,
        alt: "MD. Emon Miah - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MD. Emon Miah — Senior Software Engineer",
    description:
      "Full-stack mobile and backend engineer specializing in Flutter, Go, Next.js, and real-time systems.",
    images: ["https://github.com/programmermdemonmiah.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
