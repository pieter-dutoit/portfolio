import type { Metadata } from "next";
import { Suspense } from "react";

import Breadcrumbs from "@/components/breadcrumbs";
import PostsIndex from "@/components/posts/posts-index";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description: "Articles and notes on design, engineering, and product craft.",
};

function PostsIndexFallback() {
  return (
    <section className="py-16 text-center text-sm text-white/60">
      Loading posts...
    </section>
  );
}

export default function PostsPage() {
  const posts = getAllPosts();
  const tagSet = new Set(posts.flatMap((post) => post.tags));
  const stackSet = new Set(posts.flatMap((post) => post.stack));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

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
