import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { auth } from "@/lib/auth";
import { getSettings } from "@/lib/queries";

const links = [["/repositories", "Repositories"], ["/categories", "Categories"], ["/about", "About"], ["/contact", "Contact"]];

export async function Header() {
  const [s, session] = await Promise.all([getSettings(), auth()]);
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN";
  const account = isAdmin ? ["/admin", "Admin"] : ["/login", "Login"];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span aria-hidden className="grid size-7 place-items-center rounded-md bg-primary text-sm">{s.siteName[0]}</span>
          {s.siteName}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-5 text-sm text-fg2 md:flex">
          {links.slice(0, 3).map(([h, l]) => <Link key={h} href={h} className="hover:text-fg">{l}</Link>)}
          <Link href="/search" aria-label="Search" className="hover:text-fg"><Search size={16} /></Link>
          <Link href={account[0]} className="rounded-md border border-line px-3 py-1 text-fg">{account[1]}</Link>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/search" aria-label="Search"><Search size={20} /></Link>
          <details className="relative">
            <summary aria-label="Menu" className="cursor-pointer list-none"><Menu size={22} /></summary>
            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-line bg-card p-2 text-sm shadow-xl">
              {[...links, account].map(([h, l]) => <Link key={h} href={h} className="block rounded-lg px-3 py-2 hover:bg-card2">{l}</Link>)}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
