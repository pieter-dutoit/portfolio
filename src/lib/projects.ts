import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type ProjectMeta = {
  title: string
  slug: string
  excerpt: string
  stack: string[]
  thumbnail?: string
  fileName: string
}

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

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

  return {
    title: data.title.trim(),
    slug,
    excerpt: data.excerpt.trim(),
    stack: [...new Set(stack.map((item: string) => item.trim()))],
    thumbnail: data.thumbnail?.trim(),
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
