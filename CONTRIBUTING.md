# Contributing to CalcLab

Thank you for improving CalcLab. Contributions should be focused, accessible, mobile-first, and consistent with [BOOTSTRAP.md](./BOOTSTRAP.md), [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md), and [ARCHITECTURE.md](./ARCHITECTURE.md).

## Branches

1. Create an issue or agree on the scope before substantial work.
2. Update your local default branch.
3. Create `feat/short-topic`, `fix/short-topic`, `docs/short-topic`, or `chore/short-topic`.
4. Keep the branch focused and short-lived. Do not include unrelated refactors.

## Commits

Write imperative Conventional Commit-style subjects:

```text
feat(ui): add calculator result card
fix(validation): reject negative principal
docs: clarify formula sourcing
```

Explain the reason in the body when it is not obvious. Keep commits coherent and never commit secrets, build output, debug files, or unrelated formatting.

## Local verification

Install dependencies with `npm install`, then run:

```bash
npm run check
npm run build
```

When tests are introduced, run the relevant unit, component, and end-to-end suites as well. Manually check UI changes on a narrow mobile viewport and a desktop viewport, using keyboard navigation and both supported themes.

## Design system

Use semantic tokens and existing shadcn/ui primitives before creating new patterns. Follow the spacing, typography, responsive, focus, contrast, input, table, and chart guidance in `DESIGN_SYSTEM.md`. Do not add one-off colors or copy a component into a feature to customize it.

## Pull requests

Use a clear title and include:

- the user problem and intended outcome;
- what changed and what is intentionally out of scope;
- verification commands and manual checks performed;
- mobile and desktop screenshots for visible changes;
- formula sources and assumptions for calculation changes;
- accessibility, dependency, performance, or SEO implications;
- linked issues and follow-up work.

Resolve review comments with code or a clear explanation. A pull request is ready to merge only when required checks pass, documentation is current, and requested reviews are complete.
