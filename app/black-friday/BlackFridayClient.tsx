"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./black-friday.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/* ===== À COMPLÉTER AVANT LA MISE EN LIGNE ===== */
const CONFIG = {
  price: "249", // prix affiché
  currency: "€", // € ou $
  payment: "virement ou lien de paiement",
  slotsLeft: null as number | null,
  instagram: "ayoub___wahid", // sans @, pour https://ig.me/m/ayoub___wahid
  whatsapp: "212663112489", // indicatif + numéro, sans +, pour https://wa.me/212663112489
  email: "contact@wahidayoub.com",
  portfolio: "https://ayoub-wahid-personal-portfolio.vercel.app",
  work: [
    { name: "Monica Vinader" },
    { name: "Miansai" },
    { name: "Gorjana" },
    { name: "Away" },
    { name: "Magic Spoon" },
    { name: "Space Goods" },
  ] as { name: string; img?: string; url?: string; note?: string }[],
  testimonials: [] as { quote: string; name: string; role: string }[],
  endpoint: "/black-friday/send", // Telegram. NEXT_PUBLIC_FORM_ENDPOINT peut remplacer cette adresse.
  photo: "/ayoub-wahid.jpg",
  cutoff: new Date(2026, 10, 13, 23, 59, 59).getTime(), // fin des commandes
};

type Lang = "fr" | "en";
type Lead = {
  name: string;
  shop: string;
  date: string;
  contact: string;
  lang: Lang;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  fbclid: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const L: Record<Lang, any> = {
  fr: {
    bar: "Commandes Black Friday ouvertes jusqu’au 13 novembre",
    navcta: "Mon aperçu gratuit", eyebrow: "Pages d’atterrissage · Boutiques en ligne",
    h1: "Votre page Black Friday, <em>prête en 3 jours.</em>",
    lede: "Une seule page, une seule offre, un bouton d’achat impossible à rater. Je vous montre l’aperçu avant que vous ne payiez quoi que ce soit.",
    cta: "Voir mon aperçu gratuit", ctanote: "Réponse sous 24 h, sans engagement. J’accepte 6 pages maximum avant le 13 novembre.",
    t1: "Livrée en 3 jours", t2: "Pensée pour le téléphone", t3: "Un tour de modifications inclus", t4: "Un lien suffit pour démarrer, je m’occupe du reste",
    chipa: "Aperçu gratuit", chipb: "Prête en 3 jours", chipc: "Compte à rebours réel",
    ph1: "Offrez des bijoux <em>qui durent.</em>", ph2: "Notre collection d’hiver est à -25 % jusqu’au 29 novembre.", ph3: "Découvrir l’offre",
    pr_e: "Mon travail", pr_h: "Des boutiques en ligne, <em>des pages qui vendent.</em>", pr_l: "Projets sur lesquels j’ai travaillé : boutiques de bijoux, de mode et de marques en ligne.", pr_p: "Voir mes réalisations →", pr_note: "Shopify · e-commerce", wa: "Plutôt WhatsApp ?",
    v_e: "Ils en parlent", v_h: "Ce qu’ils en <em>disent.</em>",
    for: "Fonctionne pour :",
    niches: ["Bijoux", "Mode", "Cosmétique", "Déco", "Accessoires", "Épicerie fine"],
    p_e: "Le constat", p_h: "Votre page d’accueil n’est pas <em>une page Black Friday.</em>", p_l: "Elle présente toute la boutique. Pendant le Black Friday, vos visiteurs veulent comprendre l’offre en 3 secondes et commander.",
    p_bl: "Page classique", p_bp: "Trop d’options, offre noyée, bouton d’achat loin sous la ligne de flottaison. Le visiteur hésite, puis part.",
    p_gl: "Page Black Friday", p_gp: "Une promesse claire, une date de fin réelle, un bouton visible. Tout guide vers l’achat.",
    i_e: "Ce que vous recevez", i_h: "Tout ce qu’il faut, <em>rien de superflu.</em>",
    inc: [["1", "Une offre lisible en 3 secondes", "Titre, remise et date de fin au premier écran."], ["2", "Un compte à rebours honnête", "Une vraie date de fin. Jamais de minuteur qui se relance."], ["3", "Pensée pour le téléphone", "La page est conçue d’abord pour le pouce, puis pour l’ordinateur."], ["4", "Un bouton d’achat clair", "Verbe d’action, couleur qui ressort, un seul bouton principal."], ["5", "Les réponses avant la question", "Livraison, retours, paiement : affichés près du bouton."], ["6", "Un tour de modifications", "Vous relisez, je corrige. Mise en ligne avec vous."]],
    s_e: "Comment ça marche", s_h: "Votre page en <em>3 jours.</em>",
    steps: [["Jour 1", "1", "Brief et maquette", "Vous m’envoyez le lien de votre boutique, votre offre et vos textes. Je prépare la maquette."], ["Jour 2", "2", "Construction", "Je construis la page et je la teste sur téléphone et ordinateur."], ["Jour 3", "3", "Retours et mise en ligne", "Vous relisez, je corrige, et on met la page en ligne ensemble."]],
    x_e: "Des styles pour chaque boutique", x_h: "La page prend <em>l’allure de votre marque.</em>", x_l: "Mêmes principes, ambiance différente. Voici trois exemples de pages pour des boutiques fictives.",
    x1: "Bijoux, élégant", x2: "Mode, streetwear", x3: "Beauté, doux", xh1: "Un cadeau qui se garde.",
    o_e: "L’offre", o_h: "Une page Black Friday, <em>clé en main.</em>", o_u: "la page", o_p: "Acompte de 50 % pour démarrer, le solde à la livraison.",
    inclist: ["Aperçu visuel gratuit sous 24 h, avant tout paiement", "Page livrée en 3 jours", "Adaptée au téléphone et à l’ordinateur", "Compte à rebours et bandeau d’offre", "Un tour de modifications", "Mise en ligne avec vous"],
    o_cta: "Je veux mon aperçu →", o_s: "Dernière commande : 13 novembre, pour une mise en ligne avant le 27.",
    payq: "Comment je paie ?", paya: (method: string) => "Facture envoyée avant tout paiement. 50 % à la commande, le solde à la livraison, par " + method + " sécurisé.",
    slots: (n: number) => "Il reste " + n + " places sur 6 avant le 13 novembre",
    a_e: "Qui je suis", a_h: "Ayoub Wahid, <em>développeur et créateur de pages.</em>",
    a_p1: "Je conçois et développe des sites et des boutiques en ligne, notamment pour des marques de bijoux et de mode. Mon travail : des pages claires, rapides et faites pour vendre.",
    a_p2: "Je réponds moi-même à chaque message, sous 24 h. Vous parlez à la personne qui construit votre page.",
    q_e: "Questions", q_h: "Ce que vous vous <em>demandez peut-être.</em>",
    faq: [["Pourquoi un aperçu gratuit ?", "Parce que vous devez voir votre page avant de décider. Si l’idée ne vous plaît pas, vous ne payez rien."], ["Je n’ai pas de site, c’est possible ?", "Oui. La page remplace le lien de votre bio Instagram. Le bouton de commande utilise ce que vous avez déjà : WhatsApp, lien de paiement ou formulaire."], ["Combien de temps pour la page ?", "3 jours après réception de vos textes et images. Pour être en ligne avant le Black Friday du 27, la dernière commande est le 13 novembre."], ["Comment se passe le paiement ?", "50 % à la commande, 50 % à la livraison."], ["Je travaille avec Shopify, ça marche ?", "Oui. La page peut s’intégrer à votre boutique Shopify ou vivre à côté, selon ce qui vous convient."], ["Et si je veux faire modifier la page ensuite ?", "Un tour de modifications est inclus. Ensuite, je vous fais un devis simple pour chaque changement."]],
    c_e: "Prochaine étape", c_h: "Je prépare votre aperçu <em>gratuit.</em>", c_l: "Deux champs, vingt secondes. Un lien et un moyen de vous répondre suffisent.",
    cl: ["Aperçu gratuit, sans engagement", "Réponse sous 24 h", "Livrée en 3 jours si vous l’aimez"],
    f1: "Votre prénom", f2: "Lien de votre boutique ou de votre compte Instagram", f2p: "instagram.com/votre-boutique", f3: "Date de votre promotion", f3p: "ex. 27 novembre", f3s: "Optionnel.", consent: "Vos informations ne servent qu’à vous répondre. Pas de newsletter, pas de revente.", ctrl: "Ayoub Wahid · données utilisées uniquement pour te répondre",     f4: "WhatsApp, e-mail ou Instagram", f4p: "WhatsApp, e-mail ou Instagram", f5: "Recevoir mon aperçu gratuit",
    more: "Ajouter des détails (optionnel)", less: "Masquer les détails", sending: "Envoi…",
    qwa: "WhatsApp", qmail: "E-mail", qig: "Instagram",
    pwa: "+212 6 00 00 00 00", pmail: "vous@email.com", pig: "@votrecompte",
    waMsg: "Bonjour Ayoub, je veux un aperçu gratuit de page Black Friday.",
    e1: "Ajoutez le lien de votre boutique ou de votre compte.", e2: "Ajoutez un WhatsApp, un e-mail ou un Instagram.",
    r1: "Presque terminé !", r2: "Envoyez ce message pour que je reçoive votre demande.", r3: "Copier le message", copied: "Message copié ✓", copyfail: "Sélectionnez le texte ci-dessus et copiez-le.", sent: "Merci, je te réponds sous 24 h sur WhatsApp ou par e-mail.", legal: "Mentions légales", privacy: "Confidentialité",
    msgtpl: (d: Lead) => { return "Bonjour Ayoub, je souhaite recevoir un aperçu gratuit de page Black Friday.\nPrénom : " + d.name + "\nBoutique : " + d.shop + (d.date ? "\nDate de la promo : " + d.date : "") + "\nContact : " + d.contact + "\nLangue : " + d.lang + (d.utm_source ? "\nSource : " + d.utm_source : "") + (d.utm_medium ? "\nSupport : " + d.utm_medium : "") + (d.utm_campaign ? "\nCampagne : " + d.utm_campaign : "") + (d.fbclid ? "\nfbclid : " + d.fbclid : "") + "\nOffre : " + CONFIG.price + " " + CONFIG.currency; },
    lIg: "Ouvrir Instagram", lWa: "Envoyer sur WhatsApp", lMail: "Écrire par email", mailSub: "Aperçu Black Friday", copyBtn: "Copier", copyMailOk: "E-mail copié", copyMailFail: "Copie impossible",
    foot1: "Pages d’atterrissage pour boutiques en ligne", foot2: "Les pages des exemples sont celles de boutiques fictives.",
    stk: "Commandes jusqu’au <b>13 nov.</b>", stkc: "Mon aperçu", cdl: "j", cdd: "jours restants",
    cdj: "j", cdh: "h", cdm: "min", cds: "s"
  },
  en: {
    bar: "Black Friday orders are open until November 13",
    navcta: "My free preview", eyebrow: "Landing pages · Online shops",
    h1: "Your Black Friday page, <em>ready in 3 days.</em>",
    lede: "One page, one offer, one buy button you can’t miss. I show you the preview before you pay anything.",
    cta: "See my free preview", ctanote: "Reply within 24 hours, no commitment. I take 6 pages maximum before November 13.",
    t1: "Delivered in 3 days", t2: "Built for phones", t3: "One revision round included", t4: "A link is enough to start. I handle the rest.",
    chipa: "Free preview", chipb: "Ready in 3 days", chipc: "Real countdown",
    ph1: "Gifts of jewelry <em>that last.</em>", ph2: "Our winter collection is 25% off until November 29.", ph3: "See the offer",
    pr_e: "My work", pr_h: "Online shops, <em>pages that sell.</em>", pr_l: "Projects I have worked on: jewelry, fashion and online brands.", pr_p: "See my work →", pr_note: "Shopify · e-commerce", wa: "Prefer WhatsApp?",
    v_e: "In their words", v_h: "What they <em>say.</em>",
    for: "Works for:",
    niches: ["Jewelry", "Fashion", "Beauty", "Home", "Accessories", "Gourmet food"],
    p_e: "The problem", p_h: "Your homepage is not <em>a Black Friday page.</em>", p_l: "It presents the whole shop. During Black Friday, visitors want to understand the offer in 3 seconds and buy.",
    p_bl: "Regular page", p_bp: "Too many options, the offer is buried, the buy button sits far below the fold. Visitors hesitate, then leave.",
    p_gl: "Black Friday page", p_gp: "One clear promise, a real end date, a visible button. Everything leads to the purchase.",
    i_e: "What you get", i_h: "Everything you need, <em>nothing extra.</em>",
    inc: [["1", "An offer readable in 3 seconds", "Headline, discount and end date on the first screen."], ["2", "An honest countdown", "A real end date. Never a timer that restarts."], ["3", "Built for phones", "Designed first for the thumb, then for the desktop."], ["4", "A clear buy button", "Action verb, standout color, one main button."], ["5", "Answers before the question", "Delivery, returns, payment: shown near the button."], ["6", "One round of changes", "You review, I fix. We go live together."]],
    s_e: "How it works", s_h: "Your page in <em>3 days.</em>",
    steps: [["Day 1", "1", "Brief and mockup", "You send your shop link, your offer and your texts. I prepare the mockup."], ["Day 2", "2", "Build", "I build the page and test it on phone and desktop."], ["Day 3", "3", "Feedback and launch", "You review, I fix, and we put the page live together."]],
    x_e: "A style for every shop", x_h: "The page takes on <em>your brand’s look.</em>", x_l: "Same principles, different mood. Here are three sample pages for fictional shops.",
    x1: "Jewelry, elegant", x2: "Fashion, streetwear", x3: "Beauty, soft", xh1: "A gift made to last.",
    o_e: "The offer", o_h: "A Black Friday page, <em>ready to use.</em>", o_u: "per page", o_p: "50% deposit to start, the rest on delivery.",
    inclist: ["Free visual preview within 24 hours, before any payment", "Page delivered in 3 days", "Works on phone and desktop", "Countdown and offer banner", "One round of changes", "Launched together with you"],
    o_cta: "I want my preview →", o_s: "Last order: November 13, to be live before the 27th.",
    payq: "How do I pay?", paya: () => "Invoice sent before any payment. 50% when you order, the balance on delivery, by bank transfer or a secure payment link.",
    slots: (n: number) => n + " of 6 spots left before November 13",
    a_e: "Who I am", a_h: "Ayoub Wahid, <em>developer and page builder.</em>",
    a_p1: "I design and build websites and online shops, including for jewelry and fashion brands. My work: pages that are clear, fast and made to sell.",
    a_p2: "I answer every message myself, within 24 hours. You talk to the person who builds your page.",
    q_e: "Questions", q_h: "What you might <em>be wondering.</em>",
    faq: [["Why a free preview?", "Because you should see your page before you decide. If you don’t like the idea, you pay nothing."], ["I don’t have a website. Is that possible?", "Yes. The page replaces the link in your Instagram bio. The order button uses what you already have: WhatsApp, a payment link or a form."], ["How long does the page take?", "3 days after I receive your texts and images. To be live before Black Friday on the 27th, the last order is November 13."], ["How does payment work?", "50% when you order, 50% on delivery."], ["I use Shopify. Does it work?", "Yes. The page can plug into your Shopify store or live next to it, whichever suits you."], ["What if I want changes later?", "One round of changes is included. After that, I send a simple quote for each change."]],
    c_e: "Next step", c_h: "I’ll prepare your <em>free preview.</em>", c_l: "Two fields, twenty seconds. A link and a way to reply are enough.",
    cl: ["Free preview, no commitment", "Reply within 24 hours", "Delivered in 3 days if you like it"],
    f1: "Your first name", f2: "Link to your shop or Instagram account", f2p: "instagram.com/your-shop", f3: "Date of your promotion", f3p: "e.g. November 27", f3s: "Optional.", consent: "Your details are only used to reply to you. No newsletter, no resale.", ctrl: "Ayoub Wahid · details used only to reply to you",     f4: "WhatsApp, email or Instagram", f4p: "WhatsApp, email or Instagram", f5: "Get my free preview",
    more: "Add details (optional)", less: "Hide details", sending: "Sending…",
    qwa: "WhatsApp", qmail: "Email", qig: "Instagram",
    pwa: "+212 6 00 00 00 00", pmail: "you@email.com", pig: "@youraccount",
    waMsg: "Hello Ayoub, I would like a free Black Friday page preview.",
    e1: "Add the link to your shop or account.", e2: "Add a WhatsApp, an email or an Instagram.",
    r1: "Almost done!", r2: "Send this message so I receive your request.", r3: "Copy the message", copied: "Message copied ✓", copyfail: "Select the text above and copy it.", sent: "Thanks, I’ll reply within 24 hours on WhatsApp or by email.", legal: "Legal notice", privacy: "Privacy",
    msgtpl: (d: Lead) => { return "Hello Ayoub, I’d like a free Black Friday page preview.\nFirst name: " + d.name + "\nShop: " + d.shop + (d.date ? "\nPromo date: " + d.date : "") + "\nContact: " + d.contact + "\nLanguage: " + d.lang + (d.utm_source ? "\nSource: " + d.utm_source : "") + (d.utm_medium ? "\nMedium: " + d.utm_medium : "") + (d.utm_campaign ? "\nCampaign: " + d.utm_campaign : "") + (d.fbclid ? "\nfbclid: " + d.fbclid : "") + "\nOffer: " + CONFIG.price + " " + CONFIG.currency; },
    lIg: "Open Instagram", lWa: "Send on WhatsApp", lMail: "Write by email", mailSub: "Black Friday preview", copyBtn: "Copy", copyMailOk: "Email copied", copyMailFail: "Couldn’t copy",
    foot1: "Landing pages for online shops", foot2: "The sample pages show fictional shops.",
    stk: "Orders until <b>Nov 13</b>", stkc: "My preview", cdl: "d", cdd: "days left",
    cdj: "d", cdh: "h", cdm: "min", cds: "s"
  }
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatWhatsapp(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("212") && digits.length === 12) {
    return `+212 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return `+${digits}`;
}

type Hint = "" | "wa" | "mail" | "ig";
type FieldErr = "" | "shop" | "contact";
const LEAD_KEY = "bf-lead";

function contactMode(value: string, hint: Hint): "email" | "tel" | "text" {
  const v = value.trim();
  if (v.includes("@") && v.includes(".")) return "email";
  if (/^[\d+\s]+$/.test(v) && /\d/.test(v)) return "tel";
  if (v) return "text";
  if (hint === "mail") return "email";
  if (hint === "wa") return "tel";
  return "text";
}

function revealField(el: HTMLElement | null) {
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
}

export default function BlackFridayClient() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = L[lang];
  const [stuck, setStuck] = useState(false);
  const [utm, setUtm] = useState({ utm_source: "", utm_medium: "", utm_campaign: "", fbclid: "" });
  const [quiet, setQuiet] = useState(false);

  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [hint, setHint] = useState<Hint>("");
  const [details, setDetails] = useState(false);
  const [hErr, setHErr] = useState<FieldErr>("");
  const [mErr, setMErr] = useState<FieldErr>("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ msg: string; sent: boolean } | null>(null);
  const [copied, setCopied] = useState("");
  const [mailNote, setMailNote] = useState("");
  const resRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLPreElement>(null);
  const hShopRef = useRef<HTMLInputElement>(null);
  const hContactRef = useRef<HTMLInputElement>(null);
  const mShopRef = useRef<HTMLInputElement>(null);
  const mContactRef = useRef<HTMLInputElement>(null);
  const sending = useRef(false);
  const skipSave = useRef(true);
  const barRef = useRef<HTMLElement>(null);
  const dRef = useRef<HTMLElement>(null);
  const hRef = useRef<HTMLElement>(null);
  const mRef = useRef<HTMLElement>(null);
  const sRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: (q.get("utm_source") || "").slice(0, 120),
      utm_medium: (q.get("utm_medium") || "").slice(0, 120),
      utm_campaign: (q.get("utm_campaign") || "").slice(0, 120),
      fbclid: (q.get("fbclid") || "").slice(0, 120),
    });
  }, []);

  useEffect(() => {
    const write = (el: HTMLElement | null, value: string) => {
      if (el && el.textContent !== value) el.textContent = value;
    };
    const tick = () => {
      const ms = Math.max(0, CONFIG.cutoff - Date.now());
      const total = Math.floor(ms / 1000);
      const d = Math.floor(total / 86400);
      const h = Math.floor((total % 86400) / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      const closed = lang === "fr" ? "Commandes fermées" : "Orders closed";
      const unit = lang === "fr" ? "j" : "d";
      write(barRef.current, ms === 0 ? ` : ${closed}` : ` : ${d} ${unit} ${pad(h)}:${pad(m)}:${pad(s)}`);
      write(dRef.current, ms === 0 ? "0" : String(d));
      write(hRef.current, pad(h));
      write(mRef.current, pad(m));
      write(sRef.current, pad(s));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lang]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_KEY);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (saved && typeof saved === "object") {
          const row = saved as Record<string, unknown>;
          const text = (key: string) => typeof row[key] === "string" ? row[key] : "";
          setName(text("name"));
          setShop(text("shop"));
          setDate(text("date"));
          setContact(text("contact"));
          if (text("name") || text("date")) setDetails(true);
        }
      }
    } catch { /* private mode */ }
    skipSave.current = false;
  }, []);

  useEffect(() => {
    if (skipSave.current) return;
    try { sessionStorage.setItem(LEAD_KEY, JSON.stringify({ name, shop, date, contact })); } catch { /* private mode */ }
  }, [name, shop, date, contact]);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const seen = { current: false };
    const keys = { current: false };
    let frame = 0;
    const sync = () => {
      const show = window.scrollY > 520 && !seen.current && !keys.current;
      setStuck((prev) => (prev === show ? prev : show));
      const hide = seen.current || keys.current;
      setQuiet((prev) => (prev === hide ? prev : hide));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };
    const io = contact
      ? new IntersectionObserver(([entry]) => {
          seen.current = entry.isIntersecting;
          sync();
        }, { threshold: 0.2 })
      : null;
    if (contact && io) io.observe(contact);
    const vv = window.visualViewport;
    const onViewport = () => {
      keys.current = !!vv && vv.height < window.innerHeight * 0.75;
      sync();
    };
    vv?.addEventListener("resize", onViewport);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      vv?.removeEventListener("resize", onViewport);
      io?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  async function submit(data: Lead, slot: "hero" | "main") {
    if (sending.current) return;
    const setE = slot === "hero" ? setHErr : setMErr;
    const shopEl = slot === "hero" ? hShopRef.current : mShopRef.current;
    const contactEl = slot === "hero" ? hContactRef.current : mContactRef.current;
    if (!data.shop.trim()) {
      setE("shop");
      shopEl?.focus();
      revealField(shopEl);
      return;
    }
    if (!data.contact.trim()) {
      setE("contact");
      contactEl?.focus();
      revealField(contactEl);
      return;
    }
    setE("");
    sending.current = true;
    setBusy(true);
    const msg: string = t.msgtpl(data);
    let sent = false;
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || CONFIG.endpoint;
    if (endpoint) {
      const payload: Record<string, string> = { ...data };
      if (endpoint.includes("web3forms.com")) {
        const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
        if (key) payload.access_key = key;
      }
      try {
        const r = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        sent = r.ok;
      } catch {
        sent = false;
      }
    }
    setResult({ msg, sent });
    try { window.gtag?.("event", "generate_lead"); } catch { /* analytics is optional */ }
    try { window.fbq?.("track", "Lead"); } catch { /* analytics is optional */ }
    sending.current = false;
    setBusy(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => resRef.current?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }), 50);
  }

  const mode = contactMode(contact, hint);
  const contactPlaceholder = !contact.trim() && hint === "wa" ? t.pwa : !contact.trim() && hint === "mail" ? t.pmail : !contact.trim() && hint === "ig" ? t.pig : t.f4p;
  const contactComplete = mode === "email" ? "email" : mode === "tel" ? "tel" : "off";
  const waHref = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t.waMsg)}` : "";
  const igHref = CONFIG.instagram ? `https://ig.me/m/${CONFIG.instagram}` : "";
  const mailHref = CONFIG.email ? `mailto:${CONFIG.email}?subject=${encodeURIComponent(t.mailSub)}&body=${encodeURIComponent(t.waMsg)}` : "";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      setMailNote(t.copyMailOk);
    } catch {
      setMailNote(t.copyMailFail);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result?.msg ?? "");
      setCopied(t.copied);
    } catch {
      if (msgRef.current) {
        const rg = document.createRange();
        rg.selectNodeContents(msgRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(rg);
      }
      setCopied(t.copyfail);
    }
  }

  const enc = encodeURIComponent(result?.msg ?? "");
  const html = (h: string) => ({ __html: h });

  return (
    <div className="bfp smooth" lang={lang}>
      <div className="bar">
        <div className="w">
          <span>{t.bar}</span>
          <b ref={barRef} suppressHydrationWarning />
        </div>
      </div>

      <nav>
        <div className="w">
          <a className="brand" href="#top">
            <span className="ava">
              <Image src={CONFIG.photo} alt={lang === "fr" ? "Photo d’Ayoub Wahid" : "Photo of Ayoub Wahid"} width={76} height={76} sizes="38px" priority />
            </span>
            <span>Ayoub Wahid</span>
          </a>
          <div className="nr">
            <div className="lang" role="group" aria-label="Langue">
              <button type="button" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
            </div>
            <a className="btn sm" href="#contact">{t.navcta}</a>
          </div>
        </div>
      </nav>

      <main>
      <header className="hero" id="top">
        <div className="w">
          <div className="copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 dangerouslySetInnerHTML={html(t.h1)} />
            <p className="lede">{t.lede}</p>
            <form
              className="hform"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                submit({ name, shop, date, contact, lang, ...utm }, "hero");
              }}
            >
              <div className="field">
                <input ref={hShopRef} aria-label={t.f2} type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="next" autoComplete="url" placeholder={t.f2p} value={shop} aria-invalid={hErr === "shop" || undefined} aria-describedby={hErr === "shop" ? "h-shop-err" : undefined} onChange={(e) => setShop(e.target.value)} onFocus={(e) => revealField(e.currentTarget)} />
                {hErr === "shop" && <p id="h-shop-err" className="err" role="alert">{t.e1}</p>}
              </div>
              <div className="field">
                <input ref={hContactRef} aria-label={t.f4} type="text" inputMode={mode} autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="send" autoComplete={contactComplete} placeholder={contactPlaceholder} value={contact} aria-invalid={hErr === "contact" || undefined} aria-describedby={hErr === "contact" ? "h-contact-err" : undefined} onChange={(e) => setContact(e.target.value)} onFocus={(e) => revealField(e.currentTarget)} />
                <div className="quick" role="group" aria-label={t.f4}>
                  <button type="button" aria-pressed={hint === "wa"} onClick={() => setHint("wa")}>{t.qwa}</button>
                  <button type="button" aria-pressed={hint === "mail"} onClick={() => setHint("mail")}>{t.qmail}</button>
                  <button type="button" aria-pressed={hint === "ig"} onClick={() => setHint("ig")}>{t.qig}</button>
                </div>
                {hErr === "contact" && <p id="h-contact-err" className="err" role="alert">{t.e2}</p>}
              </div>
              <button className="btn" type="submit" disabled={busy}>{busy ? t.sending : t.cta}</button>
            </form>
            <p className="hnote">
              {waHref && <a href={waHref} target="_blank" rel="noopener noreferrer">{t.wa}</a>}
              {waHref && " "}
              <span>{t.ctanote}</span>
            </p>
          </div>
          <ul className="trust">
            <li>{t.t1}</li><li>{t.t2}</li><li>{t.t3}</li><li>{t.t4}</li>
          </ul>
          <div className="who">
            <Image src={CONFIG.photo} alt={lang === "fr" ? "Photo d’Ayoub Wahid" : "Photo of Ayoub Wahid"} width={112} height={112} sizes="56px" loading="lazy" />
            <span><b>Ayoub Wahid</b>{lang === "fr" ? "Développeur indépendant · Casablanca. Je réponds moi-même." : "Independent developer · Casablanca. I reply myself."}</span>
          </div>
          <div className="stage" aria-hidden="true">
            <div className="chip a">{t.chipa}</div>
            <div className="chip b">{t.chipb}</div>
            <div className="chip c">{t.chipc}</div>
            <div className="phone">
              <div className="ph-bar">Black Friday · -25 %</div>
              <div className="ph-body">
                <div className="ph-h" dangerouslySetInnerHTML={html(t.ph1)} />
                <div className="ph-p">{t.ph2}</div>
                <div className="ph-cd">
                  <div><b ref={dRef} suppressHydrationWarning>–</b><small>{t.cdj}</small></div>
                  <div><b ref={hRef} suppressHydrationWarning>–</b><small>{t.cdh}</small></div>
                  <div><b ref={mRef} suppressHydrationWarning>–</b><small>{t.cdm}</small></div>
                  <div><b ref={sRef} suppressHydrationWarning>–</b><small>{t.cds}</small></div>
                </div>
                <div className="ph-img">
                  <svg viewBox="0 0 120 120"><circle cx="60" cy="72" r="30" fill="none" stroke="currentColor" strokeWidth="7" /><path d="M60 26 L72 40 L60 50 L48 40 Z" fill="currentColor" /></svg>
                </div>
                <div className="ph-btn">{t.ph3}</div>
                <div className="ph-row">
                  <div><i /><b>89 €</b><s>119 €</s></div>
                  <div><i /><b>69 €</b><s>92 €</s></div>
                </div>
                <div className="ph-foot">Livraison offerte · Retours 30 j</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="niches">
        <div className="w">
          <p className="for">{t.for}</p>
          <div className="row">{t.niches.map((n: string) => <span key={n}>{n}</span>)}</div>
        </div>
      </div>

      <section className="sec" id="proof">
        <div className="w">
          <header>
            <p className="eyebrow">{t.pr_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.pr_h)} />
            <p className="lede">{t.pr_l}</p>
          </header>
          <div className="work">
            {CONFIG.work.map((item) => {
              const body = (
                <>
                  {item.img ? (
                    <span className="shot">
                      <Image src={item.img} alt={item.name} fill sizes="(max-width: 860px) 100vw, 360px" loading="lazy" />
                    </span>
                  ) : null}
                  {item.name}
                  <span>{item.note || t.pr_note}</span>
                </>
              );
              return item.url ? (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">{body}</a>
              ) : (
                <div key={item.name}>{body}</div>
              );
            })}
          </div>
          {CONFIG.portfolio && (
            <p style={{ marginTop: 26 }}>
              <a className="btn ghost sm" href={CONFIG.portfolio} target="_blank" rel="noopener noreferrer">{t.pr_p}</a>
            </p>
          )}
        </div>
      </section>

      {CONFIG.testimonials.length > 0 && (
        <section className="sec" aria-label={t.v_e}>
          <div className="w">
            <header>
              <p className="eyebrow">{t.v_e}</p>
              <h2 dangerouslySetInnerHTML={html(t.v_h)} />
            </header>
            <div className="quotes">
              {CONFIG.testimonials.map((item) => (
                <blockquote key={`${item.name}-${item.quote}`}>
                  <p>{item.quote}</p>
                  <footer><b>{item.name}</b><span>{item.role}</span></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="w">
          <header>
            <p className="eyebrow">{t.p_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.p_h)} />
            <p className="lede">{t.p_l}</p>
          </header>
          <div className="cmp">
            <div className="pg bad">
              <span className="lab">{t.p_bl}</span>
              <div className="wf"><i className="s" /><i /><i /><i /><i /><i className="s" /></div>
              <p>{t.p_bp}</p>
            </div>
            <div className="pg good">
              <span className="lab">{t.p_gl}</span>
              <div className="wf"><i className="s" /><i className="h" /><i className="s" /><i className="b" /><i /></div>
              <p>{t.p_gp}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <header>
            <p className="eyebrow">{t.i_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.i_h)} />
          </header>
          <div className="grid3">
            {t.inc.map((c: string[]) => (
              <div className="card" key={c[0]}>
                <div className="ic">{c[0]}</div>
                <h3>{c[1]}</h3>
                <p>{c[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <header>
            <p className="eyebrow">{t.s_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.s_h)} />
          </header>
          <div className="steps">
            {t.steps.map((s: string[], i: number) => (
              <div className={`step${i === 2 ? " last" : ""}`} key={s[1]}>
                <span className="d">{s[0]}</span>
                <span className="n">{s[1]}</span>
                <h3>{s[2]}</h3>
                <p>{s[3]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <header>
            <p className="eyebrow">{t.x_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.x_h)} />
            <p className="lede">{t.x_l}</p>
          </header>
          <div className="mini">
            <div className="mc" style={{ background: "#F6EBD3" }}>
              <div className="scr">
                <div className="b" style={{ background: "#2A2118", color: "#F6E7C4" }}>Black Friday · -25 %</div>
                <p className="mh" style={{ fontFamily: "Georgia,serif", fontWeight: 600 }}>{t.xh1}</p>
                <div className="r" style={{ background: "#F2E9DB" }} /><div className="p" /><div className="q" style={{ background: "#B8893B" }} />
              </div>
              <div className="cap">{t.x1}</div>
            </div>
            <div className="mc" style={{ background: "#E6E6DF" }}>
              <div className="scr">
                <div className="b" style={{ background: "#0D0D0D", color: "#E8FF3A" }}>Drop Black Friday</div>
                <p className="mh" style={{ textTransform: "uppercase", fontWeight: 900 }}>Le drop est là.</p>
                <div className="r" style={{ background: "#E6E6DF" }} /><div className="p" /><div className="q" style={{ background: "#0D0D0D", borderRadius: 0 }} />
              </div>
              <div className="cap">{t.x2}</div>
            </div>
            <div className="mc" style={{ background: "#FCE4E0" }}>
              <div className="scr">
                <div className="b" style={{ background: "#C2475F", color: "#fff" }}>-25 % + soin offert</div>
                <p className="mh" style={{ fontFamily: "Georgia,serif", fontWeight: 400 }}>Votre routine, plus douce.</p>
                <div className="r" style={{ background: "#FCE4E0", borderRadius: "40px 40px 10px 10px" }} /><div className="p" /><div className="q" style={{ background: "#C2475F" }} />
              </div>
              <div className="cap">{t.x3}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <div className="offer">
            <div className="l">
              <p className="eyebrow" style={{ color: "#B9C4D6" }}>{t.o_e}</p>
              <h2 dangerouslySetInnerHTML={html(t.o_h)} />
              <div className="price"><span>{CONFIG.price} {CONFIG.currency}</span><small>{t.o_u}</small></div>
              <p className="sm">{t.o_p}</p>
              <p className="sm">{t.paya(CONFIG.payment)}</p>
            </div>
            <div>
              <ul>{t.inclist.map((x: string) => <li key={x}>{x}</li>)}</ul>
              <a className="btn" href="#contact">{t.o_cta}</a>
              <p className="sm">{t.o_s}</p>
              {typeof CONFIG.slotsLeft === "number" && <p className="sm">{t.slots(CONFIG.slotsLeft)}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w about">
          <div className="av"><Image src={CONFIG.photo} alt={lang === "fr" ? "Portrait d’Ayoub Wahid, développeur à Casablanca" : "Portrait of Ayoub Wahid, developer in Casablanca"} width={440} height={440} sizes="(max-width: 860px) 150px, 220px" loading="lazy" /></div>
          <div>
            <p className="eyebrow">{t.a_e}</p>
            <h2 style={{ margin: "12px 0 22px" }} dangerouslySetInnerHTML={html(t.a_h)} />
            <p>{t.a_p1}</p>
            <p>{t.a_p2}</p>
            {igHref && <p><a href={igHref} target="_blank" rel="noopener noreferrer">@{CONFIG.instagram}</a></p>}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <header>
            <p className="eyebrow">{t.q_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.q_h)} />
          </header>
          <div className="faq">
            {[...t.faq, [t.payq, t.paya(CONFIG.payment)]].map((f: string[]) => (
              <details key={f[0]}><summary>{f[0]}</summary><p>{f[1]}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="w">
          <div>
            <p className="eyebrow" style={{ color: "#4A3A00" }}>{t.c_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.c_h)} />
            <p className="lede">{t.c_l}</p>
            <ul>{t.cl.map((x: string) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            {!result && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submit({ name, shop, date, contact, lang, ...utm }, "main");
                }}
              >
                <div className="f field">
                  <label htmlFor="f-shop">{t.f2}</label>
                  <input ref={mShopRef} id="f-shop" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="next" autoComplete="url" placeholder={t.f2p} value={shop} aria-invalid={mErr === "shop" || undefined} aria-describedby={mErr === "shop" ? "m-shop-err" : undefined} onChange={(e) => setShop(e.target.value)} onFocus={(e) => revealField(e.currentTarget)} />
                  {mErr === "shop" && <p id="m-shop-err" className="err" role="alert">{t.e1}</p>}
                </div>
                <div className="f field">
                  <label htmlFor="f-contact">{t.f4}</label>
                  <input ref={mContactRef} id="f-contact" type="text" inputMode={mode} autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="send" autoComplete={contactComplete} placeholder={contactPlaceholder} value={contact} aria-invalid={mErr === "contact" || undefined} aria-describedby={mErr === "contact" ? "m-contact-err" : undefined} onChange={(e) => setContact(e.target.value)} onFocus={(e) => revealField(e.currentTarget)} />
                  <div className="quick" role="group" aria-label={t.f4}>
                    <button type="button" aria-pressed={hint === "wa"} onClick={() => setHint("wa")}>{t.qwa}</button>
                    <button type="button" aria-pressed={hint === "mail"} onClick={() => setHint("mail")}>{t.qmail}</button>
                    <button type="button" aria-pressed={hint === "ig"} onClick={() => setHint("ig")}>{t.qig}</button>
                  </div>
                  {mErr === "contact" && <p id="m-contact-err" className="err" role="alert">{t.e2}</p>}
                </div>
                <button className="more" type="button" aria-expanded={details} onClick={() => setDetails((open) => !open)}>{details ? t.less : t.more}</button>
                {details && (
                  <>
                    <div className="f"><label htmlFor="f-name">{t.f1}</label><input id="f-name" autoComplete="given-name" enterKeyHint="next" value={name} onChange={(e) => setName(e.target.value)} onFocus={(e) => revealField(e.currentTarget)} /></div>
                    <div className="f"><label htmlFor="f-date">{t.f3}</label><input id="f-date" autoComplete="off" enterKeyHint="next" placeholder={t.f3p} value={date} onChange={(e) => setDate(e.target.value)} onFocus={(e) => revealField(e.currentTarget)} /><small>{t.f3s}</small></div>
                  </>
                )}
                <button className="btn" type="submit" disabled={busy}>{busy ? t.sending : t.f5}</button>
                <p className="consent">{t.consent}</p>
                <p className="consent">{t.ctrl}</p>
              </form>
            )}
            {result && (
              <div className="res" ref={resRef}>
                <h3 style={{ fontSize: 28 }}>{result.sent ? t.sent : t.r1}</h3>
                {!result.sent && <p>{t.r2}</p>}
                <pre ref={msgRef}>{result.msg}</pre>
                {!result.sent && (
                  <div className="row">
                    <button className="btn sm" type="button" onClick={copy}>{t.r3}</button>
                    {CONFIG.instagram && <a className="btn sm ghost" href={`https://ig.me/m/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer">{t.lIg}</a>}
                    {CONFIG.whatsapp && <a className="btn sm ghost" href={`https://wa.me/${CONFIG.whatsapp}?text=${enc}`} target="_blank" rel="noopener noreferrer">{t.lWa}</a>}
                    {CONFIG.email && <a className="btn sm ghost" href={`mailto:${CONFIG.email}?subject=${encodeURIComponent(t.mailSub)}&body=${enc}`} target="_blank" rel="noopener noreferrer">{t.lMail}</a>}
                  </div>
                )}
                {copied && <p className="sm" style={{ fontWeight: 600 }}>{copied}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="w">
          <span>© 2026 Ayoub Wahid · {t.foot1}</span>
          <span>{t.foot2}</span>
          {igHref && <span><a href={igHref} target="_blank" rel="noopener noreferrer">@{CONFIG.instagram}</a></span>}
          {waHref && <span><a href={waHref} target="_blank" rel="noopener noreferrer">{formatWhatsapp(CONFIG.whatsapp)}</a></span>}
          <span className="legal"><a href="/mentions-legales">{t.legal}</a><a href="/confidentialite">{t.privacy}</a></span>
          {CONFIG.email && (
            <span className="reach">
              <a href={mailHref} target="_blank" rel="noopener noreferrer">{CONFIG.email}</a>
              <button className="copy" type="button" onClick={copyEmail}>{t.copyBtn}</button>
              {mailNote && <span role="status">{mailNote}</span>}
            </span>
          )}
        </div>
      </footer>
      </main>

      {waHref && (
        <a className={`wafloat${quiet ? " off" : ""}`} href={waHref} target="_blank" rel="noopener noreferrer" aria-label={t.wa}>
          <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7 15.16h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" /></svg>
        </a>
      )}
      <div className={`stick${stuck ? " on" : ""}`}>
        <span dangerouslySetInnerHTML={html(t.stk)} />
        <a className="btn sm" href="#contact">{t.stkc}</a>
      </div>
    </div>
  );
}
