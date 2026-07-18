import { notFound } from "next/navigation";
import { LocalizedMortgagePaymentPage } from "@/features/mortgage-payment/components/localized-mortgage-payment-page";
import { createMortgagePaymentMetadata } from "@/features/mortgage-payment/metadata";

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
    ? createMortgagePaymentMetadata(locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedMortgagePaymentPage locale={locale} />;
}
