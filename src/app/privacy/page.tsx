import Link from "next/link";

import { InfoPage } from "@/components/layout/info-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "개인정보처리방침",
  description:
    "CalCome의 계산기 입력 처리, 접속 기록, 쿠키 및 향후 정책 변경 원칙을 안내합니다.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="PRIVACY"
      title="개인정보처리방침"
      description="현재 CalCome 구현을 기준으로 개인정보와 서비스 이용 정보가 어떻게 처리될 수 있는지 설명합니다."
    >
      <p className="text-sm text-muted-foreground">시행일: 2026년 7월 14일</p>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">계산기 입력값</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          현재 계산기 입력값과 계산 결과는 사용자의 브라우저에서 처리됩니다.
          CalCome은 이 값을 의도적으로 서버에 전송하거나 계정과 연결해 저장하지
          않습니다. 사용자가 문의 이메일로 직접 보낸 내용은 이메일 서비스
          제공자의 처리 방식이 적용됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          호스팅과 접속 기록
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          서비스를 제공하고 보안을 유지하는 과정에서 호스팅 또는 네트워크
          인프라가 IP 주소, 브라우저 정보, 요청한 URL, 접속 시각과 같은 표준
          접속 기록을 처리할 수 있습니다. 이러한 정보의 보관 기간과 세부 처리는
          해당 인프라 제공자의 운영 및 보안 정책에 따라 달라질 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          분석, 광고와 쿠키
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          현재 CalCome에는 자체 분석 도구, 광고 네트워크, 사용자 계정, 마케팅
          쿠키 또는 쿠키 배너가 구현되어 있지 않습니다. 향후 분석, 광고 또는
          쿠키를 도입하는 경우 도입하기 전 또는 도입 시점에 이 방침을 갱신하고
          필요한 안내와 선택 수단을 제공합니다. 현재 AdSense를 포함한 광고
          서비스는 활성화되어 있지 않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          외부 링크와 문의
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          외부 사이트는 각자의 개인정보 처리방침을 따릅니다. 이 방침에 관한
          문의는 CalCome의{" "}
          <Link
            href="/contact"
            className="text-primary underline-offset-4 hover:underline"
          >
            문의 안내
          </Link>
          를 이용해 주세요. 방침이 변경되면 이 페이지의 내용과 시행일을
          갱신합니다.
        </p>
      </section>
    </InfoPage>
  );
}
