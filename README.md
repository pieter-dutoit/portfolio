This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Files and visibility

- `README.md` contains the project documentation and is versioned with the
  repository.
- `public/` contains assets served by the website. Only put material intended for
  publication here.
- `private/` contains local research and personal working documents. It is ignored
  by Git and is not served by the website.

CV working files are organised as follows:

```text
private/cv/
├── aus/base-cv.md       # Australian draft
├── evidence-notes.md   # Shared facts, sources and maintenance notes
└── sources/            # Previous CV and original contribution notes
```

Keep future country variants alongside `aus/`, such as `za/`, and generated drafts
in the corresponding country folder. Keep private documents out of application
imports and `public/`.

## Getting Started

### Interactive article demos

Each demo owns its implementation under `src/features/demos/<demo>/`, including
its components, provider, schemas, Server Actions, storage helpers, query setup,
and tests. Keep routes under `src/app/demos/<demo>/` thin. MDX posts import the
same demo entry component. Reuse shared UI primitives, but keep demo-specific
abstractions in the owning folder.

Published assets belong in `public/images/demos/<demo>/`. Keep diagram sources
beside their rendered SVGs. Namespace and version browser storage by demo, and
use separate query keys and providers so examples remain independent.

The forms demo uses a live Server Action with simulated integration and local
browser persistence. Its source comments distinguish those teaching choices
from production authorization and server-side persistence.

Run its scoped checks with `pnpm test:forms-demo`.

### Publication and revision dates

Every project in `src/content/projects` requires a quoted `addedAt` frontmatter
date, for example `addedAt: '2026-09-19'`. Use the date the case study was first
added to the portfolio, and keep it unchanged when editing the project. The home
page shows up to five projects ordered by this date, newest first; the projects
page remains alphabetical. This is also the case study's visible publication
date and JSON-LD `datePublished`, not the dates when the underlying project was
developed. Blog posts use their existing `date` field for publication.

Posts and projects may include `updatedAt: '2026-10-11'` when a genuine content
revision date is known. Dates must be quoted, valid `YYYY-MM-DD` calendar dates,
and `updatedAt` must not precede publication. Leave it absent when unknown;
never derive it from Git history, build time or the current date automatically.
The detail page displays it as “Updated” and JSON-LD emits `dateModified` from
the same value. Dates display in UTC to preserve their calendar day everywhere.
Listing dates and project ordering continue to use publication dates.

Article and listing JSON-LD includes compact author identity linked to the
homepage, where the full profile graph belongs. Blog keywords combine visible
tags and stack entries without duplicates. Keep visible attribution, metadata
and JSON-LD aligned when extending these fields. Run the focused date,
attribution and graph checks with `pnpm test:seo`.

### Crawler access and sitemap

Set this environment variable in the Vercel project's **Production** environment
before building or deploying:

```dotenv
NEXT_PUBLIC_SITE_URL=https://www.pieterdutoit.dev
```

The robots and sitemap routes use the shared URL helpers, as does the site's
structured data. Set the variable explicitly so production URLs use the public
domain rather than a Vercel deployment hostname. For a local production build,
run `NEXT_PUBLIC_SITE_URL=https://www.pieterdutoit.dev pnpm build`.

`src/app/robots.ts` serves `/robots.txt`, allowing all crawlers to read public
pages and assets and linking to `/sitemap.xml`. This includes AI assistants,
recruiter tools, and training crawlers. Crawl permission does not override
firewall rules or guarantee indexing.

`src/app/sitemap.ts` generates `/sitemap.xml` from the homepage, blog and project
indexes, forms demo, and all posts and project case studies. Both routes are
static and regenerate on every build, remaining cached until the next
deployment. Adding or removing content updates the sitemap on the next build;
new standalone pages must be added to its static path list. Query-string
variants and assets are excluded. Modification dates are omitted because the
sitemap does not currently consume the optional content revision dates.

In Vercel, open **Project → Firewall → Rules → Bot Management**:

| Setting        | Value |
| -------------- | ----- |
| AI Bots        | Allow |
| Bot Protection | Off   |

These settings allow unfamiliar recruiter tools to fetch pages without browser
challenges. Review custom rules for blanket crawler blocks while retaining
normal platform protections. See [Vercel's managed rulesets documentation](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets).
The domain is managed by Vercel; no Cloudflare settings are required.

After deployment, confirm `/robots.txt` and `/sitemap.xml` return HTTP 200 with
text and XML content types respectively. Check that all sitemap URLs use
`https://www.pieterdutoit.dev` and resolve successfully. Fetch representative
pages with ordinary and crawler user agents to check for challenges or
indexing restrictions, and inspect Vercel's Firewall traffic for blocked bots.

### Development

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/),
for example `feat: add a project page` or `fix: correct post filtering`.
Installing dependencies sets up Husky's `commit-msg` hook, which validates each
new commit with Commitlint.

Use Node.js 22.13+ (22.x) or Node.js 24+ and the pnpm version pinned in
`package.json`. Install dependencies with `pnpm install --frozen-lockfile`.

Validation commands:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`typecheck` generates Next.js route types and runs TypeScript 7. The build runs
this check before Next.js's production build, which also retains its built-in
type check. The `typescript` dependency aliases `@typescript/typescript6` because
Next.js and typescript-eslint still require its JavaScript compiler API;
`@typescript/native` aliases TypeScript 7. This follows Microsoft's
[side-by-side migration guide](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

ESLint 10 uses `@eslint/compat` to support Next.js's bundled React, import, and
accessibility plugins, which still declare ESLint 9 peer ranges. Keep the wrapper
until those plugins support ESLint 10 natively. The current TypeScript ESLint
parser handles both JavaScript and TypeScript because Next's bundled Babel parser
does not implement ESLint 10's scope API. See the
[ESLint 10 migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
