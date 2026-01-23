import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: Post } = await import(
    `@/content/posts/${post.fileName}`
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
    { label: post.title, href: `/posts/${post.slug}` },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  return (
    <article className="py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <header className="mt-6 space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            {formatDate(post.date)}
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-base text-white/70">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={`${post.slug}-${tag}`}
              variant="secondary"
              className="bg-white/10 text-white"
            >
              {tag}
            </Badge>
          ))}
          {post.stack.map((stack) => (
            <Badge
              key={`${post.slug}-${stack}`}
              variant="outline"
              className="border-white/30 text-white/80"
            >
              {stack}
            </Badge>
          ))}
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mt-10">
        <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-sky-300">
          <Post />
        </div>
      </div>
    </article>
  );
}
