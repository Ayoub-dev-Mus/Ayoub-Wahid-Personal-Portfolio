import type { Metadata } from "next";
import { ShopifyLanding } from "@/components/shopify-landing";
import { shopifyCopy } from "@/content/shopify";
import { visibleProjects } from "@/lib/projects";
import { publicOrigin } from "@/lib/origin";

export function generateMetadata(): Metadata {
  const origin = publicOrigin();
  const copy = shopifyCopy.fr;
  const canonical = origin ? `${origin}/fr/shopify` : "/fr/shopify";
  const english = origin ? `${origin}/shopify` : "/shopify";
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical,
      languages: { en: english, fr: canonical, "x-default": english },
    },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: canonical, type: "website", locale: "fr_FR" },
  };
}

export default function FrenchShopifyPage() {
  const projects = visibleProjects().filter((project) => project.tags.includes("Shopify"));
  return <ShopifyLanding locale="fr" projects={projects} />;
}
