import { saveDevice } from "@/app/actions";
import { Button, Field, inputClass } from "@/components/ui";
import { deviceKinds, storageTypes, type Device } from "@/lib/types";

export function DeviceForm({ device, ownerId, back }: { device?: Device; ownerId?: string; back: string }) {
  const d = device;
  return (
    <form action={saveDevice} className="space-y-8">
      {d && <input type="hidden" name="id" value={d.id} />}
      {ownerId && <input type="hidden" name="owner_id" value={ownerId} />}
      <input type="hidden" name="back" value={back} />

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-2xl">The device</legend>
        <Field label="Type">
          <select name="kind" defaultValue={d?.kind ?? "laptop"} className={inputClass}>
            {deviceKinds.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Brand">
          <input name="brand" defaultValue={d?.brand ?? ""} className={inputClass} placeholder="HP" required />
        </Field>
        <Field label="Model" className="sm:col-span-2">
          <input name="model" defaultValue={d?.model ?? ""} className={inputClass} placeholder="EliteBook x360 1030 G3" required />
        </Field>
        <Field label="Serial number" hint="Optional. Helps with warranty claims.">
          <input name="serial_number" defaultValue={d?.serial_number ?? ""} className={inputClass} />
        </Field>
        <Field label="Operating system">
          <input name="os" defaultValue={d?.os ?? ""} className={inputClass} placeholder="Windows 11 Pro" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-2xl">Specs</legend>
        <Field label="Processor" className="sm:col-span-2">
          <input name="cpu" defaultValue={d?.cpu ?? ""} className={inputClass} placeholder="Intel Core i7-8650U" />
        </Field>
        <Field label="RAM (GB)">
          <input name="ram_gb" type="number" min="0" step="1" defaultValue={d?.ram_gb ?? ""} className={inputClass} />
        </Field>
        <Field label="Storage (GB)">
          <input name="storage_gb" type="number" min="0" step="1" defaultValue={d?.storage_gb ?? ""} className={inputClass} />
        </Field>
        <Field label="Storage type">
          <select name="storage_type" defaultValue={d?.storage_type ?? ""} className={inputClass}>
            <option value="">Not sure</option>
            {storageTypes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Battery health (%)" hint="From a battery report, if known.">
          <input name="battery_health_pct" type="number" min="0" max="100" defaultValue={d?.battery_health_pct ?? ""} className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-2xl">Ownership</legend>
        <Field label="Bought on">
          <input name="purchase_date" type="date" defaultValue={d?.purchase_date ?? ""} className={inputClass} />
        </Field>
        <Field label="Warranty ends">
          <input name="warranty_expires" type="date" defaultValue={d?.warranty_expires ?? ""} className={inputClass} />
        </Field>
        <Field label="Installed software" hint="Separate with commas." className="sm:col-span-2">
          <textarea
            name="installed_software"
            rows={2}
            defaultValue={d?.installed_software?.join(", ") ?? ""}
            className={inputClass}
            placeholder="Microsoft Office, SolidWorks, Chrome"
          />
        </Field>
        <Field label="Notes" className="sm:col-span-2">
          <textarea name="notes" rows={3} defaultValue={d?.notes ?? ""} className={inputClass} />
        </Field>
      </fieldset>

      <Button type="submit">{d ? "Save changes" : "Add device"}</Button>
    </form>
  );
}
