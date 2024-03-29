"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex justify-between">
        <div className="font-bold text-yellow-600">ScribbleAI</div>
        <nav className="flex gap-4">
          <Link href="/" className="font-medium hover:text-yellow-500">
            Generate Image
          </Link>
          <Link href="/collection" className="font-medium hover:text-yellow-500">
            All Collections
          </Link>
        </nav>
      </div>
    </div>
  );
}
