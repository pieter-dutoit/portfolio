# Repository authoring and media conventions

Read this when adding or editing project MDX, metadata, or media. These are local
implementation conventions, so inspect the named source files if behaviour has
changed.

## Content contract

Write case studies in `src/content/projects/<slug>.mdx`. Use lowercase letters,
digits, and single separating hyphens for the filename. The filename determines
the route at `/projects/<slug>`.

`src/lib/projects.ts` defines the metadata contract:

| Field            | Current behaviour                                                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          | Required, non-empty string. Rendered as the page's H1.                                                                                                                                                      |
| `excerpt`        | Required, non-empty string. Used in the page lead, project listing, and metadata. Keep it factual and concise.                                                                                              |
| `stack`          | Optional array of non-empty strings, defaulting to `[]`. Values are trimmed and deduplicated. List the most representative technologies first, since tiles show the first two and a count of the remainder. |
| `thumbnail`      | Optional, non-empty image path. Prefer `/images/projects/<slug>/<file>`.                                                                                                                                    |
| `thumbnailAlt`   | Optional, non-empty string. Supply an accurate description with a thumbnail. The detail page otherwise falls back to the title.                                                                             |
| `websiteUrl`     | Optional valid HTTP(S) URL without embedded credentials. Omit when unavailable.                                                                                                                             |
| `repositoryUrls` | Optional array of valid HTTP(S) URLs without embedded credentials. Omit when unavailable.                                                                                                                   |
| `slug`           | Unnecessary. If supplied, it must match the filename.                                                                                                                                                       |

Project dates and roles belong in the body. The blog-post `date` and `tags` fields
are not part of this project contract. Follow project examples rather than
`src/content/posts/async-ui-in-nextjs.mdx`.

`src/app/projects/[slug]/page.tsx` renders the H1, excerpt, stack, thumbnail, and
final website/source links. Start body headings at H2 and avoid duplicating that
header or adding a redundant closing link block. The thumbnail is cropped to
16:9 on the detail page and a small square in the listing, so inspect both crops.

The body uses a `max-w-3xl` article column with shared prose styles and dark-mode
support. Keep existing typography and layout. Content authoring should not
require redesigning shared components.

## Files and publication

- Put published screenshots and diagrams in `public/images/projects/<slug>/`.
  Put published clips in `public/videos/projects/<slug>/`.
- Use descriptive, lowercase, hyphenated asset names. Public URLs omit `public`,
  for example `/images/projects/the-grand-collection/rooms-and-rates.png`.
- Keep editable `.mmd` sources next to their rendered `.svg` files. A local
  `mermaid-config.json` can preserve a project's diagram styling.
- The repository README reserves `private/` for ignored working material. Keep
  raw private notes and unsuitable captures there, outside application imports.
  Everything in `public/`, including diagram sources, is publicly served.
- Inspect screenshots for irrelevant or private content before publication.
  Keep the detail needed to support the claim when cropping or redacting.

## Tables and supporting content

Keep supporting material with the explanation it supports. A table or figure
belonging to a labelled bullet should be indented as part of that same list item,
along with its interpretation. Use ordinary section-level placement when it
supports the whole section. Preserve blank lines around Markdown tables inside
JSX wrappers so MDX parses them as tables.

Short factor and comparison tables should take their natural content width,
constrained by the article on smaller screens. Scope the sizing to the table's
wrapper rather than changing all site tables:

```mdx
<div className='max-w-full [&_table]:w-auto'>

| Factor | Effect on ranking |
| --- | --- |
| Relevant experience | Higher priority |

</div>
```

This is a layout example, not project evidence. For a table inside a list item,
indent the wrapper and every table line to the item's content level. Keep the
table and its interpretation aligned with that content. Let cells wrap on mobile.
If a larger table needs horizontal scrolling, contain it in a labelled,
keyboard-focusable region rather than allowing the page to overflow. Verify the
rendered width and grouping at both mobile and desktop sizes.

## Media alignment and sizing

Left-align figures, their media, and their captions with the surrounding text.
Inside a list item, use the item's indented text edge. This gives screenshots,
diagrams, and explanatory prose a consistent reading edge across case studies.

The shared `prose-article` utility in `src/app/globals.css` sets figure
`margin-inline: 0` and `text-align: start`. Use that default and avoid `mx-auto`,
centred flex wrappers, or `text-center` on article figures and their captions.

Choose width independently of alignment. Wide interface captures can fill the
text column. Cap portrait captures to keep them manageable, as GB Chiropractic
does with `<figure className='w-full max-w-xs'>`, `max-w-md`, or `max-w-lg`.
Keep captions inside the same figure so they follow its width. Match image
`sizes` to the chosen display width.

Keep diagrams at their readable intrinsic dimensions in the existing `w-fit
max-w-full overflow-x-auto` wrapper. Let that wrapper scroll on narrow screens,
keeping both its left edge and the caption aligned with the surrounding text.
Do not stretch small diagrams to fill the article column.

Internal diagram alignment is separate from figure alignment. Centre text within
nodes and balance related nodes around a clear reading direction. A simple
vertical flow can share a centre line, with return paths to the side. Keep the
outer figure and caption on the article's left edge.

## Screenshots and captions

Use explicit `next/image` imports and `<figure>` wrappers for case-study evidence.
The generic Markdown image mapping in `src/mdx-components.tsx` falls back to a
16:9 aspect ratio, which is unsuitable for some screenshots.

This existing figure demonstrates the pattern. Substitute the new project's
actual file, intrinsic dimensions, alt text, and caption:

```mdx
import Image from 'next/image'

<figure>
  <Image
    src='/images/projects/the-grand-collection/rooms-and-rates.png'
    alt='The Paarl Grand room listing showing the Mountain View Room, amenities, photographs and a Check availability button.'
    width={3584}
    height={2066}
    sizes='(max-width: 768px) 100vw, 768px'
    className='border-border h-auto w-full rounded-lg border'
  />
  <figcaption>
    Guests can compare room details and amenities, then check availability
    through NightsBridge.
  </figcaption>
</figure>
```

Alt text should describe the visible information relevant to the argument.
Captions should explain its implication, with a date or capture conditions for
time-sensitive observations. Avoid restating an entire paragraph in a caption.

Use a link to the original image when technical detail needs full-size viewing,
as in the response-header figure. Give that link a descriptive accessible label.
If a figure belongs inside a bullet, preserve MDX indentation so it remains part
of that item and the following bullets render correctly.

## Recordings

Reuse `ProjectVideo` from `@/components/project-video` for short, silent demos.
Inspect `src/components/project-video.tsx` for its current API. It takes `src`,
`poster`, intrinsic `width` and `height`, a descriptive `label`, and optional
`describedBy` pointing to the caption ID:

```mdx
import { ProjectVideo } from '@/components/project-video'

<figure>
  <ProjectVideo
    src='/videos/projects/the-grand-collection/kathu-google-search.mp4'
    poster='/images/projects/the-grand-collection/kathu-google-search-poster.jpg'
    width={656}
    height={656}
    label='Google search result for The Kathu Grand'
    describedBy='kathu-search-caption'
  />
  <figcaption id='kathu-search-caption'>
    The search result opens directly onto The Kathu Grand’s property page.
    Recorded on 19 September 2026 with personalisation off.
  </figcaption>
</figure>
```

Use distinct caption IDs if there are multiple recordings. Provide a useful
poster. Watch the actual clip before claiming what it demonstrates, and do not
treat a poster or filename as proof of the whole sequence.

Always keep native video controls available, including during autoplay, so readers
can pause, seek and replay. The component defaults to muted, looping inline playback
and attempts autoplay only when reduced motion is not requested. Reduced-motion
preferences pause automatic playback. Use `playback='manual'` to disable autoplay
and looping while retaining controls. Explain the demonstration's point in text;
narrated recordings also need appropriate captions and text alternatives.

## Diagrams and graphs

Use diagrams when relationships or execution paths are the subject. Start from
the existing Mermaid files in `public/images/projects/the-grand-collection/`:

- `site-structure.mmd` shows parent/child URL relationships and cross-links.
- `image-delivery.mmd` separates upload processing from delivery and labels the
  conditional cache-miss path.
- `mermaid-config.json` establishes a base theme with `htmlLabels: false`, 14px
  Arial labels, restrained slate colours, a light background, and linear edges.

Adapt the pattern to the new project's real architecture. Use a Mermaid
`flowchart` for an overview of logic with processing steps, decision diamonds
and labelled branches. Label edge meanings, distinguish phases when useful,
and include Mermaid `accTitle` and `accDescr`.

Show the logic needed for the explanation at the intended disclosure level.
Combine steps when their internal distinction adds little value, while preserving
meaningful decisions, loops and stopping conditions. Avoid publishing detailed
weights, thresholds or selection rules merely because they were available during
research. The editable `.mmd` source is public too. Prefer a compact flow with
readable labels to a comprehensive architecture map. An explanatory diagram is
not evidence of measured performance.

The source-file comments record the existing render command, pinned to Mermaid
CLI 11.12.0. For example, from the repository root:

```sh
npx --yes --package @mermaid-js/mermaid-cli@11.12.0 mmdc -c public/images/projects/the-grand-collection/mermaid-config.json -i public/images/projects/the-grand-collection/site-structure.mmd -o public/images/projects/the-grand-collection/site-structure.svg -b '#f8fafc'
```

Use the new project's paths when creating a new diagram. Keep regeneration
instructions with its source. Inspect the rendered output for clipping and label
placement, and derive display dimensions from the final SVG. If rendering tools
are unavailable, report that the export is pending rather than claiming that a
source-only change updated the displayed diagram.

Present SVG diagrams at a readable size in a labelled, keyboard-focusable region
that can scroll horizontally. This existing wrapper avoids stretching small
diagrams or shrinking labels to fit a narrow screen:

```mdx
<figure>
  <div
    className='not-prose border-border focus-visible:outline-ring w-fit max-w-full overflow-x-auto rounded-md border bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2'
    role='region'
    aria-label='Business and site hierarchy diagram'
    tabIndex={0}
  >
    <Image
      src='/images/projects/the-grand-collection/site-structure.svg'
      alt='The Grand Collection branches into guesthouses and destinations. Guesthouses have property posts, while destinations have guides. Solid lines show the hierarchy. A dotted line links guesthouses and destination guides in both directions.'
      width={322}
      height={222}
      unoptimized
      className='m-0 block h-auto max-w-none'
    />
  </div>
  <figcaption>
    Solid lines show the URL hierarchy. Dotted lines link guesthouses and
    destination guides.
  </figcaption>
</figure>
```

If actual measurements justify a quantitative chart, include labelled units,
data provenance, timeframe, and comparable test conditions. Preserve the data
and generation method in an appropriate location. Distinguish estimates from
observations. Do not invent a baseline, percentage gain, or ranking history to
fill a chart. Use an accessible caption and a textual statement of the result.

## Validation proportional to the edit

For changes to project MDX or its assets:

1. Check required metadata, imports, local links, asset existence, actual image
   dimensions, caption IDs, and attribution of measurements.
2. Run `pnpm lint` and `pnpm build` using the repository's installed dependencies.
   The build already runs `pnpm typecheck`. If a check cannot run, state the exact
   limitation and complete independent checks.
3. Preview changed project pages at a narrow mobile width and a desktop width.
   Check that tables, figures and interpretations remain grouped with their
   parent explanation, including indentation within lists. Short tables should
   use natural width and remain readable without page overflow. Check that every
   figure's media and caption start at the surrounding text's left edge. Check
   portrait width limits, thumbnail cropping, full-size image links, diagram
   scrolling, centred node labels, balanced flow and light/dark readability.
   For changed video figures, inspect playback, poster, and reduced-motion behaviour.

A change only to this skill's Markdown does not require an application build.
Validate the skill and its local references instead.
