"use client";

import { expertiseAreas } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function BeyondTech() {
  return (
    <Section
      id="beyond"
      kicker="beyond the technologist"
      title={
        <>
          Horizontal <span className="text-aurora">expertise</span>
        </>
      }
    >
      <Reveal>
        <p className="-mt-4 max-w-3xl text-base leading-relaxed text-muted">
          Three decades of taking ideas from a piece of paper to fully operational, profitable
          businesses means going far beyond engineering — across strategy, finance, legal,
          marketing, development, and operations.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expertiseAreas.map((area, i) => (
          <Reveal key={area.title} delay={(i % 3) * 110}>
            <TiltCard className="h-full" maxTilt={5}>
              <div className="glass glow-border h-full rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {area.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold">{area.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="text-cyan" aria-hidden>
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
