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
  import { Badge } from "$lib/components/ui/badge";

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
    <!-- Header skeleton -->
    <div class="flex flex-col gap-4">
      <Skeleton class="h-6 w-32" />
      <Skeleton class="h-4 w-48" />
    </div>

    <!-- Progress card skeleton -->
    <Skeleton class="h-40 w-full" />

    <!-- Modules skeleton -->
    <div class="grid gap-4 sm:grid-cols-2">
      <Skeleton class="h-24 w-full" />
      <Skeleton class="h-24 w-full" />
    </div>
  </div>
{:else}
  <!-- Hallmark · genre: modern-minimal · macrostructure: Stat-Led · design-system: design.md · designed-as-app -->
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-14">
    <section class="flex flex-col gap-4">
      <Badge
        variant="outline"
        class="w-fit text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)] border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10"
      >
        {t().home.overallProgress}
      </Badge>
      <div class="flex items-end gap-5">
        <span
          class="text-[4rem] font-black leading-none tabular-nums sm:text-[5rem]"
          >{pct}
          <span class="text-[var(--color-muted)]">%</span></span
        >
        <div class="flex flex-col gap-1 pb-1">
          <h1 class="text-xl font-bold leading-tight">{t().home.subtitle}</h1>
          <p class="text-sm text-[var(--color-muted)]">
            {doneCount} / {total}
            {t().home.lesson.toLowerCase()}
          </p>
        </div>
      </div>
      <Progress value={pct} class="h-1.5 w-full bg-[var(--color-surface)]" />

      <div class="flex flex-wrap items-center gap-3">
        {#if next}
          <Button
            href={`/lessons/${next.id}`}
            class="rounded-xl px-4 py-2.5 font-bold"
          >
            {t().home.continue} → {next.id}
          </Button>
        {:else}
          <p class="text-sm font-semibold text-[var(--color-correct)]">✓</p>
        {/if}
        {#if dueCount > 0}
          <Button
            variant="outline"
            href="/review"
            class="rounded-xl border-[var(--color-accent)]/40 px-4 py-2 font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
          >
            {dueCount}
            {t().home.dueReviews.toLowerCase()} →
          </Button>
        {/if}
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <span
        class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]"
      >
        {t().nav.lessons}
      </span>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {#each lessons as lesson (lesson.id)}
          {@const p = progress.get(lesson.id)}
          {@const open = progress.isUnlocked(
            lesson.id,
            lessons.map((x) => x.id),
          )}
          <a
            href={open ? `/lessons/${lesson.id}` : undefined}
            class="group flex flex-col justify-between rounded-xl border p-4 transition-colors {open
              ? 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/60'
              : 'cursor-not-allowed border-[var(--color-border)]/40 bg-[var(--color-surface)]/40 opacity-50'}"
            aria-disabled={!open}
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold">{lesson.id}</span>
              {#if p?.stars}
                <span class="text-xs text-[var(--color-accent)]"
                  >{"★".repeat(p.stars)}</span
                >
              {:else if !open}
                <span class="text-xs text-[var(--color-muted)]">🔒</span>
              {/if}
            </div>
            <p
              class="mt-6 text-[11px] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink-2)]"
            >
              {lesson.mode}
            </p>
          </a>
        {/each}
      </div>
    </section>
  </div>
{/if}
