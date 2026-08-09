# Keycoach

A touch-typing coach that trains your instincts: structured lesson stages, spaced-repetition (SRS) reviews, and 3-star objectives. Built with SvelteKit 5 (runes) and Tailwind CSS 4.

## Features

- **Structured curriculum** — 13 progressive stages covering left hand, right hand, and full keyboard mastery.
- **Smart SRS review** — schedules due keys automatically, so you practice what you miss.
- **3-star objectives** — hit 95% accuracy and target speed to earn stars per stage.
- **Multi-language UI** — English, Bahasa Indonesia, Español, Deutsch, Русский (progress is stored per language).
- **Local-first storage** — progress lives in IndexedDB; optional Supabase persistence when configured.
- **Arcade design system** — see `design.md`; accessible (prefers-reduced-motion honored), responsive.

## Stack

- SvelteKit 5 (runes) + Vite, `ssr=false` SPA
- Tailwind CSS 4 (`@tailwindcss/vite`)
- shadcn-svelte UI primitives (bits-ui)
- idb for IndexedDB, @supabase/supabase-js
- Vitest for unit tests

## Getting started

```sh
# install dependencies
npm install

# start dev server
npm run dev
```

## Environment

Copy `.env.example` to `.env` and fill in Supabase credentials. The app works
fully offline without them — sync is only enabled when both are set.

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Production build (adapter-vercel) |
| `npm run preview` | Preview the production build      |
| `npm run check`   | Type-check with svelte-check      |
| `npm run test`    | Run vitest unit tests             |

## Project structure

```
src/
├── routes/            # /, /lessons/[id], /review, /settings, sitemap.xml
├── lib/
│   ├── components/    # UI primitives (shadcn) + app components
│   ├── stores/        # runes-based stores (progress, srs, i18n)
│   ├── srs/           # spaced-repetition engine
│   ├── curriculum.ts  # lesson stage definitions
│   ├── generate.ts    # word generation for drills
│   └── db.ts          # IndexedDB layer
static/                # logo.jpg, og.jpg, robots.txt
```

## SEO

- Per-route titles, descriptions, canonical/OG/Twitter tags and JSON-LD structured data — all emitted in `src/routes/+layout.svelte` from `page.url.origin`.
- `sitemap.xml` generated dynamically at `/sitemap.xml`.
- `robots.txt` references the sitemap.
