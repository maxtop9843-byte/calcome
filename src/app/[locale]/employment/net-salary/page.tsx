import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocalizedNetSalaryPage } from "@/features/net-salary/components/localized-net-salary-page";
import { createNetSalaryMetadata } from "@/features/net-salary/metadata";
import type { NetSalaryLocale } from "@/features/net-salary/i18n";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as NetSalaryLocale)) return {};
  return createNetSalaryMetadata(locale as NetSalaryLocale);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as NetSalaryLocale)) notFound();
  return <LocalizedNetSalaryPage locale={locale as NetSalaryLocale} />;
}
