"use client";

import Image from "next/image";
import portrait from "../../assets/portrait.jpg";
import { profile, heroStats } from "../../content";
import ParticleField from "../fx/ParticleField";
import Typewriter from "../fx/Typewriter";
import Magnetic from "../fx/Magnetic";
import CountUp from "../fx/CountUp";

// Kinetic headline: each letter animates in individually.
// Letters are grouped per word so lines never break mid-word.
function KineticText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  let letterIndex = 0;
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block" aria-hidden>
          {word.split("").map((char, ci) => {
            const delay = baseDelay + letterIndex++ * 35;
            return (
              <span key={`${char}-${ci}`} className="kinetic-letter" style={{ animationDelay: `${delay}ms` }}>
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-28">
      <ParticleField />

      {/* Floating 3D-ish shapes */}
      <div className="animate-float-slow pointer-events-none absolute right-[8%] top-[18%] h-24 w-24 rounded-2xl border border-violet/40 bg-violet/10 backdrop-blur-sm [transform:rotate3d(1,1,0,30deg)]" aria-hidden />
      <div className="animate-float-slow pointer-events-none absolute left-[6%] top-[60%] h-16 w-16 rounded-full border border-cyan/40 bg-cyan/10 backdrop-blur-sm" style={{ animationDelay: "-3s" }} aria-hidden />
      <div className="animate-float-slow pointer-events-none absolute right-[20%] bottom-[12%] h-12 w-12 rotate-45 border border-magenta/40 bg-magenta/10 backdrop-blur-sm" style={{ animationDelay: "-5s" }} aria-hidden />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
        {/* Portrait — centered above the headline on mobile, right column on desktop */}
        <div className="animate-fade-up mb-8 flex justify-center lg:hidden">
          <div className="portrait-frame animate-float-slow w-40">
            <div className="portrait-duotone">
              <Image src={portrait} alt="Portrait of Timothy Munro Roberts" priority className="h-auto w-full" />
            </div>
          </div>
        </div>

        <p className="animate-fade-up font-mono text-sm text-cyan">
          {profile.identity}
        </p>

        <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          <KineticText text={profile.shortName} baseDelay={200} />
          <span className="text-aurora block text-3xl sm:text-5xl">
            <KineticText text="builds the systems that run the business." baseDelay={600} />
          </span>
        </h1>

        <p className="animate-fade-up mt-7 min-h-14 font-mono text-lg text-text sm:min-h-9 sm:text-2xl" style={{ animationDelay: "1.4s" }}>
          <Typewriter phrases={profile.roles} />
        </p>

        <p className="animate-fade-up mt-5 max-w-xl leading-relaxed text-muted" style={{ animationDelay: "1.6s" }}>
          {profile.pitch}
        </p>

        <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "1.8s" }}>
          <Magnetic>
            <a
              href="#missions"
              className="inline-block rounded-xl bg-gradient-to-r from-violet via-magenta to-amber bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition-all hover:bg-right hover:shadow-violet/50"
            >
              View Experience
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="glass glow-border inline-block rounded-xl px-7 py-3.5 text-sm font-semibold transition-colors hover:text-cyan"
            >
              Get in touch
            </a>
          </Magnetic>
          <a
            href={profile.platformz}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-amber/40 bg-amber/10 px-4 py-3.5 text-sm font-medium text-amber transition-all hover:-translate-y-0.5 hover:bg-amber/20"
          >
            ↗ Visit Platformz
          </a>
        </div>

        {/* Animated counters */}
        <div className="animate-fade-up mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4" style={{ animationDelay: "2s" }}>
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-text">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs leading-snug text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        </div>

        {/* Portrait — desktop right column */}
        <div className="animate-fade-up hidden justify-center lg:flex" style={{ animationDelay: "600ms" }}>
          <div className="portrait-frame animate-float-slow w-full max-w-sm">
            <div className="portrait-duotone">
              <Image src={portrait} alt="Portrait of Timothy Munro Roberts" priority className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-cyan"
        aria-label="Scroll to About section"
      >
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-current p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
