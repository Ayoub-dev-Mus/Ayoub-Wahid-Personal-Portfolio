import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  if (!origin) return [];
  return [{ url: `${origin}/`, changeFrequency: "monthly", priority: 1 }];
}
