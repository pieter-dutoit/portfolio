---
name: write-blog-post
description: Plan, draft, refine, or review technical posts for this portfolio in Pieter's explanatory style, including focused code examples, supporting media, and optional demos. Use for posts in src/content/posts, not project case studies, CVs, correspondence, or unrelated UI work.
---

# Write Blog Post

Explain a technical approach so readers can understand its responsibilities,
reasoning, practical benefits, and relevant limits. Demonstrate understanding
through accurate examples and clear connections between decisions and outcomes.
This is the canonical post-writing guidance for this repository. Project case
studies remain the responsibility of `write-portfolio-project`.

Paths below are relative to the repository root. Reference links are relative
to this skill directory. The core writing rules are self-contained and do not
require a personal writing skill to be installed.

## Establish the task and evidence

- Read the current target file before editing. The user's current request and
  accepted refinements determine scope, even when they differ from these defaults.
- For a new post or substantial restructure, read the
  [precedent analysis](references/precedent-analysis.md) and inspect
  `src/content/posts/forms-zod-rhf-tanstack-query.mdx`. Its final shape is the
  primary precedent, not a template to duplicate or evidence for a new claim.
- For new MDX, metadata, media, or demo work, read the
  [authoring conventions](references/authoring.md). Consult only the portions
  relevant to the task. A narrow wording edit does not require demo research.
- Establish the approach being explained, the reader's assumed knowledge, the
  main takeaway, and the available implementation evidence. Inspect relevant
  code and primary documentation before making technical claims. Ask only for
  material information that the request and repository cannot resolve.
- Private implementations may inform authorised research. Do not publish their
  names, domains, source, identifying details, or screenshots without explicit
  disclosure authorisation. Public examples should use independent, fictional
  data and reveal only the approved pattern. Inspect public asset sources too.
- Plan when requested. A request for recommendations in chat does not authorise
  file edits. A writing task does not by itself require building an application,
  provisioning services, publishing, or deploying.

## Use the established post voice

- Default to an explanation of an approach, not a build-along tutorial. Avoid
  promises such as “you will build” unless the user requests that format.
- Use second person when addressing the reader as a developer, alongside neutral
  technical descriptions such as “The resolver validates the input”. Do not
  force “you” into every sentence or confuse the developer with an application's
  end user. This post-specific default takes precedence over the first-person
  default in broader personal or case-study writing guidance.
- Use plain, practical, considered Commonwealth English. Preserve official
  names and identifiers. Correct typing errors without losing meaning.
- Explain each important mechanism and its consequence. Avoid a technology
  inventory, vague praise, promotional claims, decorative labels, and unsupported
  certainty. Keep actual limitations where they affect the reader's understanding.
- Prefer short, connected paragraphs. Use lists for distinct items and tables
  for useful comparisons. Do not use em dashes or semicolons in authored prose.
- Keep each explanation in its most useful location. Introduce benefits with
  the approach and explain detailed behaviour beside its example. Trim repeated
  statements across prose, code comments, captions, and the conclusion.

## Shape the explanation

- Use `## Introduction` with approximately two to four sentences identifying the
  subject and concepts covered. Set expectations directly without a generic
  preamble, tutorial promises, or repeating the metadata excerpt verbatim.
- Organise the body around responsibilities, decisions, or the actual data flow.
  Use pragmatic headings, such as “Validate requests on the server”, that say
  what the section covers. Number substantial technical sections.
- Add numbered H3 subsections only for distinct groups of content. If substantial
  opening material is itself a topic with an example, give it the first
  subsection and number later groups accordingly. A short section introduction
  may remain above its subsections. Do not subdivide a compact section merely
  to make every section look alike.
- Keep related prose, code, and figures together. Introduce a figure before
  showing it, then explain its implication where useful without repeating its
  caption. Demo instructions should be separate from the conceptual overview.
- Finish with `## Conclusion`, normally two concise sentences connecting the
  main responsibilities and supported benefits. Recap rather than introduce a
  new claim, technology, limitation, or sales pitch.
- Adapt these defaults to the topic and request. Do not impose the precedent's
  word count, four sections, exact headings, number of snippets, or technology
  stack on future posts.

## Make examples accurate and focused

- Show the smallest useful code sample that explains the pattern. Include
  relevant imports so readers can distinguish library APIs from local modules.
  Omit styling, setup instructions, and repetitive markup unless they are the
  subject. Do not add unused imports just to name a library.
- Prefer excerpts from the working implementation. Label abbreviated or
  illustrative samples and identify omitted handling when it matters. Do not
  present placeholders as complete implementations or silently change the
  meaning while shortening a sample.
- Use a small good/bad comparison when it makes a subtle distinction concrete.
  When relevant to typed data, favour inference and reusable schemas, distinguish
  compile-time types from runtime checks, and validate untrusted data rather
  than asserting it into shape. These are relevant techniques, not a requirement
  to introduce Zod or another library into every post.
- Teach the intended production architecture. Briefly identify demonstration
  substitutions where they differ from it. A production diagram may show the
  intended system, but its caption must say so. Never describe a browser-storage
  write as an actual database write, or suggest protected integrations run in
  client code to make the prose simpler.
- Where relevant, distinguish validation, authentication, and authorization.
  Keep credentials and protected operations on the server. Explain narrow,
  authorised responses rather than exposing whole internal records.
- Attribute outcomes to the correct layer: a query library coordinates request
  and cache state, while application handlers decide when a form resets or keeps
  its draft. Avoid implying guarantees that the implementation does not provide.
- Distinguish an implemented mechanism, a potential benefit, and a measured
  outcome. For example, cache reuse can reduce reads, but does not establish a
  measured performance improvement. Use primary sources for technical references
  and verify public code before linking to it. Do not link private research.

## Use media and demos selectively

A post can be complete with prose and code. Add a screenshot, diagram, comparison,
or interactive demo only when it materially improves understanding. Do not add
benchmark graphs without measurements or build demo infrastructure by default.

For an authorised demo, keep its implementation scoped by demo, reuse existing
portfolio UI primitives, and use a shared entry component for embedded and
dedicated presentations. Follow the authoring reference for routes, providers,
state namespaces, assets, and activation boundaries.

Give demos concrete titles and specific field labels. Balance headings across
related panels and distinguish editable controls from displayed results. Use
ordinary bullet lists for simple collections rather than input-like item boxes.
Keep pending, success, failure, and reset behaviour clear and accessible.

Label captions descriptively, for example “Screenshot:” and “Diagram:”. Use the
shared close, left-aligned figure styling. Keep editable diagram sources and
renders consistent, and refresh screenshots when their depicted UI changes.

## Refine and verify within scope

- Preserve deliberate deletions and accepted refinements. Do not restore removed
  text from an earlier draft or the precedent. A request to add a heading or
  shorten a paragraph is not permission to restructure adjacent content.
- For narrow edits, review the before/after diff and check that only the intended
  content changed. Preserve code, figures, metadata, and paragraph order unless
  the request calls for changing them.
- For substantial work, read the introduction and conclusion together, then scan
  headings and captions. Confirm that they frame and recap the actual content.
  Check for repetition, vague labels, unsupported claims, and mismatches between
  prose, code, diagrams, and the live example.
- Use the proportionate checks in the authoring reference. Do not add application
  tests for prose-only changes or run an application build for a skill-only edit.
- Report the result and material validation limits concisely. Distinguish a local
  implementation from a published or deployed post.
