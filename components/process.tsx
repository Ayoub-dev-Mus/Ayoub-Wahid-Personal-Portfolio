"use client";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function Process() {
  const reduce = useReducedMotion();
  const steps = site.process.steps;
  return (
    <section id="process" className="px-4 py-24 md:px-8 md:py-32">
      <Reveal><SectionLabel n="04">{site.process.title}</SectionLabel></Reveal>
      <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-0">
        {steps.map((s, i) => (
          <li key={s.n} className="relative ml-5 border-l border-ink pb-2 pl-10 md:ml-0 md:border-l-0 md:pl-0 md:pr-8">
            <div className="absolute -left-5 top-0 md:static md:flex md:items-center">
              <Reveal>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-ink bg-paper font-display text-xl transition-colors hover:bg-accent hover:text-onaccent md:h-14 md:w-14 md:text-2xl">{s.n}</span>
              </Reveal>
              {i < steps.length - 1 && (
                <motion.span
                  aria-hidden
                  className="ml-3 hidden h-px flex-1 origin-left bg-ink md:block"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.25 }}
                />
              )}
            </div>
            <Reveal delay={i * 0.08}>
              <h3 className="font-display text-4xl uppercase leading-none md:mt-8 md:text-5xl">{s.title}</h3>
              <p className="mt-3 max-w-[16rem]">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
