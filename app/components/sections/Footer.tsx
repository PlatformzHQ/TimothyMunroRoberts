"use client";

import { useState } from "react";
import { profile } from "../../content";

export default function Footer() {
  const [launching, setLaunching] = useState(false);

  const launch = () => {
    if (launching) return;
    setLaunching(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setLaunching(false), 900);
    }, 550);
  };

  return (
    <footer className="relative mt-10 overflow-hidden pb-10 pt-24">
      {/* Animated gradient wave */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 overflow-hidden" aria-hidden>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute left-0 top-0 h-full w-[200%]"
          style={{ animation: "wave-drift 14s linear infinite" }}
        >
          <defs>
            <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.35" />
              <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--magenta)" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1200,70 1320,10 1440,40 C1560,70 1680,10 1800,40 C1920,70 2040,10 2160,40 C2280,70 2400,10 2520,40 C2640,70 2760,10 2880,40 L2880,80 L0,80 Z"
            fill="url(#wave-grad)"
          />
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* Rocket back-to-top — it actually launches */}
        <button
          onClick={launch}
          className="group relative text-4xl transition-transform hover:-translate-y-1"
          style={launching ? { animation: "rocket-launch 0.9s cubic-bezier(0.5,0,1,1) forwards" } : undefined}
          aria-label="Back to top"
        >
          🚀
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-base opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
            {launching ? "🔥" : "▲"}
          </span>
        </button>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <a href={profile.platformz} target="_blank" rel="noreferrer" className="transition-colors hover:text-violet">Platformz</a>
          <a href="https://builtbeforecloud.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan">Built Before the Cloud</a>
          {profile.fur4 && (
            <a href={profile.fur4} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber">FUR4</a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan">LinkedIn</a>
          )}
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-cyan">Email</a>
          <a href="https://montyroberts.life" target="_blank" rel="noreferrer" className="transition-colors hover:text-aurora">Monty Roberts Archive</a>
          <a href="https://loraleeroberts.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-aurora">Lora Lee Roberts Archive</a>
        </div>

        <p className="text-xs text-muted">
          {profile.name} · {profile.location} · Building the infrastructure that powers digital business.
        </p>
      </div>
    </footer>
  );
}
