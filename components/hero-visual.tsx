"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroVisual({ src, alt }: { src: string; alt: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const media = gsap.matchMedia(root.current);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          "[data-avatar]",
          { autoAlpha: 0, y: 28, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
        )
        .fromTo(
          "[data-caption]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          "-=0.25",
        );

      gsap.to("[data-orbit]", {
        rotation: 360,
        duration: 36,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to("[data-float]", {
        y: -9,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35,
      });
    });

    return () => media.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative mx-auto mt-10 block w-full max-w-[26rem] lg:ml-auto lg:mt-0"
    >
      <svg
        data-orbit
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)]"
        fill="none"
      >
        <circle
          cx="200"
          cy="200"
          r="184"
          stroke="currentColor"
          strokeOpacity=".24"
          strokeDasharray="3 9"
        />
        <circle cx="200" cy="16" r="7" fill="rgb(var(--accent))" />
      </svg>
      <div
        data-avatar
        className="relative aspect-[4/4.5] overflow-hidden rounded-[1.75rem] border border-ink bg-sand shadow-[12px_12px_0_rgb(var(--sand))]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width:1024px) 36vw, 90vw"
          className="object-cover"
        />
      </div>
      <div
        data-float
        aria-hidden="true"
        className="absolute right-4 top-4 h-4 w-4 rounded-full border-2 border-paper bg-accent shadow-[0_0_0_5px_rgb(var(--accent)/.2)]"
      />
      <div
        data-caption
        className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-ink bg-paper p-4 shadow-[0_12px_30px_-18px_rgba(20,20,20,.5)] sm:-bottom-5 sm:-left-6 sm:right-6 sm:p-5"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
          One partner, from plan to launch
        </p>
        <p className="mt-2 text-sm font-semibold leading-relaxed">
          Clear communication. Practical decisions. A product your team can own.
        </p>
      </div>
    </div>
  );
}
