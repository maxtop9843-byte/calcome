import { notFound } from "next/navigation";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedComprehensiveIncomeTaxPage } from "@/features/comprehensive-income-tax/components/localized-comprehensive-income-tax-page";
import { createComprehensiveIncomeTaxMetadata } from "@/features/comprehensive-income-tax/metadata";

type Props = { params: Promise<{ locale: string }> };
export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return isCompoundLocale(locale)
    ? createComprehensiveIncomeTaxMetadata(locale)
    : {};
};
export default async function ComprehensiveIncomeTaxPage({ params }: Props) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedComprehensiveIncomeTaxPage locale={locale} />;
}
