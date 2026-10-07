export default function Loading() {
  return <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-56 animate-pulse rounded-xl bg-card" />)}</div>;
}
