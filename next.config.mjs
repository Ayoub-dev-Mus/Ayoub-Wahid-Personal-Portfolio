import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  outputFileTracingRoot: root,
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.replit.dev", "*.replit.app"],
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    agentUpgrade: "security",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
