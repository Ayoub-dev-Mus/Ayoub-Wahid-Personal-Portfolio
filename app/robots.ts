import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/origin";

export default function robots(): MetadataRoute.Robots {
  const origin = publicOrigin();
  return { rules: { userAgent: "*", allow: "/" }, ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}) };
}
