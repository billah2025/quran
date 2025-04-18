import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['img.youtube.com'], // Allow YouTube thumbnails to be used
  },
};

export default nextConfig;
