"use client";

import { useEffect, useRef } from "react";

// Glowing orb cursor that lerps toward the pointer and grows over
// interactive elements. Hidden on touch devices & reduced motion (CSS).
export default function CustomCursor() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const orb = orbRef.current;
    if (!orb) return;

    let mx = -100;
    let my = -100;
    let x = -100;
    let y = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      orb.classList.toggle("is-hovering", !!interactive);
    };

    const loop = () => {
      x += (mx - x) * 0.18;
      y += (my - y) * 0.18;
      orb.style.transform = `translate(${x - 11}px, ${y - 11}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={orbRef} className="cursor-orb" aria-hidden />;
}
