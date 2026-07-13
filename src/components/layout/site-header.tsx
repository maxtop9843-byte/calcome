import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="rounded-sm text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="주요 탐색">
          <Link
            href="/calculators"
            className="flex min-h-11 items-center rounded-sm px-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            계산기
          </Link>
        </nav>
      </div>
    </header>
  );
}
