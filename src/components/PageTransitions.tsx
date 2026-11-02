"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// How long the old page takes to fade out before the new one loads (matches page-leave in globals.css)
const LEAVE_MS = 220;

// Catches clicks on links to other pages of the site, fades the current page out, then navigates.
// The jump back to the top happens while the page is faded out, so it isn't seen.
// Skipped for people who turn off motion on their phone, and for new-tab and modifier clicks.
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const leaving = useRef(false);

  useEffect(() => {
    leaving.current = false;
    document.documentElement.classList.remove("is-leaving");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      e.preventDefault();
      if (leaving.current) return;
      leaving.current = true;
      document.documentElement.classList.add("is-leaving");
      const href = url.pathname + url.search + url.hash;
      window.setTimeout(() => router.push(href), LEAVE_MS);
      // Safety net in case navigation fails, so the page never stays faded out
      window.setTimeout(() => {
        if (leaving.current) {
          leaving.current = false;
          document.documentElement.classList.remove("is-leaving");
        }
      }, 2500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
