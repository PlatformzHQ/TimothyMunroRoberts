"use client";

import { heritage } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function Heritage() {
  return (
    <Section
      id="heritage"
      kicker="family & legacy"
      title={
        <>
          A St. Louis family of <span className="text-aurora">builders</span>
        </>
      }
    >
      <Reveal>
        <p className="-mt-4 max-w-3xl text-base leading-relaxed text-muted">{heritage.intro}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {heritage.members.map((m, i) => (
          <Reveal key={m.name} delay={(i % 2) * 120}>
            <TiltCard className="h-full" maxTilt={4}>
              <article className="glass glow-border h-full rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-2xl"
                    aria-hidden
                  >
                    {m.icon}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">{m.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                      {m.relation}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-aurora">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.note}</p>
                {"href" in m && m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-cyan transition-colors hover:text-aurora"
                  >
                    {m.linkLabel} ↗
                  </a>
                ) : null}
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="glass mt-6 rounded-2xl p-6">
          <p className="text-sm leading-relaxed text-muted">{heritage.personal}</p>
        </div>
      </Reveal>
    </Section>
  );
}
