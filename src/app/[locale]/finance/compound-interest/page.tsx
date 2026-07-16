import { notFound } from "next/navigation";

import { LocalizedCompoundInterestPage } from "@/features/compound-interest/components/localized-compound-interest-page";
import {
  compoundLocales,
  isCompoundLocale,
} from "@/features/compound-interest/i18n";
import { createCompoundMetadata } from "@/features/compound-interest/metadata";

export function generateStaticParams() {
  return compoundLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) return {};
  return createCompoundMetadata(locale);
}

export default async function LocalizedCompoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedCompoundInterestPage locale={locale} />;
}
