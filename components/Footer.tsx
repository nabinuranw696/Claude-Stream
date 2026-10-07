import Link from "next/link";
import { getSettings } from "@/lib/queries";

export async function Footer() {
  const s = await getSettings();
  const social = [["GitHub", s.githubUrl], ["Discord", s.discordUrl], ["Telegram", s.telegramUrl]].filter(([, u]) => u);
  return (
    <footer className="mt-12 border-t border-line py-8 text-xs text-fg2">
      <div className="mx-auto max-w-3xl px-4">
        <div className="font-semibold text-fg">{s.siteName}</div>
        <p className="mt-1">{s.footerText ?? s.siteDescription}</p>
        <nav aria-label="Footer" className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {[["/repositories", "Repositories"], ["/categories", "Categories"], ["/about", "About"], ["/contact", "Contact"]].map(([h, l]) =>
            <Link key={h} href={h} className="hover:text-fg">{l}</Link>)}
          {social.map(([l, u]) => <a key={l} href={u!} target="_blank" rel="noopener noreferrer" className="hover:text-fg">{l}</a>)}
        </nav>
        <p className="mt-4 text-muted">© {new Date().getFullYear()} {s.siteName}</p>
      </div>
    </footer>
  );
}
