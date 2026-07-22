import { notFound } from "next/navigation";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedComprehensiveRealEstateHoldingTaxPage } from "@/features/comprehensive-real-estate-holding-tax/components/localized-comprehensive-real-estate-holding-tax-page";
import { createComprehensiveRealEstateHoldingTaxMetadata } from "@/features/comprehensive-real-estate-holding-tax/metadata";

type Props = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return isCompoundLocale(locale)
    ? createComprehensiveRealEstateHoldingTaxMetadata(locale)
    : {};
};

export default async function ComprehensiveRealEstateHoldingTaxPage({
  params,
}: Props) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedComprehensiveRealEstateHoldingTaxPage locale={locale} />;
}
