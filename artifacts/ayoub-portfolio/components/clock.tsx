"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function Clock({ className }: { className?: string }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: site.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      {t}
    </span>
  );
}
