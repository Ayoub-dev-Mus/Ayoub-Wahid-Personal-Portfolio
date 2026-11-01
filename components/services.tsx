import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function Services() {
  const services = site.services;
  return (
    <section id="services" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="02">{services.title}</SectionLabel></Reveal>
        <Reveal>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-3xl font-display text-5xl uppercase leading-[.9] sm:text-6xl md:text-7xl">The right build for your next step.</h2>
            <p className="max-w-sm text-sm leading-relaxed opacity-75">Choose what you need now. We’ll make the scope and next steps clear before work begins.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {services.items.map((item, index) => (
            <Reveal key={item.n} delay={index * 0.06}>
              <article className={`flex h-full flex-col rounded-2xl border border-ink p-5 sm:p-6 ${index === 0 ? "bg-sand" : "bg-paper"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-65">0{index + 1} / Service</span>
                </div>
                <h3 className="mt-7 font-display text-4xl uppercase leading-[.92]">{item.title}</h3>
                {item.pitch && <p className="mt-3 min-h-12 text-sm leading-relaxed opacity-80">{item.pitch}</p>}
                <ul className="mt-5 flex-1 border-t border-ink/25">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="border-b border-ink/25 py-3 text-sm leading-snug">{bullet}</li>
                  ))}
                </ul>
                <a
                  href={`/?project=${encodeURIComponent(item.projectType)}#contact`}
                  className="group mt-5 inline-flex min-h-11 items-center justify-between gap-3 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-onaccent"
                >
                  {item.cta}<ArrowUpRight size={17} className="transition-transform group-hover:rotate-45" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
