"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");
  const [pending, start] = useTransition();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => {
      const sp = new URLSearchParams(params.toString());
      value ? sp.set("q", value) : sp.delete("q");
      sp.delete("page");
      const target = path === "/search" || path === "/repositories" ? path : "/";
      start(() => router.replace(`${target}?${sp.toString()}`));
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div role="search" className="relative">
      <Search size={16} aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search repositories..."
        aria-label="Search repositories"
        className="h-10 w-full rounded-lg border border-line bg-card2 pl-9 pr-9 text-sm placeholder:text-muted focus:border-primary focus:outline-none" />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {pending ? <Loader2 size={16} className="animate-spin text-muted" aria-label="Loading" />
          : value && <button onClick={() => setValue("")} aria-label="Clear search" className="text-muted hover:text-fg"><X size={16} /></button>}
      </div>
    </div>
  );
}
