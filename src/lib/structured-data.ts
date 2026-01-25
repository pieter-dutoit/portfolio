import type { PostListItem, PostMeta } from "@/lib/posts";
import type { SocialLink } from "@/data/resume";
import type { BreadcrumbItem } from "@/lib/seo";
import { buildBreadcrumbList, getSiteUrl, resolveUrl } from "@/lib/seo";

export type JsonLdNode = {
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
};

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

type PersonProfile = {
  full_name: string;
  title: string;
  physical_address: string;
  phone_number?: string;
  photo_url: string;
  email_address: string;
};

const schemaContext = "https://schema.org" as const;

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (Array.isArray(entry)) return entry.length > 0;
      return entry !== undefined && entry !== null && entry !== "";
    })
  ) as T;
}

export function buildJsonLdGraph(
  nodes: Array<JsonLdNode | null | undefined>
): JsonLdGraph {
  const filtered = nodes.filter(Boolean) as JsonLdNode[];
  const seen = new Set<string>();
  const deduped = filtered.filter((node) => {
    if (!node["@id"]) return true;
    if (seen.has(node["@id"])) return false;
    seen.add(node["@id"]);
    return true;
  });

  return {
    "@context": schemaContext,
    "@graph": deduped,
  };
}

export function getWebSiteId(siteUrl = getSiteUrl()) {
  return `${siteUrl}/#website`;
}

export function getPersonId(siteUrl = getSiteUrl()) {
  return `${siteUrl}/#person`;
}

export function getWebPageId(url: string) {
  return `${url}#webpage`;
}

export function getBlogPostingId(url: string) {
  return `${url}#blogposting`;
}

export function getBreadcrumbId(url: string) {
  return `${url}#breadcrumb`;
}

export function getItemListId(url: string) {
  return `${url}#itemlist`;
}

export function buildWebSiteNode({
  siteUrl = getSiteUrl(),
  name,
  description,
}: {
  siteUrl?: string;
  name: string;
  description?: string;
}): JsonLdNode {
  return compact({
    "@id": getWebSiteId(siteUrl),
    "@type": "WebSite",
    name,
    url: siteUrl,
    description,
  });
}

export function buildPersonNode({
  profile,
  socialLinks,
  siteUrl = getSiteUrl(),
}: {
  profile: PersonProfile;
  socialLinks: SocialLink[];
  siteUrl?: string;
}): JsonLdNode {
  return compact({
    "@id": getPersonId(siteUrl),
    "@type": "Person",
    name: profile.full_name,
    jobTitle: profile.title,
    image: resolveUrl(profile.photo_url),
    address: profile.physical_address,
    email: profile.email_address,
    telephone: profile.phone_number,
    url: siteUrl,
    sameAs: socialLinks.map((link) => link.url).filter(Boolean),
  });
}

export function buildProfilePageNode({
  siteUrl = getSiteUrl(),
  name,
  description,
  personId = getPersonId(siteUrl),
  websiteId = getWebSiteId(siteUrl),
}: {
  siteUrl?: string;
  name: string;
  description?: string;
  personId?: string;
  websiteId?: string;
}): JsonLdNode {
  return compact({
    "@id": getWebPageId(siteUrl),
    "@type": "ProfilePage",
    url: siteUrl,
    name,
    description,
    mainEntity: { "@id": personId },
    isPartOf: { "@id": websiteId },
  });
}

export function buildWebPageNode({
  url,
  name,
  description,
  type = "WebPage",
  websiteId,
  mainEntityId,
}: {
  url: string;
  name: string;
  description?: string;
  type?: string;
  websiteId?: string;
  mainEntityId?: string;
}): JsonLdNode {
  return compact({
    "@id": getWebPageId(url),
    "@type": type,
    url,
    name,
    description,
    isPartOf: websiteId ? { "@id": websiteId } : undefined,
    mainEntity: mainEntityId ? { "@id": mainEntityId } : undefined,
  });
}

export function buildPostItemListNode({
  pageUrl,
  posts,
}: {
  pageUrl: string;
  posts: PostListItem[];
}): JsonLdNode {
  return compact({
    "@id": getItemListId(pageUrl),
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: resolveUrl(`/posts/${post.slug}`),
    })),
  });
}

export function buildBlogPostingNode({
  post,
  pageUrl,
  authorId,
  websiteId,
}: {
  post: PostMeta | PostListItem;
  pageUrl: string;
  authorId: string;
  websiteId: string;
}): JsonLdNode {
  return compact({
    "@id": getBlogPostingId(pageUrl),
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: resolveUrl(post.thumbnail),
    datePublished: post.date,
    author: { "@id": authorId },
    publisher: { "@id": authorId },
    mainEntityOfPage: { "@id": getWebPageId(pageUrl) },
    isPartOf: { "@id": websiteId },
    keywords: post.tags,
    inLanguage: "en",
    url: pageUrl,
  });
}

export function buildBreadcrumbNode({
  items,
  pageUrl,
}: {
  items: BreadcrumbItem[];
  pageUrl: string;
}): JsonLdNode {
  return {
    "@id": getBreadcrumbId(pageUrl),
    ...buildBreadcrumbList(items),
  };
}
