import Link from "next/link";

import { siteConfig } from "@/config/site";
import type { CompoundLocale } from "@/features/compound-interest/i18n";
import { sharedLayoutCopy } from "./layout-i18n";

export function SiteFooter({ locale = "ko" }: { locale?: CompoundLocale }) {
  const copy = sharedLayoutCopy[locale];
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label={copy.footerNavigation}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link
                href="/calculators"
                className="hover:text-foreground hover:underline"
              >
                {copy.calculators}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-foreground hover:underline"
              >
                {copy.about}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-foreground hover:underline"
              >
                {copy.privacy}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-foreground hover:underline"
              >
                {copy.terms}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-foreground hover:underline"
              >
                {copy.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
