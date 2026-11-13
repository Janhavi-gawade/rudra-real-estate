import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/#project-overview',
        permanent: false,
      },
      {
        source: '/properties',
        destination: '/#project-plans',
        permanent: false,
      },
      {
        source: '/compare',
        destination: '/',
        permanent: false,
      },
      {
        source: '/favourites',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
