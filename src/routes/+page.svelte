<script lang="ts">
  import { onMount } from "svelte";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { compileStages } from "$lib/curriculum";
  import { dueKeys } from "$lib/srs/srs";
  import { t, getLang } from "$lib/i18n";

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
  <div
    class="mx-auto flex max-w-4xl items-center justify-center px-4 py-32 text-sm text-[var(--color-muted)]"
  >
    …
  </div>
{:else}
  <!-- Hallmark · genre: modern-minimal · macrostructure: Stat-Led · design-system: design.md · designed-as-app -->
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-14">
    <section class="flex flex-col gap-4">
      <span
        class="w-fit rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]"
        >{t().home.overallProgress}</span
      >
      <div class="flex items-end gap-5">
        <span class="text-[4rem] font-black leading-none tabular-nums sm:text-[5rem]">{pct}
          <span class="text-[var(--color-muted)]">%</span></span
        >
        <div class="flex flex-col gap-1 pb-1">
          <h1 class="text-xl font-bold leading-tight">{t().home.subtitle}</h1>
          <p class="text-sm text-[var(--color-muted)]">
            {doneCount} / {total} {t().home.lesson.toLowerCase()}
          </p>
        </div>
      </div>
      <div
        class="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]"
      >
        <div
          class="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-500"
          style="width: {pct}%"
        ></div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        {#if next}
          <a
            href={`/lessons/${next.id}`}
            class="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            {t().home.continue} → {next.id}
          </a>
        {:else}
          <p class="text-sm font-semibold text-[var(--color-correct)]">✓</p>
        {/if}
        {#if dueCount > 0}
          <a
            href="/review"
            class="inline-flex items-center gap-2 rounded-xl border border-[var(--color-accent)]/40 px-4 py-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
          >
            {dueCount} {t().home.dueReviews.toLowerCase()} →
          </a>
        {/if}
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
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