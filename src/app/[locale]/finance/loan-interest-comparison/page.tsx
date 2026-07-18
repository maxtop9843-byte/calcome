import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedLoanInterestComparisonPage } from "@/features/loan-interest-comparison/components/localized-loan-interest-comparison-page";
import type { LoanInterestComparisonLocale } from "@/features/loan-interest-comparison/content";
import { createLoanInterestComparisonMetadata } from "@/features/loan-interest-comparison/metadata";

const locales = ["ko", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as LoanInterestComparisonLocale)
    ? createLoanInterestComparisonMetadata(
        locale as LoanInterestComparisonLocale,
      )
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as LoanInterestComparisonLocale)) notFound();
  return (
    <LocalizedLoanInterestComparisonPage
      locale={locale as LoanInterestComparisonLocale}
    />
  );
}
