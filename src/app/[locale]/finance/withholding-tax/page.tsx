import { notFound } from "next/navigation";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedWithholdingTaxPage } from "@/features/withholding-tax/components/localized-withholding-tax-page";
import { createWithholdingTaxMetadata } from "@/features/withholding-tax/metadata";

type Props = { params: Promise<{ locale: string }> };
export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return isCompoundLocale(locale) ? createWithholdingTaxMetadata(locale) : {};
};
export default async function WithholdingTaxPage({ params }: Props) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedWithholdingTaxPage locale={locale} />;
}
