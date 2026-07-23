# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Afipiti is the marketing/portfolio site for painter Ángel Fernández — a single-page Next.js (App Router) site plus a per-artwork detail route. Content (artworks) is authored in Sanity and fetched server-side; there is no Sanity Studio in this repo, only the read client (`sanity.ts`).

## Commands

```bash
npm run dev      # start dev server (Next.js, default port 3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config via eslint.config.mjs)
```

There is no test suite configured in this repo.

## Environment variables

- `RESEND_API_KEY` — used by the contact form API route to send email via Resend.
- `CONTACT_EMAIL` — optional override for the recipient address (defaults to `contacto@afipiti.com`).

Sanity project ID/dataset are hardcoded in `sanity.ts` (project `786x28q3`, dataset `production`) rather than env vars.

## Architecture

**Data flow**: `sanity.ts` exports a `next-sanity` client (no CDN, `apiVersion: 2024-01-01`). `app/data/obras.ts` is the sole data-access layer: it runs GROQ queries against the `artwork` document type, maps Sanity's raw shape (`SanityArtwork`) to the app's display shape (`Obra`), and builds image URLs via `@sanity/image-url`. Pages call `fetchObras`, `getObraById`, `getObrasRelacionadas`, or `searchObras` — never the Sanity client directly. All queries use `next: { revalidate: 30 }` for ISR.

**Routes**:
- `app/page.tsx` — single-page site (Navbar, Hero, GalleryGrid, AboutSection, ContactSection, Footer) built by stitching section components together.
- `app/obra/[id]/page.tsx` — artwork detail page, keyed by Sanity `_id`. Generates per-artwork `Metadata` (OpenGraph/Twitter) and a `VisualArtwork` JSON-LD block.
- `app/api/contact/route.ts` — POST-only route handler that validates the contact form and sends mail through Resend.

**Components** (`app/components/`): flat, all re-exported through `app/components/index.ts` (and `app/components/ui/index.ts`, `app/components/icons/index.ts` for the subfolders) — import from these barrels (`@/app/components`), not deep paths. `ui/` holds small presentational primitives (Button, FormField, SectionHeader, etc.) reused across sections; `icons/` holds one SVG component per icon.

**Config/constants**: `app/lib/constants.ts` centralizes site-wide metadata (`SITE`: name, url, contact info, social links) and nav items — used by `layout.tsx` for global `<meta>`/JSON-LD tags and by section components. Update this file, not scattered literals, when site copy/contact info changes.

**Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.js` — theme tokens are declared inline in `app/globals.css` using `@theme inline` and CSS custom properties: `--background`, `--foreground`, `--accent`, `--accent-light`, `--muted`, plus the `--font-playfair` (headings) / `--font-lato` (body) font variables set up in `app/layout.tsx`).

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/sanity`, `@/app/lib/constants`.

**Images**: `next.config.ts` allow-lists `cdn.sanity.io` for `next/image` remote patterns — any new external image host must be added there.

**Deployment**: Vercel (Analytics + Speed Insights wired into `app/layout.tsx`).
