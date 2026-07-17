import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedSalaryRaisePage } from "@/features/salary-raise/components/localized-salary-raise-page";
import type { SalaryRaiseLocale } from "@/features/salary-raise/content";
import { createSalaryRaiseMetadata } from "@/features/salary-raise/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as SalaryRaiseLocale)
    ? createSalaryRaiseMetadata(locale as SalaryRaiseLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as SalaryRaiseLocale)) notFound();
  return <LocalizedSalaryRaisePage locale={locale as SalaryRaiseLocale} />;
}
