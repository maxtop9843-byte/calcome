# Feature Driven Development

This document defines the permanent workflow for adding every new feature to CalCome. CalCome does not develop features directly from prompts. Every feature begins with an approved feature specification, and that specification remains the single source of truth throughout delivery.

## Philosophy

CalCome follows Feature Driven Development. Every feature starts with a written specification that drives implementation, testing, documentation, and review. The specification is the contract: the delivered behavior must match it, and changes to scope or expected behavior must be reflected in the specification before implementation continues.

## Feature Lifecycle

Every feature moves through the following lifecycle in order:

1. **Idea** — State the user outcome without prescribing an implementation. Confirm that the idea fits CalCome's mission and current scope.
2. **Research** — Investigate the user problem, terminology, authoritative domain sources, mature open-source options, and known constraints. Keep temporary research outside the product repository.
3. **Feature Specification** — Create and approve the feature specification in `docs/features/`. Define behavior, inputs, outputs, formulas, validation, user experience, accessibility, SEO, tests, and completion criteria.
4. **Sites Analysis** — Use Sites and analyze at least three mature reference websites as required by `CODEX_IMPLEMENTATION_STANDARD.md`. Extract relevant principles without copying protected or identifying elements.
5. **Implementation Plan** — Add a concise, implementation-ready plan to the feature specification. Map requirements to existing architecture, shared components, tests, and verification without changing the approved product contract.
6. **Implementation** — Build only the approved scope, following the architecture and CalCome Design System. Update the specification first if a necessary behavior change is discovered.
7. **Testing** — Implement the specification's required unit, component, accessibility, integration, or end-to-end coverage and verify relevant edge cases.
8. **Review** — Compare the implementation against the specification. Review code quality, UX, accessibility, SEO, responsiveness, performance, tests, and documentation.
9. **Merge** — Merge one focused, approved feature pull request only after every required check and review passes.
10. **Release** — Deploy through the established release process, confirm production behavior, and keep the specification aligned with the released feature.

The lifecycle is:

```text
Idea
  ↓
Research
  ↓
Feature Specification
  ↓
Sites Analysis
  ↓
Implementation Plan
  ↓
Implementation
  ↓
Testing
  ↓
Review
  ↓
Merge
  ↓
Release
```

## Feature Directory

Every feature specification belongs in `docs/features/` and uses a descriptive kebab-case filename. Do not place feature implementation notes, scope decisions, or acceptance criteria elsewhere.

Examples:

```text
docs/features/
├── compound-interest.md
├── loan-calculator.md
├── vat-calculator.md
├── salary-calculator.md
└── etf-return.md
```

Use one specification per user-facing feature. Keep the specification concise, current, and committed with the implementation it governs.

## Feature Specification Template

Copy the following template into `docs/features/<feature-name>.md`. Replace every placeholder before the specification is approved.

```markdown
# <Feature Name>

Status: Draft | Approved | Implemented | Released

## Overview

### Purpose

<State what the feature does and the outcome it provides.>

## User Problem

<Explain why users need this feature and the problem it resolves.>

## Requirements

- <Functional requirement>
- <Functional requirement>

## Inputs

| Input | Type | Unit/Format | Required | Description |
| ----- | ---- | ----------- | -------- | ----------- |
|       |      |             |          |             |

## Outputs

| Output | Type | Unit/Format | Description |
| ------ | ---- | ----------- | ----------- |
|        |      |             |             |

## Formula

<Document formulas, assumptions, rounding rules, and authoritative sources when applicable. Write "Not applicable" otherwise.>

## Validation

- <Input constraint and user-facing error behavior>

## Edge Cases

- <Boundary, invalid, empty, extreme, or precision case>

## Mobile UX

<Describe the mobile-first flow, layout, touch behavior, and result hierarchy.>

## Desktop UX

<Describe progressive layout enhancements without changing the core flow.>

## Accessibility

<Define semantic structure, labels, keyboard behavior, focus, announcements, contrast, reduced motion, and touch targets.>

## SEO

<Define search intent, title, description, canonical behavior, visible explanatory content, and applicable structured data.>

## Related Calculators

- <Related calculator or "None at launch">

## Testing Requirements

- <Unit, component, accessibility, integration, or end-to-end requirement>

## Implementation Plan

<Map the approved requirements to existing modules, shared components, test coverage, and verification steps.>

## Definition of Done

- [ ] All approved requirements are implemented.
- [ ] Validation and edge cases are covered.
- [ ] Mobile and desktop UX match this specification.
- [ ] Accessibility and SEO requirements are met.
- [ ] Required tests pass.
- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] Documentation is updated when required.
- [ ] The feature commit is pushed.
```

## Codex Workflow

When receiving a feature task, Codex must:

1. Read all project documentation.
2. Read the approved feature specification in `docs/features/`. If it is absent or unapproved, stop before implementation and create or request approval for the specification.
3. Use Sites before implementing any visible feature.
4. Analyze at least three mature reference websites and synthesize relevant lessons.
5. Create the concise implementation specification or plan within the feature specification.
6. Implement only the approved scope.
7. Write the required tests.
8. Run `npm run check`, `npm run build`, and every relevant test suite.
9. Create a focused commit.
10. Push the commit.

This workflow supplements `CODEX_IMPLEMENTATION_STANDARD.md`; both documents apply.

## Review Rules

A feature cannot be merged unless:

- the specification is complete and approved;
- implementation is complete and matches the specification;
- required tests are complete and passing;
- accessibility has been reviewed;
- SEO has been reviewed;
- `npm run check` and `npm run build` pass;
- documentation is updated when required;
- the pull request is focused and review feedback is resolved.

## Feature Principles

Keep features small, independent, reusable, well tested, and maintainable. Avoid giant pull requests and unrelated refactoring. Prefer one feature per pull request so scope, behavior, tests, and review remain clear.

## Core Rule

Never implement directly from a chat prompt. Always implement from an approved feature specification in `docs/features/`. The specification is the authoritative source for scope, behavior, implementation, testing, documentation, and review.
