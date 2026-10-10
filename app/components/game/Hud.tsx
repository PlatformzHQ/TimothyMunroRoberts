"use client";

import { useRef, useState } from "react";
import { useGame, LEVELS } from "./GameProvider";
import BlockerBuster from "./BlockerBuster";

// Persistent XP HUD (bottom-left) + achievement toast stack (bottom-right).
// 🥚 Easter egg: click the level badge 5 times to open the hidden mini-game.
export default function Hud() {
  const { xp, level, levelName, levelProgress, toasts, achievements } = useGame();
  const [gameOpen, setGameOpen] = useState(false);
  const clicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBadgeClick = () => {
    clicks.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => (clicks.current = 0), 1600);
    if (clicks.current >= 5) {
      clicks.current = 0;
      setGameOpen(true);
    }
  };

  const nextLevel = LEVELS[level + 1];

  return (
    <>
      {/* XP bar */}
      <div className="glass fixed bottom-4 left-4 z-[80] w-44 rounded-xl p-3 shadow-lg sm:w-56">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleBadgeClick}
            className="font-display cursor-pointer rounded-md bg-gradient-to-r from-violet to-cyan px-2 py-0.5 text-xs font-bold text-white transition-transform hover:scale-105"
            title="LV badge"
            aria-label={`Level ${level + 1}: ${levelName}`}
          >
            LV{level + 1}
          </button>
          <span className="truncate text-xs font-medium">{levelName}</span>
          <span className="font-mono text-[10px] text-muted">{xp} XP</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={Math.round(levelProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress to next level"
        >
          <div className="xp-fill h-full rounded-full" style={{ width: `${levelProgress * 100}%` }} />
        </div>
        <p className="mt-1.5 text-[10px] text-muted">
          {nextLevel ? `${nextLevel.xp - xp} XP to ${nextLevel.name}` : "Max level reached 🎉"}
          {" · "}
          {achievements.length} 🏅
        </p>
      </div>

      {/* Toasts */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[85] flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-2 sm:w-72">
        {toasts.map((t) => (
          <div key={t.id} className="glass animate-pop-in rounded-xl p-3 shadow-xl">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span aria-hidden>{t.icon}</span> {t.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">{t.description}</p>
          </div>
        ))}
      </div>

      {gameOpen && <BlockerBuster onClose={() => setGameOpen(false)} />}
    </>
  );
}
