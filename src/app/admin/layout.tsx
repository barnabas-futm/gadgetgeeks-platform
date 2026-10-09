import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div>
      <div className="border-b border-line bg-navy text-paper">
        <div className="mx-auto max-w-5xl px-4 h-11 flex items-center gap-6 text-sm">
          <span className="text-paper/60 uppercase tracking-[0.2em] text-xs">Admin</span>
          <Link href="/admin" className="hover:underline underline-offset-4">
            Requests
          </Link>
          <Link href="/admin/customers" className="hover:underline underline-offset-4">
            Customers
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
