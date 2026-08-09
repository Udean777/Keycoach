<script lang="ts">
  import { langs, getLang, setLang, t } from "$lib/i18n.svelte";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import type { Language } from "$lib/i18n.svelte";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { reveal } from "$lib/actions/reveal";

  function pick(lang: Language) {
    setLang(lang);
    void srs.load(lang);
  }

  const tints = ["accent", "accent-2", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 10%, var(--color-surface))`;
  }

  let resetOpen = $state(false);
</script>

<!-- Hallmark · genre: playful (arcade) · macrostructure: Index-First · theme: arcade · design-system: design.md · designed-as-app -->
<div class="mx-auto w-full max-w-2xl px-4 py-14">
  <div class="reveal mb-10 flex flex-col gap-1.5" use:reveal>
    <span class="mono-label">{t().settings.preferences}</span>
    <h1 class="text-2xl font-bold tracking-[-0.02em]">{t().settings.title}</h1>
    <p class="text-sm text-[var(--color-muted)]">{t().settings.language}</p>
  </div>

  <div class="reveal-stagger flex flex-col gap-2" use:reveal>
    {#each langs as l, i (l.id)}
      <div class="reveal-child" style="--i: {i}">
        <button
          onclick={() => pick(l.id)}
          aria-pressed={getLang() === l.id}
          class="flex w-full items-center justify-between rounded-[12px] border px-4 py-3 text-sm font-bold transition-[transform,border-color,box-shadow] duration-150 {getLang() ===
          l.id
            ? 'border-[var(--color-accent-2)]/60 shadow-[0_2px_0_0_var(--color-accent-2)]'
            : 'border-[var(--color-border)] text-[var(--color-ink)] hover:-translate-y-0.5 hover:border-[var(--color-accent)]/50'}"
          style={getLang() === l.id ? `background: ${tint(i)}` : `background: var(--color-surface)`}
        >
          {l.label}
          {#if getLang() === l.id}
            <span class="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-[var(--color-ink)] shadow-[0_2px_0_0_var(--color-accent-strong)]"
              >✓</span
            >
          {/if}
        </button>
      </div>
    {/each}
  </div>

  <div class="reveal mt-16 mb-4 flex flex-col gap-1.5" use:reveal>
    <span class="font-label text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-accent-3)]">{t().settings.danger}</span>
    <h2 class="text-xl font-bold tracking-[-0.02em]">{t().settings.resetTitle}</h2>
    <p class="text-sm text-[var(--color-muted)]">{t().settings.resetDesc}</p>
  </div>

  <AlertDialog.Root bind:open={resetOpen}>
    <AlertDialog.Trigger
      class="flex w-full items-center justify-center rounded-full border border-[var(--color-accent-3)]/30 bg-[var(--color-accent-3)]/10 px-4 py-3 text-sm font-bold text-[var(--color-accent-3)] transition-colors hover:bg-[var(--color-accent-3)]/20"
    >
      {t().settings.reset}
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>{t().settings.resetConfirm}</AlertDialog.Title>
        <AlertDialog.Description>
          {t().settings.resetConfirmDesc}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>{t().settings.cancel}</AlertDialog.Cancel>
        <AlertDialog.Action
          variant="destructive"
          onclick={() => {
            progress.reset();
            srs.reset();
            resetOpen = false;
          }}
        >
          {t().settings.reset}
        </AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</div>
