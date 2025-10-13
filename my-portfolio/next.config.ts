import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/my-portfolio', // replace if using a repo like github.io/my-portfolio
};

export default nextConfig;
