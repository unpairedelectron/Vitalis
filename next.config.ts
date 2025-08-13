import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete even if there are TypeScript errors
    ignoreBuildErrors: false, // Keep type checking but allow minor issues
  },
  experimental: {
    // Disable static optimization for problematic pages
    forceSwcTransforms: true,
  },
  // Azure App Service configuration
  output: 'standalone',
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  // Azure-specific optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false
};

export default nextConfig;
