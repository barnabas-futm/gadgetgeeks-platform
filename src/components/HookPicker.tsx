"use client";

import { useEffect } from "react";
import { pickHook } from "@/lib/pickHook";

export function HookPicker({ count }: { count: number }) {
  useEffect(() => {
    pickHook(count);
  }, [count]);
  return null;
}
