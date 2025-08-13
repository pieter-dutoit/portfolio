import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
  },
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k3c1kebeprqu2qck.public.blob.vercel-storage.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
