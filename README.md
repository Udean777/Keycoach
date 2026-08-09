<div align="center">

<img src="static/logo.webp" alt="Keycoach logo" width="96" height="96" />

# ⌨️ Keycoach

### Build your touch-typing instincts. Type faster without looking.

**Train your instincts with structured lesson stages, spaced-repetition reviews, and 3-star objectives.**

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SPA](https://img.shields.io/badge/SPA-ssr_false-6EE7B7?style=flat-square)
![IndexedDB](https://img.shields.io/badge/IndexedDB-local_first-2DD4BF?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-8B5CF6?style=flat-square)

</div>

---

## 🎮 What is Keycoach?

Keycoach is a touch-typing coach that teaches your **fingers** instead of your eyes. Progress through
13 arcade-style stages from left-hand fundamentals to full-keyboard mastery, while a spaced-repetition
engine keeps drilling the keys you actually miss — not the ones you already know.

## ✨ Features

- **Structured curriculum** — 13 progressive stages covering left hand, right hand, and full keyboard mastery.
- **Smart SRS review** — a spaced-repetition engine schedules due keys automatically, so you practice what you miss.
- **3-star objectives** — hit 95% accuracy and target speed to earn stars per stage.
- **Multi-language UI** — English, Bahasa Indonesia, Español, Deutsch, Русский (progress is stored per language).
- **Local-first storage** — progress lives in IndexedDB, fully offline; optional Supabase sync when configured.
- **Arcade design system** — playful, keycap-styled UI (see [`docs/design.md`](docs/design.md)), accessible with `prefers-reduced-motion` honored, responsive across devices.

## 🛠️ Stack

| Layer         | Choice                                                         |
| ------------- | -------------------------------------------------------------- |
| Framework     | SvelteKit 5 (runes) + Vite, `ssr=false` SPA                    |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`)                           |
| UI primitives | shadcn-svelte (bits-ui)                                        |
| Storage       | `idb` for IndexedDB, `@supabase/supabase-js` for optional sync |
| Testing       | Vitest unit tests                                              |

## 🚀 Getting started

```sh
# install dependencies
npm install

# start the dev server
npm run dev
```

## 🔑 Environment

Copy `.env.example` to `.env` and fill in the Supabase credentials. The app runs **fully offline**
without them — sync is only enabled when both are set.

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 📜 Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Production build (adapter-vercel) |
| `npm run preview` | Preview the production build      |
| `npm run check`   | Type-check with svelte-check      |
| `npm run test`    | Run vitest unit tests             |

## 🗂️ Project structure

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
static/                # logo.webp, og.webp, robots.txt
docs/
└── design.md          # the arcade design system
```

## 🔍 SEO

- Per-route titles, descriptions, canonical/OG/Twitter tags and JSON-LD structured data — emitted in `src/routes/+layout.svelte` from `page.url.origin`.
- `sitemap.xml` generated dynamically at `/sitemap.xml`.
- `robots.txt` references the sitemap.

## 🖼️ Open Graph

`static/og.webp` (1376×768) powers the social share card.

<div align="center">

<img src="static/og.webp" alt="Keycoach open graph share card" width="640" />

</div>

---

<div align="center">

Made with ☕ and a lime accent. Type fast, look nowhere. ⌨️

</div>
