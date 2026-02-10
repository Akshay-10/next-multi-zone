import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const zoneOneDomain = process.env.NEXT_PUBLIC_ZONE_ONE_DOMAIN || 'http://localhost:3001';
    
    return [
        {
            source: '/zone-one',
            destination: `${zoneOneDomain}/`,
        },
        {
            source: '/zone-one/:path+',
            destination: `${zoneOneDomain}/:path+`,
        },
        {
            source: '/zone-one-static/:path+',
            destination: `${zoneOneDomain}/zone-one-static/:path+`,
        }
    ];
}
};

export default nextConfig;
