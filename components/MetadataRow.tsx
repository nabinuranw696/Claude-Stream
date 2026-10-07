"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function MetadataRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("ok");
    } catch { setState("err"); }
    setTimeout(() => setState("idle"), 1500);
  }
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-line2 bg-card2 px-2.5 py-2">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wide text-muted">{label}</div>
        <div className="break-all text-xs text-fg">{value}</div>
      </div>
      {copyable && (
        <button type="button" onClick={copy} aria-label={`Copy ${label}`}
          className="flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-fg2 hover:text-fg">
          {state === "ok" ? <><Check size={13} className="text-success" />Copied!</>
            : state === "err" ? "Copy failed" : <Copy size={13} />}
        </button>
      )}
    </div>
  );
}
