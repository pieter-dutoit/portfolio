---
name: write-portfolio-project
description: Write, revise, or review project case studies for this portfolio in Pieter's voice, including their structure, technical narrative, supporting media, diagrams, and MDX integration. Use for portfolio project write-ups in src/content/projects, not general blog posts, CVs, or unrelated UI changes.
---

# Write Portfolio Project

Write a clear account of what the project does, Pieter's contribution, why the
decisions mattered, and the supported outcome. Give readers enough context to
understand the work and enough technical detail to assess the reasoning. Preserve
useful depth while reducing the effort needed to find the structure, connect the
evidence and understand the result. Prefer the lowest reading effort that preserves
the useful meaning and evidence. Improve organisation and trim detail that does
not help readers understand the contribution or assess the claim.
Always provide the context needed to understand a claim or decision. Brevity
should remove reading effort, not the background that makes the work meaningful.

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
- Include relevant, accurate client context when it helps explain the problem or
  an engineering decision. Present it respectfully, without implying incompetence,
  embarrassing the client or unnecessarily criticising their existing methods.
  Prefer fair framing over removing useful facts. Exclude sensitive or confidential
  information from public copy.

  For example, a spreadsheet-based workflow can provide useful context when
  explaining the difficulty of coordinating allocations across campuses. Describe
  that complexity without portraying the university as outdated. Similarly,
  explaining that a client was not using a CMS can support a maintenance decision:
  focus on matching the implementation to actual editing needs, without blaming
  the client.
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
  implementation details. An excerpt should describe what users can accomplish
  without requiring project knowledge. For example, “helping planners decide
  who teaches each class across campuses” communicates the purpose of “educator
  suitability ranking and automatic allocation”. Save the mechanism for the
  technical contribution where it adds value.
- Use direct, practical, considered language. Prefer specific actions and their
  effects over claims such as “seamless”, “cutting-edge”, or “highly scalable”.
- Default to second-person, reader-focused writing throughout authored prose,
  examples, and captions. Reserve first person for explicitly requested
  reflections. Do not introduce reflections by default.
- Use “you” and “your” when addressing the reader or describing their actions,
  such as “You can compare properties before checking availability”. Use concrete
  product or feature subjects for implementation explanations without forcing
  “you” into every sentence. Make any user role clear before describing its actions.
- Preserve attribution through explicit role descriptions and named contributors.
  Establish the team when known, such as “a team of five students”, then
  distinguish Pieter's contribution from the team's. Never mechanically change
  “I built” to “you built” or imply that the reader carried out the project work.
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
  as described below. Avoid accumulating clauses or repetitive sentence openings.
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
2. **Overview:** Orient a reader who knows nothing about the project: explain
   the client or organisation, the intended users, what they needed to accomplish,
   what the product does, and what Pieter contributed. Include the circumstances
   that make the need understandable, using supported facts rather than invented
   background. For example, “a hospitality business with guesthouses in several
   towns needed visitors to find and compare its properties” provides more useful
   context than “the client needed a website”. Make the difficulty or unmet need
   explicit, then connect the application to that problem. For example, follow
   a description of difficult allocation decisions with “The team developed an
   allocation tool to support these decisions”, when supported. Use short
   Role and Result bullets when useful. Include dates and context where they add
   information, without repeating the team description in a separate Context
   line. An early product screenshot can make the explanation concrete.
3. **Technical contributions:** Organise subsections around meaningful problems
   or decisions. Keep each concern, response and supporting evidence together.
   Split a broad topic when it contains distinct explanations readers would
   otherwise have to connect themselves. Avoid a technology-by-technology inventory.
4. **Outcome:** Close with what was delivered or resolved. Include a supported
   limitation or next step when useful. Add a reflective lesson only when
   explicitly requested. A short outcome is sufficient, and should introduce
   no new unsupported claims.
   State the practical result before academic recognition. For example, describe
   the working application and the task it supports, then give “High Distinction
   (7/7)” if verified. Explain unfamiliar grading scales, and distinguish a
   project or course grade from an overall GPA. A grade alone does not establish
   deployment or measured improvement for the client.

Do not prescribe a fixed number of sections, words, or images. A small project
may need only a few paragraphs. Team or research projects may need a different
organisation. Preserve the reasoning pattern rather than copying hospitality,
SEO, image delivery, or caching topics into unrelated work.

## Make reasoning and evidence easy to follow

- For articles with several technical contributions, prefer numbering those
  headings and their meaningful subsections, while leaving Overview, Technical
  contributions and Outcome unnumbered. For example, use “2. Allocation”,
  “2.1 Suitability ranking” and “2.2 Automatic allocation”. Use actual nested
  headings rather than bold paragraphs for these subsections. Two numbering
  levels within the contribution hierarchy are usually enough. Omit numbering
  when a short article has no useful grouping to express.
- Demonstrate technical judgement with the approach and its purpose, without
  narrating every implementation step. For example, “The interface uses
  virtualisation to render only nearby course rows, loads heavier popups on
  demand and reduces repeated lookups during rendering” can replace separate
  explanations of the row buffer, deferred popup content and lookup map. Keep
  deeper detail when it explains a consequential trade-off or is itself the
  contribution.
- Summarise measurement methods at the level needed to interpret the evidence:
  what was compared, what stayed constant and what the metric means. For example,
  “The comparison covered initial loading with all courses fetched at once versus
  pagination, with virtualisation enabled in both. It measured initial-view
  readiness, rather than the full dataset download.” Omit query lifecycle and
  animation-frame details unless needed to assess the result. Brevity must
  preserve the comparison's scope and limitations.
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

## Link to supporting implementation

- Add one useful source link per relevant technical section or subsection when
  public code supports the explanation and lets readers inspect a meaningful
  implementation decision, such as image processing, caching or a content model.
  Skip links for general background, outcomes or sections without a useful public
  implementation reference. Choose the specific file or focused
  directory that best demonstrates the contribution, without redundant links
  at both parent and subsection levels.
- Verify public accessibility and inspect the implementation before linking.
  Confirm the public code at the chosen commit matches the claim, rather than
  relying on a filename or a potentially different local checkout. If the code
  contradicts the explanation, flag the discrepancy instead of presenting it as
  supporting evidence. Do not silently change another repository to fit the prose.
- Pin the URL to the full inspected commit SHA so later changes do not invalidate
  it. Use `https://github.com/<owner>/<repo>/blob/<sha>/<path>` for a file and
  `https://github.com/<owner>/<repo>/tree/<sha>/<path>` for a focused directory.
  Encode special path characters, including parentheses and square brackets.
  Add `#Lx-Ly` only when a small line range makes a large file easier to navigate.
  Check the final URL without authentication so visitors can access it too.
- Place an ordinary Markdown link after the implementation explanation and before
  supporting media. Use a descriptive label matching what the target shows, such
  as “View image-variant generation”, rather than implying one file demonstrates
  every part of a larger system. Project pages automatically add a decorative
  GitHub icon to GitHub links, so do not insert icons in individual MDX entries.
- Keep the explanation understandable without opening the link. Source links are
  optional supporting detail, not a requirement for every section. Do not link
  private repositories or imply that code proves performance or business outcomes.
- Keep the public repository root in the project's `repositoryUrls` metadata for
  general browsing. Section links supplement that project-level link with specific
  evidence; they do not replace it or repeat the repository root in every section.

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
  Does the overview establish who the project serves, what they needed and why
  the work mattered, without relying on later technical sections to explain it?
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
- Check perspective throughout prose, examples, and captions. Confirm that
  “you” addresses the intended reader, attribution remains clear, and first-person
  narration appears only in an explicitly requested reflection. Existing project
  prose and original writing samples do not override this default.
- For changed MDX or media, use the validation and visual checks in the authoring
  reference. Do not add application tests for ordinary prose edits.
- Report the changed files, completed checks, and any specific evidence gaps or
  blocked checks. Do not imply that a local draft has been deployed.
