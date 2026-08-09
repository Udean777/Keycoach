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
  import {
    Lock,
    ArrowRight,
    Brain,
    Trophy,
    Keyboard as KeyboardIcon,
    RefreshCcw,
  } from "lucide-svelte";
  import VirtualKeyboard from "$lib/components/Keyboard.svelte";
  import { reveal } from "$lib/actions/reveal";

  let loaded = $derived(progress.loaded);
  let dueCount = $state(0);
  let shownPct = $state(0);

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

  const tints = ["accent", "accent-2", "accent-3", "mint", "lavender"];
  function tint(i: number) {
    return `color-mix(in oklch, var(--color-${tints[i % tints.length]}) 7%, var(--color-surface))`;
  }

  $effect(() => {
    if (!loaded) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      shownPct = pct;
      return;
    }
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const step = (t: number) => {
      const e = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - e, 3);
      shownPct = Math.round(eased * pct);
      if (e < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });

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
    }
  });
</script>

{#if !loaded}
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-8 py-16">
    <div class="flex flex-col gap-3">
      <Skeleton class="h-4 w-32 rounded-full" />
      <Skeleton class="h-12 w-3/4" />
      <Skeleton class="h-5 w-1/3" />
    </div>
    <Skeleton class="h-72 w-full rounded-2xl" />
    <Skeleton class="h-24 w-full rounded-2xl" />
  </div>
{:else}
  <!-- Hallmark · genre: playful (arcade) · macrostructure: Split Studio · mood: premium
   * design-system: design.md · designed-as-app -->
  <div class="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-8">
    <!-- 01 · Hero — diptych: claim left, product right -->
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
            src="/logo.jpg"
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
              {shownPct}<span
                class="text-3xl font-bold text-[var(--color-muted)]">%</span
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

    <!-- 02 · How it works — three features, hairline-ruled list -->
    <section class="border-t border-[var(--color-border)] py-16 lg:py-20">
      <div class="flex flex-col gap-10">
        <div class="max-w-lg reveal-child" style="--i: 0">
          <span class="mono-label">{t().home.featureTagline}</span>
          <h2
            class="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[var(--color-ink)]"
          >
            {t().home.featureSectionTitle}
          </h2>
        </div>

        <div
          class="reveal flex flex-col divide-y divide-[var(--color-border)]"
          use:reveal
        >
          <div
            class="reveal-child grid gap-4 py-7 sm:grid-cols-[8rem_1fr_2.5fr] sm:gap-6"
            style="--i: 0"
          >
            <span
              class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
            >
              <KeyboardIcon class="h-5 w-5" />
            </span>
            <h3
              class="text-lg font-bold tracking-[-0.01em] text-[var(--color-ink)]"
            >
              {t().home.feature1Title}
            </h3>
            <p
              class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
            >
              {t().home.feature1Desc}
            </p>
          </div>

          <div
            class="reveal-child grid gap-4 py-7 sm:grid-cols-[8rem_1fr_2.5fr] sm:gap-6"
            style="--i: 1"
          >
            <span
              class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
            >
              <Brain class="h-5 w-5" />
            </span>
            <h3
              class="text-lg font-bold tracking-[-0.01em] text-[var(--color-ink)]"
            >
              {t().home.feature2Title}
            </h3>
            <p
              class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
            >
              {t().home.feature2Desc}
            </p>
          </div>

          <div
            class="reveal-child grid gap-4 py-7 sm:grid-cols-[8rem_1fr_2.5fr] sm:gap-6"
            style="--i: 2"
          >
            <span
              class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
            >
              <Trophy class="h-5 w-5" />
            </span>
            <h3
              class="text-lg font-bold tracking-[-0.01em] text-[var(--color-ink)]"
            >
              {t().home.feature3Title}
            </h3>
            <p
              class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
            >
              {t().home.feature3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 · Live keyboard — the product itself as proof -->
    <section class="border-t border-[var(--color-border)] py-16 lg:py-20">
      <div class="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
        <div class="reveal flex flex-col gap-3" use:reveal>
          <span class="mono-label">{t().home.interactiveCoach}</span>
          <h2
            class="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)]"
          >
            {t().home.subtitle}
          </h2>
          <p
            class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
          >
            {t().app.tagline}
          </p>
        </div>
        <div
          class="reveal rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-5 shadow-[0_12px_32px_-20px_color-mix(in_oklch,var(--color-ink)_20%,transparent)]"
          style="--i: 1"
          use:reveal
        >
          <span class="sr-only">{t().home.interactiveCoach}</span>
          <VirtualKeyboard
            focusKeys={["f", "j", "d", "k"]}
            learnedKeys={["a", "s", "d", "f", "j", "k", "l", ";"]}
            target="f"
          />
        </div>
      </div>
    </section>

    <!-- 04 · The path — the 13-stage curriculum -->
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
                  <span class="text-xs font-bold text-[var(--color-accent-3)]"
                    >{"★".repeat(p.stars)}</span
                  >
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

    <!-- 05 · Closing CTA -- one line, one action -->
    <section class="border-t border-[var(--color-border)] py-16 lg:py-24">
      <div
        class="reveal-stagger flex max-w-2xl flex-col items-start gap-5"
        use:reveal
      >
        <h2
          class="reveal-child text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[var(--color-ink)]"
          style="--i: 0"
        >
          {t().home.ctaTitle}
        </h2>
        <p
          class="reveal-child text-base text-[var(--color-muted)] font-medium"
          style="--i: 1"
        >
          {t().home.subtitle}
        </p>
        <span class="reveal-child" style="--i: 2">
          <Button
            href={next ? `/lessons/${next.id}` : "/lessons/L1-HOME-1"}
            size="lg"
            class="mt-2 px-8 py-3 text-sm shadow-[0_4px_16px_0_var(--color-accent-strong)]"
          >
            {t().home.ctaBtn}
            <ArrowRight class="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </span>
      </div>
    </section>
  </div>
{/if}
