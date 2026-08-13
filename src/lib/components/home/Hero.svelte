<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Progress } from "$lib/components/ui/progress";
  import { ArrowRight, RefreshCcw, Star, Crown } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";
  import { progress } from "$lib/stores/progress.svelte.ts";
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

  /* real data only — scoreboard rounds the run's earned stars */
  const earnedStars = $derived(
    Object.values(progress.lessons).reduce((acc, p) => acc + (p?.stars ?? 0), 0),
  );
</script>

<section
  class="reveal grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 py-16 lg:py-24"
  use:reveal
>
  <div class="reveal-stagger flex min-w-0 flex-col items-start gap-6">
    <span class="mono-label flex items-center gap-2 reveal-child" style="--i: 0">
      <img
        src="/logo.webp"
        alt={t().app.name}
        class="h-6 w-6 rounded-full object-cover"
      />
      {t().home.heroBadge}
    </span>

    <h1
      class="reveal-child font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.04em] text-foreground [overflow-wrap:anywhere]"
      style="--i: 1"
    >
      {t().home.heroTitle}
    </h1>

    <p
      class="reveal-child max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground font-medium"
      style="--i: 2"
    >
      {t().app.tagline}
    </p>

    <div class="reveal-child mt-1 flex flex-col gap-3 sm:flex-row sm:items-center" style="--i: 3">
      <Button
        href={next ? `/lessons/${next.id}` : "/lessons/L1-HOME-1"}
        size="lg"
        class="justify-center px-7 py-3 text-sm shadow-[0_4px_16px_0_var(--color-primary)]"
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
    class="reveal overflow-hidden rounded-2xl border border-border bg-card shadow-[0_16px_40px_-20px_color-mix(in_oklch,var(--foreground)_20%,transparent)]"
    style="--i: 1"
    use:reveal
  >
    <div
      class="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5"
    >
      <span class="font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {t().home.overallProgress}
      </span>
      <span class="font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {doneCount}/{total} {t().home.lesson}
      </span>
    </div>

    <div class="p-5 sm:p-7">
      <div class="flex items-end gap-3">
        <span
          class="font-display text-6xl sm:text-7xl font-bold leading-none tabular-nums tracking-[-0.04em] text-foreground"
        >
          {shownPct}<span class="text-3xl font-bold text-muted-foreground">%</span>
        </span>
        <span
          class="mb-1 ml-auto hidden items-center gap-1 rounded-full border border-[var(--color-accent-2)]/30 bg-card px-2.5 py-1 sm:flex"
        >
          <Star class="h-3.5 w-3.5 fill-[var(--color-accent-2)] text-[var(--color-accent-2)]" />
          <span class="font-label text-xs font-bold text-foreground">{earnedStars}</span>
        </span>
      </div>
      <p class="mt-3 text-sm font-medium text-muted-foreground">
        {doneCount === total ? t().home.allDone : t().home.keepPracticing}
      </p>
      <Progress value={shownPct} class="mt-5 h-2 w-full rounded-full bg-secondary" />
    </div>

    <div class="divide-y divide-[var(--border)] border-t border-[var(--border)]">
      <div class="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
        <span
          class="flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
        >
          <Star class="h-3.5 w-3.5 text-[var(--color-accent-2)]" />
          {t().results.stars}
        </span>
        <span class="font-label text-sm font-bold text-foreground tabular-nums">
          {earnedStars}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
        <span
          class="flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
        >
          <Crown class="h-3.5 w-3.5 text-[var(--color-primary)]" />
          {t().lessons.eyebrow}
        </span>
        <span class="font-label text-sm font-bold text-foreground tabular-nums">
          {next?.id ?? "—"}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
        <span
          class="flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
        >
          <RefreshCcw class="h-3.5 w-3.5 text-[var(--color-accent-3)]" />
          {t().home.dueReviews}
        </span>
        <span class="font-label text-sm font-bold text-foreground tabular-nums">
          {dueCount}
        </span>
      </div>
    </div>
  </div>
</section>