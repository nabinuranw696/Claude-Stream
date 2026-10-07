import { cn } from "@/lib/utils";
const styles: Record<string, string> = {
  AVAILABLE: "text-success bg-success/10 border-success/30",
  NEW: "text-primary-hover bg-primary/10 border-primary/30",
  UPDATED: "text-warning bg-warning/10 border-warning/30",
  STABLE: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  DRAFT: "text-fg2 bg-fg2/10 border-fg2/30",
  OFFLINE: "text-danger bg-danger/10 border-danger/30",
};
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-px text-[10px] font-semibold tracking-wide", styles[status] ?? styles.DRAFT)}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
