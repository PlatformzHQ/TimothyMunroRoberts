"use client";

import { useEffect, useRef, useState } from "react";
import { dashboard } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import CountUp from "../fx/CountUp";

// Generic "animate when visible" hook for the SVG charts.
function useInView<T extends Element>() {
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
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Radial({ label, value }: { label: string; value: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg viewBox="0 0 90 90" className="h-full w-full -rotate-90" role="img" aria-label={`${label}: ${value}%`}>
          <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
          <circle
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke="url(#radial-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={inView ? c * (1 - value / 100) : c}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <defs>
            <linearGradient id="radial-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--violet)" />
              <stop offset="100%" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold">
          <CountUp value={value} suffix="%" />
        </p>
      </div>
      <p className="text-center text-xs text-muted">{label}</p>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 200},${56 - (v / max) * 50}`).join(" ");
  return (
    <div ref={ref}>
      <svg viewBox="0 0 200 60" className="h-16 w-full" role="img" aria-label="Weekly throughput trend, rising">
        <polyline
          points={points}
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 2s ease-out" }}
        />
        {/* glow dot at the last point */}
        {inView && (
          <circle
            cx={200}
            cy={56 - (data[data.length - 1] / max) * 50}
            r="3.5"
            fill="var(--cyan)"
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
}

function BlockerBars({ bars }: { bars: { label: string; value: number }[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div ref={ref} className="flex h-28 items-end justify-between gap-3">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex h-20 w-full items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-violet to-magenta"
              style={{
                height: inView ? `${(bar.value / max) * 100}%` : "0%",
                transition: `height 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
              }}
              role="img"
              aria-label={`${bar.label}: ${bar.value}`}
            />
          </div>
          <span className="font-mono text-[10px] text-muted">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <Section id="dashboard" kicker="operating snapshot" title={<>Operating <span className="text-aurora">Dashboard</span></>}>
      <p className="-mt-4 mb-8 max-w-xl text-sm text-muted">
        How I think about running a business — as one connected, automated system.
      </p>

      <div className="grid gap-5 lg:grid-cols-4">
        {/* Counters */}
        {dashboard.counters.map((c, i) => (
          <Reveal key={c.label} delay={i * 90}>
            <div className="glass rounded-2xl p-5">
              <p className="font-display text-3xl font-bold text-text">
                <CountUp value={c.value} suffix={c.suffix} />
              </p>
              <p className="mt-1 text-xs text-muted">{c.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Reveal>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold">Operational health</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-4 sm:justify-around">
              {dashboard.radials.map((r) => (
                <Radial key={r.label} label={r.label} value={r.value} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold">Platform capability</h3>
            <p className="mt-1 text-xs text-muted">Compounding, era over era</p>
            <div className="mt-6">
              <Sparkline data={dashboard.weeklyFlow} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold">Departments automated</h3>
            <p className="mt-1 text-xs text-muted">One operating layer, every function</p>
            <div className="mt-4">
              <BlockerBars bars={dashboard.blockerBars} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
