import { notFound } from "next/navigation";
import { LocalizedDebtRepaymentPeriodPage } from "@/features/debt-repayment-period/components/localized-debt-repayment-period-page";
import { createDebtRepaymentPeriodMetadata } from "@/features/debt-repayment-period/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDebtRepaymentPeriodMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDebtRepaymentPeriodPage locale={locale} />;
}
