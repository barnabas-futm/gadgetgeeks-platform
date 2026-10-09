import Link from "next/link";
import Image from "next/image";
import { bookingHref } from "@/lib/site";
import { getSession } from "@/lib/auth";
import { signOut } from "@/app/auth-actions";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

export async function Header() {
  const { user, profile } = await getSession().catch(() => ({ user: null, profile: null }));

  const accountLinks = user ? (
    <>
      <Link href="/account" className="hover:text-navy">
        My devices
      </Link>
      {profile?.role === "admin" && (
        <Link href="/admin" className="hover:text-navy">
          Admin
        </Link>
      )}
      <form action={signOut}>
        <button className="hover:text-navy cursor-pointer">Sign out</button>
      </form>
    </>
  ) : (
    <Link href="/login" className="hover:text-navy">
      Sign in
    </Link>
  );

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/gg-mark.png" alt="" width={30} height={30} priority />
          <span className="font-serif text-2xl leading-none">GadgetGeeks</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-navy">
              {l.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-line" />
          {accountLinks}
        </nav>
        <a href={bookingHref()} className="rounded-full bg-navy text-paper text-sm px-4 py-2 hover:bg-navy-soft shrink-0">
          Book a service
        </a>
      </div>
      <nav className="md:hidden flex flex-wrap gap-x-5 gap-y-2 px-4 pb-3 text-sm text-muted">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        {accountLinks}
      </nav>
    </header>
  );
}
