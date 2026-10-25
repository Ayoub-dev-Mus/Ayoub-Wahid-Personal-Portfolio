import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { shopifyCopy, shopifyForm, shopifyModal, shopifyServices } from "@/content/shopify";
import { site } from "@/content/site";
import { contactLinks, packagePrices, testimonials } from "@/lib/site";
import { ContactForm } from "./contact";
import { Reveal, SectionLabel } from "./reveal";
import { Work } from "./work";

const button = "inline-flex min-h-11 items-center gap-2 rounded-full px-7 py-4 text-base font-semibold";

export function ShopifyLanding({ locale, projects }: { locale: "en" | "fr"; projects: Project[] }) {
  const copy = shopifyCopy[locale];
  const steps = locale === "en"
    ? site.process.steps
    : [
        { n: "01", title: "Découvrir", text: "Des questions précises, un périmètre clair." },
        { n: "02", title: "Planifier", text: "Des jalons et des estimations avant d'écrire du code." },
        { n: "03", title: "Construire", text: "Des points réguliers, et un code documenté qui vous appartient." },
        { n: "04", title: "Lancer et accompagner", text: "De l'aide après la mise en ligne, pas seulement à la livraison." },
      ];
  return (
    <div lang={locale === "fr" ? "fr" : "en"}>
      <header className="flex items-center justify-between gap-3 border-b border-ink px-4 py-3 md:px-8">
        <a href="/" className="inline-flex min-h-11 items-center font-display text-2xl uppercase tracking-wide">{site.name}</a>
        <nav aria-label={copy.switcher} className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest">
          <a href="/shopify" hrefLang="en" aria-current={locale === "en" ? "page" : undefined} className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 ${locale === "en" ? "bg-ink text-paper" : "border border-ink"}`}>EN</a>
          <a href="/fr/shopify" hrefLang="fr" aria-current={locale === "fr" ? "page" : undefined} className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 ${locale === "fr" ? "bg-ink text-paper" : "border border-ink"}`}>FR</a>
        </nav>
      </header>

      <main>
        <section className="px-4 pb-16 pt-16 md:px-8 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em]">{copy.home}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl uppercase leading-[0.9] sm:text-7xl md:text-8xl">{copy.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg">{copy.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={`${button} bg-accent text-onaccent`}>{copy.review}</a>
            {contactLinks.CALENDAR_URL && (
              <a href={contactLinks.CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={`${button} border border-ink`}>
                {copy.call} <ArrowUpRight size={18} aria-hidden />
              </a>
            )}
          </div>
        </section>

        <section className="border-y border-ink px-4 py-20 md:px-8">
          <Reveal><SectionLabel n="01">{copy.servicesTitle}</SectionLabel></Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {shopifyServices[locale].map((item) => (
              <li key={item} className="rounded-2xl border border-ink px-5 py-4 text-lg">{item}</li>
            ))}
          </ul>
        </section>

        {projects.length > 0 && (
          <section className="px-4 py-20 md:px-8">
            <Reveal><SectionLabel n="02">{copy.workTitle}</SectionLabel></Reveal>
            <div className="mt-8">
              <Work projects={projects} embedded labels={shopifyModal[locale]} cta={copy.workCta} />
            </div>
          </section>
        )}

        <section className="px-4 py-20 md:px-8">
          <Reveal><SectionLabel n="03">{copy.processTitle}</SectionLabel></Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n}>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-ink font-display text-xl">{step.n}</span>
                <h2 className="mt-4 font-display text-3xl uppercase">{step.title}</h2>
                <p className="mt-2 max-w-xs">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-sand px-4 py-20 md:px-8">
          <Reveal><SectionLabel n="04">{copy.packagesTitle}</SectionLabel></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.packages.map((item) => (
              <article key={item.id} className="flex flex-col rounded-[2rem] border border-ink bg-paper p-6">
                <h2 className="font-display text-4xl uppercase">{item.title}</h2>
                <p className="mt-3 flex-1">{item.text}</p>
                <p className="mt-6 font-mono text-sm uppercase tracking-widest">{packagePrices[item.id].trim() || copy.quote}</p>
              </article>
            ))}
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="px-4 py-20 md:px-8">
            <Reveal><SectionLabel n="05">{copy.testimonialsTitle}</SectionLabel></Reveal>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <li key={item.name} className="rounded-2xl border border-ink p-6">
                  <p>{item.quote}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest">{item.name}{item.detail ? ` · ${item.detail}` : ""}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="px-4 py-20 md:px-8">
          <Reveal><SectionLabel n="06">{copy.faqTitle}</SectionLabel></Reveal>
          <div className="mt-8 divide-y divide-ink border-y border-ink">
            {copy.faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl uppercase">
                  {item.q}
                </summary>
                <p className="max-w-3xl pb-2 pt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-ink px-4 py-20 text-paper md:px-8">
          <h2 className="font-display text-5xl uppercase leading-none md:text-7xl">{copy.ctaTitle}</h2>
          <p className="mt-4 max-w-xl text-lg">{copy.ctaText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {contactLinks.CALENDAR_URL && (
              <a href={contactLinks.CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={`${button} bg-accent text-onaccent`}>
                {copy.call} <ArrowUpRight size={18} aria-hidden />
              </a>
            )}
          </div>
          <div className="mt-10 max-w-3xl">
            <ContactForm copy={shopifyForm[locale]} defaultProjectType="Shopify store" id={`shopify-form-${locale}`} />
          </div>
        </section>
      </main>
    </div>
  );
}
