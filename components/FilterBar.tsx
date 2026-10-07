import Link from "next/link";
import type { RepoQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

const statuses = ["all", "available", "new", "updated", "stable"];
const sorts = [["newest", "Newest"], ["updated", "Updated"], ["az", "A-Z"], ["downloads", "Most downloaded"]];

function href(base: string, p: RepoQuery, patch: Partial<RepoQuery>) {
  const sp = new URLSearchParams();
  Object.entries({ ...p, ...patch, page: undefined }).forEach(([k, v]) => v && sp.set(k, v));
  return `${base}?${sp}`;
}

export function FilterBar({ params, base = "/" }: { params: RepoQuery; base?: string }) {
  const chip = (active: boolean) =>
    cn("shrink-0 rounded-full border px-3 py-1 text-xs", active ? "border-primary bg-primary/15 text-fg" : "border-line text-fg2 hover:text-fg");
  return (
    <nav aria-label="Filters" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      {statuses.map((s) => (
        <Link key={s} href={href(base, params, { status: s === "all" ? undefined : s })}
          className={chip((params.status ?? "all") === s)}>{s[0].toUpperCase() + s.slice(1)}</Link>
      ))}
      <Link href={href(base, params, { featured: params.featured === "1" ? undefined : "1" })} className={chip(params.featured === "1")}>Featured</Link>
      <span aria-hidden className="mx-1 border-l border-line" />
      {sorts.map(([v, l]) => (
        <Link key={v} href={href(base, params, { sort: v })} className={chip((params.sort ?? "newest") === v)}>{l}</Link>
      ))}
    </nav>
  );
}
