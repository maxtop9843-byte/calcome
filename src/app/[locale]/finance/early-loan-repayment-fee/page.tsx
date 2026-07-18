import { notFound } from "next/navigation";
import { LocalizedEarlyRepaymentFeePage } from "@/features/early-loan-repayment-fee/components/localized-early-loan-repayment-fee-page";
import { createEarlyRepaymentFeeMetadata } from "@/features/early-loan-repayment-fee/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  return createEarlyRepaymentFeeMetadata(locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedEarlyRepaymentFeePage locale={locale} />;
}
