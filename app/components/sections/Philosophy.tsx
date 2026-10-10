"use client";

import { philosophy } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";

export default function Philosophy() {
  return (
    <Section
      id="philosophy"
      kicker="enterprise software philosophy"
      title={
        <>
          Why most enterprise software <span className="text-aurora">fails</span>
        </>
      }
    >
      {/* The problem */}
      <Reveal>
        <div className="glass rounded-2xl p-6 sm:p-8">
          <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">
            {philosophy.problemHeadline}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {philosophy.problemDepartments.map((d, i) => (
              <li
                key={d}
                className="animate-fade-up flex items-center gap-3 rounded-xl border border-magenta/20 bg-magenta/5 px-4 py-3 text-sm text-muted"
                style={{ animationDelay: `${i * 90}ms`, animationDuration: "0.4s" }}
              >
                <span className="text-magenta" aria-hidden>
                  ✕
                </span>
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">{philosophy.problemResult}</p>
        </div>
      </Reveal>

      {/* The belief → unified architecture */}
      <Reveal delay={100}>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-text">{philosophy.belief}</p>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {philosophy.unified.map((u, i) => (
          <Reveal key={u.title} delay={i * 120}>
            <TiltCard className="h-full">
              <div className="glass glow-border h-full rounded-2xl p-6">
                <p className="text-3xl" aria-hidden>
                  {u.icon}
                </p>
                <h3 className="font-display mt-3 text-lg font-bold text-aurora">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.text}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Leadership principles */}
      <Reveal delay={120}>
        <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            Leadership philosophy — every business process should be
          </h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {philosophy.principles.map((p) => (
              <li
                key={p.word}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40"
              >
                <span aria-hidden>{p.icon}</span>
                {p.word}
              </li>
            ))}
          </ul>
          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {philosophy.truths.map((t) => (
              <li key={t} className="flex gap-2 text-sm leading-relaxed text-muted">
                <span className="text-cyan" aria-hidden>
                  ▸
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Looking forward */}
      <Reveal delay={140}>
        <div className="glass glow-border mt-10 overflow-hidden rounded-2xl p-6 sm:p-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-violet">Looking forward</h3>
          <div className="mt-4 space-y-1.5">
            {philosophy.forward.lines.map((line) => (
              <p key={line} className="font-display text-xl font-semibold sm:text-2xl">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
            {philosophy.forward.objective}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {philosophy.forward.industries.map((ind) => (
              <li
                key={ind}
                className="rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1.5 text-xs text-violet"
              >
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
