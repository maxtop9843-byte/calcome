import Link from "next/link";

import { InfoPage } from "@/components/layout/info-page";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "문의",
  description:
    "CalCome 오류 제보와 서비스 관련 문의를 위한 공개 GitHub Issues 경로를 안내합니다.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="CONTACT"
      title="문의"
      description="현재 확인된 공개 문의 경로는 CalCome GitHub Issues입니다."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          GitHub Issues로 문의하기
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          계산 오류, 접근성 문제, 잘못된 링크 또는 서비스 개선 의견은 공개
          이슈로 남겨 주세요. 문제를 재현할 수 있는 단계와 기대한 결과를 함께
          적으면 확인에 도움이 됩니다.
        </p>
        <Link
          href={siteConfig.issues}
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          GitHub Issues 열기
        </Link>
      </section>

      <section className="rounded-xl border bg-muted/40 p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          민감한 정보는 올리지 마세요
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          GitHub Issues는 공개됩니다. 이름, 연락처, 계좌 정보, 주민등록번호,
          금융거래 내역 등 민감한 개인정보를 게시하지 마세요. 현재 저장소에서
          확인된 별도의 공개 이메일 주소는 제공하지 않습니다.
        </p>
      </section>
    </InfoPage>
  );
}
