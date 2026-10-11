# Post authoring, media, and demo conventions

Read the relevant sections when adding MDX, metadata, media, or an interactive
example. Repository paths below are relative to the root. Inspect the referenced
implementation if its contract has changed. These are post conventions, not the
metadata rules for project case studies.

## Content and metadata

Posts live in `src/content/posts/<slug>.mdx` and render at `/blog/<slug>`.
Use descriptive lowercase filenames with hyphens. The contract is implemented
by `src/lib/posts.ts`:

| Field | Requirement and authoring guidance |
| --- | --- |
| `title` | Required. The page renders it as H1. Name the subject directly. |
| `date` | Required. Use a quoted `YYYY-MM-DD` date. For a new post use the agreed publication date, or the current client date when none is specified. Preserve existing dates during ordinary revisions. |
| `updatedAt` | Optional quoted, valid `YYYY-MM-DD` revision date, no earlier than `date`. Omit when unknown. Never generate it automatically from Git or build time. |
| `excerpt` | Required. A concise description of the approach or value, used in the header, listing, and metadata. |
| `thumbnail` | Required. A public image URL. Use an appropriate real screenshot when the post has a demo. Body media remain optional. |
| `tags` | Required with at least one non-empty item. Prefer a YAML array of meaningful topics. |
| `stack` | Required with at least one non-empty item. Prefer a YAML array of relevant technologies. |
| `slug` | Optional because it falls back to the filename. If supplied, it must match the filename. |

The parser accepts arrays or comma-separated strings for tags and stack, but
arrays are clearer for new content. Do not copy project fields such as `addedAt`
or assume that the date or thumbnail is optional. A required thumbnail is not a
reason to build an unnecessary demo.

`src/app/blog/[slug]/page.tsx` renders the title, excerpt, date, tags, stack, and
thumbnail before the MDX body. Publication and optional revision dates are shown
with “Published” and “Updated” labels and match JSON-LD `datePublished` and
`dateModified`. The author links to the homepage. Date display uses UTC to keep
the calendar day consistent. JSON-LD keywords combine visible tags and stack
without duplicates. Start body headings at H2. Keep Introduction and
Conclusion unnumbered and number substantial technical sections and appropriate
H3 subsections. Do not duplicate the page's H1 in the body.

The detail thumbnail is cropped to 16:9. The current listing in
`src/components/posts/posts-index.tsx` crops thumbnails to 16:10. Inspect both
when adding or replacing an image. Do not infer a post layout from project tiles.

## Code and links

- Use fenced blocks with the correct language, usually `ts` or `tsx` for this
  codebase. Preserve imports needed to identify the APIs shown.
- Keep MDX imports outside code fences only when the page actually uses them,
  such as `Image` or a demo entry component. Example imports remain in fences.
- Mark omissions in partial excerpts. A callback containing a comment is an
  illustration of wiring, not a complete save implementation.
- Inspect local implementation and relevant primary documentation. Keep public
  links descriptive and adjacent to the point they support. Never substitute a
  private repository link or claim that local uncommitted code is public.
- When linking public implementation, verify that the accessible code supports
  the explanation. Prefer a stable commit and focused file or directory.
- Use the existing syntax-highlighting setup. Check both site themes when adding
  code or changing its presentation instead of hardcoding a theme in the post.

## Assets and figures

Put demo-related assets in `public/images/demos/<demo>/`. For a post with no demo,
use `public/images/posts/<slug>/` as the default ownership convention. Use
descriptive filenames. Public URLs omit the `public` prefix.

Everything under `public/`, including Mermaid source and configuration, is
publicly served. Keep private notes and raw research outside public assets and
application imports, using the ignored `private/` directory where appropriate.
Inspect provided screenshots before publishing them.

Use explicit `next/image` imports and `<figure>` wrappers for screenshots and
diagrams. Supply intrinsic dimensions, meaningful alt text, and responsive
`sizes` for screenshots. The generic Markdown image mapping in
`src/mdx-components.tsx` defaults to a 16:9 ratio, so do not rely on it for images
whose actual proportions differ.

Keep media and captions aligned to the surrounding text's left edge. Use the
shared `prose-article` rules in `src/app/globals.css`, which keep the caption gap
close and remove unwanted media and nested-paragraph margins. Do not add local
spacing overrides or redesign shared typography for an ordinary content task.

Start captions with an appropriate label such as “Screenshot:” or “Diagram:”.
Explain what to notice rather than repeat the preceding paragraph. Link dense
screenshots to the original image with a descriptive accessible label so readers
can inspect details at full size.

Keep editable `.mmd` sources beside their rendered `.svg` files. Retain any
needed Mermaid configuration and a reproducible rendering command. Centre text
inside nodes, separate browser and server responsibilities when relevant, and
label whether the diagram shows the actual demo or a production architecture.
Never change a storage label without checking that placement and arrows remain
accurate.

Keep compact diagrams at readable intrinsic dimensions inside a labelled,
keyboard-focusable horizontal-scroll region on narrow screens. Update image
dimensions when regenerating an SVG. Use a few useful media elements, not a fixed
quota. Quantitative graphs need actual measurements and context.

## Optional interactive demos

Follow the convention documented in `README.md`:

```text
src/features/demos/<demo>/       Components, provider, schemas, actions,
                                 storage, query setup, constants, tests
src/app/demos/<demo>/page.tsx    Thin dedicated route
public/images/demos/<demo>/     Thumbnail, screenshots, diagrams and sources
```

Reuse the same entry component in the MDX and dedicated route. Keep providers,
error handling, and demo-specific abstractions in the feature folder. Reuse
shared portfolio UI primitives without creating a general demo framework.
Give future demos their own query keys, providers, and versioned storage
namespaces where those mechanisms are used.

For optional interactive embeds, follow the existing “Try it” activation pattern
to defer heavier client setup. Access browser APIs after client activation.
Choose persistence and failure demonstrations for the topic, not by copying
localStorage or the forms example automatically. Briefly label mocked operations
and make clear which parts would run on the server in production.

Use concrete demo titles and labels. Give input and output regions distinct
visual treatment and balanced headings. Render simple collections as ordinary
bullet lists, with secondary metadata below the main text, rather than as
input-like boxes. Keep controls keyboard accessible, associate labels and field
errors, and make pending and failure feedback visible. Disable competing actions
when necessary to preserve the demonstrated flow.

Use a screenshot of the completed demo as its thumbnail and refresh it after
visible UI changes. Do not treat a screenshot as evidence of backend correctness.

## Validation proportional to the change

| Change | Checks |
| --- | --- |
| Narrow wording or heading edit | Re-read the affected passage, inspect the before/after diff, check heading hierarchy and Markdown whitespace. Confirm the requested scope and prior deletions are preserved. No application tests or full build solely for this edit. |
| New post, substantial MDX work, imports, or metadata | Verify the content contract, imports, links, and asset existence. Run `pnpm lint` and `pnpm build`, which includes typechecking. Preview the page and listing where affected. |
| Media or presentation change | Check actual dimensions, caption placement, alt text, thumbnail crops, and consistency of diagram sources and renders. Preview desktop and mobile widths in light and dark themes and run lint/build for changed MDX or styling. |
| Demo behaviour change | Run existing relevant tests and add only tests justified by changed behaviour. Verify success, pending, failure, recovery, keyboard operation, and both presentations. Run lint/build. Include persistence and namespace checks if storage is involved. |
| Skill instructions only | Validate skill metadata and reference links, then review representative usage scenarios. No application build. |

Use the current package scripts and installed dependencies. If a check is blocked
by the environment, report the exact limitation and complete independent checks.
A successful alternate build is not evidence that the default command passed.
Do not change the project's build configuration merely to avoid a local check
failure. Review visual changes rather than relying solely on compilation.
