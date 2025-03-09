import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/projectpragati/' : '', // Replace 'projectpragati' with your repo name
  output: 'export', // Export static HTML files for GitHub Pages
  trailingSlash: true, // Ensures all links work properly on GitHub Pages
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js image optimization
  },
};

export default nextConfig;