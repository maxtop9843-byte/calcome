# Korean Compound Interest Calculator

Status: Implemented

> Product scope is approved. Implementation must follow the Sites analysis, implementation plan, and acceptance criteria in this specification without expanding scope.

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
- Present inflation and simplified tax as optional advanced settings, disabled by default and without hidden presets.
- Present gross, tax-adjusted, and inflation-adjusted results with explicit labels and assumptions.
- Provide a yearly breakdown and an equivalent chart-ready yearly dataset.
- Explain formulas, timing, precision, and simplifications in plain Korean.
- Preserve distinctions between contributed principal, modeled interest, simplified tax, and net gain.
- Do not imply guaranteed returns, account-specific accuracy, legal tax treatment, or financial advice.
- Do not accept withdrawals or negative-return scenarios in the initial scope.

## Inputs

All monetary inputs use Korean won and accept whole-won values. Percentage inputs are entered as percentages and converted to decimal rates for calculation. Inflation and simplified tax belong in an explicitly labeled optional advanced-settings group; both remain empty and inactive until the user enters a value.

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

At least one of initial principal or recurring contribution must be greater than zero. The listed defaults and ranges are approved product decisions.

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
| Growth multiplier             | Decimal                  | `0.00×`                            | Label as `예상 자산 배수 (납입 원금 대비)`: estimated final balance divided by total contributed principal. It is descriptive only and must never be labeled or described as a return rate.                                         |
| Yearly breakdown              | Table rows               | KRW and percent                    | One row per completed year with year, opening balance, contributions during year, interest during year, cumulative principal, gross closing balance, estimated terminal tax, net closing balance, and inflation-adjusted net value. |
| Chart-ready yearly data       | Structured yearly series | Unrounded numeric values plus year | Uses the same yearly source data as the table for cumulative principal, gross balance, net balance, and inflation-adjusted value. It is not a separately calculated result.                                                         |

### Formatting and rounding

- Display won amounts using the Korean locale, the won symbol, grouping separators, and no decimal fraction (for example, `₩12,345,678`).
- Retain full supported calculation precision throughout the model and do not round each compounding or contribution period.
- Round displayed money to the nearest won only at the presentation boundary using one documented, deterministic half-up rule.
- Display percentage assumptions with up to two decimal places and the growth multiplier with two decimal places. Always pair the multiplier with the label `예상 자산 배수 (납입 원금 대비)` or an equivalently explicit approved Korean label.
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
- **URL parameters:** if shareable parameters are later approved, parse them as untrusted input, enforce the same schema and ranges, ignore or reject unknown keys, prevent duplicate-key ambiguity, and never render unsanitized values. URL behavior is not part of the first release.

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
- Place inflation and simplified tax in an optional advanced-settings disclosure that is collapsed or inactive by default, clearly indicates when an adjustment is active, and contains no hidden or preselected rate.
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
- **Approved route slug:** `/finance/compound-interest`
- **Page title direction:** Lead with `복리 계산기`, then describe 적립식 투자 and 예상 이자 concisely, followed by `CalCome` through the global title template.
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

No related calculator or link is part of the approved first-release implementation scope.

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

## Sites Analysis

Analysis completed on 2026-07-13. The review focused on interaction, usability, accessible content structure, responsive information hierarchy, SEO content, and performance-conscious scope. Public page structure was reviewed; no reference is assumed to meet every accessibility requirement without implementation-stage testing.

### References analyzed

1. [Investor.gov Compound Interest Calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)
   - Uses a short staged flow: initial investment, contribution and duration, estimated rate, then compounding frequency.
   - Keeps persistent field names and short descriptions close to inputs.
   - Demonstrates the value of a focused calculator surface with related education separated below the task.
2. [Bankrate Compound Interest Calculator](https://www.bankrate.com/banking/savings/compound-savings-calculator/)
   - Frames the task around initial savings, duration, expected rate, recurring contributions, and compounding frequency.
   - Prioritizes final balance, total contributions, and interest earned, then supports interpretation with jump-linked explanations and related tools.
   - Shows why CalCome should keep educational content useful but avoid promotional interruptions inside the calculator flow.
3. [TransUnion Compound Interest Calculator](https://www.transunion.com/tools/compound-interest-calculator)
   - Makes contribution frequency and timing assumptions explicit and separates total value, principal, and interest.
   - Provides a growth view and schedule breakdown, followed by result definitions, limitations, and FAQs.
   - Reinforces using one shared yearly dataset for summary, chart, and table, with the table as a meaningful chart alternative.
4. [Moneysmart Compound Interest Calculator](https://moneysmart.gov.au/budgeting/compound-interest-calculator)
   - States that the calculator is a model rather than a prediction and places assumptions and disclaimers in visible, structured sections.
   - Explicitly documents deposit timing, interest-crediting assumptions, and the absence of inflation adjustment.
   - Reinforces concise, neutral guidance and clear separation between results, assumptions, and financial advice.

### Synthesized direction

- Use a mobile-first sequence with concise persistent labels, nearby units and help, and optional advanced settings after core inputs.
- Keep one primary result, then separate contributed principal, gross interest, simplified tax, net gain, inflation-adjusted value, and the clearly qualified estimated asset multiple.
- Surface the estimate disclaimer and active assumptions beside the result instead of burying them in long content.
- Use progressive disclosure for advanced inflation and tax settings, formula detail, and FAQs; never hide an applied assumption.
- Build the chart and yearly table from the same records. The table and text summary remain complete alternatives to visual output.
- Keep explanatory content server-rendered and organized with descriptive headings and useful internal navigation.
- Avoid copied layouts, reference branding, promotional detours, account prompts, and content that implies specific financial action.
- During implementation, test keyboard flow, focus, announcements, zoom, touch targets, and chart alternatives directly; reference-site behavior is not an accessibility substitute.

## Approved Product Decisions

1. The current default values and maximum ranges are approved.
2. The first release is limited to whole-year duration; partial years and months are out of scope.
3. Inflation and simplified tax are disabled by default.
4. Simplified tax is applied once to positive modeled interest at the selected horizon and does not reduce interim compounding.
5. When tax is enabled, the tax-adjusted balance is the primary result and gross balance is shown separately.
6. The growth multiplier remains, labeled as an estimated asset multiple relative to contributed principal and never as a return rate.
7. The approved route is `/finance/compound-interest`.
8. Inflation and tax are optional advanced settings with no hidden presets.

## Implementation Plan

Implementation must remain within the existing architecture and the approved scope.

1. **Confirm implementation baseline**
   - Re-read this approved specification and current project documentation.
   - Review the installed Next.js documentation required by `AGENTS.md` before writing application code.
   - Confirm the working tree is clean and do not mix unrelated refactoring into the feature.
2. **Create the route and server-rendered content shell**
   - Add the approved `/finance/compound-interest` route within the existing App Router and calculator route-group convention.
   - Keep the route component focused on composition, metadata, visible educational content, and structured data.
   - Render the title, concise estimate disclaimer, formula explanation, assumptions, FAQ, and related-calculator section on the server.
3. **Create a feature-local domain module**
   - Define explicit input, normalized-input, result, yearly-record, and validation types within the compound-interest feature.
   - Implement parsing, validation, formula calculation, yearly-record generation, and formatting as separate modules.
   - Keep formulas deterministic and framework-independent. Keep feature-specific logic local until a proven second use justifies promotion to shared calculator utilities.
4. **Implement and verify the calculation model**
   - Implement the approved lump-sum, ordinary-annuity, annuity-due, zero-rate, inflation, and terminal simplified-tax rules exactly as specified.
   - Produce one raw yearly dataset consumed by summary metrics, chart, and table.
   - Preserve full calculation precision until presentation and explicitly guard non-finite or unsupported results.
5. **Build the accessible calculator interaction**
   - Use the smallest client boundary needed for form state, validation, calculation submission, and result updates.
   - Reuse existing shared components and design tokens; add shared primitives only when the need is genuinely generic.
   - Present core fields first and inflation/tax in a clearly labeled optional advanced-settings disclosure with no preset value.
   - Implement persistent labels, field groups, visible focus, associated errors, an error summary, keyboard operation, touch targets, and a concise result announcement.
6. **Build result, chart, and table presentation**
   - Make tax-adjusted final balance primary only when tax is active and show gross balance separately.
   - Label the multiplier `예상 자산 배수 (납입 원금 대비)` and include explanatory text that it is not a return rate.
   - Use a lightweight chart approach that supports keyboard and touch access without making the chart the only source of information. Evaluate mature permissively licensed options before adding any dependency and prefer existing capabilities when sufficient.
   - Provide the complete semantic yearly table and a concise text summary as chart alternatives.
7. **Add SEO and content requirements**
   - Add unique Korean metadata, canonical URL behavior, indexable explanatory content, and visible breadcrumb navigation for the approved route.
   - Emit only structured data supported by current official guidance and matching visible content.
   - Add internal links only to routes that exist; omit unpublished related calculators.
8. **Add tests with the behavior they verify**
   - Introduce only the minimum testing dependencies required by the repository testing strategy when the tests are added.
   - Cover formulas, independently derived reference values, validation boundaries, timing differences, inflation, simplified tax, precision, large values, yearly reconciliation, and Korean formatting.
   - Cover form interaction, validation associations, result announcements, keyboard flow, advanced-settings behavior, semantic table output, chart alternatives, metadata, and structured data.
   - Add a small mobile-first end-to-end journey only when the required test infrastructure is introduced.
9. **Review and validate**
   - Compare implementation behavior against every requirement and approved product decision in this specification.
   - Review narrow and wide layouts, both themes, 200% zoom, keyboard-only use, screen-reader semantics, reduced motion, touch behavior, and invalid states.
   - Run all relevant tests, `npm run check`, and `npm run build`; resolve every failure before committing.
10. **Deliver the feature**
    - Update documentation only if implementation changes an approved contract or architecture.
    - Create one focused feature commit, push it, and open a reviewable pull request with verification evidence.

## Definition of Done

The feature is complete only when:

- [x] The implementation matches every approved input, output, formula, validation, UX, accessibility, SEO, and testing requirement.
- [x] The route is `/finance/compound-interest` and public metadata is unique and correct.
- [x] Inflation and simplified tax are optional, disabled by default, and contain no hidden presets.
- [x] Simplified tax is applied once to positive modeled interest at the selected horizon.
- [x] The primary and gross balances follow the approved tax behavior.
- [x] The multiplier is labeled as an estimated asset multiple relative to contributed principal and never as a return rate.
- [x] Existing architecture is respected and shared components are reused where appropriate.
- [x] Formula and validation expected values are independently derived.
- [x] Required unit, component, and accessibility tests pass. End-to-end tests were not added or run for this release under the approved Implementation Plan exception: add the mobile-first E2E journey only when its required test infrastructure is introduced; this release did not introduce that infrastructure.
- [x] Mobile, desktop, keyboard, screen-reader, focus, reduced-motion, touch, zoom, table, and chart-alternative reviews pass.
- [x] SEO content and structured data match visible content and current official guidance.
- [x] `npm run check` passes.
- [x] `npm run build` passes.
- [x] The focused implementation commit is pushed and ready for review.
