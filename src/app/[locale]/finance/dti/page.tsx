import { notFound } from "next/navigation";
import { LocalizedDtiPage } from "@/features/dti/components/localized-dti-page";
import { createDtiMetadata } from "@/features/dti/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  return createDtiMetadata(locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDtiPage locale={locale} />;
}
