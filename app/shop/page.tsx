import type { Metadata } from "next";
import { TemplateShop } from "@/components/template-shop";
import { publicOrigin } from "@/lib/origin";

export function generateMetadata(): Metadata {
  const origin = publicOrigin();
  const canonical = origin ? `${origin}/shop` : "/shop";
  const title = "Shop Shopify & Next.js Templates — $29 USD | Ayoub Wahid";
  const description = "Choose a Shopify theme or Next.js dashboard template for $29 USD. Pay with PayPal and download the ZIP after payment.";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", locale: "en_US" },
  };
}

type Props = { searchParams: Promise<{ checkout?: string | string[] }> };

export default async function ShopPage({ searchParams }: Props) {
  const { checkout } = await searchParams;
  return <TemplateShop checkoutCancelled={checkout === "cancelled"} />;
}
