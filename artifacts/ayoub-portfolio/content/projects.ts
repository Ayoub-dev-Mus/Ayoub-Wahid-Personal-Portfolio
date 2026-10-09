// Edit projects here. Swap images in /public/images (keep the paths or update them).
export type Project = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  outcome: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: string;
  placeholder?: boolean;
};

const todo =
  "Placeholder description. Replace this text in content/projects.ts with the product summary, your role, the stack and the outcome.";

export const projects: Project[] = [
  {
    id: "paper-play",
    number: "01",
    title: "Paper & Play Co.",
    tags: ["Shopify", "Store design"],
    outcome: "Playful school supplies Shopify store.",
    description:
      "A playful school supplies store on Shopify. Replace this paragraph in content/projects.ts with your scope, role and results for this project.",
    image: "/images/project-paper-play.jpg",
    imageAlt: "Placeholder artwork for Paper & Play Co.",
  },
  {
    id: "aurelle",
    number: "02",
    title: "Aurelle",
    tags: ["Shopify", "Luxury e-commerce"],
    outcome: "Luxury jewelry Shopify store design.",
    description:
      "Store design for a luxury jewelry brand on Shopify. Replace this paragraph in content/projects.ts with your scope, role and results for this project.",
    image: "/images/project-aurelle.jpg",
    imageAlt: "Placeholder artwork for Aurelle",
  },
  {
    id: "plygrnd",
    number: "03",
    title: "PLYGRND",
    tags: ["Shopify", "Directory"],
    outcome: "Curated wellness directory built on Shopify.",
    description:
      "A curated wellness directory built on Shopify. Replace this paragraph in content/projects.ts with your scope, role and results for this project.",
    image: "/images/project-plygrnd.jpg",
    imageAlt: "Placeholder artwork for PLYGRND",
  },
  {
    id: "beasto",
    number: "04",
    title: "Beasto Store",
    tags: ["E-commerce"],
    outcome: "E-commerce store for bikes.",
    description:
      "An e-commerce store for bikes. Replace this paragraph in content/projects.ts with your scope, role and results for this project.",
    image: "/images/project-beasto.jpg",
    imageAlt: "Placeholder artwork for Beasto Store",
  },
  {
    id: "caly",
    number: "05",
    title: "Caly",
    tags: ["SaaS"],
    outcome: "Placeholder: SaaS project description coming soon.",
    description: todo,
    image: "/images/project-caly.jpg",
    imageAlt: "Placeholder artwork for Caly",
    placeholder: true,
  },
  {
    id: "discovery",
    number: "06",
    title: "Discovery",
    tags: ["Mobile app"],
    outcome: "Placeholder: mobile app project description coming soon.",
    description: todo,
    image: "/images/project-discovery.jpg",
    imageAlt: "Placeholder artwork for Discovery",
    placeholder: true,
  },
];
