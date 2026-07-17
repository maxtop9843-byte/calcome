import { absoluteUrl, siteConfig } from "@/config/site";

const schemaContext = "https://schema.org" as const;
const websiteId = `${siteConfig.url}/#website` as const;

type LocaleCode = "ko" | "en";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { readonly [key: string]: JsonLdValue };

export type JsonLdObject = { readonly [key: string]: JsonLdValue };

export type JsonLdDocument =
  | JsonLdObject
  | readonly JsonLdObject[]
  | {
      readonly "@context": typeof schemaContext;
      readonly "@graph": readonly JsonLdObject[];
    };

export type BreadcrumbItem = {
  readonly name: string;
  readonly path: string;
};

export function languageCode(locale: LocaleCode) {
  return locale === "ko" ? "ko-KR" : "en-US";
}

export function createWebsiteStructuredData(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: absoluteUrl(),
  };
}

export function createWebPageStructuredData({
  name,
  description,
  path,
  locale,
}: {
  name: string;
  description: string;
  path: string;
  locale: LocaleCode;
}): JsonLdObject {
  const url = absoluteUrl(path);

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    inLanguage: languageCode(locale),
    url,
    isPartOf: { "@id": websiteId },
  };
}

export function createBreadcrumbListStructuredData({
  path,
  items,
}: {
  path: string;
  items: readonly BreadcrumbItem[];
}): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createPageStructuredData({
  name,
  description,
  path,
  locale,
  breadcrumbs,
}: {
  name: string;
  description: string;
  path: string;
  locale: LocaleCode;
  breadcrumbs: readonly BreadcrumbItem[];
}): JsonLdDocument {
  return {
    "@context": schemaContext,
    "@graph": [
      createWebsiteStructuredData(),
      createWebPageStructuredData({ name, description, path, locale }),
      createBreadcrumbListStructuredData({ path, items: breadcrumbs }),
    ],
  };
}

export function serializeJsonLd(data: JsonLdDocument) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

export function JsonLdScript({ data }: { data: JsonLdDocument }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
