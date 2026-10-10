"use client";

import { useEffect } from "react";

// Embeds the YouTube player only after the user clicks play — keeps the page
// light and Lighthouse-friendly (no iframes on initial load). Shared by the
// podcast and audiobook sections.
export default function VideoLightbox({
  id,
  title,
  onClose,
}: {
  id: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-pop-in w-full max-w-3xl">
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="text-sm font-medium">{title}</p>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-muted transition-colors hover:text-text" aria-label="Close video">
            ✕
          </button>
        </div>
        <div className="glow-border overflow-hidden rounded-2xl">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
