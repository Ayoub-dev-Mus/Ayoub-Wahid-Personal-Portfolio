# Ayoub Wahid Portfolio

A single-page portfolio for a Casablanca-based freelance Shopify expert and full-stack/AI developer.

## Run & Operate

- `pnpm --filter @workspace/ayoub-portfolio run dev` — serve the optimized Next.js build through its managed workflow; rebuild after code edits
- `pnpm --filter @workspace/ayoub-portfolio run develop` — optional hot-reload development server; compilation can exceed preview readiness limits
- `pnpm --filter @workspace/ayoub-portfolio run start` — Next.js production server
- Contact email requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in workspace secrets. Blank placeholders are documented in the portfolio's `.env.example`.

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- The portfolio uses Next.js App Router rather than the default Vite scaffold because the supplied brief requires Next.js and next/image. Next.js 14 was blocked by the package registry; use the current supported Next.js release.
- The portfolio owns its only dynamic endpoint at `/contact/send`, avoiding the shared API service's `/api` prefix. No database or authentication is required.
- Mail delivery stays unconfigured until the owner supplies Resend credentials and sender/recipient addresses, as requested. Missing configuration must return an honest error, never simulated success.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- Use the Nudge Folio reference for visual inspiration with the supplied ivory/ink/terracotta palette, not the original template identity or its media.
- Keep copy and projects editable in `content/site.ts` and `content/projects.ts`.
- Keep placeholder imagery replaceable and do not invent outcomes for incomplete project descriptions.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
