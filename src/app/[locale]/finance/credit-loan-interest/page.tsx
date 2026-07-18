import { notFound } from "next/navigation";
import { LocalizedCreditLoanInterestPage } from "@/features/credit-loan-interest/components/localized-credit-loan-interest-page";
import { createCreditLoanInterestMetadata } from "@/features/credit-loan-interest/metadata";

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
    ? createCreditLoanInterestMetadata(locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedCreditLoanInterestPage locale={locale} />;
}
