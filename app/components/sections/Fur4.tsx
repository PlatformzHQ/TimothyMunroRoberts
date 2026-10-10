"use client";

import { fur4 } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function Fur4() {
  return (
    <Section
      id="fur4"
      kicker="fur4 · digital transformation"
      title={
        <>
          The operating system, <span className="text-aurora">in production</span>
        </>
      }
    >
      <Reveal>
        <p className="-mt-4 max-w-3xl text-base leading-relaxed text-muted">{fur4.intro}</p>
      </Reveal>

      {/* Hard metrics */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {fur4.metrics.map((m, i) => (
          <Reveal key={m.label} delay={(i % 4) * 80}>
            <div className="glass h-full rounded-2xl p-5 text-center">
              <p className="font-display text-2xl font-bold text-amber">{m.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{m.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Responsibilities */}
      <Reveal delay={80}>
        <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-semibold">What COO &amp; CTO covers here</h3>
          <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {fur4.responsibilities.map((r, i) => (
              <li
                key={r}
                className="animate-fade-up rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/40 hover:text-text"
                style={{ animationDelay: `${(i % 8) * 60}ms`, animationDuration: "0.4s" }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Production environment highlight */}
      <Reveal delay={120}>
        <TiltCard maxTilt={4}>
          <div className="glass glow-border relative mt-10 overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-2xl"
              style={{ background: "var(--amber)" }}
              aria-hidden
            />
            <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {fur4.productionHeadline}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{fur4.productionNote}</p>
          </div>
        </TiltCard>
      </Reveal>
    </Section>
  );
}
