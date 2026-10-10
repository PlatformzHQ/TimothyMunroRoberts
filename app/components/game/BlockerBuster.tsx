"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "./GameProvider";

// ============================================================================
// BLOCKER BUSTER — hidden mini-game. Blockers (🔥 bugs, deps, scope creep)
// fall toward the sprint board. Click/tap to bust them before they land.
// 30-second run. Score = blockers busted.
// ============================================================================

type Blocker = {
  id: number;
  x: number; // 0–1 (relative)
  y: number; // px
  speed: number;
  emoji: string;
  busted: boolean;
};

const EMOJIS = ["🐛", "🔥", "🧱", "📛", "⛔", "🌀"];
const GAME_SECONDS = 30;

export default function BlockerBuster({ onClose }: { onClose: () => void }) {
  const { unlock, addXp } = useGame();
  const [blockers, setBlockers] = useState<Blocker[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Spawn + fall loop
  useEffect(() => {
    if (!running) return;
    const spawn = setInterval(() => {
      idRef.current += 1;
      setBlockers((b) => [
        ...b,
        {
          id: idRef.current,
          x: 0.08 + Math.random() * 0.84,
          y: -40,
          speed: 1.6 + Math.random() * 2.4 + (GAME_SECONDS - timeLeft) * 0.06,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          busted: false,
        },
      ]);
    }, 650);

    let raf: number;
    const fall = () => {
      const h = arenaRef.current?.clientHeight ?? 400;
      setBlockers((list) => {
        let newMisses = 0;
        const next = list
          .map((b) => ({ ...b, y: b.busted ? b.y : b.y + b.speed }))
          .filter((b) => {
            if (!b.busted && b.y > h - 50) {
              newMisses++;
              return false;
            }
            return b.y < h + 60 && !b.busted;
          });
        if (newMisses) setMissed((m) => m + newMisses);
        return next;
      });
      raf = requestAnimationFrame(fall);
    };
    raf = requestAnimationFrame(fall);

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawn);
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [running, timeLeft]);

  // Award on finish
  useEffect(() => {
    if (done) {
      unlock("blocker-buster");
      addXp(Math.min(score, 40), undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const bust = (id: number) => {
    setBlockers((list) => list.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  const start = () => {
    setBlockers([]);
    setScore(0);
    setMissed(0);
    setTimeLeft(GAME_SECONDS);
    setDone(false);
    setRunning(true);
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Blocker Buster mini-game"
    >
      <div className="glass w-full max-w-lg rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">
            🎯 Blocker Buster <span className="text-xs font-normal text-muted">— hidden mini-game</span>
          </h3>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-md px-2 py-1 text-muted transition-colors hover:text-text"
            aria-label="Close game"
          >
            ✕
          </button>
        </div>

        <div className="mt-2 flex gap-4 font-mono text-xs text-muted">
          <span>⏱ {timeLeft}s</span>
          <span>💥 Busted: {score}</span>
          <span>😱 Reached board: {missed}</span>
        </div>

        <div
          ref={arenaRef}
          className="relative mt-3 h-80 select-none overflow-hidden rounded-xl border border-white/10 bg-black/30"
        >
          {!running && !done && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-center">
              <p className="max-w-xs text-sm text-muted">
                Blockers are falling toward the sprint board. Bust them before they land —
                just like a Tuesday.
              </p>
              <button
                onClick={start}
                className="rounded-lg bg-gradient-to-r from-violet to-cyan px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Start sprint
              </button>
            </div>
          )}

          {done && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-center">
              <p className="font-display text-2xl font-bold text-aurora">
                {score >= 25 ? "Legendary PM!" : score >= 15 ? "Sprint saved!" : "Retro time…"}
              </p>
              <p className="text-sm text-muted">
                {score} blockers busted · {missed} reached the board
              </p>
              <button
                onClick={start}
                className="mt-2 rounded-lg bg-gradient-to-r from-violet to-cyan px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Run it back
              </button>
            </div>
          )}

          {blockers.map((b) => (
            <button
              key={b.id}
              onClick={() => bust(b.id)}
              className="absolute -translate-x-1/2 cursor-crosshair text-2xl transition-transform hover:scale-125"
              style={{ left: `${b.x * 100}%`, top: b.y }}
              aria-label={`Bust blocker ${b.emoji}`}
            >
              {b.emoji}
            </button>
          ))}

          {/* Sprint board at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex h-10 items-center justify-center border-t border-cyan/30 bg-gradient-to-r from-violet/20 to-cyan/20 font-mono text-[10px] tracking-widest text-muted">
            ▓▓ SPRINT BOARD — PROTECT AT ALL COSTS ▓▓
          </div>
        </div>
      </div>
    </div>
  );
}
