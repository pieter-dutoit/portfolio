"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/multi-select";
import { cn, formatDate } from "@/lib/utils";
import type { PostListItem } from "@/lib/posts";

type PostsIndexProps = {
  posts: PostListItem[];
  tags: string[];
  stacks: string[];
};

const TAG_PARAM = "tag";
const STACK_PARAM = "stack";
const QUERY_PARAM = "q";

function toLower(values: string[]) {
  return values.map((value) => value.toLowerCase());
}

export default function PostsIndex({ posts, tags, stacks }: PostsIndexProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawTag = searchParams.get(TAG_PARAM);
  const selectedTag = React.useMemo(() => {
    if (!rawTag) return "All";
    const match = tags.find(
      (tag) => tag.toLowerCase() === rawTag.toLowerCase()
    );
    return match || "All";
  }, [rawTag, tags]);
  const selectedStacks = React.useMemo(() => {
    const raw = searchParams.get(STACK_PARAM);
    if (!raw) return [];
    const available = new Set(toLower(stacks));
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => available.has(item.toLowerCase()));
  }, [searchParams, stacks]);
  const query = searchParams.get(QUERY_PARAM) || "";

  const updateParams = React.useCallback(
    (updates: { tag?: string; stack?: string[]; q?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.tag !== undefined) {
        if (!updates.tag || updates.tag === "All") {
          params.delete(TAG_PARAM);
        } else {
          params.set(TAG_PARAM, updates.tag);
        }
      }

      if (updates.stack !== undefined) {
        if (updates.stack.length === 0) {
          params.delete(STACK_PARAM);
        } else {
          params.set(STACK_PARAM, updates.stack.join(","));
        }
      }

      if (updates.q !== undefined) {
        if (!updates.q.trim()) {
          params.delete(QUERY_PARAM);
        } else {
          params.set(QUERY_PARAM, updates.q);
        }
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const filteredPosts = React.useMemo(() => {
    const normalizedTag = selectedTag.toLowerCase();
    const normalizedStacks = toLower(selectedStacks);
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const postTags = toLower(post.tags);
      const postStacks = toLower(post.stack);

      if (
        normalizedTag !== "all" &&
        !postTags.includes(normalizedTag)
      ) {
        return false;
      }

      if (
        normalizedStacks.length > 0 &&
        !postStacks.some((stackItem) => normalizedStacks.includes(stackItem))
      ) {
        return false;
      }

      if (normalizedQuery && !post.title.toLowerCase().includes(normalizedQuery)) {
        return false;
      }

      return true;
    });
  }, [posts, query, selectedStacks, selectedTag]);

  const stackOptions = React.useMemo(
    () =>
      stacks.map((stack) => ({
        label: stack,
        value: stack,
      })),
    [stacks]
  );

  return (
    <section className="space-y-10 pb-16 pt-8">
      <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Browse posts
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Writing on design and engineering
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Filter by focus area, stack, or search the title to find what you
            need fast.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Tag
            </p>
            <Select
              value={selectedTag}
              onValueChange={(value) => updateParams({ tag: value })}
            >
              <SelectTrigger className="bg-black/40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Stack
            </p>
            <MultiSelect
              options={stackOptions}
              placeholder="All stacks"
              defaultValue={selectedStacks}
              onValueChange={(value) => updateParams({ stack: value })}
              searchable
              variant="secondary"
              singleLine
              className="bg-black/40"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Search
            </p>
            <Input
              value={query}
              onChange={(event) => updateParams({ q: event.target.value })}
              placeholder="Search by title..."
              className="bg-black/40"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">
          {filteredPosts.length} post
          {filteredPosts.length === 1 ? "" : "s"} found
        </p>
        {(selectedTag !== "All" || selectedStacks.length > 0 || query) && (
          <button
            type="button"
            onClick={() => updateParams({ tag: "All", stack: [], q: "" })}
            className="text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="masonry-grid columns-1 gap-6 md:columns-2 xl:columns-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="masonry-item mb-6 break-inside-avoid"
          >
            <Link
              href={`/posts/${post.slug}`}
              className={cn(
                "group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20"
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:underline">
                  {post.title}
                </h2>
                <p className="line-clamp-3 text-sm text-white/70">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <Badge key={`${post.slug}-${tag}`} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-sm text-white/60">
          No posts match these filters yet.
        </div>
      )}
    </section>
  );
}
