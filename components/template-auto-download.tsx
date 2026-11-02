"use client";
import { useEffect, useRef } from "react";
import { ArrowDownToLine } from "lucide-react";

export function TemplateAutoDownload({ href, filename }: { href: string; filename: string }) {
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => link.current?.click(), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <a
      ref={link}
      href={href}
      download={filename}
      className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-onaccent transition-transform hover:-translate-y-0.5"
    >
      Download {filename.replace(/\.zip$/, "")}<ArrowDownToLine size={18} aria-hidden />
    </a>
  );
}
