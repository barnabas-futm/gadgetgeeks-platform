"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireProfile } from "@/lib/auth";
import { list, num, str, withError } from "@/lib/form";
import type { RequestStatus } from "@/lib/types";

// ---------- Devices ----------

function deviceFields(fd: FormData) {
  const battery = num(fd, "battery_health_pct");
  return {
    kind: str(fd, "kind") ?? "laptop",
    brand: str(fd, "brand"),
    model: str(fd, "model"),
    serial_number: str(fd, "serial_number"),
    cpu: str(fd, "cpu"),
    ram_gb: num(fd, "ram_gb"),
    storage_type: str(fd, "storage_type"),
    storage_gb: num(fd, "storage_gb"),
    os: str(fd, "os"),
    battery_health_pct: battery === null ? null : Math.max(0, Math.min(100, battery)),
    purchase_date: str(fd, "purchase_date"),
    warranty_expires: str(fd, "warranty_expires"),
    installed_software: list(fd, "installed_software"),
    notes: str(fd, "notes"),
    updated_at: new Date().toISOString(),
  };
}

export async function saveDevice(fd: FormData) {
  const { supabase, profile } = await requireProfile();
  const isAdmin = profile.role === "admin";
  const id = str(fd, "id");
  const back = str(fd, "back") ?? "/account";
  const fields = deviceFields(fd);
  if (!fields.brand || !fields.model) redirect(withError(back, "Brand and model are required."));

  // Admin may save a device for any customer; customers only for themselves.
  const owner_id = isAdmin ? (str(fd, "owner_id") ?? profile.id) : profile.id;
  const base = isAdmin ? "/admin/devices" : "/account/devices";

  if (id) {
    const { error } = await supabase.from("devices").update(fields).eq("id", id);
    if (error) redirect(withError(back, error.message));
    revalidatePath(`${base}/${id}`);
    redirect(`${base}/${id}`);
  }

  const { data, error } = await supabase.from("devices").insert({ ...fields, owner_id }).select("id").single();
  if (error || !data) redirect(withError(back, error?.message ?? "Could not save the device."));
  redirect(`${base}/${data.id}`);
}

export async function deleteDevice(fd: FormData) {
  const { supabase, profile } = await requireProfile();
  const id = str(fd, "id");
  if (id) await supabase.from("devices").delete().eq("id", id);
  redirect(profile.role === "admin" ? "/admin/customers" : "/account");
}

// ---------- Service records (admin) ----------

export async function addServiceRecord(fd: FormData) {
  const { supabase, profile } = await requireAdmin();
  const device_id = str(fd, "device_id");
  const back = `/admin/devices/${device_id}`;
  const summary = str(fd, "summary");
  const service_slug = str(fd, "service_slug");
  if (!device_id || !summary || !service_slug) redirect(withError(back, "Service and summary are required."));

  const { error } = await supabase.from("service_records").insert({
    device_id,
    service_slug,
    summary,
    performed_on: str(fd, "performed_on") ?? new Date().toISOString().slice(0, 10),
    amount_ngn: num(fd, "amount_ngn"),
    boot_seconds_before: num(fd, "boot_seconds_before"),
    boot_seconds_after: num(fd, "boot_seconds_after"),
    created_by: profile.id,
  });
  if (error) redirect(withError(back, error.message));
  revalidatePath(back);
  redirect(back);
}

// ---------- Service requests ----------

export async function createRequest(fd: FormData) {
  const { supabase, profile } = await requireProfile();
  const service_slug = str(fd, "service_slug");
  if (!service_slug) redirect(withError("/account/requests/new", "Choose a service."));

  const { data, error } = await supabase
    .from("service_requests")
    .insert({
      customer_id: profile.id,
      device_id: str(fd, "device_id"),
      service_slug,
      description: str(fd, "description"),
      preferred_time: str(fd, "preferred_time"),
    })
    .select("id")
    .single();
  if (error || !data) redirect(withError("/account/requests/new", error?.message ?? "Could not send the request."));
  redirect(`/account/requests/${data.id}?sent=1`);
}

const statuses: RequestStatus[] = ["new", "confirmed", "in_progress", "done", "cancelled", "referred"];

export async function updateRequestStatus(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");
  const status = str(fd, "status") as RequestStatus | null;
  if (id && status && statuses.includes(status)) {
    await supabase.from("service_requests").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  }
  revalidatePath("/admin");
  redirect(str(fd, "back") ?? "/admin");
}

// ---------- Customers (admin) ----------

export async function addCustomer(fd: FormData) {
  const { supabase } = await requireAdmin();
  const full_name = str(fd, "full_name");
  if (!full_name) redirect(withError("/admin/customers", "Name is required."));
  const { data, error } = await supabase
    .from("profiles")
    .insert({ full_name, phone: str(fd, "phone"), email: str(fd, "email"), added_by_admin: true })
    .select("id")
    .single();
  if (error || !data) redirect(withError("/admin/customers", error?.message ?? "Could not add the customer."));
  redirect(`/admin/customers/${data.id}`);
}
