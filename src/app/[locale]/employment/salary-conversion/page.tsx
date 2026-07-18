import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedSalaryConversionPage } from "@/features/salary-conversion/components/localized-salary-conversion-page";
import type { SalaryConversionLocale } from "@/features/salary-conversion/content";
import { createSalaryConversionMetadata } from "@/features/salary-conversion/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as SalaryConversionLocale)
    ? createSalaryConversionMetadata(locale as SalaryConversionLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as SalaryConversionLocale)) notFound();
  return (
    <LocalizedSalaryConversionPage locale={locale as SalaryConversionLocale} />
  );
}
