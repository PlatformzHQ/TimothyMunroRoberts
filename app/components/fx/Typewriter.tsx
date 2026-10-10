"use client";

import { useEffect, useState } from "react";

// Typewriter that cycles through phrases (types, pauses, deletes, next).
export default function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setText(phrases[0]));
      return () => cancelAnimationFrame(raf);
    }
    const current = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2100);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, 60);
    } else {
      timeout = setTimeout(
        () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
        deleting ? 28 : 60
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases]);

  return (
    <span aria-label={phrases[index % phrases.length]}>
      {text}
      <span className="cursor-blink text-cyan" aria-hidden>
        ▌
      </span>
    </span>
  );
}
