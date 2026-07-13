# Korean Compound Interest Calculator

Status: Draft

> This specification is not approved for implementation. Implementation must not begin until product review explicitly changes the status to `Approved`.

## Overview

The Korean Compound Interest Calculator estimates how an initial principal and fixed recurring contributions may grow under a constant annual interest rate and selected compounding schedule. Optional inflation and simplified tax inputs show additional estimate views without representing an actual product, portfolio, or tax outcome.

### Purpose

Help Korean savers, long-term investors, workers planning future assets, and users comparing contribution and return scenarios understand the possible effect of time, contribution frequency, compounding frequency, contribution timing, inflation, and simplified tax.

Every result must be labeled as an estimate, never a guarantee or personalized financial recommendation.

## User Problem

Users need a clear way to compare long-term growth scenarios without building spreadsheets or interpreting financial formulas. Existing tools may obscure whether deposits occur at the beginning or end of a period, mix nominal and inflation-adjusted values, or present tax-adjusted results without explaining their assumptions.

## Requirements

- Accept a non-negative initial principal and non-negative fixed recurring contribution.
- Support monthly and yearly recurring contributions.
- Support yearly, semiannual, quarterly, monthly, and daily compounding.
- Support contributions at the beginning or end of each contribution period.
- Use a whole-year duration in the initial scope.
- Allow optional non-negative inflation and simplified tax rates.
- Present gross, tax-adjusted, and inflation-adjusted results with explicit labels and assumptions.
- Provide a yearly breakdown and an equivalent chart-ready yearly dataset.
- Explain formulas, timing, precision, and simplifications in plain Korean.
- Preserve distinctions between contributed principal, modeled interest, simplified tax, and net gain.
- Do not imply guaranteed returns, account-specific accuracy, legal tax treatment, or financial advice.
- Do not accept withdrawals or negative-return scenarios in the initial scope.

## Inputs

All monetary inputs use Korean won and accept whole-won values. Percentage inputs are entered as percentages and converted to decimal rates for calculation.

| Input                        | Type            | Unit/Format                         | Required | Default               | Allowed Range                                                          | Validation Behavior                                                                                                                                                   |
| ---------------------------- | --------------- | ----------------------------------- | -------- | --------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial principal            | Number          | KRW, whole won                      | Yes      | ₩1,000,000            | ₩0-₩100,000,000,000                                                    | Reject empty, negative, non-numeric, fractional-won, and out-of-range values; retain the entered value and show an associated message.                                |
| Recurring contribution       | Number          | KRW per contribution, whole won     | Yes      | ₩100,000              | ₩0-₩1,000,000,000                                                      | Reject empty, negative, non-numeric, fractional-won, and out-of-range values. Zero is valid.                                                                          |
| Contribution frequency       | Enum            | Monthly or yearly                   | Yes      | Monthly               | `monthly`, `yearly`                                                    | Reject unsupported or missing values rather than silently substituting a value.                                                                                       |
| Investment duration          | Integer         | Years                               | Yes      | 10 years              | 1-100 years                                                            | Reject empty, fractional, zero, negative, non-numeric, and out-of-range values. Months are excluded from the initial scope pending approval.                          |
| Annual interest rate         | Number          | Percent per year                    | Yes      | 5%                    | 0%-100%                                                                | Reject empty, negative, non-numeric, non-finite, and out-of-range values. Zero is valid.                                                                              |
| Compounding frequency        | Enum            | Periods per year                    | Yes      | Monthly               | Yearly (1), semiannually (2), quarterly (4), monthly (12), daily (365) | Reject unsupported or missing values. Daily compounding uses 365 equal periods per year.                                                                              |
| Contribution timing          | Enum            | Start or end of contribution period | Yes      | End of period         | `beginning`, `end`                                                     | Reject unsupported or missing values. The selected timing must be repeated near the result assumptions.                                                               |
| Inflation rate               | Number or empty | Percent per year                    | No       | Empty (no adjustment) | 0%-100%                                                                | Empty disables the adjustment; zero is valid and produces no change. Reject negative, non-numeric, non-finite, and out-of-range values.                               |
| Simplified tax rate on gains | Number or empty | Percent of modeled gross interest   | No       | Empty (no tax)        | 0%-100%                                                                | Empty disables tax; zero is valid. Reject negative, non-numeric, non-finite, and out-of-range values. Label this as a simplified scenario rate, not a statutory rate. |

At least one of initial principal or recurring contribution must be greater than zero. Defaults are Draft product decisions and require approval.

## Outputs

| Output                        | Type                     | Unit/Format                        | Description                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estimated final balance       | Money                    | KRW, nearest won                   | Primary estimate after the optional simplified terminal tax. Equals gross final balance when tax is disabled.                                                                                                                       |
| Estimated gross final balance | Money                    | KRW, nearest won                   | Modeled balance before simplified tax.                                                                                                                                                                                              |
| Total contributed principal   | Money                    | KRW, nearest won                   | Initial principal plus every recurring contribution through the selected horizon.                                                                                                                                                   |
| Estimated gross interest      | Money                    | KRW, nearest won                   | Gross final balance minus total contributed principal.                                                                                                                                                                              |
| Estimated tax                 | Money                    | KRW, nearest won                   | Simplified tax applied once to positive modeled gross interest. Zero when tax is disabled.                                                                                                                                          |
| Estimated net gain            | Money                    | KRW, nearest won                   | Estimated gross interest minus estimated tax.                                                                                                                                                                                       |
| Inflation-adjusted value      | Money                    | Present-value KRW, nearest won     | Estimated final balance discounted by the optional constant inflation assumption. Equals estimated final balance when inflation is disabled.                                                                                        |
| Growth multiplier             | Decimal                  | `0.00×`                            | Estimated final balance divided by total contributed principal. This is descriptive and must not be labeled as a return rate.                                                                                                       |
| Yearly breakdown              | Table rows               | KRW and percent                    | One row per completed year with year, opening balance, contributions during year, interest during year, cumulative principal, gross closing balance, estimated terminal tax, net closing balance, and inflation-adjusted net value. |
| Chart-ready yearly data       | Structured yearly series | Unrounded numeric values plus year | Uses the same yearly source data as the table for cumulative principal, gross balance, net balance, and inflation-adjusted value. It is not a separately calculated result.                                                         |

### Formatting and rounding

- Display won amounts using the Korean locale, the won symbol, grouping separators, and no decimal fraction (for example, `₩12,345,678`).
- Retain full supported calculation precision throughout the model and do not round each compounding or contribution period.
- Round displayed money to the nearest won only at the presentation boundary using one documented, deterministic half-up rule.
- Display percentage assumptions with up to two decimal places and the growth multiplier with two decimal places.
- Keep underlying chart and table values unrounded until formatting so every output reconciles to the same calculation.
- If total contributed principal is zero, the growth multiplier is undefined and must display as unavailable rather than infinity or `NaN`.

## Formula

### Symbols

| Symbol | Meaning                                           |
| ------ | ------------------------------------------------- |
| `P`    | Initial principal in won                          |
| `C`    | Contribution per contribution period in won       |
| `r`    | Nominal annual interest rate as a decimal         |
| `m`    | Compounding periods per year: 1, 2, 4, 12, or 365 |
| `q`    | Contribution periods per year: 1 or 12            |
| `t`    | Investment duration in whole years                |
| `N`    | Total contribution periods, `q × t`               |
| `i`    | Effective interest rate per contribution period   |
| `f`    | Annual inflation assumption as a decimal          |
| `s`    | Simplified tax rate as a decimal                  |

### Mathematical formula

The initial principal uses periodic compound interest:

```text
principalFutureValue = P × (1 + r / m)^(m × t)
```

To reconcile contribution and compounding frequencies, derive the effective rate for one contribution period:

```text
i = (1 + r / m)^(m / q) - 1
N = q × t
```

For end-of-period contributions (an ordinary annuity):

```text
if i ≠ 0:
  contributionFutureValue = C × ((1 + i)^N - 1) / i

if i = 0:
  contributionFutureValue = C × N
```

For beginning-of-period contributions (an annuity due), every contribution receives one additional contribution period of growth:

```text
if i ≠ 0:
  contributionFutureValue = C × ((1 + i)^N - 1) / i × (1 + i)

if i = 0:
  contributionFutureValue = C × N
```

Then:

```text
grossFinalBalance = principalFutureValue + contributionFutureValue
totalContributedPrincipal = P + C × N
grossInterest = grossFinalBalance - totalContributedPrincipal
```

This treatment follows standard future-value formulas for a lump sum, ordinary annuity, and annuity due. Beginning-of-period contributions must produce a result greater than or equal to the equivalent end-of-period scenario.

### Inflation adjustment

Inflation-adjusted value expresses the tax-adjusted estimate in today's purchasing-power terms under a constant annual inflation assumption:

```text
inflationAdjustedValue = estimatedFinalBalance / (1 + f)^t
```

If inflation is empty or zero, the inflation-adjusted value equals the estimated final balance.

### Simplified tax treatment

Tax is a product simplification, not a model of Korean tax law. It is applied once at the selected horizon and does not reduce the balance during compounding:

```text
estimatedTax = max(grossInterest, 0) × s
estimatedFinalBalance = grossFinalBalance - estimatedTax
estimatedNetGain = grossInterest - estimatedTax
```

For each yearly row, estimated tax and net balance represent a hypothetical end-at-that-year scenario; tax is not deducted annually from the growth path.

### Product assumptions

- Interest, inflation, contribution amount, and contribution schedule remain constant for the full duration.
- A year contains equal financial periods. Daily compounding means 365 periods; leap days, calendar-month lengths, holidays, and transaction times are ignored.
- Monthly contributions occur at equal one-twelfth-year intervals even when the compounding frequency differs.
- Beginning timing places the first contribution at time zero; end timing places the first contribution after one complete contribution period.
- No fees, spreads, withdrawals, missed contributions, rate changes, market volatility, or account-specific rules are modeled.
- Negative rates and withdrawals are outside the initial scope.

### Simplified estimate and unknown outcomes

The formula is deterministic for the entered assumptions, but the result is only a scenario estimate. Actual returns, inflation, taxes, contribution execution, fees, and product terms are unknown and may differ materially. Content must not recommend an investment, predict a return, or provide personalized financial or tax advice.

### Calculation precision

- Convert percentage inputs to decimal rates before calculation.
- Carry at least 12 significant decimal digits through exponentiation and intermediate values.
- Do not round periodic interest, yearly rows, tax, or inflation adjustments before the final presentation boundary.
- Use the same raw yearly records for summary, table, and chart outputs to prevent drift.
- Explicitly handle the zero-rate branch to avoid division by zero or unstable near-zero behavior.

### Authoritative references

- [Investor.gov Compound Interest Calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator) — official SEC investor-education framing for initial investment, recurring contribution, duration, estimated rate, and compounding frequency.
- [Consumer Financial Protection Bureau: How does compound interest work?](https://www.consumerfinance.gov/ask-cfpb/how-does-compound-interest-work-en-1683/) — plain-language explanation of earning interest on principal and accumulated interest.
- [OpenStax Principles of Finance: Annuities](https://openstax.org/books/principles-finance/pages/8-2-annuities) — future value of an ordinary annuity and the one-period adjustment for an annuity due.
- [U.S. Bureau of Labor Statistics: Purchasing power and constant dollars](https://www.bls.gov/cpi/factsheets/purchasing-power-constant-dollars.htm) — purchasing-power and constant-dollar adjustment concepts.

These sources establish general mathematics and terminology. They do not validate the simplified tax assumption or guarantee real-world outcomes.

## Validation

- Validate required fields on submission and after a user leaves an edited field; do not interrupt entry on every keystroke.
- Keep the entered value visible when invalid and associate a concise Korean error message with the field.
- Treat localized grouping separators, whitespace, signs, decimal separators, exponent notation, `Infinity`, and `NaN` deliberately rather than relying on permissive coercion.
- Reject negative monetary values, negative rates, unsupported enum values, and durations outside the approved range.
- Accept zero principal or zero contribution individually, but reject a scenario where both are zero.
- Optional inflation and tax fields may be empty; required numeric fields may not.
- Do not calculate or announce a new result while any input is invalid.
- Present a summary error message for submission failures and move focus to the first invalid field without discarding other inputs.

## Edge Cases

- **Zero interest:** final gross balance equals total contributed principal; gross interest and tax are zero, regardless of contribution timing.
- **Zero contribution:** calculate principal-only compound growth; contribution frequency and timing do not change the result.
- **Zero principal:** calculate recurring-contribution growth; at least one positive contribution is required.
- **Both principal and contribution zero:** reject as a non-computable scenario.
- **Negative values:** reject for principal, contribution, interest, inflation, tax, and duration.
- **Invalid duration:** reject zero, negative, fractional, empty, non-numeric, and greater-than-100-year values.
- **Very large valid values:** calculate without visual overflow, scientific notation in user-facing money, non-finite results, or silent precision loss; show an explicit error if the supported numeric limit is exceeded.
- **Zero tax:** estimated tax is zero and net values equal gross values.
- **Zero inflation:** inflation-adjusted value equals the estimated final balance.
- **Contribution timing:** beginning timing yields one extra contribution period of growth relative to end timing when interest and contributions are positive.
- **Rounding:** summary, yearly table, and chart must reconcile after display rounding; no cumulative per-period rounding is allowed.
- **Empty fields:** required empty fields block calculation; optional empty fields disable their adjustment.
- **Unsupported values:** reject unknown contribution frequencies, compounding frequencies, timing values, and enum casing variants not explicitly normalized.
- **Near-zero rate:** follow the zero-rate behavior when the normalized rate is exactly zero and verify numerical stability for very small positive rates.
- **URL parameters:** if shareable parameters are later approved, parse them as untrusted input, enforce the same schema and ranges, ignore or reject unknown keys, prevent duplicate-key ambiguity, and never render unsanitized values. URL behavior is not part of this Draft.

## Mobile UX

Use a single-column, mobile-first flow in this order:

1. Title and concise estimate disclaimer
2. Input form
3. Primary estimated final balance
4. Summary metrics
5. Growth chart
6. Yearly table
7. Formula and assumption explanation
8. FAQ
9. Related calculators

Requirements:

- Group core inputs before optional adjustments and disclose optional inflation and tax without hiding their meaning.
- Keep persistent labels, units, defaults, and concise help text visible.
- Use appropriate numeric input modes without preventing keyboard or assistive-technology entry.
- Place the primary action after the final input; do not require horizontal scrolling for the form or result summary.
- Let wide yearly data scroll within a clearly labeled region or transform it into labeled rows without losing header relationships.
- Keep the estimate disclaimer and active assumptions near the primary result.
- Follow `DESIGN_SYSTEM.md`; this specification does not define a visual mockup.

## Desktop UX

Desktop may use a left input panel and right result panel while preserving the mobile reading and focus order. The chart and yearly table may span the lower content width, followed by formula, FAQ, and related calculators. The result panel may remain visible during input changes only if it does not obscure content, trap focus, or create layout shift.

## Accessibility

- Give every control a persistent programmatic label; do not use placeholders as labels.
- Support complete keyboard operation in a logical order with no keyboard traps.
- Provide clearly visible focus using the established focus token in both themes.
- Associate validation messages with their fields and provide a semantic error summary on failed submission.
- Announce a completed calculation through a concise polite live region or by moving focus to a result heading after explicit submission; do not announce every keystroke.
- Use at least 44-by-44-pixel touch targets for interactive controls.
- Use semantic headings, fieldsets and legends for grouped choices, and meaningful button text.
- Give the yearly table a caption, column and row headers where applicable, explicit units, and correct header associations.
- Provide a text summary and the complete yearly table as alternatives to the chart. Chart information must not depend on hover.
- Respect reduced-motion preferences and avoid non-essential result animation.
- Never use color alone to distinguish principal, interest, tax, validation state, or chart series; pair color with text, shape, pattern, or marker.
- Ensure status, disclaimer, tooltip, and help content are accessible to screen readers and at 200% zoom.

## SEO

- **Primary search intent:** `복리 계산기`
- **Supporting topics:** `복리 이자 계산`, `월 적립 복리`, `적립식 투자 계산`, `투자 수익 계산`, `물가 반영 복리`
- **Proposed route slug:** `/finance/compound-interest`
- **Page title direction:** Lead with `복리 계산기`, then describe 적립식 투자 and 예상 이자 concisely, followed by `CalcLab` through the global title template.
- **Meta description direction:** Explain that users can estimate growth from initial principal, monthly or yearly contributions, rate, duration, compounding, and optional inflation or simplified tax. State or imply estimation, not guaranteed returns.
- **Visible explanatory content:** Define compound interest, explain contribution timing and compounding frequency, distinguish principal from gain, document inflation and simplified tax assumptions, show formulas and worked interpretation guidance, and include an estimate disclaimer.
- **FAQ requirements:** Answer genuine visible questions about compound interest, monthly contributions, beginning versus end timing, compounding frequency, inflation adjustment, simplified tax, and why actual outcomes differ. Answers must be concise, non-promotional, and non-advisory.
- **Internal links:** Link from the finance category and relevant educational content when those surfaces exist. Link to related calculators only after they are published; do not create dead or placeholder links.
- **Structured data:** Use accurate `WebPage` and visible `BreadcrumbList` data when the route hierarchy exists. Do not require `FAQPage` markup because it is not currently listed among Google Search's supported rich-result types; reassess official guidance during implementation. Structured data must match visible content exactly.
- Use one descriptive H1, a unique canonical URL, unique metadata, indexable server-rendered explanatory content, and natural Korean language without keyword repetition.

SEO implementation must recheck current [Google Search structured-data support](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) and [breadcrumb guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) during the implementation stage.

## Related Calculators

Potential future relationships, only after those calculators have approved specifications and published routes:

- Simple interest calculator
- Savings goal calculator
- Investment return calculator
- Inflation calculator
- Loan calculator

No related calculator or link is part of this Draft's implementation scope.

## Testing Requirements

Expected values must be derived independently from the production calculation path. Approved sources include a manually reviewed period-by-period ledger, an independently constructed spreadsheet, and published authoritative examples. Tests must not generate expected values by calling or restating the production formula.

- **Principal-only growth:** cover multiple rates, durations, and compounding frequencies. Include the CFPB published two-year 5% annual-compounding example as an external concept fixture at raw precision.
- **Monthly recurring contributions:** verify monthly end-of-period deposits with monthly and non-monthly compounding.
- **Yearly recurring contributions:** verify yearly deposits across every compounding frequency.
- **Beginning contributions:** confirm the first deposit occurs at time zero and receives one extra contribution period of growth.
- **End contributions:** confirm the first deposit occurs after one full contribution period and the final deposit receives no further growth.
- **Published annuity fixture:** independently reproduce the OpenStax example of 250 units contributed monthly for eight years at 3.75% compounded monthly, end of period, before applying KRW display rounding.
- **Zero interest:** verify gross balance equals total contributed principal and timing does not change the result.
- **Validation failures:** cover empty required fields, both money inputs zero, negative values, fractional years, unsupported enums, malformed localized numbers, non-finite values, and every range boundary.
- **Inflation adjustment:** verify zero inflation and independently derived positive-inflation present values.
- **Simplified tax:** verify empty, zero, positive, and 100% rates; verify tax applies only to positive modeled interest and is not deducted during compounding.
- **Formatting:** verify Korean won grouping, nearest-won output, percentage precision, multiplier precision, unavailable multiplier behavior, and large-value display without scientific notation.
- **Precision:** compare closed-form results against an independent high-precision ledger within an explicitly approved tolerance; include very small positive rates and long durations.
- **Large values:** verify valid maximum inputs remain finite, render correctly, and reconcile across summary, table, and chart data.
- **Yearly data:** verify one record per completed year, consistent cumulative contributions, timing-specific contributions, and exact reuse between table and chart.
- **Accessibility behavior:** cover labels, grouped controls, validation associations, error summary, result announcement, keyboard operation, and chart alternatives.
- **SEO behavior:** verify unique metadata, canonical direction, indexable explanatory content, breadcrumbs when available, and structured data matching visible content.

## Implementation Plan

**Pending Sites analysis and specification approval.**

Do not create implementation details, application code, tests, dependencies, routes, or UI until this specification has been reviewed and explicitly changed to `Approved`.

## Definition of Done

This Draft is ready for approval only when:

- [ ] Product approves the inputs, defaults, ranges, and whole-year duration.
- [ ] Product approves contribution timing and cross-frequency assumptions.
- [ ] Product approves the primary result, simplified tax treatment, inflation basis, and growth multiplier definition.
- [ ] Product approves the route, Korean metadata direction, visible explanation, FAQ scope, and related-calculator policy.
- [ ] Mathematical formulas and authoritative references are reviewed.
- [ ] Validation, edge cases, accessibility, and testing requirements are accepted.
- [ ] Sites analysis is completed after specification approval and before implementation planning.
- [ ] The Implementation Plan is written after Sites analysis.
- [ ] The specification status is explicitly changed to `Approved` before implementation.
- [ ] `npm run check` and `npm run build` pass for this documentation change.
- [ ] The focused specification commit is pushed.

## Questions Requiring Product Approval

1. Are the Draft defaults and maximum ranges appropriate for CalcLab's Korean audience?
2. Should the first release remain whole-year only, or is partial-year/month input necessary enough to justify the additional timing rules?
3. Should optional inflation and tax remain empty by default, or should the UI provide explicit opt-in presets with dated sources?
4. Is terminal simplified tax on gross interest acceptable, with no tax drag during compounding and no claim of statutory accuracy?
5. Should the primary estimated final balance be tax-adjusted when tax is enabled, with the gross balance shown separately?
6. Should the growth multiplier use tax-adjusted final balance divided by total contributed principal, despite not being a time-weighted return?
7. Is `/finance/compound-interest` the approved route within the future finance taxonomy?
