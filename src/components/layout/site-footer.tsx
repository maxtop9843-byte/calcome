import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} CalcLab</p>
        <nav aria-label="하단 탐색">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/finance/compound-interest"
                className="hover:text-foreground hover:underline"
              >
                복리 계산기
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.repository}
                className="hover:text-foreground hover:underline"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
