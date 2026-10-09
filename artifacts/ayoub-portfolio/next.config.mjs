/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.replit.dev", "*.replit.app"],
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
