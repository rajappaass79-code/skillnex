import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "*.replit.dev",
    "*.picard.replit.dev",
    "127.0.0.1",
    "localhost",
  ],
  devIndicators: false,
};

export default nextConfig;
