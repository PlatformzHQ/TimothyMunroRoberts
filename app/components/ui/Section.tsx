"use client";

import { useEffect, useRef } from "react";
import { useGame } from "../game/GameProvider";

// Section shell: anchors scrolling, awards XP the first time it's explored.
export default function Section({
  id,
  title,
  kicker,
  children,
  className = "",
}: {
  id: string;
  title: React.ReactNode;
  kicker: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { markSection } = useGame();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markSection(id);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, markSection]);

  return (
    <section id={id} ref={ref} className={`scroll-mt-28 py-20 sm:py-28 ${className}`}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{kicker}</p>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
