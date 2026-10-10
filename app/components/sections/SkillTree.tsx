"use client";

import { useState } from "react";
import { skillTree, type SkillNode } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import { useGame } from "../game/GameProvider";

const BRANCHES = ["Architecture", "Innovation", "Leadership"] as const;

const BRANCH_COLOR: Record<(typeof BRANCHES)[number], string> = {
  Architecture: "var(--cyan)",
  Innovation: "var(--magenta)",
  Leadership: "var(--violet)",
};

function Node({ node, color }: { node: SkillNode; color: string }) {
  const [open, setOpen] = useState(false);
  const { addXp } = useGame();

  const toggle = () => {
    setOpen((o) => !o);
    addXp(5, `skill-${node.id}`);
  };

  return (
    <div>
      <button
        onClick={toggle}
        aria-expanded={open}
        className="glass group flex w-full items-center gap-3 rounded-xl p-3.5 text-left transition-all duration-300 hover:-translate-y-0.5"
        style={open ? { borderColor: color, boxShadow: `0 0 24px -6px ${color}` } : undefined}
      >
        {/* Node orb */}
        <span
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-300"
          style={{
            borderColor: color,
            background: open ? color : "transparent",
            color: open ? "var(--bg)" : color,
            boxShadow: open ? `0 0 18px ${color}` : "none",
          }}
          aria-hidden
        >
          {node.level}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">{node.name}</span>
          {/* proficiency pips */}
          <span className="mt-1.5 flex gap-1" aria-label={`Proficiency ${node.level} of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="h-1 w-5 rounded-full transition-all duration-500"
                style={{
                  background: i < node.level ? color : "rgba(255,255,255,0.12)",
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            ))}
          </span>
        </span>
        <span className="text-muted transition-transform duration-300 group-aria-expanded:rotate-45" aria-hidden>
          +
        </span>
      </button>

      {/* Expanded: real example */}
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="mx-3 mb-1 mt-2 border-l-2 pl-4 text-sm leading-relaxed text-muted" style={{ borderColor: color }}>
            {node.example}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SkillTree() {
  return (
    <Section id="skills" kicker="core competencies" title={<>Areas of <span className="text-aurora">Expertise</span></>}>
      <p className="-mt-4 mb-8 max-w-xl text-sm text-muted">
        Click any node to expand it — each one opens a real example from three decades of building.
      </p>
      <div className="grid gap-8 lg:grid-cols-3">
        {BRANCHES.map((branch, bi) => (
          <Reveal key={branch} delay={bi * 130}>
            <div>
              <h3
                className="font-mono text-xs uppercase tracking-[0.25em]"
                style={{ color: BRANCH_COLOR[branch] }}
              >
                ◈ {branch}
              </h3>
              {/* connector line */}
              <div className="mt-4 space-y-3 border-l border-dashed border-white/15 pl-4">
                {skillTree
                  .filter((n) => n.branch === branch)
                  .map((node) => (
                    <Node key={node.id} node={node} color={BRANCH_COLOR[branch]} />
                  ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
