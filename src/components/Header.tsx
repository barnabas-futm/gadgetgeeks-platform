import Link from "next/link";
import Image from "next/image";
import { bookingHref, headlinePrices } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/how-it-works#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-10">
      <div className="bg-navy text-paper/85">
        <p className="mx-auto max-w-6xl px-4 py-1.5 font-mono text-[0.7rem] flex flex-wrap gap-x-3 gap-y-0.5">
          {headlinePrices.map((p) => (
            <span key={p.label}>
              {p.label} <span className="text-accent-bright">{p.price}</span>
            </span>
          ))}
        </p>
      </div>
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/gg-mark.png" alt="" width={30} height={30} priority />
          <span className="font-serif text-xl sm:text-2xl font-medium leading-none">GadgetGeeks</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-navy">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={bookingHref()} className="btn btn-primary shrink-0 whitespace-nowrap px-4 py-2 text-sm">
          Book<span className="hidden min-[400px]:inline">on WhatsApp</span>
        </a>
      </div>
      <nav className="lg:hidden flex flex-wrap gap-x-5 gap-y-2 px-4 pb-3 text-sm font-medium text-muted">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
