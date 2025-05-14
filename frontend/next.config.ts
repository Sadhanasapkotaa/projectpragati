import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // optional but recommended for GitHub Pages
};

export default nextConfig;
