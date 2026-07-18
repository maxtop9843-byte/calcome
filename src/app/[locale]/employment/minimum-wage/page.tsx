import { notFound } from "next/navigation";
import { LocalizedMinimumWagePage } from "@/features/minimum-wage/components/localized-minimum-wage-page";
import type { MinimumWageLocale } from "@/features/minimum-wage/content";
import { createMinimumWageMetadata } from "@/features/minimum-wage/metadata";

function localeOf(value: string): MinimumWageLocale | null {
  return value === "ko" || value === "en" ? value : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOf((await params).locale);
  return locale ? createMinimumWageMetadata(locale) : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOf((await params).locale);
  if (!locale) notFound();
  return <LocalizedMinimumWagePage locale={locale} />;
}
