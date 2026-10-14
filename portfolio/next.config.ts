import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.mzstatic.com" },
      { protocol: "https", hostname: "xovalley.com" },
      { protocol: "https", hostname: "araco.com.bd" },
      { protocol: "https", hostname: "deepverselab-zeta.vercel.app" },
      { protocol: "https", hostname: "fantasymart-frontend.vercel.app" },
    ],
  },
};

export default nextConfig;
