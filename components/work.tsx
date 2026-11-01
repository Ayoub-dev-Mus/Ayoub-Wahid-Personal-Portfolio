"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";
import { Reveal, SectionLabel } from "./reveal";
import { ProjectModal, type ProjectModalLabels } from "./project-modal";

export function Work({ projects, embedded = false, labels, cta = site.work.cta }: { projects: Project[]; embedded?: boolean; labels?: ProjectModalLabels; cta?: string }) {
  const [open, setOpen] = useState<Project | null>(null);
  if (!projects.length) return null;

  return (
    <section id={embedded ? undefined : "work"} className={embedded ? "" : "px-4 py-20 md:px-8 md:py-28"}>
      <div className={embedded ? "" : "mx-auto max-w-7xl"}>
        {!embedded && (
          <>
            <Reveal><SectionLabel n="02">{site.work.title}</SectionLabel></Reveal>
            <Reveal>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="max-w-3xl font-display text-5xl uppercase leading-[.9] sm:text-6xl md:text-7xl">A closer look at the work.</h2>
                <p className="max-w-md text-sm leading-relaxed opacity-75">{site.work.description}</p>
              </div>
            </Reveal>
          </>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.06}>
              <article className="h-full overflow-hidden rounded-2xl border border-ink bg-paper">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-ink bg-sand">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width:768px) 48vw, 94vw" className="object-cover transition-transform duration-500 hover:scale-[1.02]" />
                  <span className="absolute left-3 top-3 rounded-full border border-ink bg-paper px-3 py-1 font-mono text-[9px] uppercase tracking-widest">
                    {project.type === "client" ? "Client project" : site.ui.concept}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-ink/35 px-3 py-1 font-mono text-[9px] uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-4xl uppercase leading-none sm:text-5xl">{project.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-80">{project.outcome}</p>
                  {project.result.trim() && <p className="mt-2 truncate text-sm font-semibold text-accent">{project.result}</p>}
                  <button
                    onClick={() => setOpen(project)}
                    className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
                  >
                    {cta}<ArrowUpRight size={17} className="transition-transform group-hover:rotate-45" aria-hidden />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <ProjectModal key={open.id} project={open} labels={labels} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
