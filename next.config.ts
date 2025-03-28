import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        enabled: false, // Use Webpack instead of Turbopack
      },
    },
  },
  typescript: {
    ignoreBuildErrors: false, // Set to true to ignore TS errors during build
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, // Prevent Node.js modules from being bundled on the client
      path: false,
      os: false,
    };
    return config;
  },
  reactStrictMode: true,
  // swcMinify: true, // Use SWC for minification
  output: "standalone", // Useful for deployment
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
};

export default nextConfig;
