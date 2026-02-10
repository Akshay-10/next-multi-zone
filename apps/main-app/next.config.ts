import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
        {
            source: '/zone-one',
            destination: `${process.env.ZONE_ONE_DOMAIN}/`,
        },
        {
            source: '/zone-one/:path+',
            destination: `${process.env.ZONE_ONE_DOMAIN}/:path+`,
        },
        {
            source: '/zone-one-static/:path+',
            destination: `${process.env.ZONE_ONE_DOMAIN}/zone-one-static/:path+`,
        }
    ];
}
};

export default nextConfig;
