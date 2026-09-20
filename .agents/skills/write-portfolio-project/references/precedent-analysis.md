# Case-study precedent: The Grand Collection

Read this when choosing the structure, emphasis, or evidence for a new project
write-up, or substantially restructuring an existing one.

This analysis is grounded in `src/content/projects/the-grand-collection.mdx`, its
local assets, the project page components, and the professional register of
`write-like-pieter`. The initial analysis on 20 September 2026 used the only
project case study available at that point. GB Chiropractic was subsequently
added, and media alignment was standardised across both articles. Treat The Grand
Collection as a useful precedent, not evidence that every future project needs
the same sections or media.

## Context and reader

The project is a freelance hospitality website, with an initial build from
November 2024 to March 2025 and subsequent maintenance. Its overview introduces
both audiences: guests comparing accommodation and continuing to booking, and
the business managing properties and articles. This makes the technical work
understandable before introducing implementation details.

The presentation suits a prospective employer, collaborator, or client who first
needs to understand the product, then assess Pieter's technical judgement. That
audience is an editorial inference from the page's content and structure.

The initial-build dates and the search recording's September 2026 date refer to
different events. Preserve that distinction in future project histories.

## Structure and information presentation

| Part               | What the existing page does                                                                                                                | Reusable principle                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Header             | Shows the project name, a one-sentence product description, stack badges, and a homepage thumbnail.                                        | Orient the reader before the detailed account. Let page metadata carry summary information.   |
| Overview           | Introduces guest and business needs, states Pieter's contribution, then lists Role, Dates, and Context.                                    | Establish purpose, ownership, and scope early.                                                |
| Product example    | Shows room details, amenities, photographs, and the availability action.                                                                   | Show what someone can actually do with the product.                                           |
| Business structure | Connects CMS relationships, navigation, URLs, and structured data.                                                                         | Group related decisions around one underlying need.                                           |
| Image optimisation | Starts with allowance and cache-persistence problems, explains the upload/delivery changes, and acknowledges extra processing and storage. | Explain the constraint, response, and cost of the choice.                                     |
| Caching            | Explains reuse, targeted revalidation, and visitor experience in parallel bullets.                                                         | Describe the mechanism and its practical effect without requiring a figure for every section. |
| Outcome            | Briefly recaps delivery, the image-limit resolution, and reduced repeated queries.                                                         | End with supported results rather than a new sales pitch.                                     |

The body uses `## Overview`, `## Technical contributions`, problem-specific `###`
headings, and `## Outcome`. Bold lead-ins such as “Content management” and
“Delivery trade-off” make parallel contributions easy to scan. Explanatory
paragraphs connect the points so it still reads as an account of the work.

Figures appear within the argument. The CMS screenshot belongs to the content
management bullet, while the search recording follows the combined explanation
of navigation, content relationships, and structured data. The caching subsection
is text-only. Media density follows the explanation's needs.

## Voice and technical depth

The opening identifies what the product is, followed by “I developed the site and
its content-management tools” and the reason those tools exist. The image section
names a concrete problem, then explains “I addressed both by generating image
variants during CMS upload”. These are examples of ownership and practical
reasoning, not phrases to repeat mechanically.

Technical terms carry meaning: Payload CMS models relationships, R2 stores image
variants, and revalidation updates affected content. The text connects those
mechanisms to editing, navigation, delivery, or server demand. It does not turn
into a setup tutorial or repeat the full stack in each section.

Pieter's professional writing similarly links actions to effects, recognises
actual collaboration, and discusses useful trade-offs. Apply that voice to the
portfolio format. Do not import names, experiences, or achievements from the
personal writing samples. The portable voice rules live in `../SKILL.md`.

## What each asset contributes

All files below are in `public/images/projects/the-grand-collection/`, except
the MP4 in `public/videos/projects/the-grand-collection/`.

| Asset                                    | Purpose in the article                                                                                                   | Limit of the evidence                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `thumbnail.webp`                         | Introduces the site's brand and visual appearance.                                                                       | A product overview image is not evidence of technical outcomes.                                                                           |
| `rooms-and-rates.png`                    | Shows a concrete guest journey: compare a room and continue to availability.                                             | Demonstrates the visible interface, not booking conversion.                                                                               |
| `cms-property-article-editor.png`        | Shows how property and section assignments organise an article, with a caption linking its public page.                  | Shows the authoring relationship, not a measured editing-time saving.                                                                     |
| `site-structure.mmd` and `.svg`          | Explains the URL hierarchy and cross-links between guesthouses and destination guides.                                   | A simplified model of the relevant relationships, not the entire schema.                                                                  |
| `kathu-google-search.mp4` and its poster | The article describes a search-result-to-property-page sequence, qualified by query, date, and personalisation setting.  | A recorded observation, not proof of a permanent ranking or of SEO causation. Inspect playback before revising claims about the sequence. |
| `image-delivery.mmd` and `.svg`          | Separates upload processing from cached delivery, with the cache-miss path labelled.                                     | Explains the design, not measured throughput or latency.                                                                                  |
| `hero-image-cache-headers.png`           | Shows a production response with `Cf-Cache-Status: HIT`, `Content-Length: 102912`, and one-year browser cache allowance. | Supports an approximately 103 kB cached response for that request, not a site-wide cache-hit rate or performance improvement.             |

The diagrams use restrained slate colours, compact top-to-bottom flows, clear
labels, and selective emphasis. Solid and dotted edges have meanings explained
in captions or labels. They retain readable intrinsic sizes within bordered,
scrollable regions rather than stretching across the article. Their `.mmd`
sources and shared rendering configuration make them maintainable.

Both case studies now use left-aligned media and captions. The Grand Collection's
compact diagrams and GB Chiropractic's width-limited portrait screenshots share
the surrounding text's left edge. Their different widths reflect the content,
while the shared article styles keep alignment consistent. See
[the authoring conventions](authoring.md#media-alignment-and-sizing).

The existing assets are hierarchy and flow diagrams. No quantitative graph or
before/after benchmark is present. If a future project has measured results,
choose a chart suited to those data and explain the measurement conditions.
Otherwise, use the same restrained, qualitative presentation.

## Adaptation boundaries

Carry forward context, clear attribution, causal explanation, proportionate
claims, and purposeful media. Choose different technical topics for a different
project. Include lessons or collaboration when supported, even though this
particular case study does not have dedicated sections for them.

Recheck source files and assets as they evolve. Do not copy alt text blindly or
assume a past observation remains current. Existing broad benefit statements
are not a substitute for measurements in a new project.
