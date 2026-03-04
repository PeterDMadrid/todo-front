import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen">
      <Link href="/homepage">Go to Notes</Link>
    </div>
  );
}
