import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label="하단 탐색">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link
                href="/calculators"
                className="hover:text-foreground hover:underline"
              >
                계산기
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-foreground hover:underline"
              >
                소개
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-foreground hover:underline"
              >
                개인정보처리방침
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-foreground hover:underline"
              >
                이용약관
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-foreground hover:underline"
              >
                문의
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
