import { InfoPage } from "@/components/layout/info-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "이용약관",
  description:
    "CalcLab의 허용된 이용, 계산 결과의 한계, 지식재산권과 서비스 변경 원칙을 안내합니다.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="TERMS"
      title="이용약관"
      description="CalcLab을 이용하기 전에 계산 결과의 성격과 서비스 이용 조건을 확인해 주세요."
    >
      <p className="text-sm text-muted-foreground">시행일: 2026년 7월 14일</p>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">서비스 이용</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          CalcLab은 개인적이고 합법적인 정보 확인 목적으로 이용할 수 있습니다.
          서비스의 정상적인 운영을 방해하거나, 보안을 침해하거나, 관련 법령을
          위반하는 방식으로 이용해서는 안 됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          계산 결과와 책임 한계
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          모든 계산은 입력값과 표시된 가정에 따른 정보성 추정치입니다. 금융,
          투자, 세금 또는 법률 자문이 아니며, 계산의 완전한 정확성이나 실제 금융
          결과를 보장하지 않습니다. 중요한 결정을 내리기 전에는 실제 상품 조건과
          관련 규정을 확인하고 필요한 경우 자격을 갖춘 전문가에게 문의하세요.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">지식재산권</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          CalcLab 저장소의 소스 코드는 저장소에 포함된 MIT 라이선스에 따라
          이용할 수 있습니다. 제3자의 상표, 자료와 오픈소스 구성요소에는 각
          권리자의 조건이 적용됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          제공 가능성과 변경
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          유지보수, 보안 또는 기술적 사유로 서비스 일부가 변경되거나 일시적으로
          제공되지 않을 수 있습니다. 기능이나 이용 조건이 달라지면 필요한
          범위에서 이 약관을 갱신하고 시행일을 표시합니다.
        </p>
      </section>
    </InfoPage>
  );
}
