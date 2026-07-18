import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedGrossUpSalaryPage } from "@/features/gross-up-salary/components/localized-gross-up-salary-page";
import type { GrossUpSalaryLocale } from "@/features/gross-up-salary/content";
import { createGrossUpSalaryMetadata } from "@/features/gross-up-salary/metadata";

const locales = ["ko", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as GrossUpSalaryLocale)
    ? createGrossUpSalaryMetadata(locale as GrossUpSalaryLocale)
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as GrossUpSalaryLocale)) notFound();
  return <LocalizedGrossUpSalaryPage locale={locale as GrossUpSalaryLocale} />;
}
