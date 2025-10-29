import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG images to be used with next/image
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
