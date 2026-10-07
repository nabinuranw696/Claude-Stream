import { Download, Github, ExternalLink } from "lucide-react";
import { isHttpUrl } from "@/lib/utils";

const base = "flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors";

export function ActionButtons({ id, downloadUrl, sourceUrl, demoUrl }:
  { id: string; downloadUrl?: string | null; sourceUrl?: string | null; demoUrl?: string | null }) {
  return (
    <div className="flex flex-col gap-2">
      {isHttpUrl(downloadUrl) ? (
        <a href={`/api/download/${id}`} className={`${base} bg-primary text-white hover:bg-primary-hover active:bg-primary-active`}>
          <Download size={16} aria-hidden /> Download
        </a>
      ) : (
        <button disabled title="No download link available" className={`${base} cursor-not-allowed bg-primary/30 text-white/60`}>
          <Download size={16} aria-hidden /> Download unavailable
        </button>
      )}
      {isHttpUrl(sourceUrl) && (
        <a href={sourceUrl!} target="_blank" rel="noopener noreferrer" className={`${base} border border-line bg-card2 text-fg hover:border-primary`}>
          <Github size={16} aria-hidden /> Source
        </a>
      )}
      {isHttpUrl(demoUrl) && (
        <a href={demoUrl!} target="_blank" rel="noopener noreferrer" className={`${base} border border-line bg-card2 text-fg hover:border-primary`}>
          <ExternalLink size={16} aria-hidden /> Demo
        </a>
      )}
    </div>
  );
}
