"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";
import { ProjectModal } from "./project-modal";

const skins = ["bg-sand", "bg-paper", "bg-accent text-onaccent", "bg-sand", "bg-paper", "bg-accent text-onaccent"];

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="work" className="px-4 py-24 md:px-8 md:py-32">
      <Reveal><SectionLabel n="03">{site.work.title}</SectionLabel></Reveal>
      <Reveal>
        <h2 className="mt-8 font-display text-[22vw] uppercase leading-[0.85] md:text-[13vw]">{site.ui.selected} <span className="text-accent">{site.ui.work}</span></h2>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest">{site.work.sub}</p>
      </Reveal>

      <div className="mt-12 pb-4">
        {projects.map((p, i) => (
          <article
            key={p.id}
            style={{ ["--top" as string]: `${88 + i * 16}px` }}
            className={`mb-8 rounded-[2rem] border border-ink p-5 transition-transform duration-500 md:sticky md:top-[var(--top)] md:p-8 md:hover:scale-[1.01] ${skins[i]}`}
          >
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span className="font-display text-5xl leading-none tracking-normal md:text-7xl">{p.number}</span>
              <span className="flex flex-wrap justify-end gap-2">
                {p.tags.map((t) => <span key={t} className="rounded-full border border-current px-3 py-1">{t}</span>)}
              </span>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-5">
                <h3 className="font-display text-5xl uppercase leading-[0.95] md:text-7xl">{p.title}</h3>
                <p className="mt-3 text-base font-medium">{p.outcome}</p>
                <button
                  data-cursor
                  onClick={() => setOpen(p)}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-transform hover:-translate-y-0.5 [.bg-accent_&]:bg-onaccent [.bg-accent_&]:text-[#F4EFE6]"
                >
                  {site.work.cta}<span className="sr-only"> {p.title}</span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
                </button>
              </div>
              <button
                onClick={() => setOpen(p)}
                tabIndex={-1}
                aria-hidden
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink md:col-span-7"
              >
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width:768px) 55vw, 90vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </button>
            </div>
          </article>
        ))}
      </div>
      <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
