import { notFound } from "next/navigation";
import { LocalizedUnemploymentBenefitsPage } from "@/features/unemployment-benefits/components/localized-unemployment-benefits-page";
import { createUnemploymentBenefitsMetadata } from "@/features/unemployment-benefits/metadata";

const isLocale = (value: string): value is "ko" | "en" =>
  value === "ko" || value === "en";
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale) ? createUnemploymentBenefitsMetadata(locale) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LocalizedUnemploymentBenefitsPage locale={locale} />;
}
