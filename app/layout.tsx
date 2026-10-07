import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const title = s.seoTitle || s.siteName;
  const description = s.seoDescription || s.siteDescription;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: { default: title, template: `%s | ${s.siteName}` },
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
    icons: s.faviconUrl ? { icon: s.faviconUrl } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-3xl px-4 pt-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
