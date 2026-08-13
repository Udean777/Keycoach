<script lang="ts">
  import { onMount } from "svelte";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { compileStages } from "$lib/core/curriculum";
  import { t } from "$lib/i18n/i18n.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { reveal } from "$lib/actions/reveal";
  import { Star } from "lucide-svelte";

  let loaded = $derived(progress.loaded);
  const lessons = compileStages();
  const order = lessons.map((l) => l.id);

  const tints = ["accent", "accent-2", "accent-3", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 8%, var(--card))`;
  }

  onMount(async () => {
    try {
      await progress.load();
    } catch (err) {
      console.error("Error initializing lessons page:", err);
    }
  });
</script>

{#if !loaded}
  <div class="mx-auto w-full max-w-3xl px-4 py-14">
    <div class="mb-10 flex flex-col gap-1.5">
      <Skeleton class="h-8 w-40" />
      <Skeleton class="h-4 w-64" />
    </div>
    <div class="flex flex-col gap-8">
      {#each { length: 3 } as _}
        <div class="flex flex-col gap-2">
          <Skeleton class="h-6 w-24 mb-2" />
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {#each { length: 5 } as _}
              <Skeleton class="h-12 w-full rounded-xl" />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <!-- Hallmark · genre: playful (arcade) · macrostructure: Index-First · theme: arcade · design-system: design.md · designed-as-app -->
  <div class="mx-auto w-full max-w-3xl px-4 py-14">
    <section class="reveal mb-10 flex flex-col gap-1.5" use:reveal>
      <span class="mono-label">{t().lessons.eyebrow}</span>
      <h1 class="text-2xl font-bold tracking-[-0.02em]">
        {t().lessons.title}
      </h1>
      <p class="text-sm text-muted-foreground">{t().lessons.subtitle}</p>
    </section>

    <div
      class="reveal-stagger grid grid-cols-1 gap-3 sm:grid-cols-2"
      use:reveal
    >
      {#each lessons as lesson, i (lesson.id)}
        {@const p = progress.get(lesson.id)}
        {@const unlocked = progress.isUnlocked(lesson.id, order)}
        {@const stars = p?.stars ?? 0}
        {@const accent = tints[i % tints.length]}
        <div class="reveal-child" style="--i: {i}">
          <a
            href={unlocked ? `/lessons/${lesson.id}` : undefined}
            class="group flex items-center gap-4 rounded-[12px] border border-border p-4 transition-[transform,border-color] duration-200 {unlocked
              ? 'hover:-translate-y-1 hover:border-[var(--primary)]/50'
              : 'cursor-not-allowed opacity-50'}"
            style={unlocked
              ? `background: ${tint(i)}; box-shadow: 0 8px 20px -12px color-mix(in oklch, var(--foreground) 25%, transparent);`
              : `background: color-mix(in oklch, var(--foreground) 3%, var(--card));`}
            aria-disabled={!unlocked}
          >
            <span
              class={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base font-bold transition-colors ${
                stars >= 1
                  ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                  : unlocked
                    ? `bg-[var(--color-${accent})]/15`
                    : "bg-secondary text-muted-foreground"
              }`}
              style={stars >= 1 || !unlocked
                ? undefined
                : `color: var(--color-${accent});`}
            >
              {#if stars >= 1}<span><Star class="h-5 w-5 fill-current" /></span
                >{:else}{String(i + 1).padStart(2, "0")}{/if}
            </span>
            <div class="flex min-w-0 flex-1 flex-col">
              <p class="font-bold leading-tight">{lesson.id}</p>
              <p class="text-xs text-muted-foreground capitalize">
                {lesson.mode}
              </p>
            </div>
            <div
              class="flex shrink-0 flex-col items-end gap-1 text-xs tabular-nums text-muted-foreground"
            >
              {#if stars > 0}
                <span class={`flex gap-0.5 text-[var(--color-${accent})]`}>
                  {#each Array(stars) as _}
                    <Star class="h-3.5 w-3.5 fill-current" />
                  {/each}
                </span>
                <span>{p?.bestWpm ?? 0} WPM · {p?.bestAccuracy ?? 0}%</span>
              {:else if !unlocked}
                <span>{t().lessons.locked}</span>
              {:else}
                <span>{t().lessons.completed}</span>
              {/if}
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
{/if}
