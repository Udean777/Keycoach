<script lang="ts">
  import { langs, getLang, setLang, t } from "$lib/i18n/i18n.svelte";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import type { Language } from "$lib/i18n/i18n.svelte";
  import { Check } from "lucide-svelte";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { reveal } from "$lib/actions/reveal";

  const flagMap: Record<Language, string> = {
    en: "gb",
    id: "id",
    es: "es",
    de: "de",
    ru: "ru",
  };

  function pick(lang: Language) {
    setLang(lang);
    void srs.load(lang);
  }

  const tints = ["accent", "accent-2", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 10%, var(--card))`;
  }

  let resetOpen = $state(false);
  let currentSoundTheme = $state("mechanical");

  import { onMount } from "svelte";
  onMount(() => {
    currentSoundTheme = localStorage.getItem("soundTheme") || "mechanical";
  });
</script>

<!-- Hallmark · genre: playful (arcade) · macrostructure: Index-First · theme: arcade · design-system: design.md · designed-as-app -->
<div class="mx-auto w-full max-w-2xl px-4 py-14">
  <div class="reveal mb-10 flex flex-col gap-1.5" use:reveal>
    <span class="mono-label">{t().settings.preferences}</span>
    <h1 class="text-2xl font-bold tracking-[-0.02em]">{t().settings.title}</h1>
    <p class="text-sm text-muted-foreground">{t().settings.language}</p>
  </div>

  <div class="reveal-stagger flex flex-col gap-2" use:reveal>
    {#each langs as l, i (l.id)}
      <div class="reveal-child" style="--i: {i}">
        <button
          onclick={() => pick(l.id)}
          aria-pressed={getLang() === l.id}
          class="flex w-full items-center justify-between rounded-[12px] border px-4 py-3 text-sm font-bold transition-[transform,border-color,box-shadow] duration-150 {getLang() ===
          l.id
            ? 'border-[var(--color-secondary)]/60 shadow-[0_2px_0_0_var(--color-secondary)]'
            : 'border-border text-foreground hover:-translate-y-0.5 hover:border-[var(--primary)]/50'}"
          style={getLang() === l.id
            ? `background: ${tint(i)}`
            : `background: var(--card)`}
        >
          <div class="flex items-center gap-3">
            <img src="https://flagcdn.com/w40/{flagMap[l.id]}.png" width="24" alt={l.label} class="rounded-sm shadow-sm" />
            <span>{l.label}</span>
          </div>
          {#if getLang() === l.id}
            <span
              class="grid h-6 w-6 place-items-center rounded-full bg-primary text-foreground shadow-[0_2px_0_0_var(--color-primary)]"
            >
              <Check class="h-3.5 w-3.5 stroke-[4]" />
            </span>
          {/if}
        </button>
      </div>
    {/each}
  </div>

  <div class="reveal mt-12 flex flex-col gap-1.5" use:reveal>
    <h2 class="text-xl font-bold tracking-[-0.02em]">
      {t().settings.soundTheme}
    </h2>
  </div>
  <div class="reveal-stagger mt-4 flex flex-col gap-2" use:reveal>
    {#each [{ id: "mechanical", label: t().settings.soundMech }, { id: "arcade", label: t().settings.soundArcade }, { id: "typewriter", label: t().settings.soundType }, { id: "silent", label: t().settings.soundSilent }] as theme, i}
      <div class="reveal-child" style="--i: {i}">
        <button
          onclick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("soundTheme", theme.id);
              // Force re-render of this block by assigning to a state variable
              currentSoundTheme = theme.id;
            }
          }}
          aria-pressed={currentSoundTheme === theme.id}
          class="flex w-full items-center justify-between rounded-[12px] border px-4 py-3 text-sm font-bold transition-[transform,border-color,box-shadow] duration-150 {currentSoundTheme ===
          theme.id
            ? 'border-[var(--color-secondary)]/60 shadow-[0_2px_0_0_var(--color-secondary)] bg-surface'
            : 'border-border text-foreground hover:-translate-y-0.5 hover:border-[var(--primary)]/50 bg-surface'}"
          style={currentSoundTheme === theme.id
            ? `background: ${tint(i)}`
            : `background: var(--card)`}
        >
          {theme.label}
          {#if currentSoundTheme === theme.id}
            <span
              class="grid h-6 w-6 place-items-center rounded-full bg-primary text-foreground shadow-[0_2px_0_0_var(--color-primary)]"
            >
              <Check class="h-3.5 w-3.5 stroke-[4]" />
            </span>
          {/if}
        </button>
      </div>
    {/each}
  </div>

  <div class="reveal mt-16 mb-4 flex flex-col gap-1.5" use:reveal>
    <span
      class="font-label text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--primary)]"
      >{t().settings.danger}</span
    >
    <h2 class="text-xl font-bold tracking-[-0.02em]">
      {t().settings.resetTitle}
    </h2>
    <p class="text-sm text-muted-foreground">{t().settings.resetDesc}</p>
  </div>

  <AlertDialog.Root bind:open={resetOpen}>
    <AlertDialog.Trigger
      class="flex w-full items-center justify-center rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-3 text-sm font-bold text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/20"
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
