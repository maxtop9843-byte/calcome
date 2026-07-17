import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocalizedCagrPage } from "@/features/cagr/components/localized-cagr-page";
import { LocalizedCompoundInterestPage } from "@/features/compound-interest/components/localized-compound-interest-page";
import { LocalizedDepositPage } from "@/features/deposit/components/localized-deposit-page";
import { LocalizedLoanPage } from "@/features/loan/components/localized-loan-page";
import { LocalizedSavingsPage } from "@/features/savings/components/localized-savings-page";

import {
  JsonLdScript,
  createPageStructuredData,
  serializeJsonLd,
  type JsonLdObject,
} from "./structured-data";

type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdObject[];
};

function readJsonLd(container: HTMLElement): JsonLdGraph {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).toBeTruthy();

  return JSON.parse(script!.textContent!) as JsonLdGraph;
}

function findSchema(graph: JsonLdGraph, type: string) {
  const schema = graph["@graph"].find((item) => item["@type"] === type);
  expect(schema).toBeTruthy();

  return schema!;
}

function assertValidPageGraph(graph: JsonLdGraph, canonicalPath: string) {
  expect(graph["@context"]).toBe("https://schema.org");

  const website = findSchema(graph, "WebSite");
  expect(website).toMatchObject({
    "@id": "https://www.calcome.com/#website",
    url: "https://www.calcome.com/",
  });
  expect(website).not.toHaveProperty("potentialAction");

  const webpage = findSchema(graph, "WebPage");
  expect(webpage).toMatchObject({
    "@id": `https://www.calcome.com${canonicalPath}#webpage`,
    url: `https://www.calcome.com${canonicalPath}`,
    isPartOf: { "@id": "https://www.calcome.com/#website" },
  });

  const breadcrumb = findSchema(graph, "BreadcrumbList");
  expect(breadcrumb["@id"]).toBe(
    `https://www.calcome.com${canonicalPath}#breadcrumb`,
  );
  const items = breadcrumb.itemListElement as JsonLdObject[];
  expect(items.map((item) => item.position)).toEqual(
    Array.from({ length: items.length }, (_, index) => index + 1),
  );
  for (const item of items) {
    expect(new URL(String(item.item)).origin).toBe("https://www.calcome.com");
  }

  const serialized = JSON.stringify(graph);
  expect(serialized).not.toMatch(/localhost|127\.0\.0\.1|vercel\.app|preview/i);
  expect(serialized).not.toMatch(
    /SearchAction|Organization|FAQPage|HowTo|Product|Offer|AggregateRating|Review|SoftwareApplication|FinancialProduct/,
  );

  const ids = graph["@graph"]
    .map((item) => item["@id"])
    .filter((id): id is string => typeof id === "string");
  expect(new Set(ids).size).toBe(ids.length);
}

describe("structured data foundation", () => {
  it("serializes valid JSON-LD and escapes closing script sequences", () => {
    const data = createPageStructuredData({
      name: "</script><script>alert(1)</script>",
      description: "Escaping regression test",
      path: "/ko/finance/cagr",
      locale: "ko",
      breadcrumbs: [
        { name: "홈", path: "/" },
        { name: "</script>", path: "/ko/finance/cagr" },
      ],
    });
    const serialized = serializeJsonLd(data);

    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toMatchObject({
      "@context": "https://schema.org",
    });

    const { container } = render(<JsonLdScript data={data} />);
    expect(
      JSON.parse(
        container.querySelector('script[type="application/ld+json"]')!
          .textContent!,
      ),
    ).toMatchObject({ "@context": "https://schema.org" });
  });

  it.each([
    {
      name: "Korean CAGR",
      element: <LocalizedCagrPage locale="ko" />,
      path: "/ko/finance/cagr",
      language: "ko-KR",
    },
    {
      name: "English compound interest",
      element: <LocalizedCompoundInterestPage locale="en" />,
      path: "/en/finance/compound-interest",
      language: "en-US",
    },
    {
      name: "Korean fixed deposit",
      element: <LocalizedDepositPage locale="ko" />,
      path: "/ko/finance/fixed-deposit",
      language: "ko-KR",
    },
    {
      name: "English savings",
      element: <LocalizedSavingsPage locale="en" />,
      path: "/en/finance/savings",
      language: "en-US",
    },
    {
      name: "Korean loan",
      element: <LocalizedLoanPage locale="ko" />,
      path: "/ko/finance/loan",
      language: "ko-KR",
    },
  ])(
    "emits valid localized canonical JSON-LD for $name",
    ({ element, path, language }) => {
      const { container } = render(element);
      const graph = readJsonLd(container);

      assertValidPageGraph(graph, path);
      expect(findSchema(graph, "WebPage").inLanguage).toBe(language);
    },
  );
});
