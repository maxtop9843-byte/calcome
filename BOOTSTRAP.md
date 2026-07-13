# CalcLab Engineering Handbook

## Project philosophy

CalcLab turns calculations into understandable decisions. Every feature should be quick on a mobile connection, usable without a manual, explicit about assumptions, and accessible by keyboard and assistive technology. Advertising, when considered in a later phase, must never interrupt the primary task.

Build the simplest structure that supports the current product. Prefer stable open-source tools over custom infrastructure when they meet the need. Add abstractions after a repeated pattern is understood, not in anticipation of one.

## Engineering principles

- Keep server components as the default; add client components only for interaction.
- Treat calculator formulas as pure, deterministic, framework-independent functions.
- Separate input parsing, validation, calculation, formatting, and presentation.
- Keep shared UI primitives generic and calculator composition feature-local.
- Make semantic HTML, visible focus, contrast, reduced motion, and touch targets defaults.
- Protect Core Web Vitals by minimizing JavaScript, dependencies, and blocking assets.
- Use explicit names and small modules. Comments explain why, not what.
- Never hide assumptions, rounding behavior, limits, or sources from users.

## Development workflow

1. Start from an issue with a clear user outcome and acceptance criteria.
2. Create a short-lived branch from the current default branch.
3. Implement the smallest complete change within the documented boundaries.
4. Add or update tests at the level where behavior lives.
5. Run `npm run check` and `npm run build`.
6. Self-review on narrow and wide viewports, with keyboard navigation and both themes when UI changes.
7. Open a focused pull request and respond to review before merge.

## Definition of Done

A change is done when:

- the acceptance criteria are met without unrelated scope;
- behavior is covered by appropriate automated tests once test infrastructure exists;
- TypeScript, lint, formatting, tests, and production build pass;
- loading, empty, invalid, and error states relevant to the change are handled;
- mobile layout, keyboard use, focus order, labels, contrast, and reduced motion are checked;
- metadata and structured content are correct for new public routes;
- formulas include named assumptions, units, rounding rules, and authoritative references;
- documentation changes with architecture or design decisions;
- no secrets, generated artifacts, debug output, or unused dependencies are committed.

## Coding standards

- Use strict TypeScript. Avoid `any`; narrow `unknown` at boundaries.
- Prefer named exports for shared modules and default exports only where Next.js requires them.
- Use the `@/` alias for cross-directory imports and relative imports within a small local module.
- Use kebab-case filenames, PascalCase components, camelCase functions, and `SCREAMING_SNAKE_CASE` only for true constants.
- Keep React components declarative. Move reusable calculations and transformations out of JSX.
- Use Tailwind tokens and variants; do not add arbitrary brand colors in components.
- Keep browser globals and side effects behind explicit client boundaries.
- Format with Prettier and treat ESLint warnings as failures.

## Git workflow

- Branch from the latest default branch.
- Name branches `feat/short-topic`, `fix/short-topic`, `docs/short-topic`, or `chore/short-topic`.
- Rebase or merge the default branch as the team convention requires; do not rewrite shared history.
- Use imperative, scoped commit subjects such as `feat(ui): add result card shell`.
- Keep each commit reviewable and independently coherent. Do not mix formatting-only changes with behavior.

## Pull request expectations

Pull requests should explain the user problem, the chosen solution, scope boundaries, verification performed, and any follow-up work. Include before/after screenshots for visible changes at mobile and desktop sizes. Call out formula sources, accessibility decisions, dependency additions, migrations, or meaningful performance impact. Keep pull requests small enough to review carefully and require passing checks before merge.
