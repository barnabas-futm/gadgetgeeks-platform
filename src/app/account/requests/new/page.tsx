import type { Metadata } from "next";
import { requireProfile } from "@/lib/auth";
import { createRequest } from "@/app/actions";
import { Button, Field, Notice, PageHead, inputClass } from "@/components/ui";
import { services } from "@/lib/site";
import type { Device } from "@/lib/types";

export const metadata: Metadata = { title: "Request a service" };

export default async function NewRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; device?: string; service?: string }>;
}) {
  const { error, device, service } = await searchParams;
  const { supabase, profile } = await requireProfile();
  const { data } = await supabase.from("devices").select("id, brand, model").eq("owner_id", profile.id);
  const devices = (data ?? []) as Pick<Device, "id" | "brand" | "model">[];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8">
      <PageHead title="Request a service" sub="Tell us what you need. We confirm the price and time before any work starts." />
      <Notice error={error} />
      <form action={createRequest} className="space-y-5">
        <Field label="Service">
          <select name="service_slug" defaultValue={service ?? ""} className={inputClass} required>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="not_sure">Not sure — something is wrong</option>
          </select>
        </Field>
        <Field label="Which device?" hint={devices.length ? undefined : "You can add your device later."}>
          <select name="device_id" defaultValue={device ?? ""} className={inputClass}>
            <option value="">{devices.length ? "Not listed / a new device" : "No devices added yet"}</option>
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.brand} {d.model}
              </option>
            ))}
          </select>
        </Field>
        <Field label="What is happening, or what do you want done?">
          <textarea name="description" rows={4} className={inputClass} placeholder="My laptop takes 5 minutes to start and freezes when I open Chrome." />
        </Field>
        <Field label="When suits you?" hint="Day and time, or 'any weekday evening'.">
          <input name="preferred_time" className={inputClass} />
        </Field>
        <Button type="submit">Send request</Button>
      </form>
    </div>
  );
}
