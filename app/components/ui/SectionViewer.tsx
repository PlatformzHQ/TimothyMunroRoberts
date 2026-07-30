"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import About from "../sections/About";
import MissionLog from "../sections/MissionLog";
import Philosophy from "../sections/Philosophy";
import Platformz from "../sections/Platformz";
import Fur4 from "../sections/Fur4";
import Contact from "../sections/Contact";

// Click-to-view: nav links open the section in an instant overlay instead of
// jumping down the page. The scroll page stays intact underneath.
const VIEWS: Record<string, { label: string; node: React.ReactNode }> = {
  "#about": { label: "Profile", node: <About /> },
  "#missions": { label: "Experience", node: <MissionLog /> },
  "#philosophy": { label: "Philosophy", node: <Philosophy /> },
  "#platformz": { label: "Platformz", node: <Platformz /> },
  "#fur4": { label: "FUR4", node: <Fur4 /> },
  "#contact": { label: "Contact", node: <Contact /> },
};

type ViewerContextValue = {
  /** Open a section by href (e.g. "#about"). Returns true if handled. */
  openView: (href: string) => boolean;
};

const ViewerContext = createContext<ViewerContextValue | null>(null);

export function useSectionViewer() {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error("useSectionViewer must be used inside SectionViewerProvider");
  return ctx;
}

export default function SectionViewerProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<string | null>(null);

  const openView = useCallback((href: string) => {
    if (!VIEWS[href]) return false;
    setView(href);
    return true;
  }, []);

  const close = useCallback(() => setView(null), []);

  // Escape closes; lock body scroll while open
  useEffect(() => {
    if (!view) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [view, close]);

  const current = view ? VIEWS[view] : null;

  return (
    <ViewerContext.Provider value={{ openView }}>
      {children}

      {current && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={current.label}>
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-label="Close"
            tabIndex={-1}
          />

          {/* Panel */}
          <div className="animate-pop-in absolute inset-x-0 bottom-0 top-4 sm:inset-4 sm:top-6">
            <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-bg shadow-2xl sm:rounded-3xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{current.label}</p>
                <button
                  onClick={close}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:text-cyan"
                  aria-label="Close viewer"
                >
                  ✕
                </button>
              </div>
              {/* Content — the actual section, scrollable in place */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 [&>section]:!py-10">
                {current.node}
              </div>
            </div>
          </div>
        </div>
      )}
    </ViewerContext.Provider>
  );
}
