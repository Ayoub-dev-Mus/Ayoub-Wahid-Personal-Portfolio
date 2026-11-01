"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-sand px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionLabel n="05">{site.faq.title}</SectionLabel>
        </Reveal>
        <div className="mt-8 border-t border-ink">
          {site.faq.items.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-answer-${index}`;
            return (
              <article key={item.question} className="border-b border-ink">
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-5 py-4 text-left font-display text-2xl uppercase leading-tight sm:text-3xl"
                  >
                    {item.question}
                    <span aria-hidden className="font-sans text-2xl">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <p
                  id={panelId}
                  hidden={!expanded}
                  className="max-w-3xl pb-5 text-sm leading-relaxed opacity-80 sm:text-base"
                >
                  {item.answer}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
