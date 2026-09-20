---
name: write-portfolio-project
description: Write, revise, or review project case studies for this portfolio in Pieter's voice, including their structure, technical narrative, supporting media, diagrams, and MDX integration. Use for portfolio project write-ups in src/content/projects, not general blog posts, CVs, or unrelated UI changes.
---

# Write Portfolio Project

Write a clear account of what the project does, Pieter's contribution, why the
decisions mattered, and the supported outcome. Give readers enough context to
understand the work and enough technical detail to assess the reasoning. Preserve
useful depth while reducing the effort needed to find the structure, connect the
evidence and understand the result. Improve organisation before cutting substance.

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
- Research the implementation deeply enough to write accurately, then select
  what belongs in the public explanation. Match detail to the section's purpose
  and the user's intended disclosure level. Access to source code is not a reason
  to publish every weight, threshold or decision rule. Apply the same selection
  to diagram sources and supporting public files.
- Include stakeholder names, titles and external links when they help explain
  the work or provide relevant attribution. The organisation or department may
  be sufficient context. Neither naming nor omitting individuals is a blanket rule.
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
  Make ownership and delivery explicit without understating or overstating them.
  For example, use “designed and built” when both are supported, and distinguish
  a prototype, a complete deployable application, and a live deployment.
- Use concrete context and consistent domain terminology. Identify who or what
  generic nouns refer to: “educators” is clearer than unexplained “candidates”,
  and “travel between campuses” is clearer than “travel considerations”. Preserve
  meaningful distinctions such as allocations versus assignments where relevant.
- Connect decisions to reasons and consequences. Name a technology when it helps
  explain the work, then explain its practical role.
- Use connected prose for explanations, with varied sentence lengths and short
  paragraphs. Choose other formats where they make relationships easier to see,
  as described below. Avoid accumulating clauses or repeating “I implemented”.
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
   or decisions. Keep each concern, response and supporting evidence together.
   Split a broad topic when it contains distinct explanations readers would
   otherwise have to connect themselves. Avoid a technology-by-technology inventory.
4. **Outcome:** Close with what was delivered or resolved. Include a lesson,
   limitation, or next step when the project material supports it. A short
   outcome is sufficient, and should introduce no new unsupported claims.

Do not prescribe a fixed number of sections, words, or images. A small project
may need only a few paragraphs. Team or research projects may need a different
organisation. Preserve the reasoning pattern rather than copying hospitality,
SEO, image delivery, or caching topics into unrelated work.

## Make reasoning and evidence easy to follow

- Give each substantive explanation a clear relationship between the problem,
  Pieter's response, the supporting evidence where available, and its significance.
  Use descriptive headings or labels such as **Problem**, **Solution** and
  **Measurement** when they help scanning. These are tools, not a mandatory
  template or a requirement to create one subsection per metric.
- Choose the format for the relationship: prose for connected explanations,
  lists for distinct points, tables for factors or direct comparisons, and
  flowcharts for sequences and decisions. Do not reproduce the same information
  in several formats unless each serves a different purpose.
- Use a few representative examples when a complete inventory adds little value.
  Label them as examples and briefly acknowledge other relevant factors. For
  instance, a small factor-and-weight table can explain a ranking approach without
  reproducing its entire formula. Do not prescribe an example count or omit
  conditions needed to interpret the explanation correctly.
- Make comparisons directly comparable. Label the metric, units and configurations,
  and place before/after values together when useful. Explain what was measured,
  the relevant conditions, and what changed between configurations. Separate
  evidence for a particular change from supporting work it does not measure.
- State the takeaway beside the evidence. Calculate a supported percentage change
  or give a plain-language consequence where useful, so readers need not calculate
  or infer the main result. Retain the underlying values and relevant limits.
  Fewer rendered elements, for example, do not alone establish faster loading.
- Use layout to keep related content visibly related. Place supporting tables,
  figures and interpretations with their parent explanation, indented when they
  belong to a list item. Let short tables take their natural width. Follow the
  [authoring conventions](references/authoring.md#tables-and-supporting-content)
  for MDX grouping and sizing.

## Use media to explain and substantiate

Place each figure beside the point it supports. Use screenshots for visible
features or observations, short recordings for sequences, and diagrams for
relationships or flows that are hard to explain in prose. Keep essential meaning
in the text so the reader need not play a video to understand a contribution.

Align media and captions to the left edge of their surrounding text, including
the indented text inside list items. Use the shared `prose-article` figure styles
in `src/app/globals.css`. Keep portrait screenshots and diagrams at readable
widths, with captions contained by their figure. Centre labels within diagram
nodes and balance the internal layout while keeping the figure aligned with the
article. Avoid per-article centring such as `mx-auto` on figure wrappers. The
authoring reference records the alignment and sizing conventions.

Keep diagrams at the level needed to understand the approach. Show the relevant
steps, decisions and loops without exposing unnecessary algorithm details.
Simplification must preserve the actual logic and stopping conditions, without
implying stronger guarantees than the implementation provides.

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
  Then scan only headings, labels, tables and captions. Can they see how the
  concerns, responses and evidence relate without reconstructing the argument?
- Check claims against their sources, including ownership, dates, technical
  behaviour, captions, and numbers. Check that results have an interpretation
  and that examples are not presented as exhaustive. Confirm the published
  detail matches the intended disclosure level. Do not borrow claims from the precedent.
- Check voice, heading hierarchy, metadata, links, asset paths, dimensions, and
  layout. Verify grouping, table widths, diagram readability, and left alignment
  of media and captions at desktop and mobile widths. Keep editable diagram
  sources consistent with their SVGs.
- For changed MDX or media, use the validation and visual checks in the authoring
  reference. Do not add application tests for ordinary prose edits.
- Report the changed files, completed checks, and any specific evidence gaps or
  blocked checks. Do not imply that a local draft has been deployed.
