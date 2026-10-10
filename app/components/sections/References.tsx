"use client";

import { references } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function References() {
  return (
    <Section
      id="references"
      kicker="references & media"
      title={
        <>
          Don&apos;t take my <span className="text-aurora">word for it</span>
        </>
      }
    >
      <Reveal>
        <p className="-mt-4 max-w-3xl text-base leading-relaxed text-muted">
          The milestones on this site are independently verifiable. A few public sources covering
          the companies and outcomes:
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {references.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 90}>
            <TiltCard className="h-full" maxTilt={5}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="glass group flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-cyan/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl" aria-hidden>
                    {r.icon}
                  </span>
                  <span className="text-sm text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">{r.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.note}</p>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
