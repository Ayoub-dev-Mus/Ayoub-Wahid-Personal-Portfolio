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

export const projects: Project[] = [
  {
    id: "magic-spoon",
    number: "01",
    title: "Magic Spoon",
    tags: ["E-commerce", "DTC"],
    outcome: "High-protein cereal shop with bundles and a monthly subscription.",
    description:
      "A bright cereal storefront: a full-bleed product hero, variety packs, a build-your-own bundle, and a subscribe-and-save offer. Shoppers can move from the homepage into cereal, granola, treats, and oatmeal without leaving the campaign.",
    image: "/images/project-magic-spoon.jpg",
    imageAlt: "Magic Spoon homepage with the high-protein cereal hero",
    link: "https://magicspoon.com/",
  },
  {
    id: "spacegoods",
    number: "02",
    title: "Spacegoods",
    tags: ["E-commerce", "DTC"],
    outcome: "Functional coffee and sleep range, from campaign hero to starter kits.",
    description:
      "A product site for functional coffee, sleep, and focus formulas. The homepage opens on a campaign hero, then a starter-kit carousel, a reviews wall, and a canned-latte feature. Each product keeps its flavour, price, and sale state in the same row.",
    image: "/images/project-spacegoods.jpg",
    imageAlt: "Spacegoods homepage featuring the Sleep+ campaign",
    link: "https://spacegoods.com/en-int",
  },
  {
    id: "flare-audio",
    number: "03",
    title: "Flare Audio",
    tags: ["E-commerce", "DTC"],
    outcome: "Earplug and earphone store led by the Flare Zero launch.",
    description:
      "A dark product homepage for Flare Zero, then category tiles for calming tools, earplugs, and earphones, a press and awards band, and a quote grid from artists and customers. The shop stays one click away from every story block.",
    image: "/images/project-flare.jpg",
    imageAlt: "Flare Audio homepage with the Flare Zero product hero",
    link: "https://www.flareaudio.com/",
  },
  {
    id: "away",
    number: "04",
    title: "Away",
    tags: ["E-commerce", "DTC"],
    outcome: "Luggage storefront with a collection hero and shoppable rows.",
    description:
      "A luggage homepage built around the Aluminum Edge collection: a full-width hero, a product row with add-to-cart, category tiles for luggage, bags, and accessories, and editorial splits for individual collections.",
    image: "/images/project-away.jpg",
    imageAlt: "Away homepage showing the Aluminum Edge luggage collection",
    link: "https://www.awaytravel.com/",
  },
  {
    id: "ribbo",
    number: "05",
    title: "Ribbo",
    tags: ["AI", "SaaS"],
    outcome: "AI customer-service agent for chat, WhatsApp, and handoff.",
    description:
      "A product site for an AI agent that answers from a business's own prices and policies, then hands the thread to a person when it should. The page covers WhatsApp, web chat, Instagram, and Messenger, plus the console where a team reviews conversations.",
    image: "/images/project-ribbo.jpg",
    imageAlt: "Ribbo homepage with the customer-service agent headline",
    link: "https://ribbo.ai/",
  },
  {
    id: "legalcentre",
    number: "06",
    title: "LegalCentre",
    tags: ["Services", "Web"],
    outcome: "French company-services site for create, domicile, and close.",
    description:
      "A services site for creating, domiciling, and closing a French company. The homepage leads with the three jobs, then service pages, a review carousel, and a short list of what each engagement includes, from the legal form to the Kbis.",
    image: "/images/project-legalcentre.jpg",
    imageAlt: "LegalCentre homepage for creating and closing a French company",
    link: "https://www.legalcentre.fr/",
  },
];
