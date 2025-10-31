import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG images to be used with next/image
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Production optimizations for better performance and faster builds
  // Note: swcMinify is enabled by default in Next.js 16+ (no need to specify)
  
  // Remove console logs in production (except errors and warnings)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Optimize package imports for faster cold starts
  experimental: {
    optimizePackageImports: ['maplibre-gl', 'idb', 'react-icons'],
  },
};

export default nextConfig;
