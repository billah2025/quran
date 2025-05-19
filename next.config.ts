import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['img.youtube.com','via.placeholder.com','i.ibb.co'], // Allow YouTube thumbnails to be used
  },
};

export default nextConfig;
