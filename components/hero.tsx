import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

export function Hero() {
  const h = site.hero;
  const a = site.about;

  return (
    <section id="home" className="px-4 pb-8 pt-20 sm:pt-24 md:px-8 md:pb-24 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_.75fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest sm:py-2 sm:text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-pulseDot rounded-full bg-emerald-500" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {site.availability}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[.1em] opacity-70 sm:mt-5 sm:text-xs sm:tracking-[.2em]">{h.label}</p>
          <h1 className="mt-2 max-w-4xl font-display text-[clamp(2.55rem,10.5vw,7.1rem)] uppercase leading-[.88] tracking-tight sm:mt-4">
            {h.headline}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-80 sm:mt-6 sm:text-xl">{h.subline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
            <a href="#review" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-onaccent transition-transform hover:-translate-y-0.5 sm:min-h-12 sm:px-6 sm:py-3">
              {h.primary}<ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
            </a>
            <a href="#book" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-sand sm:min-h-12 sm:px-6 sm:py-3">
              {h.secondary}<ArrowDownRight size={18} aria-hidden />
            </a>
          </div>
          <p className="mt-3 max-w-2xl border-t border-ink/20 pt-3 text-[10px] font-medium leading-relaxed opacity-75 sm:mt-5 sm:pt-4 sm:text-xs">{h.proof}</p>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[26rem] lg:ml-auto lg:block">
          <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.75rem] bg-sand">
            <Image src={a.portrait} alt={a.portraitAlt} fill priority sizes="(min-width:1024px) 36vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-ink bg-paper p-4 shadow-[0_12px_30px_-18px_rgba(20,20,20,.5)] sm:-bottom-5 sm:-left-6 sm:right-6 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">One partner, from plan to launch</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed">Clear communication. Practical decisions. A product your team can own.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
