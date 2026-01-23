export type BreadcrumbItem = {
  label: string;
  href: string;
};

const defaultSiteUrl = "http://localhost:3000";

function resolveUrl(href: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
  const normalizedBase = siteUrl.endsWith("/")
    ? siteUrl.slice(0, -1)
    : siteUrl;
  if (href.startsWith("http")) {
    return href;
  }
  return `${normalizedBase}${href.startsWith("/") ? href : `/${href}`}`;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: resolveUrl(item.href),
    })),
  };
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
