import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import matter from 'gray-matter'

import { ContentAttribution } from '@/components/content-attribution'
import JsonLd from '@/components/json-ld'
import { PostAttribution } from '@/components/posts/post-attribution'
import { profile, socialLinks } from '@/data/resume'
import { parseContentDate, parseUpdatedAt } from '@/lib/content-dates'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import {
  buildContentMetadata,
  getSiteUrl,
  resolveUrl,
  serializeJsonLd
} from '@/lib/seo'
import {
  buildBlogPostingNode,
  buildBreadcrumbNode,
  buildDemoJsonLd,
  buildJsonLdGraph,
  buildProfileSiteNodes,
  buildProjectArticleNodes,
  buildSiteNodes,
  buildWebPageNode,
  getPersonId,
  getWebSiteId,
  type JsonLdNode
} from '@/lib/structured-data'
import { formatDate } from '@/lib/utils'

test('posts and projects share social metadata backed by existing thumbnail assets', () => {
  const entries = [
    ...getAllPosts().map((post) => ({
      ...post,
      thumbnailAlt: undefined,
      path: `/blog/${post.slug}`
    })),
    ...getAllProjects().map((project) => ({
      ...project,
      path: `/projects/${project.slug}`
    }))
  ]

  for (const entry of entries) {
    const metadata = buildContentMetadata(entry)
    const images = entry.thumbnail
      ? [
          {
            url: resolveUrl(entry.thumbnail),
            alt: entry.thumbnailAlt ?? entry.title
          }
        ]
      : undefined
    assert.equal(metadata.title, entry.title)
    assert.equal(metadata.description, entry.excerpt)
    assert.deepEqual(metadata.openGraph, {
      title: entry.title,
      description: entry.excerpt,
      url: resolveUrl(entry.path),
      type: 'article',
      siteName: profile.full_name,
      ...(images ? { images } : {})
    })
    assert.deepEqual(metadata.twitter, {
      card: images ? 'summary_large_image' : 'summary',
      title: entry.title,
      description: entry.excerpt,
      ...(images ? { images } : {})
    })
    if (entry.thumbnail?.startsWith('/')) {
      assert.ok(
        existsSync(path.join(process.cwd(), 'public', entry.thumbnail)),
        `Missing thumbnail for ${entry.path}: ${entry.thumbnail}`
      )
    }
  }
})

test('social metadata resolves local URLs against the configured domain and preserves remote images', () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL
  try {
    process.env.NEXT_PUBLIC_SITE_URL = ' https://portfolio.example/ '
    for (const thumbnail of [
      '/images/fixture.jpg',
      'https://cdn.example/fixture.jpg'
    ]) {
      const metadata = buildContentMetadata({
        title: 'A < B & C',
        excerpt: 'An example description.',
        path: '/blog/fixture',
        thumbnail
      })
      const expectedImage = {
        url: thumbnail.startsWith('/')
          ? `https://portfolio.example${thumbnail}`
          : thumbnail,
        alt: 'A < B & C'
      }
      assert.equal(
        metadata.openGraph?.url,
        'https://portfolio.example/blog/fixture'
      )
      assert.deepEqual(metadata.openGraph?.images, [expectedImage])
      assert.deepEqual(metadata.twitter?.images, [expectedImage])
    }
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL
    else process.env.NEXT_PUBLIC_SITE_URL = original
  }
})

test('projects without thumbnails omit social image fields and use a summary card', () => {
  const metadata = buildContentMetadata({
    title: 'Project without a thumbnail',
    excerpt: 'This project has text metadata.',
    path: '/projects/fixture'
  })
  assert.ok(metadata.openGraph)
  assert.ok(metadata.twitter)
  assert.equal('images' in metadata.openGraph, false)
  assert.equal('images' in metadata.twitter, false)
  assert.equal('card' in metadata.twitter && metadata.twitter.card, 'summary')
  assert.equal(metadata.openGraph.title, 'Project without a thumbnail')
  assert.equal(metadata.twitter.description, 'This project has text metadata.')
})

test('content dates accept calendar days and reject invalid or unquoted YAML dates', () => {
  for (const value of ['2026-10-11', '2024-02-29', '2000-02-29']) {
    assert.equal(parseContentDate(value, 'date', 'Fixture'), value)
  }
  const unquoted = matter('---\ndate: 2026-10-11\n---').data.date
  for (const value of [
    '2026-02-29',
    '1900-02-29',
    '2026-04-31',
    '2026-13-01',
    '2026-00-01',
    '2026-01-00',
    '2026-1-01',
    '2026-10-11T00:00:00Z',
    '',
    null,
    undefined,
    20261011,
    unquoted
  ]) {
    assert.throws(
      () => parseContentDate(value, 'date', 'Fixture'),
      /quoted YYYY-MM-DD/
    )
  }
})

test('revision dates may be absent or on/after publication, but never earlier', () => {
  assert.equal(parseUpdatedAt(undefined, '2026-10-11', 'Fixture'), undefined)
  for (const value of ['2026-10-11', '2026-10-12']) {
    assert.equal(parseUpdatedAt(value, '2026-10-11', 'Fixture'), value)
  }
  assert.throws(
    () => parseUpdatedAt('2026-10-10', '2026-10-11', 'Fixture'),
    /precede publication/
  )
  assert.throws(
    () => parseUpdatedAt(null, '2026-10-11', 'Fixture'),
    /quoted YYYY-MM-DD/
  )
})

test('date formatting preserves the calendar day in time zones west of UTC', () => {
  const original = process.env.TZ
  try {
    process.env.TZ = 'America/Los_Angeles'
    assert.equal(formatDate('2026-10-11'), 'Oct 11, 2026')
  } finally {
    if (original === undefined) delete process.env.TZ
    else process.env.TZ = original
  }
})

function assertConnected(nodes: JsonLdNode[]) {
  const ids = nodes.map((node) => node['@id'])
  assert.equal(new Set(ids).size, ids.length, 'duplicate entity IDs')
  function visit(value: unknown) {
    if (Array.isArray(value)) value.forEach(visit)
    else if (value && typeof value === 'object') {
      const entries = Object.entries(value)
      if (entries.length === 1 && entries[0][0] === '@id') {
        assert.ok(
          ids.includes(entries[0][1]),
          `unresolved reference: ${entries[0][1]}`
        )
      }
      entries.forEach(([, child]) => visit(child))
    }
  }
  visit(nodes)
  assert.deepEqual(
    JSON.parse(serializeJsonLd(buildJsonLdGraph(nodes)))['@graph'],
    nodes
  )
}

test('shared identity is compact while the homepage retains the detailed profile', () => {
  const shared = buildSiteNodes()
  assert.deepEqual(
    shared.map((node) => node['@type']),
    ['WebSite', 'Person']
  )
  assert.deepEqual(shared[1], {
    '@id': getPersonId(),
    '@type': 'Person',
    name: profile.full_name,
    url: getSiteUrl(),
    sameAs: socialLinks.map((link) => link.url)
  })
  const full = buildProfileSiteNodes()
  const person = full.find((node) => node['@type'] === 'Person')!
  assert.equal(person['@id'], shared[1]['@id'])
  for (const key of [
    'description',
    'email',
    'telephone',
    'address',
    'image',
    'jobTitle',
    'worksFor',
    'alumniOf',
    'knowsAbout',
    'award'
  ]) {
    assert.ok(key in person, `full profile missing ${key}`)
  }
  assert.ok(full.some((node) => node['@type'] === 'Organization'))
  assert.ok(full.some((node) => node['@type'] === 'EducationalOrganization'))
  assertConnected(shared)
  assertConnected(full)
})

test('demo graphs connect each page to its application and shared site identity', () => {
  const demos = [
    {
      path: '/demos/forms',
      title: 'Form flow demo',
      description:
        'Try a form with shared Zod validation, a Next.js Server Action, local browser persistence and TanStack Query.'
    },
    {
      path: '/demos/fixture',
      title: 'A < B </script><script>alert(1)</script>',
      description: 'Explore <example> & compare "values".'
    }
  ]

  for (const demo of demos) {
    const graph = buildDemoJsonLd(demo)
    const nodes = graph['@graph']
    const pageUrl = `${getSiteUrl()}${demo.path}`
    assert.equal(graph['@context'], 'https://schema.org')
    assert.deepEqual(
      nodes.map((node) => node['@type']),
      ['WebSite', 'Person', 'WebPage', 'WebApplication']
    )
    assertConnected(nodes)
    const page = nodes.find((node) => node['@type'] === 'WebPage')!
    const application = nodes.find(
      (node) => node['@type'] === 'WebApplication'
    )!
    assert.equal(page['@id'], `${pageUrl}#webpage`)
    assert.equal(application['@id'], `${pageUrl}#webapplication`)
    assert.deepEqual(page.mainEntity, { '@id': application['@id'] })
    assert.deepEqual(page.isPartOf, { '@id': getWebSiteId() })
    assert.deepEqual(application.author, { '@id': getPersonId() })
    assert.equal(application.applicationCategory, 'EducationalApplication')
    assert.equal(application.operatingSystem, 'Any')
    assert.equal(
      application.browserRequirements,
      'Requires a modern browser with JavaScript enabled.'
    )
    assert.equal(application.isAccessibleForFree, true)
    assert.deepEqual(application.offers, { '@type': 'Offer', price: 0 })
    assert.ok(!('aggregateRating' in application))
    assert.ok(!('review' in application))
    for (const node of [page, application]) {
      assert.equal(node.url, pageUrl)
      assert.match(node.url as string, /^https?:\/\//)
      assert.equal(node.name, demo.title)
      assert.equal(node.description, demo.description)
    }

    const html = renderToStaticMarkup(createElement(JsonLd, { data: graph }))
    const scripts = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
      )
    ]
    assert.equal(scripts.length, 1)
    assert.ok(!scripts[0][1].includes('<'))
    assert.deepEqual(JSON.parse(scripts[0][1]), graph)
    assert.equal((html.match(/<script/g) ?? []).length, 1)
  }
})

test('demo defaults can be overridden without claiming a non-free demo is free', () => {
  const graph = buildDemoJsonLd({
    path: '/demos/fixture',
    title: 'Restricted demo fixture',
    description: 'A fixture with different access and browser requirements.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows',
    browserRequirements: 'Requires a WebGPU-enabled browser.',
    isAccessibleForFree: false
  })
  const application = graph['@graph'].find(
    (node) => node['@type'] === 'WebApplication'
  )!
  assert.equal(application.applicationCategory, 'DeveloperApplication')
  assert.equal(application.operatingSystem, 'Windows')
  assert.equal(
    application.browserRequirements,
    'Requires a WebGPU-enabled browser.'
  )
  assert.equal(application.isAccessibleForFree, false)
  assert.ok(!('offers' in application))
  assertConnected(graph['@graph'])
})

test('post and project graphs use publication dates, optional revisions and visible keywords', () => {
  const authorId = getPersonId()
  const websiteId = getWebSiteId()
  for (const post of getAllPosts()) {
    const pageUrl = resolveUrl(`/blog/${post.slug}`)
    const args = { post, pageUrl, authorId, websiteId }
    const article = buildBlogPostingNode(args)
    assert.equal(article.datePublished, `${post.date}T00:00:00.000Z`)
    assert.equal('dateModified' in article, post.updatedAt !== undefined)
    assert.deepEqual(article.keywords, [
      ...new Set([...post.tags, ...post.stack])
    ])
    const revised = buildBlogPostingNode({
      ...args,
      post: {
        ...post,
        updatedAt: '2099-12-31',
        stack: [...post.stack, post.tags[0]]
      }
    })
    assert.equal(revised.dateModified, '2099-12-31T00:00:00.000Z')
    assert.deepEqual(revised.keywords, article.keywords)
    assertConnected([
      ...buildSiteNodes(),
      buildWebPageNode({ url: pageUrl, name: post.title }),
      article
    ])
  }
  for (const project of getAllProjects()) {
    const pageUrl = resolveUrl(`/projects/${project.slug}`)
    const args = { project, pageUrl, authorId, websiteId }
    const nodes = buildProjectArticleNodes(args)
    assert.equal(nodes[0].datePublished, `${project.addedAt}T00:00:00.000Z`)
    assert.equal('dateModified' in nodes[0], project.updatedAt !== undefined)
    assert.deepEqual(nodes[0].keywords, project.stack)
    const revised = buildProjectArticleNodes({
      ...args,
      project: { ...project, updatedAt: '2099-12-31' }
    })
    assert.equal(revised[0].dateModified, '2099-12-31T00:00:00.000Z')
    assertConnected([
      ...buildSiteNodes(),
      ...nodes,
      buildWebPageNode({ url: pageUrl, name: project.title }),
      buildBreadcrumbNode({ pageUrl, items: [{ label: 'Home', href: '/' }] })
    ])
  }
})

test('attribution renders optional revisions and author links without changing source content', () => {
  for (const updatedAt of [undefined, '2026-10-12']) {
    const props = { publishedAt: '2026-10-11', updatedAt }
    const projectHtml = renderToStaticMarkup(
      createElement(ContentAttribution, props)
    )
    const postHtml = renderToStaticMarkup(
      createElement(PostAttribution, {
        date: props.publishedAt,
        updatedAt,
        aiAssistance: { tool: 'Codex', disclosure: 'Fixture disclosure.' }
      })
    )
    for (const html of [projectHtml, postHtml]) {
      assert.match(
        html,
        /Published <time dateTime="2026-10-11">Oct 11, 2026<\/time>/
      )
      assert.match(html, /href="\/"[^>]*>Pieter du Toit<\/a>/)
      assert.equal(html.includes('Updated'), updatedAt !== undefined)
      if (updatedAt)
        assert.match(
          html,
          /Updated <time dateTime="2026-10-12">Oct 12, 2026<\/time>/
        )
    }
    assert.ok(postHtml.includes('Fixture disclosure.'))
  }
})
