import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <p className="font-serif text-lg text-navy">{site.legalName}</p>
          <p>Registered business name, {site.rcNumber}</p>
          <p>{site.location}</p>
        </div>
        <div className="sm:text-right">
          <a href={`mailto:${site.email}`} className="hover:text-navy">
            {site.email}
          </a>
          <p className="mt-1">© {new Date().getFullYear()} {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
