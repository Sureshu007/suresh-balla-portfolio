import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
