import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { isHttpUrl } from "@/lib/utils";

// Records a download CLICK (not a verified download), then redirects.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repo = await db.repository.findFirst({ where: { id, published: true }, select: { id: true, downloadUrl: true } });
  if (!repo || !isHttpUrl(repo.downloadUrl)) return new NextResponse("Not found", { status: 404 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const session = await auth();
  await db.downloadEvent.create({
    data: {
      repositoryId: repo.id,
      userId: (session?.user as { id?: string } | undefined)?.id ?? null,
      ipHash: ip ? createHash("sha256").update(ip + (process.env.AUTH_SECRET ?? "")).digest("hex") : null,
    },
  }).catch(() => {});
  return NextResponse.redirect(repo.downloadUrl!, 302);
}
