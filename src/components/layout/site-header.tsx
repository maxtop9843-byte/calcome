import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b bg-background/95">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-8 px-5 sm:px-6">
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
          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link
              href="/calculators"
              className="flex items-center gap-1 hover:text-primary"
            >
              계산기 <ChevronDown className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href="/about" className="hover:text-primary">
              금융 가이드
            </Link>
            <Link href="/" className="hover:text-primary">
              블로그
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-5 text-sm font-medium">
            <Link
              href="/calculators"
              className="hidden items-center gap-1.5 sm:flex"
            >
              <Star className="size-4" aria-hidden="true" /> 즐겨찾기
            </Link>
            <Link href="/calculators">모든 계산기</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
