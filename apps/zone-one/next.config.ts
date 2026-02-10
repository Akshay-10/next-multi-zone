import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/zone-one", // Removed to make app accessible at root
  assetPrefix: '/zone-one-static',
   async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/zone-one-static/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
};

export default nextConfig;
