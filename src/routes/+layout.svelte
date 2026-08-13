<script lang="ts">
  import "./layout.css";

  import { Home, GraduationCap, RefreshCcw, Settings, X } from "lucide-svelte";
  import { page } from "$app/state";
  import { ModeWatcher } from "mode-watcher";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import * as Select from "$lib/components/ui/select";
  import { t, langs, getLang, setLang } from "$lib/i18n.svelte";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import type { Language } from "$lib/i18n.svelte";

  const flagMap: Record<Language, string> = {
    en: "gb",
    id: "id",
    es: "es",
    de: "de",
    ru: "ru",
  };

  onMount(() => {
    srs.load(getLang());
  });

  const name = () => t().app.name;
  const tagline = () => t().app.tagline;
  const path = () => page.url.pathname;
  const origin = () => page.url.origin;

  const seo = () => {
    const p = path();
    if (p === "/")
      return { title: `${name()} — ${tagline()}`, desc: tagline() };
    if (p === "/lessons")
      return {
        title: `${t().lessons.title} — ${name()}`,
        desc: t().lessons.subtitle,
      };
    if (p === "/review")
      return {
        title: `${t().review.title} — ${name()}`,
        desc: t().review.subtitle,
      };
    if (p === "/settings")
      return {
        title: `${t().settings.title} — ${name()}`,
        desc: t().settings.language,
      };
    if (p.startsWith("/lessons/"))
      return {
        title: `${t().lesson.keys} — ${name()}`,
        desc: t().lesson.goals,
      };
    return { title: name(), desc: tagline() };
  };
  const canonical = () => origin() + path();
  const jsonText = () =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: name(),
      description: tagline(),
      url: origin(),
    });

  const links = [
    { href: "/", label: () => t().nav.home, icon: Home },
    { href: "/lessons", label: () => t().nav.lessons, icon: GraduationCap },
    { href: "/review", label: () => t().nav.review, icon: RefreshCcw },
    { href: "/settings", label: () => t().settings.title, icon: Settings },
  ];

  let { children } = $props();
  let menuOpen = $state(false);
</script>

<svelte:head>
  <title>{seo().title}</title>
  <meta name="description" content={seo().desc} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonical()} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={name()} />
  <meta property="og:title" content={seo().title} />
  <meta property="og:description" content={seo().desc} />
  <meta property="og:url" content={canonical()} />
  <meta property="og:image" content="{origin()}/og.webp" />
  <meta property="og:image:width" content="1376" />
  <meta property="og:image:height" content="768" />
  <meta property="og:image:alt" content={name()} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo().title} />
  <meta name="twitter:description" content={seo().desc} />
  <meta name="twitter:image" content="{origin()}/og.webp" />

  <script type="application/ld+json">
{jsonText()}
  </script>
</svelte:head>
<ModeWatcher />

<div class="flex min-h-screen flex-col overflow-x-clip">
  <!-- Hallmark · nav: N1b canonical app bar (collapses to hamburger <sm) · footer: Ft2 inline · arcade · design-system: design.md -->
  <header
    class="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/80"
  >
    <div
      class="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 py-2"
    >
      <a
        href="/"
        class="group flex items-center gap-2 font-bold tracking-[-0.02em]"
      >
        <span
          class="grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] bg-[var(--color-accent)] shadow-[0_2px_0_0_var(--color-accent-strong)] transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-[1px] group-active:shadow-none"
        >
          <img
            src="/logo.webp"
            alt={t().app.name}
            class="h-full w-full object-cover"
          />
        </span>
        <span class="text-lg">{t().app.name}</span>
      </a>

      <nav
        class="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 p-1 sm:flex"
      >
        {#each links as link (link.href)}
          <a
            href={link.href}
            class="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors {page
              .url.pathname === link.href
              ? 'bg-[var(--color-accent)]/15 text-[var(--color-ink)]'
              : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)]'}"
          >
            <link.icon class="h-3.5 w-3.5" />
            {link.label()}
          </a>
        {/each}
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />

        <Select.Root
          type="single"
          name="language"
          value={getLang()}
          onValueChange={(val) => {
            const lang = val as (typeof langs)[number]["id"];
            setLang(lang);
            void srs.load(lang);
          }}
        >
          <Select.Trigger class="h-9 w-12 justify-center">
            <img src="https://flagcdn.com/w40/{flagMap[getLang()]}.png" width="20" alt={getLang()} class="rounded-sm shadow-sm" />
          </Select.Trigger>
          <Select.Content side="bottom" align="end">
            {#each langs as l (l.id)}
              <Select.Item value={l.id} label={l.label}>
                <div class="mr-2 flex items-center">
                  <img src="https://flagcdn.com/w40/{flagMap[l.id]}.png" width="20" alt={l.label} class="rounded-sm shadow-sm" />
                </div>
                {l.label}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>

        <button
          onclick={() => (menuOpen = !menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Menu"
          class="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] sm:hidden"
        >
          {#if menuOpen}
            <X class="h-4 w-4" />
          {:else}
            <span class="flex flex-col items-center gap-[3px]">
              <span class="h-0.5 w-4 rounded-full bg-current"></span>
              <span class="h-0.5 w-4 rounded-full bg-current"></span>
              <span class="h-0.5 w-4 rounded-full bg-current"></span>
            </span>
          {/if}
        </button>
      </div>
    </div>

    {#if menuOpen}
      <nav
        transition:fly={{ y: -8, duration: 180 }}
        class="border-t border-[var(--color-border)] bg-[var(--color-bg)] sm:hidden"
      >
        <div class="mx-auto flex max-w-7xl flex-col gap-1 px-4 sm:px-8 py-3">
          {#each links as link (link.href)}
            <a
              href={link.href}
              onclick={() => (menuOpen = false)}
              class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors {page
                .url.pathname === link.href
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-ink)]'
                : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)]'}"
            >
              <link.icon class="h-4 w-4" />
              {link.label()}
            </a>
          {/each}
        </div>
      </nav>
    {/if}
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer
    class="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md py-8"
  >
    <div
      class="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 sm:px-8 sm:flex-row sm:justify-between text-center sm:text-left"
    >
      <!-- Brand & Tagline -->
      <div class="flex flex-col sm:flex-row items-center gap-3">
        <a
          href="/"
          class="group flex items-center gap-2 font-bold tracking-[-0.02em] text-[var(--color-ink)]"
        >
          <span
            class="grid h-7 w-7 place-items-center overflow-hidden rounded-[8px] bg-[var(--color-accent)] shadow-[0_1.5px_0_0_var(--color-accent-strong)] transition-transform duration-150 ease-out group-hover:-translate-y-0.5"
          >
            <img
              src="/logo.webp"
              alt={t().app.name}
              class="h-full w-full object-cover"
            />
          </span>
          <span class="text-base font-bold">{t().app.name}</span>
        </a>
        <span class="hidden sm:inline text-[var(--color-border)]">•</span>
        <span class="text-xs text-[var(--color-muted)]">{t().app.tagline}</span>
      </div>

      <!-- Copyright & Rights -->
      <div class="flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span>© {new Date().getFullYear()} {t().app.name}</span>
        <span class="text-[var(--color-border)]">•</span>
        <span>{t().footer.rights}</span>
      </div>
    </div>
  </footer>
</div>
