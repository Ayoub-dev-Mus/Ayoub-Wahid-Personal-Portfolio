"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import "./black-friday.css";

/* ===== À COMPLÉTER AVANT LA MISE EN LIGNE ===== */
const CONFIG = {
  price: "249", // prix affiché
  currency: "€", // € ou $
  instagram: "", // ex: "ayoub.pages" (sans @)
  whatsapp: "", // ex: "212600000000" (indicatif + numéro, sans +)
  email: "contact@wahidayoub.com",
  portfolio: "https://ayoub-wahid-personal-portfolio.vercel.app",
  work: ["Monica Vinader", "Miansai", "Gorjana", "Away", "Magic Spoon", "Space Goods"], // vérifie que tu peux les citer
  endpoint: "/black-friday/send", // POST JSON. Vide = message à copier.
  photo: "/ayoub-wahid.jpg",
  cutoff: new Date(2026, 10, 13, 23, 59, 59).getTime(), // fin des commandes
};

type Lang = "fr" | "en";
type Lead = { name: string; shop: string; date: string; contact: string; lang: Lang };

/* eslint-disable @typescript-eslint/no-explicit-any */
const L: Record<Lang, any> = {
  fr: {
    bar: "Commandes Black Friday ouvertes jusqu’au 13 novembre :",
    navcta: "Mon aperçu gratuit", eyebrow: "Pages d’atterrissage · Boutiques en ligne",
    h1: "Votre page Black Friday, <em>prête en 3 jours.</em>",
    lede: "Une seule page, une seule offre, un bouton d’achat impossible à rater. Je vous montre l’aperçu avant que vous ne payiez quoi que ce soit.",
    cta: "Voir mon aperçu gratuit", ctanote: "Réponse sous 24 h, sans engagement. J’accepte 6 pages maximum avant le 13 novembre.",
    t1: "Livrée en 3 jours", t2: "Pensée pour le téléphone", t3: "Un tour de modifications inclus", t4: "Rien à préparer : un lien suffit",
    chipa: "Aperçu gratuit", chipb: "Prête en 3 jours", chipc: "Compte à rebours réel",
    ph1: "Offrez des bijoux <em>qui durent.</em>", ph2: "Notre collection d’hiver est à -25 % jusqu’au 29 novembre.", ph3: "Découvrir l’offre",
    pr_e: "Mon travail", pr_h: "Des boutiques en ligne, <em>des pages qui vendent.</em>", pr_l: "Projets sur lesquels j’ai travaillé : boutiques de bijoux, de mode et de marques en ligne.", pr_p: "Voir mes réalisations →", wa: "Plutôt WhatsApp ?",
    niches: ["Bijoux", "Mode", "Cosmétique", "Déco", "Accessoires", "Épicerie fine"],
    p_e: "Le constat", p_h: "Votre page d’accueil n’est pas <em>une page Black Friday.</em>", p_l: "Elle présente toute la boutique. Pendant le Black Friday, vos visiteurs veulent comprendre l’offre en 3 secondes et commander.",
    p_bl: "Page classique", p_bp: "Trop d’options, offre noyée, bouton d’achat loin sous la ligne de flottaison. Le visiteur hésite, puis part.",
    p_gl: "Page Black Friday", p_gp: "Une promesse claire, une date de fin réelle, un bouton visible. Tout guide vers l’achat.",
    i_e: "Ce que vous recevez", i_h: "Tout ce qu’il faut, <em>rien de superflu.</em>",
    inc: [["1", "Une offre lisible en 3 secondes", "Titre, remise et date de fin au premier écran."], ["2", "Un compte à rebours honnête", "Une vraie date de fin. Jamais de minuteur qui se relance."], ["3", "Pensée pour le téléphone", "La page est conçue d’abord pour le pouce, puis pour l’ordinateur."], ["4", "Un bouton d’achat clair", "Verbe d’action, couleur qui ressort, un seul bouton principal."], ["5", "Les réponses avant la question", "Livraison, retours, paiement : affichés près du bouton."], ["6", "Un tour de modifications", "Vous relisez, je corrige. Mise en ligne avec vous."]],
    s_e: "Comment ça marche", s_h: "Votre page en <em>3 jours.</em>",
    steps: [["Jour 1", "1", "Brief et maquette", "Vous m’envoyez le lien de votre boutique, votre offre et vos textes. Je prépare la maquette."], ["Jour 2", "2", "Construction", "Je construis la page et je la teste sur téléphone et ordinateur."], ["Jour 3", "3", "Retours et mise en ligne", "Vous relisez, je corrige, et on met la page en ligne ensemble."]],
    x_e: "Des styles pour chaque boutique", x_h: "La page prend <em>l’allure de votre marque.</em>", x_l: "Mêmes principes, ambiance différente. Voici trois exemples de pages pour des boutiques fictives.",
    x1: "Bijoux, élégant", x2: "Mode, streetwear", x3: "Beauté, doux",
    o_e: "L’offre", o_h: "Une page Black Friday, <em>clé en main.</em>", o_u: "la page", o_p: "Acompte de 50 % pour démarrer, le solde à la livraison.",
    inclist: ["Aperçu visuel gratuit sous 24 h, avant tout paiement", "Page livrée en 3 jours", "Adaptée au téléphone et à l’ordinateur", "Compte à rebours et bandeau d’offre", "Un tour de modifications", "Mise en ligne avec vous"],
    o_cta: "Je veux mon aperçu →", o_s: "Dernière commande : 13 novembre, pour une mise en ligne avant le 27.",
    a_e: "Qui je suis", a_h: "Ayoub Wahid, <em>développeur et créateur de pages.</em>",
    a_p1: "Je conçois et développe des sites et des boutiques en ligne, notamment pour des marques de bijoux et de mode. Mon travail : des pages claires, rapides et faites pour vendre.",
    a_p2: "Je réponds moi-même à chaque message, en moins d’une heure. Vous parlez à la personne qui construit votre page.",
    q_e: "Questions", q_h: "Ce que vous vous <em>demandez peut-être.</em>",
    faq: [["Pourquoi un aperçu gratuit ?", "Parce que vous devez voir votre page avant de décider. Si l’idée ne vous plaît pas, vous ne payez rien."], ["Je n’ai pas de site, c’est possible ?", "Oui. La page remplace le lien de votre bio Instagram. Le bouton de commande utilise ce que vous avez déjà : WhatsApp, lien de paiement ou formulaire."], ["Combien de temps pour la page ?", "3 jours après réception de vos textes et images. Pour être en ligne avant le Black Friday du 27, la dernière commande est le 13 novembre."], ["Comment se passe le paiement ?", "50 % à la commande, 50 % à la livraison."], ["Je travaille avec Shopify, ça marche ?", "Oui. La page peut s’intégrer à votre boutique Shopify ou vivre à côté, selon ce qui vous convient."], ["Et si je veux faire modifier la page ensuite ?", "Un tour de modifications est inclus. Ensuite, je vous fais un devis simple pour chaque changement."]],
    c_e: "Prochaine étape", c_h: "Je prépare votre aperçu <em>gratuit.</em>", c_l: "Quatre champs, trente secondes. Je vous réponds sous 24 h avec une idée visuelle pour votre boutique.",
    cl: ["Aperçu gratuit, sans engagement", "Réponse sous 24 h", "Livrée en 3 jours si vous l’aimez"],
    f1: "Votre prénom", f2: "Lien de votre boutique ou de votre compte Instagram", f2p: "instagram.com/votre-boutique", f3: "Date de votre promotion", f3p: "ex. 27 novembre", f3s: "Optionnel.", consent: "Vos informations ne servent qu’à vous répondre. Pas de newsletter, pas de revente.", f4: "WhatsApp ou email", f4p: "Comment je vous réponds ?", f5: "Recevoir mon aperçu gratuit",
    e1: "Ajoutez le lien de votre boutique ou de votre compte.", e2: "Ajoutez un WhatsApp ou un email pour que je puisse vous répondre.",
    r1: "Presque terminé !", r2: "Envoyez ce message pour que je reçoive votre demande.", r3: "Copier le message", copied: "Message copié ✓", copyfail: "Sélectionnez le texte ci-dessus et copiez-le.", sent: "Demande envoyée ✓ Je vous réponds sous 24 h.",
    msgtpl: (d: Lead) => { return "Bonjour Ayoub, je souhaite recevoir un aperçu gratuit de page Black Friday.\nPrénom : " + d.name + "\nBoutique : " + d.shop + (d.date ? "\nDate de la promo : " + d.date : "") + "\nContact : " + d.contact; },
    lIg: "Ouvrir Instagram", lWa: "Envoyer sur WhatsApp", lMail: "Écrire par email",
    foot1: "Pages d’atterrissage pour boutiques en ligne", foot2: "Les pages des exemples sont celles de boutiques fictives.",
    stk: "Commandes jusqu’au <b>13 nov.</b>", stkc: "Mon aperçu", cdl: "j", cdd: "jours restants"
  },
  en: {
    bar: "Black Friday orders are open until November 13:",
    navcta: "My free preview", eyebrow: "Landing pages · Online shops",
    h1: "Your Black Friday page, <em>ready in 3 days.</em>",
    lede: "One page, one offer, one buy button you can’t miss. I show you the preview before you pay anything.",
    cta: "See my free preview", ctanote: "Reply within 24 hours, no commitment. I take 6 pages maximum before November 13.",
    t1: "Delivered in 3 days", t2: "Built for phones", t3: "One revision round included", t4: "Nothing to prepare: one link is enough",
    chipa: "Free preview", chipb: "Ready in 3 days", chipc: "Real countdown",
    ph1: "Gifts of jewelry <em>that last.</em>", ph2: "Our winter collection is 25% off until November 29.", ph3: "See the offer",
    pr_e: "My work", pr_h: "Online shops, <em>pages that sell.</em>", pr_l: "Projects I have worked on: jewelry, fashion and online brands.", pr_p: "See my work →", wa: "Prefer WhatsApp?",
    niches: ["Jewelry", "Fashion", "Beauty", "Home", "Accessories", "Gourmet food"],
    p_e: "The problem", p_h: "Your homepage is not <em>a Black Friday page.</em>", p_l: "It presents the whole shop. During Black Friday, visitors want to understand the offer in 3 seconds and buy.",
    p_bl: "Regular page", p_bp: "Too many options, the offer is buried, the buy button sits far below the fold. Visitors hesitate, then leave.",
    p_gl: "Black Friday page", p_gp: "One clear promise, a real end date, a visible button. Everything leads to the purchase.",
    i_e: "What you get", i_h: "Everything you need, <em>nothing extra.</em>",
    inc: [["1", "An offer readable in 3 seconds", "Headline, discount and end date on the first screen."], ["2", "An honest countdown", "A real end date. Never a timer that restarts."], ["3", "Built for phones", "Designed first for the thumb, then for the desktop."], ["4", "A clear buy button", "Action verb, standout color, one main button."], ["5", "Answers before the question", "Delivery, returns, payment: shown near the button."], ["6", "One round of changes", "You review, I fix. We go live together."]],
    s_e: "How it works", s_h: "Your page in <em>3 days.</em>",
    steps: [["Day 1", "1", "Brief and mockup", "You send your shop link, your offer and your texts. I prepare the mockup."], ["Day 2", "2", "Build", "I build the page and test it on phone and desktop."], ["Day 3", "3", "Feedback and launch", "You review, I fix, and we put the page live together."]],
    x_e: "A style for every shop", x_h: "The page takes on <em>your brand’s look.</em>", x_l: "Same principles, different mood. Here are three sample pages for fictional shops.",
    x1: "Jewelry, elegant", x2: "Fashion, streetwear", x3: "Beauty, soft",
    o_e: "The offer", o_h: "A Black Friday page, <em>ready to use.</em>", o_u: "per page", o_p: "50% deposit to start, the rest on delivery.",
    inclist: ["Free visual preview within 24 hours, before any payment", "Page delivered in 3 days", "Works on phone and desktop", "Countdown and offer banner", "One round of changes", "Launched together with you"],
    o_cta: "I want my preview →", o_s: "Last order: November 13, to be live before the 27th.",
    a_e: "Who I am", a_h: "Ayoub Wahid, <em>developer and page builder.</em>",
    a_p1: "I design and build websites and online shops, including for jewelry and fashion brands. My work: pages that are clear, fast and made to sell.",
    a_p2: "I answer every message myself, within an hour. You talk to the person who builds your page.",
    q_e: "Questions", q_h: "What you might <em>be wondering.</em>",
    faq: [["Why a free preview?", "Because you should see your page before you decide. If you don’t like the idea, you pay nothing."], ["I don’t have a website. Is that possible?", "Yes. The page replaces the link in your Instagram bio. The order button uses what you already have: WhatsApp, a payment link or a form."], ["How long does the page take?", "3 days after I receive your texts and images. To be live before Black Friday on the 27th, the last order is November 13."], ["How does payment work?", "50% when you order, 50% on delivery."], ["I use Shopify. Does it work?", "Yes. The page can plug into your Shopify store or live next to it, whichever suits you."], ["What if I want changes later?", "One round of changes is included. After that, I send a simple quote for each change."]],
    c_e: "Next step", c_h: "I’ll prepare your <em>free preview.</em>", c_l: "Four fields, thirty seconds. I reply within 24 hours with a visual idea for your shop.",
    cl: ["Free preview, no commitment", "Reply within 24 hours", "Delivered in 3 days if you like it"],
    f1: "Your first name", f2: "Link to your shop or Instagram account", f2p: "instagram.com/your-shop", f3: "Date of your promotion", f3p: "e.g. November 27", f3s: "Optional.", consent: "Your details are only used to reply to you. No newsletter, no resale.", f4: "WhatsApp or email", f4p: "How should I reply?", f5: "Get my free preview",
    e1: "Add the link to your shop or account.", e2: "Add a WhatsApp or an email so I can reply.",
    r1: "Almost done!", r2: "Send this message so I receive your request.", r3: "Copy the message", copied: "Message copied ✓", copyfail: "Select the text above and copy it.", sent: "Request sent ✓ I’ll reply within 24 hours.",
    msgtpl: (d: Lead) => { return "Hello Ayoub, I’d like a free Black Friday page preview.\nFirst name: " + d.name + "\nShop: " + d.shop + (d.date ? "\nPromo date: " + d.date : "") + "\nContact: " + d.contact; },
    lIg: "Open Instagram", lWa: "Send on WhatsApp", lMail: "Write by email",
    foot1: "Landing pages for online shops", foot2: "The sample pages show fictional shops.",
    stk: "Orders until <b>Nov 13</b>", stkc: "My preview", cdl: "d", cdd: "days left"
  }
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function BlackFridayClient() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = L[lang];
  const [now, setNow] = useState<number | null>(null);
  const [stuck, setStuck] = useState(false);

  const [hShop, setHShop] = useState("");
  const [hContact, setHContact] = useState("");
  const [hErr, setHErr] = useState("");
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [err, setErr] = useState("");
  const [result, setResult] = useState<{ msg: string; sent: boolean } | null>(null);
  const [copied, setCopied] = useState("");
  const resRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const countdown = useMemo(() => {
    if (now === null) return "";
    const ms = Math.max(0, CONFIG.cutoff - now);
    if (!ms) return lang === "fr" ? "Commandes fermées" : "Orders closed";
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${d} ${lang === "fr" ? "j" : "d"} ${pad(h)}:${pad(m)}:${pad(s % 60)}`;
  }, [now, lang]);

  async function submit(data: Lead, slot: "hero" | "main") {
    const setE = slot === "hero" ? setHErr : setErr;
    if (!data.shop.trim()) return setE(t.e1);
    if (!data.contact.trim()) return setE(t.e2);
    setE("");
    setShop(data.shop);
    setContact(data.contact);
    const msg: string = t.msgtpl(data);
    let sent = false;
    if (CONFIG.endpoint) {
      try {
        const r = await fetch(CONFIG.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        sent = r.ok;
      } catch {
        sent = false;
      }
    }
    setResult({ msg, sent });
    setTimeout(() => resRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
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
          <b suppressHydrationWarning>{countdown}</b>
        </div>
      </div>

      <nav>
        <div className="w">
          <a className="brand" href="#top">
            <span className="ava">
              <Image src={CONFIG.photo} alt="" width={76} height={76} />
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

      <header className="hero" id="top">
        <div className="w">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 dangerouslySetInnerHTML={html(t.h1)} />
            <p className="lede">{t.lede}</p>
            <form
              className="hform"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                submit({ name, shop: hShop, date, contact: hContact, lang }, "hero");
              }}
            >
              <input aria-label="shop" inputMode="url" autoComplete="off" placeholder={t.f2p} value={hShop} onChange={(e) => setHShop(e.target.value)} />
              <input aria-label="contact" autoComplete="off" placeholder={t.f4p} value={hContact} onChange={(e) => setHContact(e.target.value)} />
              <button className="btn" type="submit">{t.cta}</button>
            </form>
            <p className="err" role="alert">{hErr}</p>
            <p className="hnote">
              <span>{t.ctanote}</span>{" "}
              {CONFIG.whatsapp && (
                <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">{t.wa}</a>
              )}
            </p>
            <ul className="trust">
              <li>{t.t1}</li><li>{t.t2}</li><li>{t.t3}</li><li>{t.t4}</li>
            </ul>
            <div className="who">
              <Image src={CONFIG.photo} alt="Ayoub Wahid" width={112} height={112} />
              <span><b>Ayoub Wahid</b>{lang === "fr" ? "Développeur indépendant · Casablanca. Je réponds moi-même." : "Independent developer · Casablanca. I reply myself."}</span>
            </div>
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
                  <div>12<small>j</small></div><div>08<small>h</small></div><div>41<small>min</small></div><div>06<small>s</small></div>
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
        <div className="w">{t.niches.map((n: string) => <span key={n}>{n}</span>)}</div>
      </div>

      <section className="sec" id="proof">
        <div className="w">
          <header>
            <p className="eyebrow">{t.pr_e}</p>
            <h2 dangerouslySetInnerHTML={html(t.pr_h)} />
            <p className="lede">{t.pr_l}</p>
          </header>
          <div className="work">
            {CONFIG.work.map((n) => (
              <div key={n}>{n}<span>Shopify · e-commerce</span></div>
            ))}
          </div>
          {CONFIG.portfolio && (
            <p style={{ marginTop: 26 }}>
              <a className="btn ghost sm" href={CONFIG.portfolio} target="_blank" rel="noopener noreferrer">{t.pr_p}</a>
            </p>
          )}
        </div>
      </section>

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
                <h4 style={{ fontFamily: "Georgia,serif", fontWeight: 600 }}>Offrez des bijoux qui durent.</h4>
                <div className="r" style={{ background: "#F2E9DB" }} /><div className="p" /><div className="q" style={{ background: "#B8893B" }} />
              </div>
              <div className="cap">{t.x1}</div>
            </div>
            <div className="mc" style={{ background: "#E6E6DF" }}>
              <div className="scr">
                <div className="b" style={{ background: "#0D0D0D", color: "#E8FF3A" }}>Drop Black Friday</div>
                <h4 style={{ textTransform: "uppercase", fontWeight: 900 }}>Le drop est là.</h4>
                <div className="r" style={{ background: "#E6E6DF" }} /><div className="p" /><div className="q" style={{ background: "#0D0D0D", borderRadius: 0 }} />
              </div>
              <div className="cap">{t.x2}</div>
            </div>
            <div className="mc" style={{ background: "#FCE4E0" }}>
              <div className="scr">
                <div className="b" style={{ background: "#C2475F", color: "#fff" }}>-25 % + soin offert</div>
                <h4 style={{ fontFamily: "Georgia,serif", fontWeight: 400 }}>Votre routine, plus douce.</h4>
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
            </div>
            <div>
              <ul>{t.inclist.map((x: string) => <li key={x}>{x}</li>)}</ul>
              <a className="btn" href="#contact">{t.o_cta}</a>
              <p className="sm">{t.o_s}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w about">
          <div className="av"><Image src={CONFIG.photo} alt="Ayoub Wahid" width={440} height={440} /></div>
          <div>
            <p className="eyebrow">{t.a_e}</p>
            <h2 style={{ margin: "12px 0 22px" }} dangerouslySetInnerHTML={html(t.a_h)} />
            <p>{t.a_p1}</p>
            <p>{t.a_p2}</p>
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
            {t.faq.map((f: string[]) => (
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
                  submit({ name, shop, date, contact, lang }, "main");
                }}
              >
                <div className="f"><label htmlFor="f-name">{t.f1}</label><input id="f-name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="f"><label htmlFor="f-shop">{t.f2}</label><input id="f-shop" inputMode="url" autoComplete="off" placeholder={t.f2p} value={shop} onChange={(e) => setShop(e.target.value)} /></div>
                <div className="f"><label htmlFor="f-date">{t.f3}</label><input id="f-date" autoComplete="off" placeholder={t.f3p} value={date} onChange={(e) => setDate(e.target.value)} /><small>{t.f3s}</small></div>
                <div className="f"><label htmlFor="f-contact">{t.f4}</label><input id="f-contact" autoComplete="off" placeholder={t.f4p} value={contact} onChange={(e) => setContact(e.target.value)} /></div>
                <p className="err" role="alert">{err}</p>
                <button className="btn" type="submit">{t.f5}</button>
                <p className="consent">{t.consent}</p>
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
                    {CONFIG.email && <a className="btn sm ghost" href={`mailto:${CONFIG.email}?subject=${encodeURIComponent("Aperçu Black Friday")}&body=${enc}`}>{t.lMail}</a>}
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
        </div>
      </footer>

      <div className={`stick${stuck ? " on" : ""}`}>
        <span dangerouslySetInnerHTML={html(t.stk)} />
        <a className="btn sm" href="#contact">{t.stkc}</a>
      </div>
    </div>
  );
}
