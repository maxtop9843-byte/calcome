import { notFound } from "next/navigation";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedLoanPage } from "@/features/loan/components/localized-loan-page";
import { createLoanMetadata } from "@/features/loan/metadata";
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
  return createLoanMetadata(locale);
}
export default async function LoanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedLoanPage locale={locale} />;
}
