<script lang="ts">
  import { onMount } from "svelte";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { compileStages } from "$lib/curriculum";
  import { dueKeys } from "$lib/srs/srs";
  import { t, getLang } from "$lib/i18n.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Progress } from "$lib/components/ui/progress";
  import { Button } from "$lib/components/ui/button";
  import { Lock } from "lucide-svelte";

  let loaded = $state(false);
  let dueCount = $state(0);

  const lessons = compileStages();
  const total = lessons.length;
  const unlocked = $derived(
    lessons.filter((l) =>
      progress.isUnlocked(
        l.id,
        lessons.map((x) => x.id),
      ),
    ),
  );
  const doneCount = $derived(
    Object.values(progress.lessons).filter((p) => (p.stars ?? 0) >= 1).length,
  );
  const pct = $derived(total === 0 ? 0 : Math.round((doneCount / total) * 100));
  const next = $derived(
    lessons.find(
      (l) =>
        progress.isUnlocked(
          l.id,
          lessons.map((x) => x.id),
        ) && (progress.get(l.id)?.stars ?? 0) < 1,
    ),
  );

  // colour-shift grid: each lesson card owns one Hum accent tint that deepens
  // on hover so the board reads multi-coloured, never one flat grey row.
  const tints = ["accent", "accent-2", "accent-3", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 8%, var(--color-surface))`;
  }

  onMount(async () => {
    try {
      await progress.load();
      const lang = getLang();
      await srs.load(lang);
      const due = dueKeys(
        srs.states,
        lessons[lessons.length - 1]?.keys ?? [],
        Date.now(),
      );
      dueCount = due.length;
    } catch (err) {
      console.error("Error initializing homepage:", err);
    } finally {
      loaded = true;
    }
  });
</script>

{#if !loaded}
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-14">
    <div class="flex flex-col gap-4">
      <Skeleton class="h-6 w-32" />
      <Skeleton class="h-4 w-48" />
    </div>
    <Skeleton class="h-40 w-full" />
    <div class="grid gap-4 sm:grid-cols-2">
      <Skeleton class="h-24 w-full" />
      <Skeleton class="h-24 w-full" />
    </div>
  </div>
{:else}
  <!-- Hallmark · genre: playful · macrostructure: Stat-Led · theme: Hum · design-system: design.md · designed-as-app -->
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-14">
    <section class="flex flex-col gap-4">
      <span class="mono-label">{t().home.overallProgress}</span>
      <div class="flex items-end gap-5">
        <span
          class="text-[4rem] font-bold leading-none tabular-nums sm:text-[5rem]"
          >{pct}<span class="text-[var(--color-muted)]">%</span></span
        >
        <div class="flex flex-col gap-1 pb-1">
          <h1 class="text-xl font-bold leading-tight">{t().home.subtitle}</h1>
          <p class="text-sm text-[var(--color-muted)]">
            {doneCount} / {total}
            {t().home.lesson.toLowerCase()}
          </p>
        </div>
      </div>
      <Progress value={pct} class="h-3 w-full rounded-full bg-[var(--color-surface)]" />

      <div class="flex flex-wrap items-center gap-3">
        {#if next}
          <Button
            href={`/lessons/${next.id}`}
            class="px-5 py-2.5"
          >
            {t().home.continue} → {next.id}
          </Button>
        {:else}
          <p class="text-sm font-semibold text-[var(--color-mint)]">✓</p>
        {/if}
        {#if dueCount > 0}
          <Button
            variant="outline"
            href="/review"
            class="px-4 py-2 text-[var(--color-accent-2)]"
          >
            {dueCount}
            {t().home.dueReviews.toLowerCase()} →
          </Button>
        {/if}
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <span class="mono-label">{t().nav.lessons}</span>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {#each lessons as lesson, i (lesson.id)}
          {@const p = progress.get(lesson.id)}
          {@const open = progress.isUnlocked(
            lesson.id,
            lessons.map((x) => x.id),
          )}
          <a
            href={open ? `/lessons/${lesson.id}` : undefined}
            class="group flex min-h-24 flex-col justify-between rounded-[20px] p-4 transition-all duration-200 {open
              ? `border border-[var(--color-border)] hover:-translate-y-1 hover:border-[var(--color-accent-2)]/50`
              : 'cursor-not-allowed border border-[var(--color-border)]/40 opacity-50'}"
            style={open
              ? `background: ${tint(i)}; box-shadow: 0 8px 20px -12px color-mix(in oklch, var(--color-ink) 25%, transparent);`
              : undefined}
            aria-disabled={!open}
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold">{lesson.id}</span>
              {#if p?.stars}
                <span class="text-xs text-[var(--color-accent-3)]"
                  >{"★".repeat(p.stars)}</span
                >
              {:else if !open}
                <span class="text-xs">
                  <Lock class="h-3.5 w-3.5" />
                </span>
              {/if}
            </div>
            <p
              class="mt-6 text-[11px] font-medium capitalize text-[var(--color-ink-2)]"
              style={open ? `color: color-mix(in oklch, var(--color-ink) 80%, var(--color-${tints[i % tints.length]}));` : undefined}
            >
              {lesson.mode}
            </p>
          </a>
        {/each}
      </div>
    </section>
  </div>
{/if}