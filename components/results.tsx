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
    <section aria-label={site.results.title} className="my-8 border-y border-onaccent bg-accent text-onaccent">
      <dl className="grid grid-cols-2 md:grid-cols-4">
        {site.results.items.map((r, i) => (
          <div key={r.label} className={`border-onaccent p-5 py-10 md:p-10 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} md:border-r md:last:border-r-0`}>
            <dd className="font-display text-[5.5rem] leading-[0.85] md:text-[8rem]"><Counter value={r.value} suffix={r.suffix} /></dd>
            <dt className="mt-3 font-mono text-[11px] uppercase tracking-widest md:text-xs">{r.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
