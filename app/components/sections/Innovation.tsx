"use client";

import { ip } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function Innovation() {
  return (
    <Section
      id="innovation"
      kicker="ip, patents & recognition"
      title={
        <>
          Invented, <span className="text-aurora">not assembled</span>
        </>
      }
    >
      <Reveal>
        <p className="-mt-4 max-w-3xl text-base leading-relaxed text-muted">{ip.intro}</p>
      </Reveal>

      {/* Patent filings */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {ip.patents.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <TiltCard className="h-full">
              <div className="glass glow-border h-full rounded-2xl p-6">
                <p className="text-3xl" aria-hidden>
                  {p.icon}
                </p>
                <h3 className="font-display mt-3 text-lg font-bold text-aurora">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-violet">
                  {p.status}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Trademarks + Awards + Education */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal variant="left">
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              Trademarks & brand protection
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{ip.trademarks}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
              Awards & highlights
            </h3>
            <ul className="mt-4 space-y-2.5">
              {ip.awards.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="text-amber" aria-hidden>
                    ★
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-violet">
              Education
            </h3>
            <ul className="mt-4 space-y-2.5">
              {ip.education.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="text-violet" aria-hidden>
                    🎓
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
