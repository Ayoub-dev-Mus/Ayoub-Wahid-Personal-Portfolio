"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const root = ref.current!;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.querySelector<HTMLElement>("[data-close]")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); closeRef.current(); return; }
      if (e.key !== "Tab") return;
      const f = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-ink bg-paper p-5 sm:rounded-[2rem] md:p-8"
        initial={reduce ? false : { y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button data-close onClick={onClose} aria-label={site.ui.closeProject} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-ink bg-paper transition-transform hover:rotate-90 hover:bg-accent hover:text-onaccent">
          <X size={18} aria-hidden />
        </button>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-ink bg-sand">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width:768px) 48rem, 100vw" className="object-cover" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <span className="rounded-full bg-accent px-3 py-1 text-onaccent">{project.number}</span>
          {project.tags.map((t) => <span key={t} className="rounded-full border border-ink px-3 py-1">{t}</span>)}
          {project.placeholder && <span className="rounded-full bg-sand px-3 py-1">{site.ui.placeholder}</span>}
        </div>
        <h3 id="project-title" className="mt-4 font-display text-6xl uppercase leading-none md:text-7xl">{project.title}</h3>
        <p className="mt-3 text-lg font-medium">{project.outcome}</p>
        <p className="mt-4 leading-relaxed opacity-80">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-6 py-3 font-semibold text-onaccent">{site.ui.visitProject}</a>
          )}
          <a href="#contact" onClick={onClose} className="rounded-full border border-ink px-6 py-3 font-semibold transition-colors hover:bg-ink hover:text-paper">{site.ui.similarProject}</a>
        </div>
      </motion.div>
    </motion.div>
  );
}
