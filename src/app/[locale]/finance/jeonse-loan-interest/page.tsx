import { notFound } from "next/navigation";
import { LocalizedJeonseLoanInterestPage } from "@/features/jeonse-loan-interest/components/localized-jeonse-loan-interest-page";
import { createJeonseLoanInterestMetadata } from "@/features/jeonse-loan-interest/metadata";

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
    ? createJeonseLoanInterestMetadata(locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedJeonseLoanInterestPage locale={locale} />;
}
