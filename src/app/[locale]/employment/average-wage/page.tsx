import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedAverageWagePage } from "@/features/average-wage/components/localized-average-wage-page";
import type { AverageWageLocale } from "@/features/average-wage/content";
import { createAverageWageMetadata } from "@/features/average-wage/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as AverageWageLocale)
    ? createAverageWageMetadata(locale as AverageWageLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as AverageWageLocale)) notFound();
  return <LocalizedAverageWagePage locale={locale as AverageWageLocale} />;
}
