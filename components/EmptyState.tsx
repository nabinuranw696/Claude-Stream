export function EmptyState({ text = "No repositories found." }: { text?: string }) {
  return <div className="rounded-xl border border-dashed border-line py-12 text-center text-sm text-fg2">{text}</div>;
}
