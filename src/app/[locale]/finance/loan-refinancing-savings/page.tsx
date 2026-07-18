import { notFound } from "next/navigation";
import { LocalizedLoanRefinancingPage } from "@/features/loan-refinancing-savings/components/localized-loan-refinancing-page";
import { createLoanRefinancingMetadata } from "@/features/loan-refinancing-savings/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createLoanRefinancingMetadata(locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedLoanRefinancingPage locale={locale} />;
}
