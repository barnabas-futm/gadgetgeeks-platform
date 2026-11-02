"use client";

import { useEffect, useState } from "react";

// Appears once you've scrolled down a screen or so. Smooth scroll comes from the CSS
// (and is skipped for people who turn off motion on their phone).
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`back-to-top btn btn-primary fixed right-4 z-30 h-12 w-12 justify-center p-0 text-lg shadow-lg cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
