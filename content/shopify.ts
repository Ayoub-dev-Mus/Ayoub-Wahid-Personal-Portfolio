import type { ContactFormCopy } from "@/components/contact";
import type { ProjectModalLabels } from "@/components/project-modal";

export const shopifyServices = {
  en: [
    "Store setup and launch",
    "Custom Liquid sections",
    "Theme customization",
    "Speed and conversion improvements",
    "COD order forms",
    "Upsells and bundles",
    "Meta, TikTok and Google pixel tracking",
  ],
  fr: [
    "Mise en place et lancement de la boutique",
    "Sections Liquid sur mesure",
    "Personnalisation du thème",
    "Vitesse et parcours d'achat",
    "Formulaires de commande en contre-remboursement",
    "Ventes additionnelles et lots",
    "Suivi des pixels Meta, TikTok et Google",
  ],
};

const projectTypes = {
  en: [
    { value: "Shopify store", label: "Shopify store" },
    { value: "Other", label: "Other" },
  ],
  fr: [
    { value: "Shopify store", label: "Boutique Shopify" },
    { value: "Other", label: "Autre" },
  ],
};

const ranges = {
  en: [
    { value: "Not sure yet", label: "Not sure yet" },
    { value: "$1,000 – $3,000", label: "$1,000 – $3,000" },
    { value: "$3,000 – $8,000", label: "$3,000 – $8,000" },
    { value: "$8,000+", label: "$8,000+" },
  ],
  fr: [
    { value: "Not sure yet", label: "Pas encore fixé" },
    { value: "$1,000 – $3,000", label: "1 000 $ – 3 000 $" },
    { value: "$3,000 – $8,000", label: "3 000 $ – 8 000 $" },
    { value: "$8,000+", label: "8 000 $ et plus" },
  ],
};

export const shopifyForm: Record<"en" | "fr", ContactFormCopy> = {
  en: {
    labels: { name: "Name", email: "Email", projectType: "Project type", budget: "Budget range", message: "Message", website: "Website" },
    placeholders: { name: "Your name", email: "you@company.com", projectType: "Select one", message: "What should the store do better?" },
    projectTypes: projectTypes.en,
    budgets: ranges.en,
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent.",
    sendError: "The message could not be sent. Please try again.",
    connectionError: "Could not reach the server. Check your connection and try again.",
    validation: {
      name: "Enter a name between 2 and 100 characters.",
      email: "Enter a valid email address.",
      projectType: "Select a project type.",
      message: "Write a message between 10 and 5,000 characters.",
      summary: "Check the highlighted fields and try again.",
    },
  },
  fr: {
    labels: { name: "Nom", email: "E-mail", projectType: "Type de projet", budget: "Fourchette", message: "Message", website: "Site web" },
    placeholders: { name: "Votre nom", email: "vous@societe.com", projectType: "Choisir", message: "Que doit mieux faire la boutique ?" },
    projectTypes: projectTypes.fr,
    budgets: ranges.fr,
    send: "Envoyer",
    sending: "Envoi...",
    sent: "Message envoyé.",
    sendError: "Le message n'a pas pu être envoyé. Veuillez réessayer.",
    connectionError: "Le serveur ne répond pas. Vérifiez votre connexion et réessayez.",
    validation: {
      name: "Indiquez un nom de 2 à 100 caractères.",
      email: "Indiquez une adresse e-mail valide.",
      projectType: "Choisissez un type de projet.",
      message: "Écrivez un message de 10 à 5 000 caractères.",
      summary: "Corrigez les champs signalés et réessayez.",
    },
  },
};

export const shopifyModal: Record<"en" | "fr", ProjectModalLabels> = {
  en: {
    close: "Close project details",
    visit: "Visit the live store",
    similar: "Start a project like this",
    role: "My role",
    did: "What I did",
    result: "Result",
    concept: "Concept / redesign",
  },
  fr: {
    close: "Fermer le détail du projet",
    visit: "Voir la boutique en ligne",
    similar: "Démarrer un projet similaire",
    role: "Mon rôle",
    did: "Ce que j'ai fait",
    result: "Résultat",
    concept: "Concept / refonte",
  },
};

export const shopifyCopy = {
  en: {
    metaTitle: "Shopify Developer for Jewelry & Fashion Brands | Ayoub Wahid",
    metaDescription: "Shopify development for jewelry and fashion brands. Store setup, Liquid sections, theme work, speed, and tracking. Casablanca-based, working with UAE and France.",
    switcher: "Language",
    review: "Get a free store review",
    call: "Book a 15-min call",
    heroTitle: "Shopify stores that turn visitors into customers",
    heroSub: "Theme work, speed, and a clearer path to checkout for jewelry and fashion brands.",
    servicesTitle: "What I do for your store",
    workTitle: "Selected Shopify work",
    workCta: "View project",
    processTitle: "How it works",
    packagesTitle: "Packages",
    quote: "Request a quote",
    packages: [
      { id: "launch" as const, title: "Launch", text: "A new Shopify store, set up and ready to take orders." },
      { id: "redesign" as const, title: "Redesign", text: "A clearer theme and a shorter path to checkout on a store you already run." },
      { id: "support" as const, title: "Ongoing support", text: "Monthly help after launch for new sections, fixes, and tracking." },
    ],
    testimonialsTitle: "Clients",
    faqTitle: "Questions",
    faq: [
      { q: "How long does it take?", a: "The first conversation sets the scope. Timing then depends on the theme, the size of the catalogue, and how quickly product content is ready." },
      { q: "What do you need from me?", a: "Access to the Shopify admin, your brand files, and someone who can answer questions about the products." },
      { q: "How do revisions work?", a: "Each milestone includes a review, and the number of rounds is agreed before the work starts." },
      { q: "What happens after launch?", a: "You receive notes for your team at handover. Later changes are arranged on their own." },
    ],
    ctaTitle: "Send the store",
    ctaText: "Share the link and what feels off. I'll reply with the questions that matter and a clear next step.",
    home: "Portfolio",
  },
  fr: {
    metaTitle: "Développeur Shopify pour la joaillerie et la mode | Ayoub Wahid",
    metaDescription: "Développement Shopify pour les maisons de joaillerie et de mode. Mise en place, sections Liquid, thème, vitesse et suivi. Basé à Casablanca, pour les Émirats et la France.",
    switcher: "Langue",
    review: "Obtenir une revue gratuite de la boutique",
    call: "Réserver un appel de 15 minutes",
    heroTitle: "Des boutiques Shopify qui transforment les visites en commandes",
    heroSub: "Thème, vitesse et un chemin plus clair vers le paiement, pour la joaillerie et la mode.",
    servicesTitle: "Ce que je fais pour votre boutique",
    workTitle: "Sélection de boutiques Shopify",
    workCta: "Voir le projet",
    processTitle: "Comment cela se passe",
    packagesTitle: "Formules",
    quote: "Demander un devis",
    packages: [
      { id: "launch" as const, title: "Lancement", text: "Une boutique Shopify neuve, prête à prendre des commandes." },
      { id: "redesign" as const, title: "Refonte", text: "Un thème plus clair et un chemin plus court vers le paiement, sur une boutique déjà en ligne." },
      { id: "support" as const, title: "Suivi continu", text: "Une aide mensuelle après le lancement : nouvelles sections, corrections et suivi." },
    ],
    testimonialsTitle: "Clients",
    faqTitle: "Questions",
    faq: [
      { q: "Quel est le délai ?", a: "Le premier échange fixe le périmètre. Le calendrier dépend ensuite du thème, de la taille du catalogue et de la rapidité avec laquelle les contenus produits sont prêts." },
      { q: "De quoi avez-vous besoin de ma part ?", a: "L'accès à l'admin Shopify, vos fichiers de marque, et une personne qui peut répondre aux questions sur les produits." },
      { q: "Comment se passent les révisions ?", a: "Chaque étape comprend une relecture. Le nombre d'allers-retours est convenu avant de commencer." },
      { q: "Que se passe-t-il après la mise en ligne ?", a: "Vous recevez des notes pour votre équipe au moment de la remise. Les changements suivants se décident à part." },
    ],
    ctaTitle: "Envoyez la boutique",
    ctaText: "Partagez le lien et ce qui vous gêne. Je réponds avec les questions utiles et une suite claire.",
    home: "Portfolio",
  },
};
