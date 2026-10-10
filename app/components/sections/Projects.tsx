"use client";

import { projects } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function Projects() {
  return (
    <Section id="projects" kicker="selected work" title={<>Platforms &amp; <span className="text-aurora">Focus</span></>}>
      <p className="-mt-4 mb-8 max-w-2xl text-sm text-muted">
        The platforms and infrastructure I&apos;ve built across three decades — from the commercial
        Internet to AI-powered enterprise operating systems.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const isLink = p.link && !p.link.startsWith("{{");
          const Wrapper = isLink ? "a" : "div";
          return (
            <Reveal key={p.name} delay={(i % 3) * 90}>
              <TiltCard className="h-full">
                <Wrapper
                  {...(isLink ? { href: p.link, target: "_blank", rel: "noreferrer" } : {})}
                  className="glass glow-border group flex h-full flex-col rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-snug">{p.name}</h3>
                    {isLink && <span className="shrink-0 text-sm text-cyan">↗</span>}
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-cyan">{p.org}</p>
                  <p className="font-mono text-[10px] text-muted">{p.period}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Wrapper>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
