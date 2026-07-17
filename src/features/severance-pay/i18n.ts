export type SeveranceLocale = "ko" | "en";

const dictionaries = {
  ko: {
    calculator: {
      inputEyebrow: "입력",
      inputTitle: "퇴직금 조건 설정",
      inputDescription: "1일 평균임금과 계속근로기간을 입력하세요.",
      averageWage: "1일 평균임금",
      averageHelp:
        "퇴직 사유 발생 전 3개월 임금총액을 해당 기간 총일수로 나눈 금액",
      averagePlaceholder: "예: 100,000",
      won: "원",
      periodMethod: "근속기간 입력 방식",
      dates: "입사일·퇴직일",
      manual: "년·월·일 직접 입력",
      startDate: "입사일",
      endDate: "퇴직일",
      endDateHelp: "마지막 근무일의 다음 날",
      years: "년",
      months: "개월",
      days: "일",
      calculate: "퇴직금 계산하기",
      reset: "초기화",
      errorSummary:
        "입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.",
      resultEyebrow: "예상 결과",
      resultTitle: "퇴직금 계산 결과",
      estimatedPay: "예상 퇴직금",
      averageDailyWage: "1일 평균임금",
      thirtyDayWage: "30일분 평균임금",
      resultNote:
        "법정 산식을 단순 적용한 세전 추정치이며 실제 지급액을 보장하지 않습니다.",
      details: "상세 내역 보기",
      additional: "계산 요약과 적용 가정",
      servicePeriod: "계속근로기간",
      serviceDays: "환산 재직일수",
      serviceYears: "환산 근속연수",
      formula: "1일 평균임금 × 30 × 계속근로일수 ÷ 365",
      dateBasis: "입사일 포함, 입력한 퇴직일 제외",
      manualBasis: "년 + 월/12 + 일/365 단순 환산",
      emptyDetails: "계산 후 근속기간과 산식 적용 내역을 확인할 수 있습니다.",
      complete: (amount: string) =>
        `계산이 완료되었습니다. 예상 퇴직금은 ${amount}입니다.`,
      resetAnnouncement: "입력값과 계산 결과를 초기화했습니다.",
    },
    validation: {
      wageRequired: "1일 평균임금을 입력해 주세요.",
      wageInvalid:
        "1일 평균임금은 0보다 크고 10억원 이하인 숫자로 입력해 주세요.",
      startRequired: "입사일을 입력해 주세요.",
      endRequired: "퇴직일을 입력해 주세요.",
      dateOrder: "퇴직일은 입사일보다 뒤여야 합니다.",
      minimumService:
        "법정 퇴직금 추정을 위해 계속근로기간은 1년 이상이어야 합니다.",
      maximumService: "계속근로기간은 최대 100년까지 입력할 수 있습니다.",
      manualRequired: "년, 월, 일 중 하나 이상의 근속기간을 입력해 주세요.",
      yearsInvalid: "년은 0~100의 정수로 입력해 주세요.",
      monthsInvalid: "개월은 0~11의 정수로 입력해 주세요.",
      daysInvalid: "일은 0~364의 정수로 입력해 주세요.",
    },
    page: {
      metaTitle: "퇴직금 계산기 - 법정 퇴직금 예상액 계산",
      metaDescription:
        "1일 평균임금과 입사일·퇴직일 또는 근속 년·월·일로 법정 산식 기준 예상 퇴직금을 계산하세요.",
      title: "퇴직금 계산기",
      category: "노동 · 급여 계산기",
      description:
        "1일 평균임금과 계속근로기간을 기준으로 법정 퇴직금 산식의 예상액을 확인하세요.",
      intro:
        "통상임금 비교, 평균임금 제외기간, 중간정산과 회사 규정에 따라 실제 지급액은 달라질 수 있습니다.",
      breadcrumb: "현재 위치",
      home: "홈",
      calculators: "계산기",
      explanationTitle: "계산 방법",
      explanation: [
        "근로자퇴직급여 보장법상 퇴직금은 계속근로기간 1년에 대해 30일분 이상의 평균임금을 기준으로 합니다.",
        "이 계산기는 고용노동부 안내 산식인 1일 평균임금 × 30 × 계속근로일수 ÷ 365를 적용합니다.",
        "날짜 모드는 입사일부터 퇴직일 전날까지 실제 달력 일수를 계산하며, 퇴직일은 마지막 근무일의 다음 날로 입력합니다.",
      ],
      assumptionsTitle: "중요한 가정과 주의사항",
      assumptions: [
        "법정 적용은 원칙적으로 계속근로 1년 이상이며 4주 평균 주 소정근로시간 15시간 이상인 경우를 전제로 합니다.",
        "산출 평균임금이 통상임금보다 낮으면 통상임금을 기준으로 할 수 있으나 이 계산기는 통상임금을 별도로 비교하지 않습니다.",
        "출산휴가, 업무상 재해 요양, 사용자 귀책 휴업 등 평균임금 산정 제외기간과 퇴직금 중간정산은 반영하지 않습니다.",
        "세금과 회사의 상향 규정은 반영하지 않은 세전 추정치입니다.",
      ],
      faqTitle: "자주 묻는 질문",
      faq: [
        [
          "퇴직일은 어떤 날짜를 입력하나요?",
          "고용노동부 계산기 기준으로 마지막 근무일의 다음 날을 입력합니다.",
        ],
        [
          "1년 미만 근무해도 계산되나요?",
          "법정 퇴직금 적용 대상은 원칙적으로 계속근로 1년 이상이므로 이 계산기는 365일 미만을 계산하지 않습니다.",
        ],
        [
          "평균임금은 어떻게 구하나요?",
          "원칙적으로 퇴직 사유 발생 전 3개월간 지급된 임금총액을 그 기간의 총일수로 나눕니다. 제외기간과 포함 임금 판단은 별도 확인이 필요합니다.",
        ],
        [
          "계산 결과가 회사 금액과 다른 이유는 무엇인가요?",
          "통상임금 비교, 상여금·연차수당 반영, 제외기간, 중간정산, 단체협약과 회사 규정 차이 때문일 수 있습니다.",
        ],
      ] as const,
      sourcesTitle: "공식 기준",
      sources: [
        [
          "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=284455&viewCls=lsRvsDocInfoR",
          "국가법령정보센터 · 근로자퇴직급여 보장법",
        ],
        [
          "https://1350.moel.go.kr/home/hp/retirementpaycal/retirementpaycal.jsp",
          "고용노동부 노동포털 · 퇴직금 계산",
        ],
      ] as const,
    },
  },
  en: {
    calculator: {
      inputEyebrow: "Inputs",
      inputTitle: "Severance conditions",
      inputDescription:
        "Enter average daily wage and continuous service period.",
      averageWage: "Average daily wage",
      averageHelp:
        "Wages paid during the three months before retirement divided by calendar days in that period",
      averagePlaceholder: "e.g. 100,000",
      won: "KRW",
      periodMethod: "Service period input",
      dates: "Employment dates",
      manual: "Years, months, and days",
      startDate: "Employment start date",
      endDate: "Retirement date",
      endDateHelp: "The day after the last working day",
      years: "years",
      months: "months",
      days: "days",
      calculate: "Calculate severance pay",
      reset: "Reset",
      errorSummary: "Check the inputs. Focus moved to the first error.",
      resultEyebrow: "Estimated result",
      resultTitle: "Severance pay result",
      estimatedPay: "Estimated severance pay",
      averageDailyWage: "Average daily wage",
      thirtyDayWage: "30 days of average wage",
      resultNote:
        "A pre-tax estimate using the statutory formula. Actual payment is not guaranteed.",
      details: "View detailed breakdown",
      additional: "Calculation summary and assumptions",
      servicePeriod: "Continuous service period",
      serviceDays: "Converted service days",
      serviceYears: "Converted service years",
      formula: "Average daily wage × 30 × service days ÷ 365",
      dateBasis: "Start date included; retirement date excluded",
      manualBasis: "Years + months/12 + days/365 conversion",
      emptyDetails:
        "Calculate to view the service period and formula breakdown.",
      complete: (amount: string) =>
        `Calculation complete. Estimated severance pay is ${amount}.`,
      resetAnnouncement: "Inputs and results were reset.",
    },
    validation: {
      wageRequired: "Enter the average daily wage.",
      wageInvalid:
        "Enter an average daily wage greater than zero and no more than KRW 1 billion.",
      startRequired: "Enter the employment start date.",
      endRequired: "Enter the retirement date.",
      dateOrder: "The retirement date must be after the start date.",
      minimumService:
        "Continuous service must be at least one year for this statutory estimate.",
      maximumService: "Continuous service can be up to 100 years.",
      manualRequired: "Enter at least one service-period value.",
      yearsInvalid: "Years must be an integer from 0 to 100.",
      monthsInvalid: "Months must be an integer from 0 to 11.",
      daysInvalid: "Days must be an integer from 0 to 364.",
    },
    page: {
      metaTitle: "Korean Severance Pay Calculator",
      metaDescription:
        "Estimate Korean statutory retirement allowance from average daily wage and employment dates or years, months, and days of service.",
      title: "Severance Pay Calculator",
      category: "Employment calculator",
      description:
        "Estimate Korean statutory retirement allowance from average daily wage and continuous service.",
      intro:
        "Actual payment may differ due to ordinary-wage comparison, excluded periods, interim settlements, and workplace rules.",
      breadcrumb: "Breadcrumb",
      home: "Home",
      calculators: "Calculators",
      explanationTitle: "How the estimate works",
      explanation: [
        "Korean statutory retirement allowance generally uses at least 30 days of average wage for each year of continuous service.",
        "This calculator applies the Ministry of Employment and Labor formula: average daily wage × 30 × service days ÷ 365.",
        "Date mode counts calendar days from the employment start date up to, but not including, the retirement date. Enter the day after the last working day.",
      ],
      assumptionsTitle: "Important assumptions",
      assumptions: [
        "Eligibility generally assumes at least one year of continuous service and an average scheduled workweek of at least 15 hours over four weeks.",
        "If calculated average wage is lower than ordinary wage, ordinary wage may apply; this calculator does not perform that comparison.",
        "Excluded average-wage periods, interim settlements, taxes, and more favorable workplace rules are not modeled.",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        [
          "Which retirement date should I enter?",
          "Following the Ministry calculator, enter the day after the last working day.",
        ],
        [
          "Can I calculate less than one year?",
          "This calculator requires at least 365 days because statutory eligibility generally starts after one year of continuous service.",
        ],
        [
          "How is average wage determined?",
          "It is generally wages paid during the three months before retirement divided by calendar days in that period, subject to exclusions and wage-comparison rules.",
        ],
        [
          "Why might the employer's figure differ?",
          "Ordinary-wage comparison, bonuses, leave pay, excluded periods, interim settlements, and workplace rules can change the amount.",
        ],
      ] as const,
      sourcesTitle: "Official references",
      sources: [
        [
          "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=284455&viewCls=lsRvsDocInfoR",
          "Korean Law Information Center",
        ],
        [
          "https://1350.moel.go.kr/home/hp/retirementpaycal/retirementpaycal.jsp",
          "Ministry of Employment and Labor calculator",
        ],
      ] as const,
    },
  },
} as const;

export function getSeveranceDictionary(locale: SeveranceLocale) {
  return dictionaries[locale];
}
