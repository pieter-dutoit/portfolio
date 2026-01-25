import type { Metadata } from "next";
import { Suspense } from "react";

import Breadcrumbs from "@/components/breadcrumbs";
import JsonLd from "@/components/json-ld";
import PostsIndex from "@/components/posts/posts-index";
import { profile } from "@/data/resume";
import { getAllPosts } from "@/lib/posts";
import { getSiteUrl, resolveUrl } from "@/lib/seo";
import {
  buildBreadcrumbNode,
  buildJsonLdGraph,
  buildPostItemListNode,
  buildWebPageNode,
  buildWebSiteNode,
  getItemListId,
  getWebSiteId,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Posts",
  description: "Articles and notes on design, engineering, and product craft.",
};

function PostsIndexFallback() {
  return (
    <section className="py-16 text-center text-sm text-muted-foreground">
      Loading posts...
    </section>
  );
}

export default function PostsPage() {
  const posts = getAllPosts();
  const tagSet = new Set(posts.flatMap((post) => post.tags));
  const stackSet = new Set(posts.flatMap((post) => post.stack));

  const siteUrl = getSiteUrl();
  const pageUrl = resolveUrl("/posts");
  const webSiteId = getWebSiteId(siteUrl);
  const itemListId = getItemListId(pageUrl);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
  ];

  const jsonLd = buildJsonLdGraph([
    buildWebSiteNode({
      siteUrl,
      name: `${profile.full_name} Portfolio`,
      description: metadata.description ?? undefined,
    }),
    buildWebPageNode({
      url: pageUrl,
      name: "Posts",
      description: metadata.description ?? undefined,
      type: "CollectionPage",
      websiteId: webSiteId,
      mainEntityId: itemListId,
    }),
    buildPostItemListNode({ pageUrl, posts }),
    buildBreadcrumbNode({ items: breadcrumbItems, pageUrl }),
  ]);

  return (
    <div className="py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <JsonLd data={jsonLd} />

      <Suspense fallback={<PostsIndexFallback />}>
        <PostsIndex
          posts={posts.map(({ fileName: _fileName, ...rest }) => rest)}
          tags={[...tagSet].sort()}
          stacks={[...stackSet].sort()}
        />
      </Suspense>
    </div>
  );
}
