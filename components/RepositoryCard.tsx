import Link from "next/link";
import type { RepoWithRelations } from "@/lib/queries";
import { StatusBadge } from "./StatusBadge";
import { MetadataRow } from "./MetadataRow";
import { ActionButtons } from "./ActionButtons";

export function RepoIcon({ icon, title }: { icon?: string | null; title: string }) {
  return icon?.startsWith("http") ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={icon} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
  ) : (
    <div aria-hidden className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-base font-bold text-primary-hover">
      {title.charAt(0).toUpperCase()}
    </div>
  );
}

export function RepositoryCard({ repository: r, full = false }: { repository: RepoWithRelations; full?: boolean }) {
  return (
    <article className="mb-3 rounded-xl border border-line bg-card p-3.5 shadow-lg shadow-black/30 sm:p-4">
      <header className="flex items-center gap-3">
        <RepoIcon icon={r.icon} title={r.title} />
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold sm:text-lg">
            <Link href={`/repository/${r.slug}`} className="hover:text-primary-hover">{r.title}</Link>
          </h2>
          <StatusBadge status={r.status} />
        </div>
      </header>
      <p className={`mt-3 text-xs leading-relaxed text-fg2 sm:text-sm ${full ? "" : "line-clamp-3"}`}>{r.description}</p>
      {r.metadata.length > 0 && (
        <div className="mt-3 flex flex-col gap-1.5">
          {r.metadata.slice(0, full ? undefined : 3).map((m) => (
            <MetadataRow key={m.id} label={m.label} value={m.value} copyable={m.copyable} />
          ))}
        </div>
      )}
      <div className="mt-3">
        <ActionButtons id={r.id} downloadUrl={r.downloadUrl} sourceUrl={r.sourceUrl} demoUrl={r.demoUrl} />
      </div>
    </article>
  );
}
