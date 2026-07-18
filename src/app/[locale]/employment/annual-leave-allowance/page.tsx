import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedAnnualLeavePage } from "@/features/annual-leave-allowance/components/localized-annual-leave-page";
import type { AnnualLeaveLocale } from "@/features/annual-leave-allowance/content";
import { createAnnualLeaveMetadata } from "@/features/annual-leave-allowance/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as AnnualLeaveLocale)
    ? createAnnualLeaveMetadata(locale as AnnualLeaveLocale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as AnnualLeaveLocale)) notFound();
  return <LocalizedAnnualLeavePage locale={locale as AnnualLeaveLocale} />;
}
