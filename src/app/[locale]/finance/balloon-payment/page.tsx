import { notFound } from "next/navigation";
import { LocalizedBalloonPaymentPage } from "@/features/balloon-payment/components/localized-balloon-payment-page";
import { createBalloonPaymentMetadata } from "@/features/balloon-payment/metadata";

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
    ? createBalloonPaymentMetadata(locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedBalloonPaymentPage locale={locale} />;
}
