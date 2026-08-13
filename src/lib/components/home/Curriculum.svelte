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

  const tints = ["accent", "accent-2", "accent-3", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 7%, var(--color-surface))`;
  }
</script>

<section class="border-t border-[var(--color-border)] py-16 lg:py-20">
  <div class="mb-8 flex items-baseline justify-between gap-4">
    <h2
      class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[var(--color-ink)]"
    >
      {t().nav.lessons}
    </h2>
    <span
      class="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]"
    >
      {unlocked.length}
      {t().lessons.completed.toLowerCase()}
    </span>
  </div>

  <div
    class="reveal-stagger grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3"
    use:reveal
  >
    {#each lessons as lesson, i (lesson.id)}
      {@const p = progress.get(lesson.id)}
      {@const open = progress.isUnlocked(
        lesson.id,
        lessons.map((x) => x.id),
      )}
      <div class="reveal-child" style="--i: {i}">
        <a
          href={open ? `/lessons/${lesson.id}` : undefined}
          class="group flex min-h-[120px] flex-col justify-between rounded-2xl border p-4.5 transition-[transform,border-color] duration-200 {open
            ? 'border-[var(--color-border)] hover:-translate-y-1 hover:border-[var(--color-accent)]/50'
            : 'cursor-not-allowed border-[var(--color-border)]/40 opacity-45'}"
          style={open ? `background: ${tint(i)}` : undefined}
          aria-disabled={!open}
        >
          <div class="flex items-center justify-between">
            <span
              class="text-sm font-bold tracking-tight text-[var(--color-ink)]"
              >{lesson.id}</span
            >
            {#if p?.stars}
              <span class="flex gap-0.5 text-[var(--color-accent-3)]">
                {#each Array(p.stars) as _}
                  <Star class="h-3.5 w-3.5 fill-current" />
                {/each}
              </span>
            {:else if !open}
              <span class="text-xs text-[var(--color-muted)]">
                <Lock class="h-3.5 w-3.5" />
              </span>
            {/if}
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span
              class="text-[11px] font-bold capitalize text-[var(--color-ink-2)]"
            >
              {lesson.mode}
            </span>
            {#if open}
              <ArrowRight
                class="h-3.5 w-3.5 opacity-0 -translate-x-1 text-[var(--color-ink)] transition-[opacity,transform] group-hover:opacity-100 group-hover:translate-x-0"
              />
            {/if}
          </div>
        </a>
      </div>
    {/each}
  </div>
</section>
