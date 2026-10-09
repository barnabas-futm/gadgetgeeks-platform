import Link from "next/link";

export const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-[15px] text-navy placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-navy/30";

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles = {
    primary: "bg-navy text-paper hover:bg-navy-soft",
    ghost: "border border-navy text-navy hover:bg-navy hover:text-paper",
    danger: "border border-red-700 text-red-700 hover:bg-red-700 hover:text-white",
  }[variant];
  return (
    <button {...rest} className={`rounded-full px-5 py-2.5 text-sm cursor-pointer ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-navy text-paper hover:bg-navy-soft"
      : "border border-navy text-navy hover:bg-navy hover:text-paper";
  return (
    <Link href={href} className={`inline-block rounded-full px-5 py-2.5 text-sm ${styles}`}>
      {children}
    </Link>
  );
}

export function Notice({ error, message }: { error?: string; message?: string }) {
  if (error)
    return <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>;
  if (message)
    return <p className="rounded-lg border border-line bg-white px-4 py-3 text-sm text-navy">{message}</p>;
  return null;
}

export function PageHead({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {sub && <p className="mt-2 text-muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-white p-5 ${className}`}>{children}</div>;
}

export function StatusPill({ status, label }: { status: string; label: string }) {
  const tone: Record<string, string> = {
    new: "bg-amber-50 text-amber-800 border-amber-200",
    confirmed: "bg-sky-50 text-sky-800 border-sky-200",
    in_progress: "bg-indigo-50 text-indigo-800 border-indigo-200",
    done: "bg-emerald-50 text-emerald-800 border-emerald-200",
    cancelled: "bg-gray-100 text-gray-600 border-gray-200",
    referred: "bg-purple-50 text-purple-800 border-purple-200",
  };
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${tone[status] ?? tone.cancelled}`}>
      {label}
    </span>
  );
}

export function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
