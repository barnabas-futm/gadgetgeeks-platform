import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-paper/70 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex flex-col sm:flex-row gap-6 justify-between">
        <div>
          <p className="font-serif text-xl text-paper">{site.legalName}</p>
          <p className="mt-2 font-mono text-xs">Registered business name · {site.rcNumber}</p>
          <p className="font-mono text-xs">{site.location}</p>
        </div>
        <div className="sm:text-right">
          <a href={`mailto:${site.email}`} className="hover:text-paper">
            {site.email}
          </a>
          <p className="mt-1 font-mono text-xs">
            © {new Date().getFullYear()} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
