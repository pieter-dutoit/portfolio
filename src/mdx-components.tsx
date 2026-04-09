import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const DEFAULT_MDX_IMAGE = { width: 1200, height: 675 };
const DEFAULT_MDX_ASPECT_RATIO =
  DEFAULT_MDX_IMAGE.width / DEFAULT_MDX_IMAGE.height;

function parseDimension(value?: number | string) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

const components: MDXComponents = {
  a: ({ href, className, ...props }) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return (
        <Link href={href} className={className} {...props} />
      );
    }
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    );
  },
  img: ({ className, src, alt, width, height }) => {
    if (!src) {
      return null;
    }

    const resolvedWidth = parseDimension(width);
    const resolvedHeight = parseDimension(height);
    const aspectRatio =
      resolvedWidth && resolvedHeight
        ? resolvedWidth / resolvedHeight
        : DEFAULT_MDX_ASPECT_RATIO;

    return (
      <span
        className={cn(
          "relative my-8 block w-full overflow-hidden rounded-lg border border-border",
          className
        )}
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-contain"
        />
      </span>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
