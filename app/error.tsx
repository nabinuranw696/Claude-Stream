"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-16 text-center">
      <p className="text-fg2">Something went wrong. Please try again.</p>
      <button onClick={reset} className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm">Retry</button>
    </div>
  );
}
