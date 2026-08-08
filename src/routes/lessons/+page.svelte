<script lang="ts">
  import { onMount } from "svelte";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { compileStages } from "$lib/curriculum";
  import { t } from "$lib/i18n.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";

  let loaded = $state(false);
  const lessons = compileStages();
  const order = lessons.map((l) => l.id);

  onMount(async () => {
    try {
      await progress.load();
    } catch (err) {
      console.error("Error initializing lessons page:", err);
    } finally {
      loaded = true;
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
  <!-- Hallmark · genre: modern-minimal · macrostructure: Index-First · design-system: design.md · designed-as-app -->
  <div class="mx-auto w-full max-w-3xl px-4 py-14">
    <section class="mb-10 flex flex-col gap-1.5">
      <h1 class="text-2xl font-black tracking-[-0.03em]">
        {t().lessons.title}
      </h1>
      <p class="text-sm text-[var(--color-muted)]">{t().lessons.subtitle}</p>
    </section>

    <div class="flex flex-col">
      {#each lessons as lesson, i (lesson.id)}
        {@const p = progress.get(lesson.id)}
        {@const unlocked = progress.isUnlocked(lesson.id, order)}
        {@const stars = p?.stars ?? 0}
        <a
          href={unlocked ? `/lessons/${lesson.id}` : undefined}
          class="group flex items-center justify-between gap-4 border-b border-[var(--color-border)] py-4 transition-colors aria-disabled:opacity-50 {unlocked
            ? 'hover:bg-[var(--color-surface)]/50'
            : 'cursor-not-allowed opacity-50'}"
          aria-disabled={!unlocked}
        >
          <div class="flex items-center gap-4">
            <span
              class="w-8 shrink-0 text-[11px] font-semibold tabular-nums text-[var(--color-muted)]"
              >{String(i + 1).padStart(2, "0")}</span
            >
            <span
              class="grid h-8 w-8 shrink-0 place-items-center rounded-md border text-sm {stars >=
              1
                ? 'border-[var(--color-correct)]/40 bg-[var(--color-correct)]/10 text-[var(--color-correct)]'
                : unlocked
                  ? 'border-[var(--color-accent)]/40 text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-muted)]'}"
            >
              {#if stars >= 1}<span>★</span>{:else}{String(i + 1).padStart(
                  2,
                  "0",
                )}{/if}
            </span>
            <div class="flex flex-col">
              <p class="font-bold leading-tight">{lesson.id}</p>
              <p class="text-xs text-[var(--color-muted)] capitalize">
                {lesson.mode}
              </p>
            </div>
          </div>
          <div
            class="flex items-center gap-4 text-xs tabular-nums text-[var(--color-muted)]"
          >
            {#if stars > 0}
              <span class="text-[var(--color-accent)]">{"★".repeat(stars)}</span
              >
              <span>{p?.bestWpm ?? 0} WPM · {p?.bestAccuracy ?? 0}%</span>
            {:else if !unlocked}
              <span>{t().lessons.locked}</span>
            {:else}
              <span class="text-[var(--color-muted)]"
                >{t().lessons.completed}</span
              >
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}
