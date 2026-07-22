import { notFound } from "next/navigation";
import { LocalizedCreditCardInstallmentInterestPage } from "@/features/credit-card-installment-interest/components/localized-credit-card-installment-interest-page";
import { createCreditCardInstallmentInterestMetadata } from "@/features/credit-card-installment-interest/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createCreditCardInstallmentInterestMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedCreditCardInstallmentInterestPage locale={locale} />;
}
