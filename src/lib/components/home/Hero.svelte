<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Progress } from "$lib/components/ui/progress";
  import { ArrowRight, RefreshCcw } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";
  import type { CompiledLesson } from "$lib/core/curriculum";

  let {
    next,
    dueCount,
    total,
    doneCount,
    shownPct,
  }: {
    next: CompiledLesson | undefined;
    dueCount: number;
    total: number;
    doneCount: number;
    shownPct: number;
  } = $props();
</script>

<section
  class="reveal grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 py-16 lg:py-24"
  use:reveal
>
  <div class="reveal-stagger flex min-w-0 flex-col items-start gap-6">
    <span
      class="mono-label flex items-center gap-2 reveal-child"
      style="--i: 0"
    >
      <img
        src="/logo.webp"
        alt={t().app.name}
        class="h-6 w-6 rounded-full object-cover"
      />
      {t().home.heroBadge}
    </span>

    <h1
      class="reveal-child text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--color-ink)] [overflow-wrap:anywhere]"
      style="--i: 1"
    >
      {t().home.heroTitle}
    </h1>

    <p
      class="reveal-child max-w-md text-base sm:text-lg leading-relaxed text-[var(--color-muted)] font-medium"
      style="--i: 2"
    >
      {t().app.tagline}
    </p>

    <div
      class="reveal-child mt-1 flex flex-col gap-3 sm:flex-row sm:items-center"
      style="--i: 3"
    >
      <Button
        href={next ? `/lessons/${next.id}` : "/lessons/L1-HOME-1"}
        size="lg"
        class="justify-center px-7 py-3 text-sm shadow-[0_4px_16px_0_var(--color-accent-strong)]"
      >
        {#if next}
          {t().home.continue} ({next.id})
        {:else}
          {t().home.start}
        {/if}
        <ArrowRight class="ml-2 h-4 w-4 shrink-0" />
      </Button>
      {#if dueCount > 0}
        <Button
          variant="outline"
          href="/review"
          size="lg"
          class="justify-center px-6 py-3 text-sm"
        >
          <RefreshCcw class="mr-2 h-4 w-4 shrink-0" />
          {dueCount}
          {t().home.dueReviews.toLowerCase()}
        </Button>
      {/if}
    </div>
  </div>

  <div
    class="reveal flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_16px_40px_-20px_color-mix(in_oklch,var(--color-ink)_20%,transparent)]"
    style="--i: 1"
    use:reveal
  >
    <div
      class="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-3.5"
    >
      <span
        class="font-label text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-2)]"
      >
        {t().home.overallProgress}
      </span>
      <span
        class="font-label text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]"
      >
        {doneCount} / {total}
        {t().home.lesson.toLowerCase()}
      </span>
    </div>
    <div class="p-5 sm:p-7">
      <div class="flex items-end gap-3">
        <span
          class="text-6xl sm:text-7xl font-extrabold leading-none tabular-nums tracking-[-0.04em] text-[var(--color-ink)]"
        >
          {shownPct}<span class="text-3xl font-bold text-[var(--color-muted)]"
            >%</span
          >
        </span>
      </div>
      <p class="mt-3 text-sm font-medium text-[var(--color-muted)]">
        {doneCount === total ? t().home.allDone : t().home.keepPracticing}
      </p>
      <Progress
        value={shownPct}
        class="mt-5 h-1.5 w-full rounded-full bg-[var(--color-surface-2)]"
      />
    </div>
  </div>
</section>
