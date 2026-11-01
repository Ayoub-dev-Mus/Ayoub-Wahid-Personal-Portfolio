"use client";
import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Casablanca",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function Clock({ className }: { className?: string }) {
  const [t, setT] = useState(() => formatter.format(new Date()));
  useEffect(() => {
    const tick = () => setT(formatter.format(new Date()));
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
