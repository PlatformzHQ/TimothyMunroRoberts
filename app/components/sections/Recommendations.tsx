"use client";

import { recommendations } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function Recommendations() {
  return (
    <Section
      id="recommendations"
      kicker="what people say"
      title={
        <>
          In their <span className="text-aurora">own words</span>
        </>
      }
    >
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {recommendations.map((r, i) => (
          <Reveal key={r.author} delay={(i % 3) * 100}>
            <TiltCard maxTilt={4}>
              <figure className="glass rounded-2xl p-6">
                <span className="font-display text-3xl leading-none text-violet" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-sm leading-relaxed text-muted">{r.quote}</blockquote>
                <figcaption className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-sm font-semibold">{r.author}</p>
                  <p className="text-xs text-cyan">{r.role}</p>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
