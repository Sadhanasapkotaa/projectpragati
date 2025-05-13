/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensures compatibility with GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/projectpragati' : '',
};

module.exports = nextConfig;