This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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
