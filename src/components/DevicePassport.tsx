import { Card, formatDate } from "@/components/ui";
import { services, formatNaira } from "@/lib/site";
import { deviceKinds, storageTypes, type Device, type ServiceRecord } from "@/lib/types";

function warrantyText(date: string | null) {
  if (!date) return "Not recorded";
  const days = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  if (days < 0) return `Ended ${formatDate(date)}`;
  if (days <= 60) return `Ends ${formatDate(date)} (${days} days left)`;
  return `Until ${formatDate(date)}`;
}

function ageText(date: string | null) {
  if (!date) return "Not recorded";
  const months = Math.floor((Date.now() - new Date(date).getTime()) / (30.44 * 86400000));
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const y = Math.floor(months / 12);
  return `${y} year${y === 1 ? "" : "s"}${months % 12 ? `, ${months % 12} mo` : ""}`;
}

export function serviceName(slug: string) {
  return services.find((s) => s.slug === slug)?.name ?? slug.replace(/_/g, " ");
}

export function DevicePassport({ device: d, records }: { device: Device; records: ServiceRecord[] }) {
  const kind = deviceKinds.find((k) => k.value === d.kind)?.label ?? d.kind;
  const storageType = storageTypes.find((s) => s.value === d.storage_type)?.label;
  const rows: [string, string][] = [
    ["Type", kind],
    ["Operating system", d.os ?? "—"],
    ["Processor", d.cpu ?? "—"],
    ["RAM", d.ram_gb ? `${d.ram_gb} GB` : "—"],
    ["Storage", d.storage_gb ? `${d.storage_gb} GB${storageType ? ` · ${storageType}` : ""}` : storageType ?? "—"],
    ["Battery health", d.battery_health_pct != null ? `${d.battery_health_pct}%` : "—"],
    ["Age", ageText(d.purchase_date)],
    ["Warranty", warrantyText(d.warranty_expires)],
    ["Serial number", d.serial_number ?? "—"],
  ];

  return (
    <div className="space-y-8">
      <Card className="p-0 overflow-hidden">
        <dl className="grid sm:grid-cols-2">
          {rows.map(([k, v]) => (
            <div key={k} className="border-b border-line px-5 py-3.5 sm:[&:nth-child(odd)]:border-r">
              <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
              <dd className="mt-0.5">{v}</dd>
            </div>
          ))}
        </dl>
        {(d.installed_software?.length ?? 0) > 0 && (
          <div className="px-5 py-4 border-b border-line">
            <p className="text-xs uppercase tracking-wider text-muted">Installed software</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {d.installed_software!.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {d.notes && <p className="px-5 py-4 text-sm text-muted whitespace-pre-line">{d.notes}</p>}
      </Card>

      <section>
        <h2 className="text-2xl">Service history</h2>
        {records.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No services recorded yet.</p>
        ) : (
          <ol className="mt-4 border-l-2 border-line pl-5 space-y-6">
            {records.map((r) => (
              <li key={r.id} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-accent" />
                <p className="text-xs text-muted">{formatDate(r.performed_on)}</p>
                <p className="font-medium">{serviceName(r.service_slug)}</p>
                <p className="text-sm text-muted">{r.summary}</p>
                <p className="mt-1 text-xs text-muted">
                  {r.boot_seconds_before != null && r.boot_seconds_after != null &&
                    `Boot time ${r.boot_seconds_before}s → ${r.boot_seconds_after}s`}
                  {r.amount_ngn != null && ` · ${formatNaira(r.amount_ngn)}`}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
