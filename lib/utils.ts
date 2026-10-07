export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const isHttpUrl = (u?: string | null) => {
  if (!u) return false;
  try { return ["http:", "https:"].includes(new URL(u).protocol); } catch { return false; }
};
