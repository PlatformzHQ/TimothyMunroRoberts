"use client";

import { platformz } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";

export default function Platformz() {
  return (
    <Section
      id="platformz"
      kicker="platformz vision"
      title={
        <>
          One platform, <span className="text-aurora">every function</span>
        </>
      }
    >
      <Reveal>
        <p className="-mt-4 max-w-3xl text-base leading-relaxed text-muted">{platformz.intro}</p>
      </Reveal>

      {/* Modules grid */}
      <Reveal delay={80}>
        <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold">Modular by design</h3>
            <a
              href={platformz.link}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-violet hover:text-cyan"
            >
              platformz.us ↗
            </a>
          </div>
          <p className="mt-1 text-xs text-muted">
            Every deployment on the same architecture — {platformz.modules.length} business functions, one foundation.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {platformz.modules.map((m, i) => (
              <li
                key={m}
                className="animate-fade-up rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:text-text"
                style={{ animationDelay: `${(i % 8) * 60}ms`, animationDuration: "0.4s" }}
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* AI layer */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal variant="left">
          <div className="glass glow-border h-full rounded-2xl p-6 sm:p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-magenta">
              The Platformz AI vision
            </h3>
            <p className="font-display mt-4 text-xl font-semibold leading-snug">
              {platformz.aiHeadline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{platformz.aiIntro}</p>
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="glass h-full rounded-2xl p-6 sm:p-8">
            <h3 className="text-sm font-semibold">What the AI layer does</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {platformz.aiCapabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="text-magenta" aria-hidden>
                    ◆
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Digital Commerce Operating System — control tower */}
      <Reveal delay={120}>
        <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            {platformz.dcosHeadline}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{platformz.dcosIntro}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {platformz.dcos.map((d) => (
              <li
                key={d}
                className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 font-mono text-[11px] text-cyan"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* The story behind Platformz */}
      <Reveal delay={140}>
        <p className="mt-8 text-center text-sm text-muted">
          Platformz is the system a lifetime of infrastructure prepared me to
          build — the full story is documented at{" "}
          <a
            href="https://builtbeforecloud.com/platformz"
            target="_blank"
            rel="noreferrer"
            className="text-cyan underline decoration-cyan/40 underline-offset-4 transition-colors hover:text-violet"
          >
            Built Before the Cloud: the story behind Platformz
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
