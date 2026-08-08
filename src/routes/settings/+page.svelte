<script lang="ts">
  import { langs, getLang, setLang, t, subscribeLang } from "$lib/i18n";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { onMount } from "svelte";

  let currentLang = $state(getLang());
  subscribeLang(() => (currentLang = getLang()));

  function pick(lang: "en" | "id") {
    setLang(lang);
    void srs.load(lang);
  }
</script>

<!-- Hallmark · genre: modern-minimal · macrostructure: Index-First · design-system: design.md · designed-as-app -->
<div class="mx-auto w-full max-w-2xl px-4 py-14">
  <div class="mb-10 flex flex-col gap-1.5">
    <h1 class="text-2xl font-black tracking-[-0.03em]">{t().settings.title}</h1>
    <p class="text-sm text-[var(--color-muted)]">{t().settings.language}</p>
  </div>

  <div class="flex flex-col gap-2">
    {#each langs as l (l.id)}
      <button
        onclick={() => pick(l.id)}
        aria-pressed={currentLang === l.id}
        class="flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold transition-colors {currentLang === l.id
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-border)]/70 hover:bg-[var(--color-surface)]/70'}"
      >
        {l.label}
        {#if currentLang === l.id}
          <span aria-hidden="true">✓</span>
        {/if}
      </button>
    {/each}
  </div>
</div>