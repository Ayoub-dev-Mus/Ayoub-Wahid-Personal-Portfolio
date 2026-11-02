export type Template = {
  id: string;
  number: string;
  name: string;
  category: "Shopify theme" | "Next.js dashboard";
  price: number;
  currency: "USD";
  title: string;
  description: string;
  preview: "atelier" | "goods" | "metrics" | "studio";
  tags: string[];
};

export const templates: Template[] = [
  {
    id: "atelier",
    number: "01",
    name: "Atelier",
    category: "Shopify theme",
    price: 29,
    currency: "USD",
    title: "A considered storefront for fashion and lifestyle.",
    description: "Planned Shopify theme for fashion and lifestyle brands. The download will be available when this listing is released.",
    preview: "atelier",
    tags: ["Shopify", "Fashion", "Responsive"],
  },
  {
    id: "goods",
    number: "02",
    name: "Goods",
    category: "Shopify theme",
    price: 29,
    currency: "USD",
    title: "A focused product page for the things you make.",
    description: "Planned Shopify theme for independent brands and product-led storefronts. The download will be available when this listing is released.",
    preview: "goods",
    tags: ["Shopify", "Product-led", "Responsive"],
  },
  {
    id: "metrics",
    number: "03",
    name: "Metrics",
    category: "Next.js dashboard",
    price: 29,
    currency: "USD",
    title: "A clear command center for your SaaS.",
    description: "Planned Next.js dashboard starter for SaaS teams. The download will be available when this listing is released.",
    preview: "metrics",
    tags: ["Next.js", "Dashboard", "SaaS"],
  },
  {
    id: "studio",
    number: "04",
    name: "Studio",
    category: "Next.js dashboard",
    price: 29,
    currency: "USD",
    title: "A calmer workspace for your team and clients.",
    description: "Planned Next.js admin starter for teams and client workspaces. The download will be available when this listing is released.",
    preview: "studio",
    tags: ["Next.js", "Admin", "Responsive"],
  },
];
