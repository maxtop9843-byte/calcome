# CalcLab

CalcLab is a modern calculator platform focused first on clear, trustworthy Korean finance calculators. The repository currently contains the product foundation only: application shell, design tokens, UI primitives, development tooling, and engineering documentation. It intentionally contains no calculator or financial business logic.

## Vision

Make useful calculations fast to find, easy to understand, accessible on any device, and transparent enough to trust. Product experience comes before monetization; performance, correctness, and clarity are release requirements.

## Tech stack

- Next.js App Router and React
- TypeScript in strict mode
- Tailwind CSS
- shadcn/ui primitives
- ESLint and Prettier
- npm for dependency and lockfile management

## Folder structure

```text
.
├── .github/               Pull request template and CI workflow
├── public/                 Static assets
├── docs/                   Permanent standards and feature specifications
├── src/
│   ├── app/                Routes, layouts, metadata, and global styles
│   ├── components/
│   │   ├── layout/         Shared site chrome
│   │   └── ui/             Reusable shadcn/ui primitives
│   ├── config/             Typed product configuration
│   └── lib/                Framework-independent shared utilities
├── ARCHITECTURE.md         Technical boundaries and evolution
├── BOOTSTRAP.md            Engineering handbook
├── DESIGN_SYSTEM.md        Visual and interaction language
└── CONTRIBUTING.md         Contribution workflow
```

Calculator-specific routes, content, and engine modules will be added only when the first calculator is designed. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the intended boundaries.

## Feature Driven Development

CalcLab does not implement features directly from prompts. Every feature begins with an approved specification in `docs/features/`, which remains the source of truth for implementation, testing, documentation, and review. Follow [Feature Driven Development](./docs/FEATURE_DRIVEN_DEVELOPMENT.md) before starting feature work.

Use the reusable [feature template](./docs/features/_TEMPLATE.md) for new specifications. The first feature, the [Korean Compound Interest Calculator](./docs/features/compound-interest.md), is currently a Draft and is not approved for implementation.

## Local development

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Run the production build
npm run lint         # Run ESLint with zero warnings allowed
npm run typecheck    # Check TypeScript
npm run format       # Format tracked source and documentation
npm run format:check # Verify formatting
npm run check        # Run all static checks
```

## Contributing

Keep changes small, mobile-first, accessible, and consistent with the documented architecture and design system. Before opening a pull request, run `npm run check` and `npm run build`. Full branch, commit, and review conventions are in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Roadmap

1. Establish and validate the shared calculator contract with one Korean finance calculator.
2. Expand the Korean finance calculator catalog using the proven pattern.
3. Improve discovery, explanations, comparison tools, and platform-wide quality signals.
4. Consider additional calculator categories only after the finance foundation is mature.

## License

[MIT](./LICENSE)
