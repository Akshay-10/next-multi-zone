import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const zoneOneDomain = 'https://next-multi-zone-zone-one.vercel.app';
    
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
