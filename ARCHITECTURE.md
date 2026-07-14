# CalCome Architecture

CalCome is a statically optimized Next.js application using the App Router. Server components render content and metadata by default. Small client boundaries provide only the interaction a calculator needs. The calculation domain remains independent of React and Next.js so it can be tested, reused, and moved without rewriting formulas.

## Recommended layout

```text
src/
├── app/                         Route composition and route metadata
│   └── (calculators)/           Calculator routes when introduced
├── components/
│   ├── layout/                  Header, footer, navigation, containers
│   └── ui/                      shadcn/ui primitives and variants
├── config/                      Site-wide typed configuration
├── features/
│   └── <calculator>/            Feature-local schema, UI, copy, and tests
├── lib/
│   ├── calculator/              Shared engine contracts and orchestration
│   ├── seo/                     Metadata and structured-data helpers
│   └── utils/                   Pure shared utilities
└── content/                     Reviewed explanatory content and citations
```

Create a directory only when the first real module needs it. Keep route files thin and compose feature modules rather than placing domain logic in `app`.

## Boundaries

- **Shared components:** `components/ui` contains generic accessible primitives; `components/layout` contains site-wide composition. Calculator-specific controls stay in their feature.
- **Calculator engine:** accepts validated, unit-explicit inputs and returns deterministic typed results. Parsing, validation, formulas, rounding, and presentation are separate. No DOM, locale formatting, analytics, or network access belongs in formulas.
- **SEO layer:** Next.js metadata provides unique titles, descriptions, canonical URLs, robots rules, and social metadata. Structured data helpers emit only facts visible on the page. Sitemap and calculator metadata are generated from the same reviewed registry once routes exist.
- **Utilities:** shared utilities are pure and narrowly named. Promote code from a feature only after a genuine second use.
- **Content layer:** explanatory Korean copy, assumptions, examples, update dates, and authoritative citations are reviewed content, not strings embedded in calculation functions.

## Testing strategy

Use the test pyramid appropriate to risk. Formula and validation modules receive exhaustive unit tests, including boundaries and known reference cases. Components receive focused interaction and accessibility tests. A small Playwright suite will cover critical mobile calculator journeys when the first calculator is added. Production builds, type checking, linting, and formatting run on every pull request. Add Vitest, Testing Library, and Playwright only when corresponding tests are introduced.

## Extensibility

A calculator feature should register metadata, content, input schema, and a typed calculation function against a small shared contract. Categories organize discovery but do not own engine behavior. Future finance, AI, developer, image, or life tools can share platform primitives while keeping domain code isolated. Introduce services, storage, authentication, or a monorepo only when a concrete product requirement justifies them.
