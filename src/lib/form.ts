// Small helpers for reading HTML form posts in server actions.

export function str(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

export function num(fd: FormData, key: string): number | null {
  const v = str(fd, key);
  if (v === null) return null;
  const n = Number(v.replace(/[,₦\s]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function list(fd: FormData, key: string): string[] {
  const v = str(fd, key);
  if (!v) return [];
  return v
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function withError(path: string, message: string) {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}error=${encodeURIComponent(message)}`;
}
