import { contactLinks } from "@/lib/site";

export const CAL_LINK = "https://calendly.com/ayoubshipz";

// Edit all copy here. Components read from this file only.
export const site = {
  name: "Ayoub Wahid",
  url: "https://wahidayoub.com",
  monogram: "AW",
  role: "Shopify & AI Developer",
  location: "Casablanca, Morocco",
  timezone: "Africa/Casablanca",
  description:
    "I build Shopify stores that sell and AI agents that answer your customers. 100% Job Success on Upwork. Free store review.",
  metadataTitle: "Ayoub Wahid — Shopify & AI Developer for DTC Brands",
  availability: "Available for new projects",
  clockLabel: "Local time — Casablanca",
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ],
  cta: "Book a call",
  ui: {
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    greeting: "Hi!",
    selected: "Selected",
    work: "work",
    closeProject: "Close project details",
    placeholder: "Placeholder",
    visitProject: "Visit the live store",
    challenge: "The challenge",
    whatIDid: "What I built",
    result: "The result",
    concept: "Independent site study",
    similarProject: "Start a project like this",
  },
  links: {
    upwork: contactLinks.UPWORK_URL,
    email: contactLinks.EMAIL,
    linkedin: contactLinks.LINKEDIN_URL,
    github: contactLinks.GITHUB_URL,
    calendar: contactLinks.CALENDAR_URL,
  },
  hero: {
    label: "Ayoub Wahid · Shopify & AI Developer · Casablanca",
    headline: "Shopify stores that sell. AI agents that answer your customers.",
    subline:
      "I design, build and speed up Shopify stores for DTC brands, then add AI agents that handle support and sales 24/7.",
    primary: "Get a free store review",
    secondary: "Book a 15-min call",
    proof:
      "100% Job Success on Upwork · 11+ projects delivered · Replies within 24h",
  },
  brands: {
    title: "Stores I've worked on",
    // TODO: Replace grey text wordmarks with approved SVGs.
    names: [
      "Magic Spoon",
      "Spacegoods",
      "Flare Audio",
      "Away",
      "Monica Vinader",
      "Miansai",
      "Gorjana",
    ],
  },
  about: {
    title: "About",
    sticker: "Casablanca, MA",
    portrait: "/images/hero-avatar.png",
    portraitAlt: "Ayoub Wahid, Shopify developer based in Casablanca",
    text: "I combine hands-on engineering with enterprise project leadership. At a major telecom operator, I led the merger of three legacy sales platforms into one B2B/B2C app. That's why your project gets a clear scope, milestones and steady updates, not just code.",
    tags: [
      "Shopify Expert",
      "Full-Stack",
      "AI Development",
      "Mobile Apps",
      "Project Leadership",
    ],
    languagesLabel: "Languages",
    languages: ["English", "French", "Arabic"],
    educationLabel: "Education",
    education: [
      "MSc Computer Science, École Marocaine des Sciences de l'Ingénieur (2024)",
      "Associate's degree in Computer Science, ISTA (2021)",
    ],
  },
  services: {
    title: "Services",
    items: [
      {
        n: "01",
        title: "Shopify & E-commerce",
        projectType: "Shopify store",
        cta: "Discuss your Shopify store",
        pitch:
          "Launch or improve a Shopify store that makes it easier for customers to buy.",
        bullets: [
          "Launch a store that converts from day one",
          "Faster pages and higher conversion (speed & CRO)",
          "Upsells, bundles and subscriptions that raise order value",
          "COD forms and tracking set up right (Meta, TikTok, Google)",
          "Turn your store into an iOS & Android app",
        ],
      },
      {
        n: "02",
        title: "AI Agents for Stores",
        projectType: "AI agent",
        cta: "Discuss an AI agent",
        pitch: "Give shoppers helpful answers and your team more time.",
        bullets: [
          "A 24/7 assistant that answers product and order questions",
          "Chat & WhatsApp support with human handoff",
          "Trained on your catalog and policies",
          "Workflows that save your team hours every week",
        ],
      },
      {
        n: "03",
        title: "Also building: SaaS, Web & Mobile",
        projectType: "SaaS or web app",
        cta: "Discuss your web app",
        pitch: "",
        bullets: [
          "MVPs built for production",
          "Dashboards, marketplaces and CRMs",
          "Mobile apps with Flutter and React Native",
        ],
      },
    ],
  },
  work: {
    title: "Selected work",
    description:
      "A selection of independent studies of live products. Each one looks at how the experience guides people from first impression to next step.",
    cta: "Explore this study",
  },
  // TODO: Add only verified, publishable results. Empty values are not rendered.
  projectResults: {
    "monica-vinader": "",
    miansai: "",
    gorjana: "",
    "magic-spoon": "",
    spacegoods: "",
    "flare-audio": "",
    away: "",
    ribbo: "",
    legalcentre: "",
  },
  testimonials: {
    title: "What clients say",
    via: "via Upwork",
    // TODO: Add only client-approved, verifiable testimonials. Keep empty entries hidden until complete.
    items: [
      { quote: "", name: "", role: "", company: "" },
      { quote: "", name: "", role: "", company: "" },
      { quote: "", name: "", role: "", company: "" },
    ],
  },
  shop: {
    license: "One end product per purchase. No redistribution or resale.",
    refundPolicy:
      "Refund requests are reviewed case by case. Contact Ayoub to discuss your situation.",
  },
  results: {
    title: "Results",
    items: [
      { value: 11, suffix: "+", label: "Upwork projects delivered" },
      { value: 100, suffix: "%", label: "Job Success on Upwork" },
      { value: 1, suffix: "", label: "enterprise platform merger led" },
      { value: 24, suffix: "h", label: "reply time" },
    ],
  },
  process: {
    title: "Process",
    steps: [
      { n: "01", title: "Discover", text: "Smart questions, clear scope." },
      {
        n: "02",
        title: "Plan",
        text: "Milestones and estimates before any code.",
      },
      {
        n: "03",
        title: "Build",
        text: "Regular updates, clean documented code you own.",
      },
      {
        n: "04",
        title: "Launch & support",
        text: "Help after launch, not just delivery.",
      },
    ],
  },
  stack: {
    line: "Built with Shopify, Next.js, NestJS, Flutter, OpenAI and Claude.",
  },
  review: {
    title: "Get a free store review",
    text: "Send me your store link. Within 48h you get a short video with the top fixes for speed, conversion and trust. Free, no commitment.",
    projectType: "Free store review",
    labels: { storeUrl: "Store URL", email: "Email", goal: "Main goal" },
    placeholders: {
      storeUrl: "https://yourstore.com",
      email: "you@company.com",
      goal: "Select your main goal",
    },
    goals: ["More sales", "Faster store", "Launch", "Other"],
    send: "Get my free review",
    sending: "Sending...",
    sent: "Thanks. Your store review request has been sent.",
    validation: {
      storeUrl: "Enter a valid store URL beginning with https:// or http://.",
      email: "Enter a valid email address.",
      goal: "Choose your main goal.",
      summary: "Check the highlighted fields and try again.",
    },
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How long does a project take?",
        answer:
          "A landing page takes 1–2 weeks, a full Shopify store 3–5 weeks, an AI agent 2–4 weeks. You get a clear timeline before we start.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Most projects range from $1,000 to $8,000+. After a short call, you get a fixed quote with milestones.",
      },
      {
        question: "Can you work on my existing store?",
        answer:
          "Yes. I can redesign, speed up or add features to your current Shopify store without rebuilding from zero.",
      },
      {
        question: "Shopify or a custom build?",
        answer:
          "Shopify for most stores: fast to launch and easy to manage. Custom (headless Next.js) when you need full control or unusual features. I'll recommend what fits.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You get a handover so you can manage everything yourself, plus optional ongoing support for updates, speed and new features.",
      },
      {
        question: "Do you work with clients outside Morocco?",
        answer:
          "Yes. I work with brands in the US, Europe and the Gulf, in English, French or Arabic.",
      },
    ],
  },
  booking: {
    title: "Book a free 15-min call",
    // TODO: Set current monthly availability and update the month.
    spotsLeft: 0,
    month: "November",
    // TODO: Replace with your live Cal.com event URL when ready.
  },
  contact: {
    title: "Contact",
    labels: {
      name: "Name",
      email: "Email",
      projectType: "Project type",
      budget: "Budget range",
      message: "Message",
      website: "Website",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    placeholders: {
      name: "Your name",
      email: "you@company.com",
      projectType: "Select one",
      budget: "Select a range",
      message: "What are you building, and what does success look like?",
    },
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent.",
    sendError: "The message could not be sent. Please try again.",
    connectionError:
      "Could not reach the server. Check your connection and try again.",
    validation: {
      name: "Enter a name between 2 and 100 characters.",
      email: "Enter a valid email address.",
      projectType: "Select a project type.",
      message: "Write a message between 10 and 5,000 characters.",
      summary: "Check the highlighted fields and try again.",
    },
    headline: ["Tell me what", "you're building."],
    text: "Share a little about your project. I’ll review it personally and get back to you within 24 hours with questions and a practical next step. It’s fine if your idea or budget isn’t fully worked out yet.",
    projectTypes: [
      "Shopify store",
      "AI agent",
      "SaaS or web app",
      "Mobile app",
      "Free store review",
      "Other",
    ],
    budgets: ["Not sure yet", "$1,000 – $3,000", "$3,000 – $8,000", "$8,000+"],
    call: "Book a 15-min call",
    upwork: "Upwork",
  },
  footer: {
    copy: "© 2026 Ayoub Wahid · Casablanca, Morocco",
    top: "Back to top",
  },
};
