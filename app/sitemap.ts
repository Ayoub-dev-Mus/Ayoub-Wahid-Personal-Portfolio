import type { MetadataRoute } from "next";
import { getOrigin } from "@/lib/origin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getOrigin();
  if (!origin) return [];
  return [{ url: `${origin}/`, changeFrequency: "monthly", priority: 1 }];
}
