import Link from "next/link";
import Image from "next/image";
import { bookingHref } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/gg-mark.png" alt="" width={30} height={30} priority />
          <span className="font-serif text-2xl leading-none">GadgetGeeks</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-navy">
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={bookingHref()}
          className="rounded-full bg-navy text-paper text-sm px-4 py-2 hover:bg-navy-soft"
        >
          Book a service
        </a>
      </div>
      <nav className="sm:hidden flex gap-5 px-4 pb-3 text-sm text-muted">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
