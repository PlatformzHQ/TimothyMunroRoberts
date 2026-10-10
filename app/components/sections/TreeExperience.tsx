"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Section from "../ui/Section";
import { treeNodes } from "../../content";
import { useGame } from "../game/GameProvider";
import TreeErrorBoundary from "../tree/TreeErrorBoundary";

// Heavy 3D scene — loaded only on the client, only when this section mounts.
const TreeScene = dynamic(() => import("../tree/TreeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-cyan" aria-hidden />
    </div>
  ),
});

export default function TreeExperience() {
  const { addXp, unlock } = useGame();
  const [lit, setLit] = useState(false);

  const pick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    addXp(5, `tree-${href}`);
    if (!lit) {
      setLit(true);
      unlock("blocker-buster"); // reward for engaging with the tree
    }
  };

  return (
    <Section
      id="tree"
      kicker="the living résumé"
      title={
        <>
          My career, as a <span className="text-aurora">tree</span>
        </>
      }
    >
      <p className="-mt-4 mb-6 max-w-2xl text-sm text-muted">
        Every branch is a part of the story. Drag to look around, and tap a label to jump
        straight to that part of the site.
      </p>

      <div className="glass relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl">
        <TreeErrorBoundary
          fallback={
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="text-5xl" aria-hidden>🌳</p>
              <p className="max-w-sm text-sm text-muted">
                Your browser couldn&apos;t render the 3D tree — but every branch is right below.
              </p>
            </div>
          }
        >
          <TreeScene onPick={pick} />
        </TreeErrorBoundary>
      </div>

      {/* Always-available quick nav under the canvas (mobile-friendly + a11y) */}
      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {treeNodes.map((n) => (
          <li key={n.href}>
            <button
              onClick={() => pick(n.href)}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan hover:text-cyan"
            >
              {n.label}
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
