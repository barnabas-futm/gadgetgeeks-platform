"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/how-it-works#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

// The FAQ link points into How it works, so only the page link itself is marked as current
export function NavLinks({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {links.map((l) => {
        const current = !l.href.includes("#") && l.href === pathname;
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={current ? "page" : undefined}
            className={`border-b-2 pb-0.5 transition-colors ${
              current ? "border-accent text-navy font-semibold" : "border-transparent hover:text-navy"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
