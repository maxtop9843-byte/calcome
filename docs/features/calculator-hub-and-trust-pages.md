# Calculator Hub and Trust Pages

Status: Implemented

## Overview

Create a scalable directory for CalcLab's published calculators and add factual public pages that explain the product, privacy behavior, terms, and verified contact path. This work changes discovery and trust surfaces only; calculator behavior remains unchanged.

## Requirements

- Link the homepage primary action and global `계산기` navigation to `/calculators`.
- Label the homepage calculator section `인기 계산기` and show only published calculators.
- List every published calculator on `/calculators` from one shared registry; initially this is only the compound-interest calculator.
- Replace the calculator-specific header link with a scalable directory link.
- Publish `/about`, `/privacy`, `/terms`, and `/contact` with modest, accurate Korean content.
- Use GitHub Issues as the verified contact method and warn against posting sensitive personal information.
- Add calculator, trust, policy, contact, and GitHub links to the global footer.
- Add unique metadata, canonical URLs, appropriate structured data, and every public route to the sitemap.
- Keep robots behavior and all existing production-readiness features intact.

## Non-goals

- No calculator formulas, validation, inputs, outputs, or financial logic change.
- No unpublished calculators, placeholders, search, analytics, advertising, cookies, tracking, or new dependencies.
- No CalcLab rename or fabricated business identity, address, representative, or contact detail.

## Mobile and Desktop UX

Use the existing responsive shell and card language. Navigation remains compact at narrow widths. The directory and informational pages use a single-column reading order with restrained line lengths; calculator cards may expand into a grid as the real catalog grows.

## Accessibility

Preserve the skip link, semantic landmarks, descriptive headings, visible focus, keyboard navigation, reduced-motion behavior, and 44-pixel navigation targets. Footer and header navigation retain distinct accessible names.

## SEO

Every new route has a unique Korean title, description, and canonical path. `/calculators` exposes a visible calculator list and matching `CollectionPage`/`ItemList` structured data. Trust pages use visible server-rendered content without unsupported structured-data claims. The sitemap contains only published routes.

## Sites Analysis

Reviewed on 2026-07-14:

1. [Investor.gov Financial Tools and Calculators](https://www.investor.gov/use-financial-tools-and-calculators) groups real tools under a stable calculator destination and keeps About, Contact, Privacy, and disclaimer paths separate from the task.
2. [Omni Calculator](https://www.omnicalculator.com/) uses concise category and popular-calculator lists with a clear title and description for each published tool.
3. [Moneysmart](https://moneysmart.gov.au/) presents calculator cards with outcome-focused descriptions while keeping global navigation organized around durable topics rather than individual tools.

CalcLab synthesizes these information-architecture principles within its own design system. No layout, branding, graphics, content, or source code is copied.

## Implementation Plan

1. Add a typed registry containing only published calculators and a reusable calculator card.
2. Update the homepage, header, and footer to use scalable directory and trust links.
3. Add the calculator directory and four trust pages as static server components.
4. Add a small SEO metadata helper, directory structured data, and sitemap entries.
5. Add focused route, metadata, navigation, content-integrity, and sitemap tests.
6. Run `npm run check` and `npm run build`, review the diff, then commit, push, and open a pull request.

## Testing Requirements

- Verify the homepage heading and `/calculators` CTA.
- Verify header and footer destinations and the absence of calculator-specific global navigation.
- Verify the directory lists the published compound-interest calculator.
- Verify unique metadata and canonical paths for all new pages.
- Verify sitemap coverage and factual privacy, terms, and contact content.
- Verify privacy and terms content does not invent company or representative details.

## Definition of Done

- [x] Approved discovery, trust, policy, and contact routes are implemented.
- [x] Only published calculators appear in shared lists.
- [x] Accessibility, metadata, structured data, and sitemap requirements are met.
- [x] Focused tests pass.
- [x] `npm run check` passes.
- [x] `npm run build` passes.
- [x] The focused commit is pushed and a pull request targets `main`.
