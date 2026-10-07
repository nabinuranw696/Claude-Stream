import Link from "next/link";
import { getRepositories, type RepoQuery } from "@/lib/queries";
import { RepositoryCard } from "./RepositoryCard";
import { EmptyState } from "./EmptyState";

export async function RepositoryFeed({ params, base = "/", fixed = {} }: { params: RepoQuery; base?: string; fixed?: RepoQuery }) {
  const { items, page, pages } = await getRepositories({ ...params, ...fixed });
  const link = (p: number) => {
    const sp = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
    sp.set("page", String(p));
    return `${base}?${sp}`;
  };
  if (!items.length) return <EmptyState />;
  return (
    <>
      {items.map((r) => <RepositoryCard key={r.id} repository={r} />)}
      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
          {page > 1 ? <Link href={link(page - 1)} className="rounded-lg border border-line px-3 py-1.5">Previous</Link> : <span />}
          <span className="text-fg2">Page {page} of {pages}</span>
          {page < pages ? <Link href={link(page + 1)} className="rounded-lg border border-line px-3 py-1.5">Next</Link> : <span />}
        </nav>
      )}
    </>
  );
}
