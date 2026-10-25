import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: root,
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.replit.dev", "*.replit.app"],
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    agentUpgrade: "security",
  },
};
export default nextConfig;
