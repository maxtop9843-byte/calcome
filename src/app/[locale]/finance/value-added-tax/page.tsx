import { notFound } from "next/navigation";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedValueAddedTaxPage } from "@/features/value-added-tax/components/localized-value-added-tax-page";
import { createValueAddedTaxMetadata } from "@/features/value-added-tax/metadata";

type Props = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return isCompoundLocale(locale) ? createValueAddedTaxMetadata(locale) : {};
};

export default async function ValueAddedTaxPage({ params }: Props) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedValueAddedTaxPage locale={locale} />;
}
