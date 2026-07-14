import { InfoPage } from "@/components/layout/info-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "소개",
  description:
    "CalCome이 제공하는 한국 금융 계산기와 계산 결과의 한계를 안내합니다.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="ABOUT"
      title="CalCome 소개"
      description="CalCome(캘컴)은 누구나 쉽게 사용할 수 있는 한국 금융 계산기를 제공합니다."
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          이해하기 쉬운 계산
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          각 계산기는 입력값, 계산 가정, 결과의 의미를 가능한 한 명확하게
          보여주는 것을 목표로 합니다. 현재 공개된 계산기만 안내하며, 검증되지
          않은 도구나 결과를 제공하지 않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          결과는 추정치입니다
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          계산 결과는 사용자가 입력한 값과 각 계산기에 표시된 가정을 바탕으로 한
          정보성 추정치입니다. 금융, 투자, 세금 또는 법률 자문이 아니며 실제
          상품 조건이나 미래 결과를 보장하지 않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">운영 원칙</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          CalCome은 접근성, 성능, 명확한 설명과 재현 가능한 계산을 우선합니다.
          기능과 정책이 달라지면 사용자에게 필요한 설명도 함께 갱신합니다.
        </p>
      </section>
    </InfoPage>
  );
}
