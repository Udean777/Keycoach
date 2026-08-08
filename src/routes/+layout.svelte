<script lang="ts">
  import "./layout.css";

  import { Home, GraduationCap, RefreshCcw } from "lucide-svelte";
  import { page } from "$app/state";
  import { ModeWatcher } from "mode-watcher";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import { t, langs, getLang, setLang } from "$lib/i18n.svelte";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { onMount } from "svelte";

  onMount(() => {
    srs.load(getLang());
  });

  const links = [
    { href: "/", label: () => t().nav.home, icon: Home },
    { href: "/lessons", label: () => t().nav.lessons, icon: GraduationCap },
    { href: "/review", label: () => t().nav.review, icon: RefreshCcw },
  ];

  let { children } = $props();
</script>

<svelte:head><title>{t().app.name}</title></svelte:head>
<ModeWatcher />

<div class="flex min-h-screen flex-col">
  <!-- Hallmark · nav: N1b canonical app bar · footer: Ft2 inline -->
  <header
    class="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/70"
  >
    <div
      class="mx-auto flex min-h-14 w-full max-w-4xl items-center justify-between gap-4 px-4 py-2"
    >
      <a href="/" class="flex items-center gap-2 font-black tracking-[-0.03em]">
        <span
          class="grid h-6 w-6 place-items-center rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
          >K<span class="sr-only">{t().app.name}</span></span
        >
        <span>{t().app.name}</span>
      </a>

      <nav class="flex items-center gap-1">
        {#each links as link (link.href)}
          <a
            href={link.href}
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors {page
              .url.pathname === link.href
              ? 'bg-[var(--color-surface)] text-[var(--color-accent)]'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
          >
            <link.icon class="h-3.5 w-3.5" />
            {link.label()}
          </a>
        {/each}
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <select
          value={getLang()}
          onchange={(e) => {
            const lang = e.currentTarget.value as (typeof langs)[number]["id"];
            setLang(lang);
            void srs.load(lang);
          }}
          aria-label={t().settings.language}
          class="h-8 cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/60 hover:text-[var(--color-ink)]"
        >
          {#each langs as l (l.id)}
            <option value={l.id}>{l.label}</option>
          {/each}
        </select>
      </div>
    </div>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="border-t border-[var(--color-border)] py-6">
    <div
      class="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-2 px-4 text-xs text-[var(--color-muted)] sm:flex-row"
    >
      <span>{t().app.tagline}</span>
      <span>{t().footer.made}</span>
    </div>
  </footer>
</div>
