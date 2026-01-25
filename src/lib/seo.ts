export type BreadcrumbItem = {
  label: string;
  href: string;
};

const defaultSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
  return normalizeSiteUrl(siteUrl);
}

export function resolveUrl(href: string) {
  const normalizedBase = getSiteUrl();
  if (href.startsWith("http")) {
    return href;
  }
  return `${normalizedBase}${href.startsWith("/") ? href : `/${href}`}`;
}

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: resolveUrl(item.href),
    })),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    ...buildBreadcrumbList(items),
  };
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
