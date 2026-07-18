import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedNightWorkPayPage } from "@/features/night-work-pay/components/page";
import type { Locale } from "@/features/night-work-pay/content";
import { createMetadata } from "@/features/night-work-pay/metadata";
const locales = ["ko", "en"] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as Locale)
    ? createMetadata(locale as Locale)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <LocalizedNightWorkPayPage locale={locale as Locale} />;
}
