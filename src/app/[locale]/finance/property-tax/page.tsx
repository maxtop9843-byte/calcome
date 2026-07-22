import { notFound } from "next/navigation";
import { LocalizedPropertyTaxPage } from "@/features/property-tax/components/localized-property-tax-page";
import { createPropertyTaxMetadata } from "@/features/property-tax/metadata";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
type Props = { params: Promise<{ locale: string }> };
export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return isCompoundLocale(locale) ? createPropertyTaxMetadata(locale) : {};
};
export default async function PropertyTaxPage({ params }: Props) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedPropertyTaxPage locale={locale} />;
}
