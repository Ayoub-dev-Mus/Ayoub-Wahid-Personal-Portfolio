import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  if (!origin) return [];
  return [
    { url: `${origin}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/shopify`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/fr/shopify`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
