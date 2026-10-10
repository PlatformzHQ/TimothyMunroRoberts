"use client";

import { useEffect, useState } from "react";

// Cinematic "system boot" preloader. Shows once per browser session.
const BOOT_LINES = [
  "> initializing enterprise operating system …",
  "> mounting infrastructure layer … ok",
  "> orchestrating departments … ok",
  "> bringing AI operating layer online … ok",
  "> launching …",
];

export default function Preloader() {
  const [stage, setStage] = useState<"boot" | "exit" | "done">("boot");
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip for returning sessions & reduced motion
    if (
      sessionStorage.getItem("tr-booted") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const raf = requestAnimationFrame(() => setStage("done"));
      return () => cancelAnimationFrame(raf);
    }

    const lineTimer = setInterval(
      () => setLineCount((c) => Math.min(c + 1, BOOT_LINES.length)),
      280
    );
    const progTimer = setInterval(
      () => setProgress((p) => Math.min(p + Math.random() * 14 + 6, 100)),
      130
    );
    const exitTimer = setTimeout(() => {
      setStage("exit");
      sessionStorage.setItem("tr-booted", "1");
      setTimeout(() => setStage("done"), 650);
    }, 1900);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center bg-[#0B1026] transition-opacity duration-600 ${
        stage === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="w-full max-w-md px-6 font-mono text-sm">
        {BOOT_LINES.slice(0, lineCount).map((line) => (
          <p key={line} className="animate-fade-up text-[#22D3EE]" style={{ animationDuration: "0.3s" }}>
            {line}
          </p>
        ))}
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#22D3EE] to-[#F472B6] transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-[#8B93B0]">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
