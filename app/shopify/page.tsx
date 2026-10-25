import type { Metadata } from "next";
import { ShopifyLanding } from "@/components/shopify-landing";
import { shopifyCopy } from "@/content/shopify";
import { visibleProjects } from "@/lib/projects";
import { publicOrigin } from "@/lib/origin";

export function generateMetadata(): Metadata {
  const origin = publicOrigin();
  const copy = shopifyCopy.en;
  const canonical = origin ? `${origin}/shopify` : "/shopify";
  const french = origin ? `${origin}/fr/shopify` : "/fr/shopify";
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical,
      languages: { en: canonical, fr: french, "x-default": canonical },
    },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: canonical, type: "website", locale: "en_US" },
  };
}

export default function ShopifyPage() {
  const projects = visibleProjects().filter((project) => project.tags.includes("Shopify"));
  return <ShopifyLanding locale="en" projects={projects} />;
}
