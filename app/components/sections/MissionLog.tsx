"use client";

import { useEffect, useRef, useState } from "react";
import { missions, type Mission } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import TiltCard from "../ui/TiltCard";
import { useGame } from "../game/GameProvider";

// Mission number = position from the oldest (M-01) to the newest.
const missionNumber = (m: Mission) => missions.length - missions.indexOf(m);

function MissionModal({ mission, onClose }: { mission: Mission; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Mission debrief: ${mission.codename}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass animate-pop-in max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              {String(missionNumber(mission)).padStart(2, "0")} ·{" "}
              {mission.status === "ACTIVE" ? "● current" : "✓ chapter"}
            </p>
            <h3 className="font-display mt-2 text-2xl font-bold">{mission.codename}</h3>
            <p className="mt-1 text-sm text-muted">
              {mission.role} · {mission.org} · {mission.period}
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-md px-2 py-1 text-muted transition-colors hover:text-text"
            aria-label="Close mission debrief"
          >
            ✕
          </button>
        </div>

        <p className="mt-5 leading-relaxed text-muted">{mission.brief}</p>

        <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.25em] text-violet">⊕ Mandate</h4>
        <ul className="mt-3 space-y-2">
          {mission.objectives.map((o) => (
            <li key={o} className="flex gap-2 text-sm leading-relaxed text-muted">
              <span className="text-cyan" aria-hidden>▸</span> {o}
            </li>
          ))}
        </ul>

        <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.25em] text-magenta">⚔ The hard problem</h4>
        <p className="mt-3 rounded-xl border border-magenta/20 bg-magenta/5 p-4 text-sm leading-relaxed text-muted">
          {mission.bossFight}
        </p>

        <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.25em] text-amber">◆ Outcomes</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {mission.loot.map((l) => (
            <li key={l} className="rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1.5 text-xs text-amber">
              {l}
            </li>
          ))}
        </ul>

        {mission.tech && (
          <>
            <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.25em] text-cyan">⚙ Focus areas</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {mission.tech.map((t) => (
                <li key={t} className="rounded-md border border-cyan/25 bg-cyan/10 px-2.5 py-1 font-mono text-[11px] text-cyan">
                  {t}
                </li>
              ))}
            </ul>
          </>
        )}

        {!["early", "jandg"].includes(mission.id) && (
          <a
            href={`/story/${mission.id}/`}
            className="mt-8 inline-block rounded-lg border border-violet/40 bg-violet/10 px-4 py-2 font-mono text-xs text-violet transition-colors hover:bg-violet/20"
          >
            Read the full case study →
          </a>
        )}
      </div>
    </div>
  );
}

// Career path: a sequential, ordered progression of every role. Click a node
// to open its debrief. Reads as a journey, not a calendar.
function CareerTimeline({ onOpen }: { onOpen: (m: Mission) => void }) {
  // oldest → newest reads as a natural climb
  const ordered = [...missions].reverse();
  return (
    <div className="glass overflow-x-auto rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">Career path</h3>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          tap a step to read more
        </p>
      </div>

      <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-1">
        {ordered.map((m, i) => (
          <div key={m.id} className="flex items-center gap-3">
            <button
              onClick={() => onOpen(m)}
              title={`${m.codename} · ${m.role} · ${m.period}`}
              className="group flex w-32 shrink-0 flex-col gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40"
            >
              <span className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-muted">{m.period.replace(" — Present", " →").replace(/ —.*/, "")}</span>
                {m.status === "ACTIVE" && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" aria-hidden />
                )}
              </span>
              <span className="text-xs font-semibold leading-tight">{m.short}</span>
              <span className="text-[10px] leading-tight text-cyan">{m.role}</span>
            </button>
            {i < ordered.length - 1 && (
              <span className="text-muted" aria-hidden>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionCard({ mission, onOpen, delay }: { mission: Mission; onOpen: (m: Mission) => void; delay: number }) {
  return (
    <Reveal delay={delay}>
      <TiltCard className="h-full">
        <button
          onClick={() => onOpen(mission)}
          className="glass glow-border flex h-full w-full flex-col rounded-2xl p-6 text-left"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-violet">
                {String(missionNumber(mission)).padStart(2, "0")}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                  mission.status === "ACTIVE" ? "bg-cyan/15 text-cyan" : "bg-white/10 text-muted"
                }`}
              >
                {mission.status === "ACTIVE" ? "● current" : "✓ chapter"}
              </span>
            </span>
            <span className="font-mono text-[10px] text-muted">{mission.period}</span>
          </div>
          <h3 className="font-display mt-4 text-xl font-bold">{mission.codename}</h3>
          <p className="mt-1 text-sm font-medium text-cyan">{mission.role}</p>
          <p className="text-xs text-muted">{mission.org}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{mission.brief}</p>
          {mission.tech && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {mission.tech.slice(0, 4).map((t) => (
                <li key={t} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted">
                  {t}
                </li>
              ))}
              {mission.tech.length > 4 && (
                <li className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-cyan">
                  +{mission.tech.length - 4} in debrief
                </li>
              )}
            </ul>
          )}
          <p className="mt-4 font-mono text-xs text-violet transition-colors group-hover:text-cyan">
            Read more →
          </p>
        </button>
      </TiltCard>
    </Reveal>
  );
}

export default function MissionLog() {
  const [openMission, setOpenMission] = useState<Mission | null>(null);
  const { unlock, addXp } = useGame();

  const openDebrief = (m: Mission) => {
    setOpenMission(m);
    addXp(15, `mission-${m.id}`);
    unlock("deep-diver");
  };

  return (
    <Section id="missions" kicker="career history" title={<><span className="text-aurora">Experience</span></>}>
      {/* Career path overview */}
      <Reveal>
        <CareerTimeline onOpen={openDebrief} />
      </Reveal>

      {/* All chapters — newest first */}
      <Reveal>
        <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          every chapter — newest first
        </h3>
      </Reveal>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {missions.map((mission, i) => (
          <MissionCard key={mission.id} mission={mission} onOpen={openDebrief} delay={(i % 3) * 100} />
        ))}
      </div>

      {openMission && <MissionModal mission={openMission} onClose={() => setOpenMission(null)} />}
    </Section>
  );
}
