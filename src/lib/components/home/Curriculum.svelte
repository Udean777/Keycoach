<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { Lock, ArrowRight, Star } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";
  import type { CompiledLesson } from "$lib/core/curriculum";

  let {
    lessons,
    unlocked,
  }: {
    lessons: CompiledLesson[];
    unlocked: CompiledLesson[];
  } = $props();

  const tints = ["primary", "accent-2", "accent-3", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 7%, var(--card))`;
  }
</script>

<section class="py-16 lg:py-24">
  <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div class="flex flex-col items-start gap-1.5">
      <span class="mono-label">{t().lessons.eyebrow}</span>
      <h2
        class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-foreground [overflow-wrap:anywhere]"
      >
        {t().nav.lessons}
      </h2>
    </div>
    <span
      class="font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
    >
      {unlocked.length}
      {t().lessons.completed.toLowerCase()}
    </span>
  </div>

  <ol
    class="reveal-stagger grid grid-cols-1 divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x"
    use:reveal
  >
    {#each lessons as lesson, i (lesson.id)}
      {@const p = progress.get(lesson.id)}
      {@const open = progress.isUnlocked(
        lesson.id,
        lessons.map((x) => x.id),
      )}
      <li class="reveal-child" style="--i: {i}">
        <a
          href={open ? `/lessons/${lesson.id}` : undefined}
          class="group flex min-h-[104px] flex-col gap-2.5 p-4.5 transition-[background-color,transform] duration-150 ease-out {open
            ? 'hover:bg-secondary/10 active:translate-y-[1px]'
            : 'cursor-not-allowed opacity-45'}"
          style={`background: ${open ? tint(i) : "transparent"}`}
          aria-disabled={!open}
        >
          <div class="flex items-center justify-between gap-2">
            <span class="font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            {#if p?.stars}
              <span class="flex gap-0.5 text-[var(--color-accent-2)]">
                {#each Array(p.stars) as _}
                  <Star class="h-3.5 w-3.5 fill-current" />
                {/each}
              </span>
            {:else if !open}
              <span class="text-xs text-muted-foreground">
                <Lock class="h-3.5 w-3.5" />
              </span>
            {:else}
              <ArrowRight
                class="h-3.5 w-3.5 -translate-x-1 text-foreground opacity-0 transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100"
              />
            {/if}
          </div>

          <span class="font-display text-base font-bold tracking-tight text-foreground [overflow-wrap:anywhere]">
            {lesson.id}
          </span>

          <div class="mt-auto flex flex-wrap gap-1">
            {#each lesson.focus.slice(0, 6) as k, j (j)}
              <span
                class="grid h-7 min-w-7 place-items-center rounded-md border border-border/70 bg-card px-1 font-label text-[11px] font-bold uppercase text-foreground shadow-[0_1.5px_0_0_var(--color-surface-2)]"
              >
                {k}
              </span>
            {/each}
            {#if lesson.focus.length > 6}
              <span class="grid h-7 min-w-7 place-items-center rounded-md border border-border/70 bg-card px-1 font-label text-[11px] font-bold uppercase text-muted-foreground">
                +{lesson.focus.length - 6}
              </span>
            {/if}
          </div>
        </a>
      </li>
    {/each}
  </ol>
</section>