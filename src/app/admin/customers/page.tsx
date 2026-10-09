import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { addCustomer } from "@/app/actions";
import { Button, Card, Field, Notice, PageHead, formatDate, inputClass } from "@/components/ui";
import type { Profile } from "@/lib/types";

export const metadata: Metadata = { title: "Customers" };

export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ error?: string; q?: string }> }) {
  const { error, q } = await searchParams;
  const { supabase } = await requireAdmin();
  let query = supabase.from("profiles").select("*").order("created_at", { ascending: false });
  const term = (q ?? "").replace(/[^\p{L}\p{N}@.+\- ]/gu, "").trim();
  if (term) query = query.or(`full_name.ilike.%${term}%,phone.ilike.%${term}%,email.ilike.%${term}%`);
  const { data } = await query;
  const people = (data ?? []) as Profile[];
  const { data: devs } = await supabase.from("devices").select("owner_id");
  const counts = new Map<string, number>();
  (devs ?? []).forEach((d: { owner_id: string }) => counts.set(d.owner_id, (counts.get(d.owner_id) ?? 0) + 1));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <PageHead title="Customers" sub="Everyone with a Device Passport, with or without an account." />

      <Card>
        <h2 className="text-xl">Add a customer</h2>
        <p className="mt-1 text-sm text-muted">For past customers and walk-ins. Ask their permission before recording their details.</p>
        <form action={addCustomer} className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
          <Field label="Full name">
            <input name="full_name" className={inputClass} required />
          </Field>
          <Field label="Phone">
            <input name="phone" type="tel" className={inputClass} />
          </Field>
          <Field label="Email">
            <input name="email" type="email" className={inputClass} />
          </Field>
          <Button type="submit">Add</Button>
        </form>
        <div className="mt-3">
          <Notice error={error} />
        </div>
      </Card>

      <form className="flex gap-2">
        <input name="q" defaultValue={q ?? ""} placeholder="Search name, phone or email" className={inputClass} />
        <Button variant="ghost" type="submit">
          Search
        </Button>
      </form>

      <ul className="divide-y divide-line rounded-xl border border-line bg-white">
        {people.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/customers/${p.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper">
              <div>
                <p className="font-medium">
                  {p.full_name ?? "No name"}
                  {p.role === "admin" && <span className="ml-2 text-xs text-accent">admin</span>}
                </p>
                <p className="text-sm text-muted">
                  {[p.phone, p.email].filter(Boolean).join(" · ") || "No contact details"}
                </p>
              </div>
              <div className="text-right text-sm text-muted">
                <p>{counts.get(p.id) ?? 0} device(s)</p>
                <p className="text-xs">{p.user_id ? "Has account" : "No account"} · {formatDate(p.created_at)}</p>
              </div>
            </Link>
          </li>
        ))}
        {people.length === 0 && <li className="px-5 py-4 text-muted">No customers found.</li>}
      </ul>
    </div>
  );
}
