# CAGR Calculator

Status: Implemented

## Purpose

투자나 사업 지표의 시작값과 종료값, 경과 기간을 이용해 연평균 복합성장률(CAGR)을 계산한다. 단순한 전체 수익률과 시간의 영향을 반영한 연환산 성장률을 함께 보여 주어 기간이 다른 성과를 같은 기준으로 해석하도록 돕는다.

## Requirements

- 시작값, 종료값, 투자 기간과 기간 단위를 입력받는다.
- 기간은 년 또는 개월로 받고 내부에서 년으로 정규화한다.
- CAGR, 총수익률, 절대 손익과 연환산 성장 요약을 제공한다.
- 성장, 무성장, 손실과 원금 전액 손실을 지원한다.
- Decimal.js로 계산하고 표시 전까지 반올림하지 않는다.
- 현금흐름, 추가 납입·인출, 배당, 세금, 수수료와 변동 경로는 모델링하지 않는다.

## Inputs

| Input     | Type   | Unit/Format | Required | Default      | Validation                 |
| --------- | ------ | ----------- | -------- | ------------ | -------------------------- |
| 시작값    | 소수   | 원          | 예       | 10,000,000원 | 0 초과, 1조원 이하         |
| 종료값    | 소수   | 원          | 예       | 15,000,000원 | 0 이상, 1조원 이하         |
| 투자 기간 | 정수   | 년/개월     | 예       | 5년          | 1개월 이상, 1,200개월 이하 |
| 기간 단위 | 열거형 | 년/개월     | 예       | 년           | 지원 값만 허용             |

## Outputs

| Output           | Unit | Description                                       |
| ---------------- | ---- | ------------------------------------------------- |
| CAGR             | %    | 전체 기간의 성장 배수를 매년 동일하게 환산한 비율 |
| 총수익률         | %    | 시작값 대비 전체 기간의 증감률                    |
| 절대 손익        | 원   | 종료값 - 시작값                                   |
| 연환산 성장 요약 | 설명 | 방향, 연환산 비율, 기간과 전체 변화를 함께 설명   |

## Assumptions and Formula

`B`는 시작값, `E`는 종료값, `Y`는 년으로 환산한 기간이다.

- 년 단위: `Y = 입력 기간`
- 개월 단위: `Y = 입력 개월 / 12`
- CAGR: `(E / B)^(1 / Y) - 1`
- 총수익률: `(E / B - 1) × 100`
- 절대 손익: `E - B`

CAGR은 중간 변동을 무시하고 시작값이 매년 같은 복리 비율로 변해 종료값에 도달했다고 가정하는 기하평균이다. 종료값이 0이면 CAGR은 -100%로 처리한다. 계산은 Decimal.js 고정밀 값을 유지하며 퍼센트와 금액은 화면 표시 시점에만 반올림한다.

## Validation

- 시작값은 0보다 커야 하며 종료값은 0 이상이어야 한다. 음수 종료값은 임의 기간의 실수 CAGR을 정의할 수 없어 거부한다.
- 값은 빈 문자열, 부호만 있는 값, 지수 표기, `Infinity`, `NaN`, 잘못된 쉼표를 거부한다.
- 기간은 1 이상의 정수이며 최대 100년 또는 1,200개월이다.
- 제출 실패 시 입력을 보존하고 오류를 해당 필드에 연결하며 첫 오류 입력으로 포커스를 옮긴다.

## Edge Cases

- 시작값과 종료값이 같으면 CAGR과 총수익률, 절대 손익은 모두 0이다.
- 종료값이 시작값보다 작으면 CAGR, 총수익률과 절대 손익은 음수다.
- 1개월은 `1/12년`, 100년은 `100년`으로 정확히 환산한다.
- 종료값 0은 총수익률과 CAGR 모두 -100%다.

## Accessibility

모든 입력은 영구 라벨, 단위, 도움말과 연결된 오류 설명을 가진다. 키보드로 모든 컨트롤을 조작할 수 있고 포커스가 시각적으로 드러난다. 오류 요약은 `role=alert`, 계산 완료는 `aria-live=polite`로 알린다. 모바일에서는 입력과 결과를 한 열로, 넓은 화면에서는 나란히 배치하며 색만으로 성장과 손실을 구분하지 않는다.

## SEO

경로는 `/finance/cagr`이다. 고유 한국어 title과 description, canonical, Open Graph, Twitter/X 메타데이터를 제공한다. 보이는 breadcrumb와 일치하는 `BreadcrumbList`, 실제 페이지 설명과 일치하는 `WebPage`만 구조화 데이터로 제공한다.

## Architecture

- `src/features/cagr/`에서 types, constants, validation, calculation, formatting, client UI를 분리한다.
- 서버 route는 metadata, 구조화 데이터, 정적 한국어 콘텐츠와 작은 client boundary만 조합한다.
- 기존 `createPageMetadata`, published-calculator registry, 공용 카드와 sitemap 구성을 재사용한다.
- 기존 Compound Interest, Loan, Savings, Deposit 계산 로직은 변경하지 않는다.

## Related Calculators

- `/finance/compound-interest`
- `/finance/loan`
- `/finance/savings`
- `/finance/deposit`

현재 게시된 경로만 표시한다.

## Testing

- 성장, 손실, 무성장, 전액 손실, 1개월과 100년 CAGR 계산
- 개월을 년으로 환산하는 계산과 결과 정합성
- 시작값, 종료값, 기간, 단위와 malformed 입력 검증
- UI 기본값, 손실 요약, 오류 연결, 첫 오류 포커스와 완료 알림
- metadata, canonical, 구조화 데이터와 관련 링크
- registry, 계산기 목록과 sitemap 통합

## Implementation Plan

1. 독립적인 CAGR types, constants, validation, calculation과 formatting 모듈을 작성한다.
2. 접근 가능한 client calculator와 결과 요약을 구현한다.
3. 자연스러운 한국어 설명, 예시, 해석 가이드, FAQ와 주의사항을 서버 route에 구성한다.
4. published registry를 통해 탐색, 계산기 목록과 sitemap에 추가한다.
5. 전체 diff를 검토하고 `npm run check`, `npm run build`를 실행한다.

## Definition of Done

- [x] 요구 범위와 한국어 콘텐츠 구현
- [x] 계산·검증·표시·UI·route 관심사 분리
- [x] 접근성, SEO, navigation 통합
- [x] 요구 테스트 추가
- [x] `npm run check` 통과
- [x] `npm run build` 통과
- [x] 전체 diff 검토 완료
- [x] 커밋 완료
- [x] push 완료
- [x] Draft PR 생성 완료
