import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { repoInclude } from "@/lib/queries";
import { RepositoryCard } from "@/components/RepositoryCard";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const r = await db.repository.findFirst({ where: { slug, published: true } });
  return r ? { title: r.title, description: r.description.slice(0, 160), alternates: { canonical: `/repository/${r.slug}` } } : {};
}

export default async function RepositoryPage({ params }: P) {
  const { slug } = await params;
  const r = await db.repository.findFirst({ where: { slug, published: true }, include: repoInclude });
  if (!r) notFound();
  const related = await db.repository.findMany({
    where: { published: true, id: { not: r.id }, categoryId: r.categoryId }, include: repoInclude, take: 3,
  });
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-fg2">
        <Link href="/">Home</Link> › <Link href="/repositories">Repositories</Link> › <span className="text-fg">{r.title}</span>
      </nav>
      <RepositoryCard repository={r} full />
      <dl className="mb-6 grid grid-cols-2 gap-2 text-xs text-fg2">
        {[["Category", r.category?.name], ["Language", r.language], ["Version", r.version], ["Author", r.author],
          ["Last updated", r.updatedAt.toLocaleDateString("en", { dateStyle: "medium" })]]
          .filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line2 bg-card2 p-2"><dt className="text-[10px] uppercase text-muted">{k}</dt><dd className="text-fg">{v}</dd></div>
        ))}
      </dl>
      {related.length > 0 && <h2 className="mb-2 text-sm font-semibold">Related repositories</h2>}
      {related.map((x) => <RepositoryCard key={x.id} repository={x} />)}
    </>
  );
}
