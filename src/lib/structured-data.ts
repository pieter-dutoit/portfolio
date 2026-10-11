import type { PostListItem, PostMeta } from '@/lib/posts'
import type { ProjectMeta } from '@/lib/projects'
import type { SocialLink } from '@/data/resume'
import {
  aboutMe,
  jobs,
  profile,
  qualifications,
  socialLinks
} from '@/data/resume'
import type { BreadcrumbItem } from '@/lib/seo'
import { buildBreadcrumbList, getSiteUrl, resolveUrl } from '@/lib/seo'

export type JsonLdNode = {
  '@type': string | string[]
  '@id'?: string
  [key: string]: unknown
}

export type JsonLdGraph = {
  '@context': 'https://schema.org'
  '@graph': JsonLdNode[]
}

type PersonProfile = {
  full_name: string
  title: string
  physical_address: string
  phone_number?: string
  photo_url: string
  email_address: string
}

const schemaContext = 'https://schema.org' as const

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (Array.isArray(entry)) return entry.length > 0
      return entry !== undefined && entry !== null && entry !== ''
    })
  ) as T
}

function toIsoDateTime(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return value
  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toISOString()
}

export function buildJsonLdGraph(
  nodes: Array<JsonLdNode | null | undefined>
): JsonLdGraph {
  const filtered = nodes.filter(Boolean) as JsonLdNode[]
  const seen = new Set<string>()
  const deduped = filtered.filter((node) => {
    if (!node['@id']) return true
    if (seen.has(node['@id'])) return false
    seen.add(node['@id'])
    return true
  })

  return {
    '@context': schemaContext,
    '@graph': deduped
  }
}

export function getWebSiteId(siteUrl = getSiteUrl()) {
  return `${siteUrl}/#website`
}

export function getPersonId(siteUrl = getSiteUrl()) {
  return `${siteUrl}/#person`
}

export function getWebPageId(url: string) {
  return `${url}#webpage`
}

export function getBlogPostingId(url: string) {
  return `${url}#blogposting`
}

export function getArticleId(url: string) {
  return `${url}#article`
}

export function getBreadcrumbId(url: string) {
  return `${url}#breadcrumb`
}

export function getItemListId(url: string) {
  return `${url}#itemlist`
}

export function buildWebSiteNode({
  siteUrl = getSiteUrl(),
  name,
  description
}: {
  siteUrl?: string
  name: string
  description?: string
}): JsonLdNode {
  return compact({
    '@id': getWebSiteId(siteUrl),
    '@type': 'WebSite',
    name,
    url: siteUrl,
    description,
    publisher: { '@id': getPersonId(siteUrl) }
  })
}

export function buildPersonNode({
  profile,
  socialLinks,
  siteUrl = getSiteUrl(),
  description,
  employerIds = [],
  alumniIds = [],
  knowsAbout = [],
  awards = []
}: {
  profile: PersonProfile
  socialLinks: SocialLink[]
  siteUrl?: string
  description?: string
  employerIds?: string[]
  alumniIds?: string[]
  knowsAbout?: string[]
  awards?: string[]
}): JsonLdNode {
  return compact({
    '@id': getPersonId(siteUrl),
    '@type': 'Person',
    name: profile.full_name,
    jobTitle: profile.title,
    image: resolveUrl(profile.photo_url),
    address: profile.physical_address,
    email: profile.email_address,
    telephone: profile.phone_number,
    url: siteUrl,
    sameAs: socialLinks.map((link) => link.url).filter(Boolean),
    description,
    worksFor: employerIds.map((id) => ({ '@id': id })),
    alumniOf: alumniIds.map((id) => ({ '@id': id })),
    knowsAbout,
    award: awards
  })
}

export function buildSiteNodes(siteUrl = getSiteUrl()): JsonLdNode[] {
  return [
    buildWebSiteNode({
      siteUrl,
      name: `${profile.full_name} Portfolio`,
      description: `Professional portfolio of ${profile.full_name}`
    }),
    {
      '@id': getPersonId(siteUrl),
      '@type': 'Person',
      name: profile.full_name,
      url: siteUrl,
      sameAs: socialLinks.map((link) => link.url).filter(Boolean)
    }
  ]
}

export function buildProfileSiteNodes(siteUrl = getSiteUrl()): JsonLdNode[] {
  const employers = jobs
    .filter((job) => job.roles.some((role) => !role.end_date))
    .map((job) =>
      compact({
        '@id': `${siteUrl}/#employer-${job.id}`,
        '@type': 'Organization',
        name: job.company_name,
        url: job.company_url,
        sameAs: job.company_same_as
      })
    )
  const today = new Date().toISOString().slice(0, 10)
  const institutions = qualifications
    .filter(
      (qualification) =>
        qualification.end_date && qualification.end_date <= today
    )
    .map((qualification) =>
      compact({
        '@id': `${siteUrl}/#institution-${qualification.id}`,
        '@type': 'EducationalOrganization',
        name: qualification.institution_name,
        url: qualification.institution_url,
        sameAs: qualification.institution_same_as
      })
    )

  return [
    buildWebSiteNode({
      siteUrl,
      name: `${profile.full_name} Portfolio`,
      description: `Professional portfolio of ${profile.full_name}`
    }),
    buildPersonNode({
      profile,
      socialLinks,
      siteUrl,
      description: aboutMe[0],
      employerIds: employers.map((employer) => employer['@id']),
      alumniIds: institutions.map((institution) => institution['@id']),
      knowsAbout: [
        ...new Set(
          [...jobs, ...qualifications].flatMap((entry) =>
            entry.tags.map((tag) => tag.name)
          )
        )
      ],
      awards: [
        ...new Set(
          qualifications.flatMap((qualification) =>
            qualification.achievements.map((achievement) => achievement.name)
          )
        )
      ]
    }),
    ...employers,
    ...institutions
  ]
}

export function buildProfilePageNode({
  siteUrl = getSiteUrl(),
  name,
  description,
  personId = getPersonId(siteUrl),
  websiteId = getWebSiteId(siteUrl)
}: {
  siteUrl?: string
  name: string
  description?: string
  personId?: string
  websiteId?: string
}): JsonLdNode {
  return compact({
    '@id': getWebPageId(siteUrl),
    '@type': 'ProfilePage',
    url: siteUrl,
    name,
    description,
    mainEntity: { '@id': personId },
    isPartOf: { '@id': websiteId }
  })
}

export function buildWebPageNode({
  url,
  name,
  description,
  type = 'WebPage',
  websiteId,
  mainEntityId,
  breadcrumbId
}: {
  url: string
  name: string
  description?: string
  type?: string
  websiteId?: string
  mainEntityId?: string
  breadcrumbId?: string
}): JsonLdNode {
  return compact({
    '@id': getWebPageId(url),
    '@type': type,
    url,
    name,
    description,
    isPartOf: websiteId ? { '@id': websiteId } : undefined,
    mainEntity: mainEntityId ? { '@id': mainEntityId } : undefined,
    breadcrumb: breadcrumbId ? { '@id': breadcrumbId } : undefined
  })
}

export function buildItemListNode({
  pageUrl,
  items
}: {
  pageUrl: string
  items: { name: string; url: string }[]
}): JsonLdNode {
  return compact({
    '@id': getItemListId(pageUrl),
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': getWebPageId(item.url),
        name: item.name,
        url: item.url
      }
    }))
  })
}

export function buildBlogPostingNode({
  post,
  pageUrl,
  authorId,
  websiteId
}: {
  post: PostMeta | PostListItem
  pageUrl: string
  authorId: string
  websiteId: string
}): JsonLdNode {
  return compact({
    '@id': getBlogPostingId(pageUrl),
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: resolveUrl(post.thumbnail),
    datePublished: toIsoDateTime(post.date),
    dateModified: post.updatedAt ? toIsoDateTime(post.updatedAt) : undefined,
    creditText: post.aiAssistance?.disclosure,
    author: { '@id': authorId },
    publisher: { '@id': authorId },
    mainEntityOfPage: { '@id': getWebPageId(pageUrl) },
    isPartOf: { '@id': websiteId },
    keywords: [...new Set([...post.tags, ...post.stack])],
    inLanguage: 'en',
    url: pageUrl
  })
}

export function buildBreadcrumbNode({
  items,
  pageUrl
}: {
  items: BreadcrumbItem[]
  pageUrl: string
}): JsonLdNode {
  return {
    '@id': getBreadcrumbId(pageUrl),
    ...buildBreadcrumbList(items)
  }
}

export function buildProjectArticleNodes({
  project,
  pageUrl,
  authorId,
  websiteId
}: {
  project: ProjectMeta
  pageUrl: string
  authorId: string
  websiteId: string
}): JsonLdNode[] {
  const subjects: JsonLdNode[] = []
  if (project.websiteUrl) {
    subjects.push({
      '@id': `${pageUrl}#project-website`,
      '@type': 'WebSite',
      name: project.title,
      url: project.websiteUrl
    })
  }
  for (const repositoryUrl of project.repositoryUrls ?? []) {
    subjects.push({
      '@id': repositoryUrl,
      '@type': 'SoftwareSourceCode',
      name: `${project.title} source code`,
      codeRepository: repositoryUrl
    })
  }

  return [
    compact({
      '@id': getArticleId(pageUrl),
      '@type': 'Article',
      headline: project.title,
      description: project.excerpt,
      image: project.thumbnail ? resolveUrl(project.thumbnail) : undefined,
      datePublished: toIsoDateTime(project.addedAt),
      dateModified: project.updatedAt ? toIsoDateTime(project.updatedAt) : undefined,
      keywords: project.stack,
      inLanguage: 'en',
      url: pageUrl,
      author: { '@id': authorId },
      publisher: { '@id': authorId },
      mainEntityOfPage: { '@id': getWebPageId(pageUrl) },
      isPartOf: { '@id': websiteId },
      about: subjects.map((subject) => ({ '@id': subject['@id'] }))
    }),
    ...subjects
  ]
}
