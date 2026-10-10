"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import portrait from "../../assets/portrait.jpg";
import { characterStats, journey, originStory, profile, type JourneyStep } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import { useGame } from "../game/GameProvider";

// Roles shown as animated chips in the origin column.
const roleBadges = [
  { icon: "👑", label: "Technology Founder", color: "var(--amber)" },
  { icon: "🏛️", label: "Enterprise Architect", color: "var(--violet)" },
  { icon: "🛒", label: "Digital Commerce Executive", color: "var(--cyan)" },
  { icon: "🤖", label: "AI Platform Designer", color: "var(--magenta)" },
  { icon: "⚙️", label: "CEO · CTO · COO", color: "#34d399" },
];

// One quest-map card: click to expand its details with a smooth animation.
function JourneyCard({
  step,
  alignRight,
  open,
  onToggle,
}: {
  step: JourneyStep;
  alignRight?: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      className={`glass w-full rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 ${
        open ? "border-cyan/50 shadow-[0_0_32px_-8px_var(--glow)]" : ""
      } ${step.lv === 9 ? "glow-border" : ""} ${alignRight ? "sm:text-right" : ""}`}
    >
      <p className={`flex items-center gap-2 ${alignRight ? "sm:flex-row-reverse" : ""}`}>
        <span className="rounded-md bg-gradient-to-r from-violet to-cyan px-2 py-0.5 font-mono text-[10px] font-bold text-white">
          LV{step.lv}
        </span>
        <span className="font-mono text-xs text-muted">{step.year}</span>
        <span
          className={`text-muted transition-transform duration-300 ${open ? "rotate-45" : ""} ${
            alignRight ? "sm:mr-auto" : "ml-auto"
          }`}
          aria-hidden
        >
          +
        </span>
      </p>
      <h4 className="mt-2 font-semibold leading-snug">{step.title}</h4>
      <p className="mt-0.5 text-sm font-medium text-cyan">{step.where}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.note}</p>

      {/* animated detail expansion */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
            {step.details.map((d, i) => (
              <li
                key={d}
                className={`flex gap-2 text-xs leading-relaxed text-muted ${
                  alignRight ? "sm:flex-row-reverse" : ""
                } ${open ? "animate-fade-up" : ""}`}
                style={open ? { animationDelay: `${i * 80}ms`, animationDuration: "0.4s" } : undefined}
              >
                <span className="text-cyan" aria-hidden>
                  ▸
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] text-violet">
        {open ? "− collapse" : "+ open details"}
      </p>
    </button>
  );
}

// The level-up journey: zigzag quest map with a glowing spine.
function Journey() {
  const [openLv, setOpenLv] = useState<number | null>(null);
  const { addXp } = useGame();

  const toggle = (lv: number) => {
    setOpenLv((o) => (o === lv ? null : lv));
    addXp(5, `journey-${lv}`);
  };

  return (
    <div className="relative mt-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">the journey</p>
      <h3 className="font-display mt-2 text-2xl font-bold">
        Three decades, <span className="text-aurora">era by era</span>
      </h3>
      <p className="mt-2 text-sm text-muted">Tap any chapter to open its details.</p>

      <div className="relative mt-10">
        {/* glowing spine */}
        <div
          className="absolute bottom-2 left-[19px] top-2 w-0.5 sm:left-1/2 sm:-translate-x-1/2"
          style={{
            background: "linear-gradient(180deg, var(--violet), var(--cyan), var(--magenta), var(--amber))",
            boxShadow: "0 0 14px var(--glow)",
          }}
          aria-hidden
        />

        <ol className="space-y-10">
          {journey.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <li key={step.lv} className="relative sm:grid sm:grid-cols-2 sm:gap-12">
                {/* node orb on the spine */}
                <span
                  className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan bg-bg text-base shadow-[0_0_18px_var(--glow)] sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden
                >
                  {step.icon}
                </span>

                <Reveal
                  variant={left ? "left" : "right"}
                  className={`ml-14 sm:ml-0 ${left ? "sm:col-start-1 sm:pr-10" : "sm:col-start-2 sm:pl-10"}`}
                >
                  <JourneyCard
                    step={step}
                    alignRight={left}
                    open={openLv === step.lv}
                    onToggle={() => toggle(step.lv)}
                  />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

// RPG stat bar that fills when scrolled into view.
function StatBar({ name, value, color, delay }: { name: string; value: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-xs text-muted">{value}/100</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${name}: ${value} out of 100`}>
        <div
          className="h-full rounded-full transition-[width] duration-[1.4s] ease-out"
          style={{
            width: filled ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 50%, white))`,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" kicker="executive profile" title={<>The <span className="text-aurora">Story</span></>}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 leading-relaxed text-muted">
          {originStory.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={i * 120}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={360}>
            <ul className="flex flex-wrap gap-2.5">
              {roleBadges.map((r, i) => (
                <li
                  key={r.label}
                  className="animate-fade-up glass flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${420 + i * 90}ms`,
                    borderColor: `color-mix(in srgb, ${r.color} 40%, transparent)`,
                    boxShadow: `0 0 0 0 ${r.color}`,
                  }}
                >
                  <span aria-hidden>{r.icon}</span>
                  <span style={{ color: r.color }}>{r.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal variant="right">
          <div className="glass glow-border rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-4">
              <div className="portrait-duotone h-16 w-16 shrink-0 !rounded-full ring-2 ring-violet/60">
                <Image src={portrait} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-display font-bold leading-tight">{profile.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">founder · architect</p>
              </div>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Character stats</p>
            <div className="mt-5 space-y-5">
              {characterStats.map((stat, i) => (
                <StatBar key={stat.name} name={stat.name} value={stat.value} color={stat.color} delay={i * 150} />
              ))}
            </div>
            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[11px] text-muted">
              ROLE: CEO · CTO · COO · FOCUS: Enterprise operating systems
            </p>
          </div>
        </Reveal>
      </div>

      <Journey />
    </Section>
  );
}
