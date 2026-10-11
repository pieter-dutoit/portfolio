import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import matter from 'gray-matter'

import { ContentAttribution } from '@/components/content-attribution'
import { PostAttribution } from '@/components/posts/post-attribution'
import { profile, socialLinks } from '@/data/resume'
import { parseContentDate, parseUpdatedAt } from '@/lib/content-dates'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { getSiteUrl, resolveUrl, serializeJsonLd } from '@/lib/seo'
import {
  buildBlogPostingNode,
  buildBreadcrumbNode,
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
