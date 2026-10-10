"use client";

import { ventures } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

const THEME_STYLES = {
  violet: { color: "var(--violet)", emoji: "🪐" },
  cyan: { color: "var(--cyan)", emoji: "🌊" },
  amber: { color: "var(--amber)", emoji: "☀️" },
  magenta: { color: "var(--magenta)", emoji: "🎧" },
  emerald: { color: "#34d399", emoji: "🌱" },
} as const;

export default function Ventures() {
  return (
    <Section id="ventures" kicker="leadership today" title={<>Companies &amp; <span className="text-aurora">Ventures</span></>}>
      <div className="grid gap-6 md:grid-cols-3">
        {ventures.map((v, i) => {
          const t = THEME_STYLES[v.theme];
          return (
            <Reveal key={v.name} delay={i * 130}>
              <TiltCard className="h-full">
                <article
                  className="glass relative h-full overflow-hidden rounded-2xl p-6"
                  style={{ borderColor: `color-mix(in srgb, ${t.color} 35%, transparent)` }}
                >
                  {/* World glow */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-25 blur-2xl"
                    style={{ background: t.color }}
                    aria-hidden
                  />
                  <p className="text-3xl" aria-hidden>{t.emoji}</p>
                  <h3 className="font-display mt-3 text-lg font-bold" style={{ color: t.color }}>
                    {v.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium">{v.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.description}</p>
                  {v.link && !v.link.startsWith("{{") && (
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-medium hover:underline"
                      style={{ color: t.color }}
                    >
                      Visit ↗
                    </a>
                  )}
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
