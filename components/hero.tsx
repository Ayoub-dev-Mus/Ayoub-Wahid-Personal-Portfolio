"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

function Rise({ children, i, className = "" }: { children: React.ReactNode; i: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-block overflow-hidden align-bottom pb-[0.06em] ${className}`}>
      <motion.span
        className="inline-block"
        initial={false}
        animate={{ y: reduce ? 0 : ["110%", "0%"] }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.045, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const h = site.hero;
  let w = 0;
  const rot = ["-rotate-6", "rotate-3", "-rotate-3"];
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-0 pt-24 md:px-8 md:pt-28">
      <div className="font-mono text-sm uppercase tracking-[0.25em]">
        <Rise i={0}>{h.label}</Rise>
      </div>

      <h1 className="relative mt-2 font-display uppercase leading-[0.82] tracking-tight text-[38vw] md:text-[19.5vw] md:whitespace-nowrap">
        <span className="block md:inline"><Rise i={2}>{h.first}</Rise></span>
        <span className="hidden md:inline">&nbsp;</span>
        <span className="block text-accent md:inline md:text-ink"><Rise i={4}>{h.last}</Rise></span>
        <svg viewBox="0 0 200 200" aria-hidden className="absolute right-0 top-1/2 hidden h-28 w-28 animate-spin360 text-ink md:block lg:h-40 lg:w-40">
          <defs><path id="c" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <circle cx="100" cy="100" r="98" fill="rgb(var(--accent))" />
          <text fontSize="19" fontFamily="var(--font-mono)" letterSpacing="3" fill="#141414" className="uppercase">
            <textPath href="#c">{h.badge.repeat(2)}</textPath>
          </text>
          <path d="M70 130 L130 70 M85 70 H130 V115" stroke="#141414" strokeWidth="9" fill="none" strokeLinecap="square" />
        </svg>
      </h1>

      <p className="mt-6 max-w-2xl border-t border-ink pt-4 font-mono text-xs uppercase leading-relaxed tracking-wider md:text-sm">
        {h.subline}
      </p>

      <p className="mt-8 max-w-6xl font-display text-[2.1rem] uppercase leading-[1.12] sm:text-5xl md:text-7xl md:leading-[1.08]">
        {h.headline.map((p, idx) => {
          if (typeof p !== "string") {
            const c = h.chips[p.chip];
            const k = w++;
            return (
              <motion.span
                key={idx}
                initial={false}
                animate={{ opacity: 1, scale: reduce ? 1 : [0.4, 1] }}
                transition={{ duration: 0.6, delay: 0.5 + k * 0.1, ease }}
                className={`relative mx-1 inline-block h-[0.95em] w-[1.9em] translate-y-[0.1em] overflow-hidden rounded-full border border-ink transition-transform duration-300 hover:rotate-0 hover:scale-110 ${rot[p.chip]}`}
              >
                <Image src={c.src} alt={c.alt} fill sizes="160px" className="object-cover" priority />
              </motion.span>
            );
          }
          return p.split(" ").map((word) => <Rise key={`${idx}-${w}`} i={6 + w++}>{word}&nbsp;</Rise>);
        })}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#contact" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-onaccent transition-transform hover:-translate-y-1 hover:rotate-[-1.5deg]">
          {h.primary} <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
        </a>
        <a href={`/?project=${encodeURIComponent("Shopify store")}#contact`} className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-7 py-4 text-base font-semibold transition-colors hover:bg-ink hover:text-paper">
          {h.review} <ArrowDownRight size={18} aria-hidden />
        </a>
        <a href="#work" className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-7 py-4 text-base font-semibold transition-colors hover:bg-ink hover:text-paper">
          {h.secondary} <ArrowDownRight size={18} aria-hidden />
        </a>
      </div>

      <div className="-mx-6 mt-16 -rotate-1 overflow-hidden border-y border-ink bg-ink py-4 text-paper md:mt-20" aria-label="Technologies">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((r) => (
            <ul key={r} className="flex shrink-0 items-center" aria-hidden={r === 1}>
              {h.marquee.map((m) => (
                <li key={m} className="flex items-center font-display text-3xl uppercase tracking-wide md:text-5xl">
                  <span className="px-6">{m}</span>
                  <span className="text-accent">&middot;</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="h-14" />
    </section>
  );
}
