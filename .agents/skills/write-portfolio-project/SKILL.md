---
name: write-portfolio-project
description: Write, revise, or review project case studies for this portfolio in Pieter's voice, including their structure, technical narrative, supporting media, diagrams, and MDX integration. Use for portfolio project write-ups in src/content/projects, not general blog posts, CVs, or unrelated UI changes.
---

# Write Portfolio Project

Write a clear account of what the project does, Pieter's contribution, why the
decisions mattered, and the supported outcome. Give readers enough context to
understand the work and enough technical detail to assess the reasoning.

Paths below are relative to the repository root. Supporting references are
relative to this skill directory.

## Establish the facts and scope

- Read the target project, the supplied notes, and relevant project evidence.
  The current local precedent is
  `src/content/projects/the-grand-collection.mdx`. Its client, technologies,
  dates, achievements, and measurements belong to that project only.
- For a new case study or substantial restructure, read
  [the precedent analysis](references/precedent-analysis.md). For MDX or media
  changes, read [the authoring conventions](references/authoring.md) and inspect
  the current implementation where relevant.
- Identify the product and its users, project context, Pieter's role and dates,
  the main constraints, his actions, trade-offs, and available evidence. Separate
  individual contributions from team work and the initial build from later
  maintenance or observations.
- Resolve material gaps with a focused question while progressing supported
  work. Omit optional unsupported claims. Keep unresolved drafting notes outside
  published MDX, using `private/` if a working file is needed.
- For a narrow edit, preserve the existing scope and organisation unless the
  user requests a broader rewrite.

## Write in Pieter's voice

Apply `write-like-pieter` when available, using its professional and technical
register. These core rules keep this repository skill usable on its own:

- State the purpose early. Explain the real user or business need before the
  implementation details.
- Use direct, practical, considered language. Prefer specific actions and their
  effects over claims such as “seamless”, “cutting-edge”, or “highly scalable”.
- Use “I” for Pieter's actions and judgement, and “we” for supported shared work.
  Keep attribution and praise proportionate.
- Connect decisions to reasons and consequences. Name a technology when it helps
  explain the work, then explain its practical role.
- Use connected prose and short paragraphs. Use bullets for parallel
  contributions, with concise bold labels when they help scanning. Vary sentence
  length without accumulating clauses or repeating “I implemented”.
- Retain real uncertainty and trade-offs. Distinguish an intended benefit, an
  implemented mechanism, and a measured result.
- Use British/Commonwealth spelling, including “optimisation” and “prioritise”.
  Preserve official product names and code identifiers. Correct typing errors.
- Do not use em dashes or semicolons in authored prose. Ordinary hyphens and date
  ranges are fine. Avoid a marketing tone or a forced slogan at the end.

## Shape the case study

Use the existing shape as a starting point, adapting it to the actual project:

1. **Page metadata:** A factual, concise excerpt explaining the product and its
   purpose, plus the relevant stack and available links. The page renders the
   title, excerpt, stack badges, and optional thumbnail before the MDX body.
2. **Overview:** Explain what the product does, who uses it, and what Pieter
   contributed. Add short Role, Dates, and Context bullets when known. An early
   product screenshot can make the explanation concrete.
3. **Technical contributions:** Organise subsections around meaningful problems
   or decisions. Begin with the need or constraint, describe the response, and
   connect it to the effect. Use a real example, trade-off, or supporting figure
   where it adds understanding. Avoid a technology-by-technology inventory.
4. **Outcome:** Close with what was delivered or resolved. Include a lesson,
   limitation, or next step when the project material supports it. A short
   outcome is sufficient, and should introduce no new unsupported claims.

Do not prescribe a fixed number of sections, words, or images. A small project
may need only a few paragraphs. Team or research projects may need a different
organisation. Preserve the reasoning pattern rather than copying hospitality,
SEO, image delivery, or caching topics into unrelated work.

## Use media to explain and substantiate

Place each figure beside the point it supports. Use screenshots for visible
features or observations, short recordings for sequences, and diagrams for
relationships or flows that are hard to explain in prose. Keep essential meaning
in the text so the reader need not play a video to understand a contribution.

Align media and captions to the left edge of their surrounding text, including
the indented text inside list items. Use the shared `prose-article` figure styles
in `src/app/globals.css`. Keep portrait screenshots and diagrams at readable
widths, with captions contained by their figure. Avoid per-article centring such
as `mx-auto` on figures or media wrappers. The authoring reference records the
alignment and sizing conventions.

Captions explain what to notice and why it matters. Alt text describes the actual
image or the meaningful relationships in a diagram. Inspect assets before
describing them. Use real product evidence for claims about delivered work.

Keep observations bounded: a search recording documents a result for a stated
query and date, and one response-header screenshot documents that request. Neither
establishes sustained rankings, conversion gains, or a measured speed increase.
Add quantitative charts only when there are relevant measurements, with their
units, source, timeframe, and comparison conditions. The current precedent uses
flow and hierarchy diagrams, not benchmark charts.

Follow the authoring reference for image sizing, video props, editable Mermaid
sources, SVG presentation, and asset locations. Include only material intended
for publication in `public/`, as required by the repository README.

## Check and deliver

- Read the prose as someone unfamiliar with the project. Can they identify the
  purpose, Pieter's work, the reason for each main decision, and the result?
- Check claims against their sources, including ownership, dates, technical
  behaviour, captions, and numbers. Do not borrow claims from the precedent.
- Check voice, heading hierarchy, metadata, links, asset paths, dimensions, and
  figure placement. Verify left alignment of media and captions at desktop and
  mobile widths. Keep editable diagram sources consistent with their SVGs.
- For changed MDX or media, use the validation and visual checks in the authoring
  reference. Do not add application tests for ordinary prose edits.
- Report the changed files, completed checks, and any specific evidence gaps or
  blocked checks. Do not imply that a local draft has been deployed.
