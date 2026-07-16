import { notFound } from "next/navigation";

import { LocalizedSavingsPage } from "@/features/savings/components/localized-savings-page";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { createSavingsMetadata } from "@/features/savings/metadata";

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) return {};
  return createSavingsMetadata(locale);
}

export default async function SavingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedSavingsPage locale={locale} />;
}
