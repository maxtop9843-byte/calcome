import { notFound } from "next/navigation";

import { LocalizedHourlyWagePage } from "@/features/hourly-wage/components/localized-hourly-wage-page";
import { createHourlyWageMetadata } from "@/features/hourly-wage/metadata";
import type { HourlyWageLocale } from "@/features/hourly-wage/types";

function localeOf(value: string): HourlyWageLocale | null {
  return value === "ko" || value === "en" ? value : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOf((await params).locale);
  return locale ? createHourlyWageMetadata(locale) : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOf((await params).locale);
  if (!locale) notFound();
  return <LocalizedHourlyWagePage locale={locale} />;
}
