export type Profile = {
  id: string;
  user_id: string | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  role: "customer" | "admin";
  added_by_admin: boolean;
  created_at: string;
};

export type DeviceKind = "laptop" | "desktop" | "phone" | "tablet" | "other";
export type StorageType = "hdd" | "sata_ssd" | "nvme_ssd" | "emmc" | "other";

export type Device = {
  id: string;
  owner_id: string;
  kind: DeviceKind;
  brand: string;
  model: string;
  serial_number: string | null;
  cpu: string | null;
  ram_gb: number | null;
  storage_type: StorageType | null;
  storage_gb: number | null;
  os: string | null;
  battery_health_pct: number | null;
  purchase_date: string | null;
  warranty_expires: string | null;
  installed_software: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceRecord = {
  id: string;
  device_id: string;
  service_slug: string;
  summary: string;
  performed_on: string;
  amount_ngn: number | null;
  boot_seconds_before: number | null;
  boot_seconds_after: number | null;
  created_at: string;
};

export type RequestStatus = "new" | "confirmed" | "in_progress" | "done" | "cancelled" | "referred";

export type ServiceRequest = {
  id: string;
  customer_id: string;
  device_id: string | null;
  service_slug: string;
  description: string | null;
  preferred_time: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
};

export const deviceKinds: { value: DeviceKind; label: string }[] = [
  { value: "laptop", label: "Laptop" },
  { value: "phone", label: "Phone" },
  { value: "desktop", label: "Desktop" },
  { value: "tablet", label: "Tablet" },
  { value: "other", label: "Other" },
];

export const storageTypes: { value: StorageType; label: string }[] = [
  { value: "nvme_ssd", label: "NVMe SSD" },
  { value: "sata_ssd", label: "SATA SSD" },
  { value: "hdd", label: "Hard drive (HDD)" },
  { value: "emmc", label: "eMMC" },
  { value: "other", label: "Other / not sure" },
];

export const statusLabels: Record<RequestStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  in_progress: "In progress",
  done: "Done",
  cancelled: "Cancelled",
  referred: "Referred to partner",
};

export function requestRef(id: string) {
  return "GG-" + id.slice(0, 6).toUpperCase();
}
