import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type ProjectMeta = {
  title: string
  slug: string
  excerpt: string
  addedAt: string
  stack: string[]
  thumbnail?: string
  thumbnailAlt?: string
  websiteUrl?: string
  repositoryUrls?: string[]
  fileName: string
}

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

function parseAddedAt(value: unknown, fileName: string): string {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(`${value}T00:00:00.000Z`)
    if (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    ) {
      return value
    }
  }

  throw new Error(
    `Project ${fileName} requires addedAt to be a quoted YYYY-MM-DD calendar date.`
  )
}

function parseExternalUrl(value: unknown, field: string, fileName: string) {
  if (typeof value === 'string' && /^https?:\/\//.test(value.trim())) {
    try {
      const url = new URL(value.trim())
      if (url.hostname && !url.username && !url.password) return url.href
    } catch {
      // Report malformed links with the same content error as other invalid values.
    }
  }
  throw new Error(
    `Project ${fileName} requires a valid HTTP(S) URL for ${field}.`
  )
}

function parseProjectFile(fileName: string): ProjectMeta {
  const source = fs.readFileSync(path.join(projectsDirectory, fileName), 'utf8')
  const { data } = matter(source)
  const slug = fileName.replace(/\.mdx$/, '')

  for (const field of ['title', 'excerpt'] as const) {
    if (typeof data[field] !== 'string' || !data[field].trim()) {
      throw new Error(`Project ${fileName} requires a non-empty ${field}.`)
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Project ${fileName} must use a lowercase, hyphenated filename.`
    )
  }

  if (data.slug !== undefined && data.slug !== slug) {
    throw new Error(
      `Project ${fileName} frontmatter slug must match its filename.`
    )
  }

  const stack: unknown = data.stack ?? []
  if (
    !Array.isArray(stack) ||
    !stack.every((item) => typeof item === 'string' && item.trim())
  ) {
    throw new Error(
      `Project ${fileName} stack must be an array of non-empty strings.`
    )
  }

  if (
    data.thumbnail !== undefined &&
    (typeof data.thumbnail !== 'string' || !data.thumbnail.trim())
  ) {
    throw new Error(
      `Project ${fileName} thumbnail must be a non-empty image path.`
    )
  }

  if (
    data.thumbnailAlt !== undefined &&
    (typeof data.thumbnailAlt !== 'string' || !data.thumbnailAlt.trim())
  ) {
    throw new Error(
      `Project ${fileName} thumbnailAlt must be a non-empty string.`
    )
  }

  const websiteUrl =
    data.websiteUrl === undefined
      ? undefined
      : parseExternalUrl(data.websiteUrl, 'websiteUrl', fileName)
  if (
    data.repositoryUrls !== undefined &&
    !Array.isArray(data.repositoryUrls)
  ) {
    throw new Error(
      `Project ${fileName} repositoryUrls must be an array of URLs.`
    )
  }
  const repositoryUrls =
    data.repositoryUrls === undefined
      ? undefined
      : [
          ...new Set<string>(
            data.repositoryUrls.map((url: unknown) =>
              parseExternalUrl(url, 'repositoryUrls', fileName)
            )
          )
        ]

  return {
    title: data.title.trim(),
    slug,
    excerpt: data.excerpt.trim(),
    addedAt: parseAddedAt(data.addedAt, fileName),
    stack: [...new Set(stack.map((item: string) => item.trim()))],
    thumbnail: data.thumbnail?.trim(),
    thumbnailAlt: data.thumbnailAlt?.trim(),
    websiteUrl,
    repositoryUrls,
    fileName
  }
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(projectsDirectory)) return []

  return fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map(parseProjectFile)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return getAllProjects().find((project) => project.slug === slug) ?? null
}

export function getRecentProjects(
  limit = 5,
  excludeSlug?: string
): ProjectMeta[] {
  return getAllProjects()
    .filter((project) => project.slug !== excludeSlug)
    .sort(
      (a, b) =>
        b.addedAt.localeCompare(a.addedAt) ||
        a.title.localeCompare(b.title) ||
        a.slug.localeCompare(b.slug)
    )
    .slice(0, limit)
}
