"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!inView || reduce) { setN(value); return; }
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

export function Results() {
  return (
    <section aria-label={site.results.title} className="px-4 pb-8 md:px-8 md:pb-12">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-ink bg-sand md:grid-cols-4">
        {site.results.items.map((r, i) => (
          <div key={r.label} className={`p-5 py-7 sm:p-7 ${i % 2 === 0 ? "border-r border-ink/20" : ""} ${i < 2 ? "border-b border-ink/20 md:border-b-0" : ""} md:border-r md:border-ink/20 md:last:border-r-0`}>
            <dd className="font-display text-5xl leading-none sm:text-6xl"><Counter value={r.value} suffix={r.suffix} /></dd>
            <dt className="mt-2 max-w-[12rem] text-xs leading-relaxed opacity-75 sm:text-sm">{r.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
