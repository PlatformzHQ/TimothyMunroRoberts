"use client";

import { useEffect, useRef, useState } from "react";
import { careerAnalytics, careerTotals } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import CountUp from "../fx/CountUp";

function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Seniority climb — an animated area+line chart over the years.
function GrowthCurve() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const data = careerAnalytics.growth;
  const W = 320;
  const H = 150;
  const maxLevel = 11;
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - (d.level / maxLevel) * (H - 20) - 8,
    d,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,${H} ${line} ${W},${H}`;

  return (
    <div ref={ref} className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold">The climb</h3>
      <p className="mt-1 text-xs text-muted">Scope & seniority, 1984 → today</p>
      <svg viewBox={`-10 0 ${W + 20} ${H + 22}`} className="mt-4 w-full" role="img" aria-label="Career seniority rising from 1984 to today">
        <defs>
          <linearGradient id="climb-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="climb-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--violet)" />
            <stop offset="50%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--amber)" />
          </linearGradient>
        </defs>
        <polygon
          points={area}
          fill="url(#climb-fill)"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 1.4s ease 0.4s" }}
        />
        <polyline
          points={line}
          fill="none"
          stroke="url(#climb-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.8s ease-out" }}
        />
        {pts.map((p, i) => (
          <g key={p.d.year}>
            <circle
              cx={p.x}
              cy={p.y}
              r={i === pts.length - 1 ? 4.5 : 3}
              fill={i === pts.length - 1 ? "var(--amber)" : "var(--cyan)"}
              style={{ opacity: inView ? 1 : 0, transition: `opacity 0.4s ease ${0.6 + i * 0.12}s` }}
            />
            <text
              x={p.x}
              y={H + 16}
              textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}
              className="fill-[var(--muted)]"
              style={{ fontSize: 8, fontFamily: "var(--font-geist-mono)" }}
            >
              {p.d.year}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-center text-xs text-muted">
        Internet → Cloud → Commerce → AI → <span className="text-amber">Enterprise OS</span>
      </p>
    </div>
  );
}

function DomainBar({ name, value, color, delay }: { name: string; value: number; color: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{
            width: inView ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 55%, white))`,
            transition: `width 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function CareerStats() {
  return (
    <Section id="stats" kicker="career analytics" title={<>By the <span className="text-aurora">Numbers</span></>}>
      <p className="-mt-4 mb-8 max-w-2xl text-sm text-muted">
        Three decades, five technology eras, seven enterprise domains — here&apos;s the shape of the journey.
      </p>

      {/* Cumulative totals */}
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {careerTotals.map((t, i) => (
          <Reveal key={t.label} delay={(i % 4) * 80}>
            <div className="glass h-full rounded-2xl p-5">
              <p className="font-display text-3xl font-bold text-text">
                <CountUp value={t.value} suffix={t.suffix} />
              </p>
              <p className="mt-1 text-xs leading-snug text-muted">{t.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GrowthCurve />
        </Reveal>

        <Reveal delay={120}>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold">Where the experience lives</h3>
            <p className="mt-1 text-xs text-muted">Relative depth across disciplines</p>
            <div className="mt-5 space-y-4">
              {careerAnalytics.domains.map((d, i) => (
                <DomainBar key={d.name} name={d.name} value={d.value} color={d.color} delay={i * 120} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="glass mt-5 rounded-2xl p-6">
          <h3 className="text-sm font-semibold">Domains pioneered</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {careerAnalytics.industries.map((ind) => (
              <li
                key={ind.name}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-text"
              >
                <span aria-hidden>{ind.icon}</span>
                {ind.name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
