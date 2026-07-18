import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocalizedSocialInsurancePage } from "@/features/social-insurance/components/localized-social-insurance-page";
import { createSocialInsuranceMetadata } from "@/features/social-insurance/metadata";
import type { SocialInsuranceLocale } from "@/features/social-insurance/types";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as SocialInsuranceLocale)) return {};
  return createSocialInsuranceMetadata(locale as SocialInsuranceLocale);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as SocialInsuranceLocale)) notFound();
  return (
    <LocalizedSocialInsurancePage locale={locale as SocialInsuranceLocale} />
  );
}
