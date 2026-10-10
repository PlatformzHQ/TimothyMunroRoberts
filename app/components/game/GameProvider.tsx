"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================================================
// GAME ENGINE — XP, levels, achievements, persisted to localStorage.
// Tune XP values and level thresholds here.
// ============================================================================

const STORAGE_KEY = "tr-portfolio-game-v1";

export const LEVELS = [
  { name: "Visitor", xp: 0 },
  { name: "Explorer", xp: 80 },
  { name: "Insider", xp: 200 },
  { name: "Recruiter Mode", xp: 360 },
];

export type AchievementId =
  | "first-contact"
  | "deep-diver"
  | "konami-master"
  | "blocker-buster"
  | "theme-shifter"
  | "completionist";

export const ACHIEVEMENTS: Record<
  AchievementId,
  { title: string; description: string; icon: string; xp: number }
> = {
  "first-contact": {
    title: "First Contact",
    description: "Opened the contact section",
    icon: "📡",
    xp: 30,
  },
  "deep-diver": {
    title: "Deep Diver",
    description: "Read a full mission debrief",
    icon: "🤿",
    xp: 40,
  },
  "konami-master": {
    title: "Konami Master",
    description: "↑↑↓↓←→←→BA — retro CRT mode unlocked",
    icon: "🕹️",
    xp: 60,
  },
  "blocker-buster": {
    title: "Blocker Buster",
    description: "Found and played the hidden mini-game",
    icon: "🎯",
    xp: 50,
  },
  "theme-shifter": {
    title: "Theme Shifter",
    description: "Toggled the light/dark theme",
    icon: "🌗",
    xp: 15,
  },
  completionist: {
    title: "Completionist",
    description: "Explored every section of the site",
    icon: "🏆",
    xp: 80,
  },
};

const ALL_SECTIONS = [
  "about",
  "skills",
  "missions",
  "projects",
  "dashboard",
  "stats",
  "ventures",
  "community",
  "testimonials",
  "media",
  "audiobooks",
  "services",
  "premium",
  "studio",
  "contact",
];

type Toast = { id: number; title: string; description: string; icon: string };

type GameState = {
  xp: number;
  achievements: AchievementId[];
  sectionsSeen: string[];
};

type GameContextValue = {
  xp: number;
  level: number;
  levelName: string;
  levelProgress: number; // 0–1 toward next level
  achievements: AchievementId[];
  toasts: Toast[];
  addXp: (amount: number, onceKey?: string) => void;
  unlock: (id: AchievementId) => void;
  markSection: (id: string) => void;
  burstConfetti: () => void;
  confettiSignal: number;
};

const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}

export default function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>({
    xp: 0,
    achievements: [],
    sectionsSeen: [],
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confettiSignal, setConfettiSignal] = useState(0);
  const onceKeys = useRef<Set<string>>(new Set());
  const toastId = useRef(0);
  const hydrated = useRef(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as GameState & { onceKeys?: string[] };
          setState({
            xp: saved.xp ?? 0,
            achievements: saved.achievements ?? [],
            sectionsSeen: saved.sectionsSeen ?? [],
          });
          (saved.onceKeys ?? []).forEach((k) => onceKeys.current.add(k));
          (saved.achievements ?? []).forEach((a) => unlockedRef.current.add(a));
        }
      } catch {
        /* corrupted storage — start fresh */
      }
      hydrated.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...state, onceKeys: [...onceKeys.current] })
      );
    } catch {
      /* storage unavailable — gameplay still works in-memory */
    }
  }, [state]);

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { ...toast, id }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const burstConfetti = useCallback(() => setConfettiSignal((n) => n + 1), []);

  const addXp = useCallback((amount: number, onceKey?: string) => {
    if (onceKey) {
      if (onceKeys.current.has(onceKey)) return;
      onceKeys.current.add(onceKey);
    }
    setState((s) => ({ ...s, xp: s.xp + amount }));
  }, []);

  // Side effects (toast/confetti) live OUTSIDE the setState updater —
  // updaters must stay pure (StrictMode double-invokes them).
  const unlockedRef = useRef<Set<AchievementId>>(new Set());
  const unlock = useCallback(
    (id: AchievementId) => {
      if (unlockedRef.current.has(id)) return;
      unlockedRef.current.add(id);
      const a = ACHIEVEMENTS[id];
      pushToast({ title: a.title, description: a.description, icon: a.icon });
      burstConfetti();
      setState((s) =>
        s.achievements.includes(id)
          ? s
          : { ...s, xp: s.xp + a.xp, achievements: [...s.achievements, id] }
      );
    },
    [pushToast, burstConfetti]
  );

  const markSection = useCallback(
    (id: string) => {
      setState((s) => {
        if (s.sectionsSeen.includes(id)) return s;
        const seen = [...s.sectionsSeen, id];
        return { ...s, xp: s.xp + 10, sectionsSeen: seen };
      });
    },
    []
  );

  // Completionist check
  useEffect(() => {
    if (
      hydrated.current &&
      ALL_SECTIONS.every((sec) => state.sectionsSeen.includes(sec)) &&
      !state.achievements.includes("completionist")
    ) {
      unlock("completionist");
    }
  }, [state.sectionsSeen, state.achievements, unlock]);

  // Level-up detection → toast + confetti
  const level = useMemo(() => {
    let lvl = 0;
    LEVELS.forEach((l, i) => {
      if (state.xp >= l.xp) lvl = i;
    });
    return lvl;
  }, [state.xp]);

  const prevLevel = useRef(0);
  useEffect(() => {
    if (hydrated.current && level > prevLevel.current) {
      pushToast({
        title: `Level up — ${LEVELS[level].name}!`,
        description: `You reached ${state.xp} XP`,
        icon: "⬆️",
      });
      burstConfetti();
    }
    prevLevel.current = level;
  }, [level, state.xp, pushToast, burstConfetti]);

  const levelProgress = useMemo(() => {
    const cur = LEVELS[level].xp;
    const next = LEVELS[level + 1]?.xp;
    if (next === undefined) return 1;
    return Math.min(1, (state.xp - cur) / (next - cur));
  }, [state.xp, level]);

  const value = useMemo(
    () => ({
      xp: state.xp,
      level,
      levelName: LEVELS[level].name,
      levelProgress,
      achievements: state.achievements,
      toasts,
      addXp,
      unlock,
      markSection,
      burstConfetti,
      confettiSignal,
    }),
    [state.xp, state.achievements, level, levelProgress, toasts, addXp, unlock, markSection, burstConfetti, confettiSignal]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
