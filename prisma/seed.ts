import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", status: "ACTIVE" },
    create: { name: "Administrator", email, passwordHash, role: "ADMIN" },
  });

  await prisma.websiteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  const categories = [
    { name: "Providers", slug: "providers", icon: "Boxes" },
    { name: "Extensions", slug: "extensions", icon: "Puzzle" },
    { name: "Resources", slug: "resources", icon: "Library" },
  ];
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  // Sample records only. Placeholder URLs use the reserved .invalid TLD.
  const providers = await prisma.category.findUniqueOrThrow({ where: { slug: "providers" } });
  const samples = [
    "CloudStream Vietnamese",
    "Turkish Providers",
    "Quine Providers Repository",
    "Luna Extensions",
    "French Repository",
    "French Providers",
  ];
  for (const title of samples) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.repository.upsert({
      where: { slug },
      update: {},
      create: {
        title,
        slug,
        description: "Sample record. Replace or delete it from the Admin Panel.",
        status: "AVAILABLE",
        language: "Kotlin",
        version: "v1.0.0",
        author: "Sample Author",
        downloadUrl: "https://example.invalid/download",
        sourceUrl: "https://example.invalid/source",
        published: true,
        categoryId: providers.id,
        metadata: {
          create: [
            { label: "Version", value: "v1.0.0", icon: "Tag", sortOrder: 0 },
            { label: "Language", value: "Kotlin", icon: "Code", sortOrder: 1 },
            { label: "Author", value: "Sample Author", icon: "User", sortOrder: 2 },
          ],
        },
      },
    });
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
