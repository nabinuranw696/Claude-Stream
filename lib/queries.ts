import { Prisma, RepoStatus } from "@prisma/client";
import { db } from "@/lib/db";

export type RepoQuery = {
  q?: string; status?: string; category?: string; language?: string;
  featured?: string; sort?: string; page?: string;
};
export const PAGE_SIZE = 12;

export const repoInclude = {
  category: true,
  metadata: { orderBy: { sortOrder: "asc" } },
} satisfies Prisma.RepositoryInclude;
export type RepoWithRelations = Prisma.RepositoryGetPayload<{ include: typeof repoInclude }>;

export async function getRepositories(p: RepoQuery) {
  const page = Math.max(1, parseInt(p.page ?? "1") || 1);
  const where: Prisma.RepositoryWhereInput = { published: true };
  if (p.q) {
    const m = { contains: p.q, mode: "insensitive" as const };
    where.OR = [
      { title: m }, { description: m }, { language: m }, { author: m },
      { category: { name: m } },
      { metadata: { some: { value: m } } },
    ];
  }
  if (p.status && p.status.toUpperCase() in RepoStatus && p.status !== "all")
    where.status = p.status.toUpperCase() as RepoStatus;
  if (p.category) where.category = { slug: p.category };
  if (p.language) where.language = { equals: p.language, mode: "insensitive" };
  if (p.featured === "1") where.featured = true;

  const orderBy: Prisma.RepositoryOrderByWithRelationInput =
    p.sort === "updated" ? { updatedAt: "desc" }
    : p.sort === "az" ? { title: "asc" }
    : p.sort === "downloads" ? { downloads: { _count: "desc" } }
    : { createdAt: "desc" };

  const [items, total] = await Promise.all([
    db.repository.findMany({ where, orderBy, include: repoInclude, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    db.repository.count({ where }),
  ]);
  return { items, total, page, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export const getSettings = () =>
  db.websiteSettings.upsert({ where: { id: "singleton" }, update: {}, create: { id: "singleton" } });
export const getCategories = () =>
  db.category.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { repositories: { where: { published: true } } } } } });
