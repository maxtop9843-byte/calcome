import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b bg-background/95">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-4 px-5 sm:gap-8 sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/"
            className="rounded-sm text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {siteConfig.name}
            <span className="text-primary">•</span>
          </Link>
          <span className="hidden text-xs font-semibold text-primary sm:inline">
            금융 계산을 쉽게.
          </span>
        </div>
        <nav
          aria-label="주요 탐색"
          className="flex flex-1 items-center justify-between"
        >
          <div className="flex items-center text-sm font-medium">
            <Link
              href="/calculators"
              className="flex items-center gap-1 hover:text-primary"
            >
              계산기 <ChevronDown className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
