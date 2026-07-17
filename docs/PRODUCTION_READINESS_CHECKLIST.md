# CalCome Production Readiness Checklist

This checklist is the launch gate for CalCome's public web application. It records repository-verifiable readiness separately from deployment and operational checks that must be completed against the final production domain.

## Repository readiness

- [x] Branded browser and Apple touch icons are generated through Next.js metadata routes; the existing `.ico` remains a legacy fallback.
- [x] The web app manifest defines the product name, Korean language, start URL, standalone display, brand colors, and icons.
- [x] `robots.txt` allows public crawling and declares the canonical host and sitemap.
- [x] `sitemap.xml` contains only published, canonical routes.
- [x] Global and calculator-specific Open Graph and Twitter/X metadata are consistent with visible content.
- [x] Every published page has a unique title, description, and canonical URL.
- [x] A custom 404 page provides recovery links without exposing unpublished routes.
- [x] An accessible, reduced-motion-safe loading state is available for route transitions.
- [x] A route error boundary provides retry and home recovery actions without exposing error details.
- [x] Homepage, header, breadcrumbs, 404 page, and footer link only to existing routes or the public repository.
- [x] Footer navigation is labeled and keyboard accessible.
- [x] Structured data contains only visible `WebSite`, `WebPage`, and `BreadcrumbList` facts, uses absolute URLs, and is covered by parsing tests.
- [x] Semantic landmarks, skip navigation, focus states, touch targets, reduced motion, Korean language, and descriptive route titles are present.
- [x] `npm run check` passes.
- [x] `npm run build` passes with public pages and metadata routes statically generated.

## Sites analysis

Reviewed on 2026-07-13. Stripe, Linear, and Omni Calculator were used only as mature references for clear page purpose, descriptive navigation, useful footer paths, and focused information hierarchy. CalCome synthesizes those qualities through its own design system and does not copy their layout, branding, graphics, content, or code.

## Production-domain verification

Complete these against the final public deployment before announcing launch:

- [x] The repository defaults canonical URL generation to `https://www.calcome.com` and documents `NEXT_PUBLIC_SITE_URL=https://www.calcome.com`.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.calcome.com` in the Vercel production environment and redeploy.
- [ ] Confirm DNS, TLS, HTTPS redirects, and the preferred `www` or apex host.
- [ ] Fetch `/`, `/finance/compound-interest`, `/manifest.webmanifest`, `/robots.txt`, and `/sitemap.xml` from the public origin and verify successful responses.
- [ ] Confirm canonical, Open Graph, Twitter/X, icon, and manifest URLs resolve to the production origin.
- [ ] Validate `WebSite`, `WebPage`, and `BreadcrumbList` JSON-LD with Google's Rich Results Test or Schema.org Validator.
- [ ] Submit the sitemap in Google Search Console and verify robots access.
- [ ] Test link previews in at least one Open Graph consumer and X.
- [ ] Run keyboard-only, screen-reader, 200% zoom, 320px mobile, desktop, dark-mode, and reduced-motion checks in production browsers.
- [ ] Verify the custom 404, loading behavior, and error recovery on the deployed runtime.
- [ ] Decide and publish required privacy, terms, contact, and financial-disclaimer pages before adding those footer links.
- [ ] Configure uptime and client/server error monitoring with an owner and alert destination.
- [ ] Record deployment rollback steps and the last known-good release identifier.
