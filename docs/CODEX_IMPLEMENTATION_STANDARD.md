# CalCome Implementation Standard

This document is the permanent implementation standard for every future CalCome feature. Every implementation task must follow this standard before code is written.

## Purpose

CalCome values quality, maintainability, consistency, accessibility, SEO, and performance over implementation speed. Delivery pressure does not justify bypassing project conventions, weakening user experience, or creating avoidable long-term maintenance work.

## Standard Workflow

Every feature must follow this sequence:

1. Read the relevant project documentation, including `README.md`, `BOOTSTRAP.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, and `CONTRIBUTING.md`.
2. Understand the current architecture, existing feature boundaries, shared components, and established conventions.
3. Use the Sites tool before implementing any visible feature.
4. Analyze at least three mature, high-quality reference websites relevant to the feature.
5. Extract lessons about UX, accessibility, responsive layout, SEO, and information architecture.
6. Never copy layouts, branding, graphics, copyrighted content, or source code. Learn from references, then synthesize an original CalCome solution.
7. Create a short implementation specification covering scope, user flow, states, architecture, accessibility, SEO, performance, and tests.
8. Implement using the CalCome Design System in `DESIGN_SYSTEM.md`.
9. Reuse existing shared components before creating new ones.
10. Create tests appropriate to the behavior and risk.
11. Run `npm run check` and `npm run build`, and resolve every failure.
12. Create a focused commit that follows the repository's Git standards.
13. Push the completed commit to the configured remote branch.

The steps are sequential. Do not begin implementation before the research and specification steps are complete.

## Sites Tool Rules

Always use the Sites tool before implementing any visible feature. Analyze mature industry references and focus on what can be learned from their interaction design, usability, accessibility, responsiveness, and performance.

Never imitate a reference. Always synthesize the findings into an original solution that follows CalCome's architecture, visual language, content, and product requirements.

## Open Source Rules

Before writing custom code, check whether a mature, maintained open-source solution already meets the requirement. Evaluate its accessibility, bundle cost, maintenance activity, security posture, compatibility, and license.

Prefer permissive licenses:

- MIT
- Apache
- BSD

Avoid dependencies or reused implementations licensed under:

- GPL
- AGPL
- an unknown or unverifiable license

Document meaningful reused implementations, including the project, license, purpose, and any important modifications. Do not add a dependency when a small use of existing platform capabilities is clearer and cheaper.

## UI Rules

Follow `DESIGN_SYSTEM.md`. Never invent a new design language or create inconsistent UI. Reuse shared components whenever possible, extend them deliberately when the same need is shared, and keep feature-specific composition within the feature.

## Architecture Rules

Keep these concerns separate:

- UI
- business logic
- formulas
- validation
- formatting
- SEO
- utilities

Business logic and formulas must remain deterministic, testable, and framework-independent. Route and component files must not become hidden domain layers.

## Accessibility Rules

Accessibility is mandatory. Every feature must support, as applicable:

- keyboard operation
- screen readers and semantic structure
- visible focus
- reduced motion
- accessible touch targets and mobile interaction

Accessibility must be considered in the specification, implementation, tests, and final review rather than added afterward.

## Performance Rules

Prefer static rendering, minimal client-side JavaScript, and reusable components. Avoid unnecessary dependencies, network requests, client boundaries, blocking assets, and layout shifts. Measure or justify changes that can materially affect loading, interaction, or bundle size.

## Documentation Rules

Update architecture documentation only when the architecture changes. Keep all documentation concise, current, and focused on durable implementation guidance. Do not add research history, brainstorming, or temporary decision logs to the product repository.

## Definition of Done

A feature is not complete unless:

- [ ] Sites analysis is complete for every visible feature.
- [ ] A short implementation specification exists.
- [ ] The existing architecture is respected.
- [ ] Existing shared components are reused where appropriate.
- [ ] Tests are written at the appropriate level.
- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] A focused commit is created.
- [ ] The commit is pushed.

## Core Philosophy

Research first.

Design second.

Implement third.

Quality over speed.

Consistency over cleverness.

Never skip the workflow.
