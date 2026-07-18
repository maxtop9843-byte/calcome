import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedLtvPage } from "@/features/ltv/components/localized-ltv-page";
import type { LtvLocale } from "@/features/ltv/content";
import { createLtvMetadata } from "@/features/ltv/metadata";

const locales = ["ko", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as LtvLocale)
    ? createLtvMetadata(locale as LtvLocale)
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as LtvLocale)) notFound();
  return <LocalizedLtvPage locale={locale as LtvLocale} />;
}
