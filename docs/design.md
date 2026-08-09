# Design — Keycoach

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
playful (arcade-gamified)

## Macrostructure family
The app is one product; pages share their family's shape and vary only in
component archetypes.

- Marketing pages: Split Studio (diptych claim-left / proof-right, hairline-ruled lists)
- App index pages: Index-First (list-led, 2-col card grids, eyebrow + title + subtitle head)
- App workspace pages: Workbench (focused single-column session panel)
- Error pages: Centered hero

## Theme — Arcade (custom)
- `--color-paper`   oklch(97% 0.014 100)
- `--color-paper-2` oklch(94% 0.016 100)
- `--color-ink`     oklch(19% 0.014 100)
- `--color-ink-2`   oklch(42% 0.016 100)
- `--color-rule`    oklch(88% 0.022 100)
- `--color-accent`  oklch(70% 0.18 145)   phosphor-lime
- `--color-accent-2`  oklch(62% 0.16 295) arcade-violet
- `--color-accent-3`  oklch(66% 0.18 25)  coral
- `--color-focus`   oklch(55% 0.20 295)

Paper is warm arcade cream; accents are the coin-op primary trio
(lime / violet / coral). The ink leans one hue back toward warm so body text
sits warm, not neutral.

## Typography
- Display: Bricolage Grotesque, weight 700, roman
- Body:    Plus Jakarta Sans, weight 400
- Mono:    JetBrains Mono, weight 400/500 (labels, keycaps, stats)
- Display tracking: -0.02em to -0.04em
- Type scale anchor: major third (1.25), `--text-display = clamp(2.75rem, 5vw + 1rem, 5.25rem)`

## Spacing
4-point scale in `tokens.css`. Pages use named tokens; never raw pixel values.

## Motion
- Easings: `--ease-out cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-spring cubic-bezier(0.34, 1.56, 0.64, 1)` (primary CTA only), `--ease-snap`
- Reveal: opacity + up-to-4px lift on cards; count-up on the home progress stat
- Reveal mechanics: the `use:reveal` action (`src/lib/actions/reveal.ts`) fires
  once via IntersectionObserver and sets `.is-visible`. Classes in layout.css:
  - `.reveal` — standalone section
  - `.reveal .reveal-child` / `.reveal-stagger .reveal-child` — grid children,
    staggered by `--i` (50 ms steps)
  - Wrap interactive leaves (cards, buttons) in a `reveal-child` wrapper so the
    reveal never overrides their own hover translate/press transforms.
- Micro-completions (lesson done, review done):
  - `.animate-result-in` — 0.4s ease-out pop for the result panel; stat tiles
    + actions delayed 180/260/340/480 ms
  - `.animate-star-pop` — one earned star per 160 ms, spring overshoot
- Reduced-motion: opacity-only, ≤ 150ms — all reveal/result elements forced to
  opacity 1, transform none, via the global `prefers-reduced-motion` block

## Microinteractions stance
- Silent success; no celebratory toasts
- Transform + opacity only, never layout properties
- Instant `:focus-visible` ring (never animated), ≥ 3:1

## CTA voice
- Primary: pill, lime fill, `shadow-[0_2px_0_0_var(--color-accent-strong)]`
- Secondary: outline pill, neutral text
- Micro-lifts on click (`translate-y-[1px]`, shadow drops)

## Per-page allowances
- Home (marketing) MAY keep the interactive keyboard demo — function, not chrome
- App pages MUST NOT use enrichment — function carries the page
- Error: typography only

## What pages MUST share
- Wordmark (round-square lime K, 2px shadow)
- The accent trio placement (≤ 5 % per viewport)
- Display + body fonts
- CTA voice
- Section heading rhythm (mono eyebrow · display heading)

## What pages MAY differ on
- Macrostructure within the family (Split Studio for home, Index-First for
  indexes, Workbench for sessions)
- Hero archetype
- Progression / gamification affordances (stars, lock, streak) — kept to real data

## Exports
Drop-in formats for re-using this design system in other projects.

### tokens.css
```css
:root {
  --color-bg:       oklch(97% 0.014 100);
  --color-surface:  oklch(94% 0.016 100);
  --color-surface-2: oklch(91% 0.02 100);
  --color-border:   oklch(88% 0.022 100);
  --color-ink:      oklch(19% 0.014 100);
  --color-ink-2:    oklch(42% 0.016 100);
  --color-muted:    oklch(50% 0.018 100);
  --color-accent:   oklch(70% 0.18 145);
  --color-accent-strong: oklch(62% 0.18 145);
  --color-accent-2: oklch(62% 0.16 295);
  --color-accent-3: oklch(66% 0.18 25);
  --color-mint:     oklch(84% 0.08 150);
  --color-lavender: oklch(86% 0.06 300);
  --color-correct:  oklch(75% 0.13 155);
  --color-wrong:    oklch(60% 0.22 22);
  --color-focus:    oklch(55% 0.20 295);

  --font-display: "Bricolage Grotesque", "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body:    "Plus Jakarta Sans", system-ui, sans-serif;
  --font-label:   "JetBrains Mono", ui-monospace, monospace;

  --space-3xs: 0.25rem;  --space-2xs: 0.5rem;  --space-xs: 0.75rem;
  --space-sm:  1rem;     --space-md:  1.5rem;  --space-lg: 2rem;
  --space-xl:  3rem;     --space-2xl: 4.5rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-short: 140ms;
  --radius-card: 12px; --radius-pill: 999px; --radius-input: 10px;
}
```

### Tailwind v4 `@theme`
```css
@theme {
  --color-bg: oklch(97% 0.014 100);
  --color-ink: oklch(19% 0.014 100);
  --color-accent: oklch(70% 0.18 145);
  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
  --font-label: "JetBrains Mono", monospace;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  /* mirror tokens.css --color-* and --spacing-* values */
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper":  { "$value": "oklch(97% 0.014 100)", "$type": "color" },
    "surface": { "$value": "oklch(94% 0.016 100)", "$type": "color" },
    "ink":    { "$value": "oklch(19% 0.014 100)", "$type": "color" },
    "accent": { "$value": "oklch(70% 0.18 145)", "$type": "color" },
    "accent-2": { "$value": "oklch(62% 0.16 295)", "$type": "color" },
    "correct": { "$value": "oklch(75% 0.13 155)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Bricolage Grotesque", "$type": "fontFamily" },
    "body":    { "$value": "Plus Jakarta Sans", "$type": "fontFamily" },
    "label":   { "$value": "JetBrains Mono", "$type": "fontFamily" }
  },
  "space": { "md": { "$value": "1.5rem", "$type": "dimension" } }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background:        97% 0.014 100;   /* paper */
  --foreground:        19% 0.014 100;   /* ink */
  --primary:           70% 0.18 145;    /* accent */
  --primary-foreground: 19% 0.014 100;  /* ink on accent fill */
  --muted:             91% 0.02 100;    /* surface-2 */
  --muted-foreground:  50% 0.018 100;   /* muted */
  --border:            88% 0.022 100;   /* rule */
  --input:             88% 0.022 100;   /* rule */
  --ring:              55% 0.20 295;    /* focus */
  --radius:            12px;
}
```