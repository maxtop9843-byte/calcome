import { notFound } from "next/navigation";
import { LocalizedWeeklyHolidayPayPage } from "@/features/weekly-holiday-pay/components/localized-weekly-holiday-pay-page";
import { createWeeklyHolidayPayMetadata } from "@/features/weekly-holiday-pay/metadata";
import type { WeeklyHolidayPayLocale } from "@/features/weekly-holiday-pay/content";

function localeOf(value: string): WeeklyHolidayPayLocale | null {
  return value === "ko" || value === "en" ? value : null;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOf((await params).locale);
  return locale ? createWeeklyHolidayPayMetadata(locale) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOf((await params).locale);
  if (!locale) notFound();
  return <LocalizedWeeklyHolidayPayPage locale={locale} />;
}
