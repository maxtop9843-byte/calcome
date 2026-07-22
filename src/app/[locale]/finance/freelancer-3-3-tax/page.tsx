import { notFound } from "next/navigation";
import { isCompoundLocale } from "@/features/compound-interest/i18n";
import { LocalizedFreelancerTaxPage } from "@/features/freelancer-tax/components/localized-freelancer-tax-page";
import { createFreelancerTaxMetadata } from "@/features/freelancer-tax/metadata";

type Props = { params: Promise<{ locale: string }> };
export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return isCompoundLocale(locale) ? createFreelancerTaxMetadata(locale) : {};
};
export default async function FreelancerTaxPage({ params }: Props) {
  const { locale } = await params;
  if (!isCompoundLocale(locale)) notFound();
  return <LocalizedFreelancerTaxPage locale={locale} />;
}
