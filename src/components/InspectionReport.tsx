// A sample of the report customers get from Laptop buying help.
// Keep it labelled "Sample" until it can be replaced with a real report (with the customer's permission).

const readings = [
  { item: "Processor", value: "Core i5-8365U", ok: true, note: "matches listing" },
  { item: "Memory", value: "16 GB", ok: true, note: "matches listing" },
  { item: "Storage", value: "512 GB NVMe", ok: true, note: "good · 412 h" },
  { item: "Battery", value: "71%", ok: false, note: "of design capacity" },
  { item: "Screen", value: "No dead pixels", ok: true },
  { item: "Keyboard / ports", value: "All working", ok: true },
  { item: "BIOS / company lock", value: "None", ok: true },
  { item: "Charger", value: "65 W original", ok: true },
];

export function InspectionReport() {
  return (
    <div className="cut cut-lg bg-line p-px">
      <div className="cut cut-lg bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          <p className="label">Inspection report</p>
          <span className="cut cut-sm bg-navy px-2 py-0.5 font-mono text-[0.7rem] text-paper">SAMPLE</span>
        </div>
        <div className="px-5 pt-4">
          <p className="font-display text-xl font-bold">HP EliteBook 840 G6</p>
          <p className="label mt-0.5">UK-used · checked in Gidan Kwano</p>
        </div>
        <dl className="mt-3 px-5 font-mono text-[0.8rem]">
          {readings.map((r) => (
            <div key={r.item} className="flex items-baseline gap-2 border-b border-dashed border-line py-2 last:border-0">
              <dt className="text-muted shrink-0">{r.item}</dt>
              <span className="flex-1" />
              <dd className="text-right">
                {r.value}
                {r.note && <span className="text-muted"> · {r.note}</span>}
              </dd>
              <span
                aria-label={r.ok ? "pass" : "check"}
                className={`w-4 shrink-0 text-center font-semibold ${r.ok ? "text-accent" : "text-amber-600"}`}
              >
                {r.ok ? "✓" : "!"}
              </span>
            </div>
          ))}
        </dl>
        <div className="mt-2 bg-navy px-5 py-4 text-paper">
          <p className="font-mono text-[0.7rem] text-accent-bright">VERDICT</p>
          <p className="mt-1 text-sm leading-relaxed">
            Buy. The battery will need replacing within a year, so ask the seller to take the cost of a new one off the
            price.
          </p>
        </div>
      </div>
    </div>
  );
}
