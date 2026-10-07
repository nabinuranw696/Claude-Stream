import Link from "next/link";
export default function NotFound() {
  return <div className="py-16 text-center"><p className="text-fg2">Page not found.</p><Link href="/" className="mt-3 inline-block text-primary-hover">Go home</Link></div>;
}
