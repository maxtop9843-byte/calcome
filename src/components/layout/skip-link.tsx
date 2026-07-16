import type { CompoundLocale } from "@/features/compound-interest/i18n";

import { sharedLayoutCopy } from "./layout-i18n";

export function SkipLink({ locale }: { locale: CompoundLocale }) {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md bg-background px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-ring"
    >
      {sharedLayoutCopy[locale].skipToContent}
    </a>
  );
}
