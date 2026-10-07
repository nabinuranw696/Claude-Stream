import { Suspense } from "react";
import { getSettings, type RepoQuery } from "@/lib/queries";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { RepositoryFeed } from "@/components/RepositoryFeed";

export default async function Home({ searchParams }: { searchParams: Promise<RepoQuery> }) {
  const [params, s] = await Promise.all([searchParams, getSettings()]);
  return (
    <>
      <section className="mb-4">
        <h1 className="text-xl font-bold sm:text-2xl">{s.siteName}</h1>
        <p className="mb-3 mt-1 text-xs text-fg2 sm:text-sm">Browse repositories, extensions and resources in one place.</p>
        <Suspense><SearchBar /></Suspense>
      </section>
      <div className="mb-4"><FilterBar params={params} /></div>
      <Suspense key={JSON.stringify(params)} fallback={<div className="h-64 animate-pulse rounded-xl bg-card" />}>
        <RepositoryFeed params={params} />
      </Suspense>
    </>
  );
}
