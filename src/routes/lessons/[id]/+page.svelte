<script lang="ts">
  import { page } from "$app/state";
  import { compileStages } from "$lib/curriculum";
  import { generateWords } from "$lib/generate";
  import { computeStats, type TypingState } from "$lib/engine/typing";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import TypingSession from "$lib/components/TypingSession.svelte";
  import { t, getLang } from "$lib/i18n.svelte";
  import type { LessonMode } from "$lib/curriculum";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { reveal } from "$lib/actions/reveal";
  import { Star } from "lucide-svelte";

  const lessons = compileStages();
  const order = lessons.map((l) => l.id);
  const lesson = $derived(
    lessons.find((l) => l.id === page.params.id) ?? lessons[0],
  );
  const idx = $derived(order.indexOf(lesson.id));
  const nextLesson = $derived(idx + 1 < order.length ? lessons[idx + 1] : null);

  let words = $state<string[]>([]);
  let started = $state(false);
  let finished = $state(false);
  let result = $state<{ wpm: number; accuracy: number; stars: number } | null>(
    null,
  );

  function computeStars(
    wpm: number,
    accuracy: number,
    mode: LessonMode,
  ): number {
    const targetWpm = mode === "drill" ? 25 : 20;
    if (accuracy >= 95 && wpm >= targetWpm) return 3;
    if (accuracy >= 80) return 2;
    return 1;
  }

  function buildSession(): string[] {
    const lang = getLang();
    return generateWords({ lesson, lang, srs: srs.states });
  }

  async function init() {
    await progress.load();
    await srs.load(getLang());
    srs.ensure(lesson.keys);
    words = buildSession();
    started = true;
  }

  async function onComplete(res: {
    state: TypingState;
    errorsByKey: Record<string, number>;
  }) {
    const wpm = computeStats(res.state).wpm;
    const accuracy = computeStats(res.state).accuracy;
    const stars = computeStars(wpm, accuracy, lesson.mode);
    result = { wpm, accuracy, stars };
    const prev = progress.get(lesson.id);
    await progress.save(lesson.id, {
      lessonId: lesson.id,
      stars: Math.max(stars, prev?.stars ?? 0),
      bestWpm: Math.max(wpm, prev?.bestWpm ?? 0),
      bestAccuracy: Math.max(accuracy, prev?.bestAccuracy ?? 0),
      completedAt: Date.now(),
    });
    finished = true;
  }

  function replay() {
    finished = false;
    result = null;
    words = buildSession();
  }

  // navigate between /lessons/a → /lessons/b reuses the same component
  // instance; reset the session whenever the route param actually changes
  $effect(() => {
    void lesson.id;
    finished = false;
    result = null;
    started = false;
    void init();
  });
</script>

<div class="mx-auto w-full max-w-4xl px-4 py-12">
  <!-- Hallmark · genre: playful (arcade) · macrostructure: Workbench · theme: arcade · design-system: design.md · designed-as-app -->
  <div class="mb-8 flex flex-col gap-1.5">
    <span class="reveal block w-fit" use:reveal>
      <Button
        variant="link"
        href="/lessons"
        class="w-fit h-auto p-0 text-xs text-[var(--color-muted)] hover:text-[var(--color-accent-2)]"
      >
        ← {t().lesson.back}
      </Button>
    </span>
    <div class="reveal mt-2 flex items-end justify-between gap-4" style="--i: 1" use:reveal>
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold tracking-[-0.02em]">{lesson.id}</h1>
        <p class="font-label font-medium text-xs text-[var(--color-muted)]">
          {lesson.keys.join(" · ")}
        </p>
      </div>
      <Badge
        variant="outline"
        class="shrink-0 rounded-full border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 font-label text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-2)]"
      >
        {lesson.mode}
      </Badge>
    </div>
  </div>

  {#if finished && result}
    <section
      class="animate-result-in relative mx-auto max-w-lg rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8 text-center shadow-[0_16px_40px_-12px_color-mix(in_oklch,var(--color-ink)_15%,transparent)]"
    >
      <div class="mb-4 flex justify-center text-[var(--color-accent-3)] drop-shadow-sm">
        {#each { length: result.stars } as _, i}
          <span class="animate-star-pop" style="--reveal-delay: {i * 160}ms">
            <Star class="h-10 w-10 fill-current" />
          </span>
        {/each}
        {#each { length: 3 - result.stars } as _}
          <Star class="h-10 w-10 opacity-20" />
        {/each}
      </div>
      <h2 class="text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
        {t().lesson.done}
      </h2>
      
      <div class="mt-8 flex justify-center gap-4">
        <div class="animate-result-in flex-1 rounded-[10px] bg-[var(--color-bg)] py-4 border border-[var(--color-border)] shadow-sm" style="animation-delay: 180ms">
          <p class="text-3xl font-bold tabular-nums text-[var(--color-ink)]">{result.wpm}</p>
          <p class="font-label mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
            {t().results.wpm}
          </p>
        </div>
        <div class="animate-result-in flex-1 rounded-[10px] bg-[var(--color-bg)] py-4 border border-[var(--color-border)] shadow-sm" style="animation-delay: 260ms">
          <p class="text-3xl font-bold tabular-nums text-[var(--color-ink)]">{result.accuracy}%</p>
          <p class="font-label mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
            {t().results.accuracy}
          </p>
        </div>
      </div>

      <div class="animate-result-in mt-6 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg)] p-5 shadow-sm text-left" style="animation-delay: 340ms">
        <p class="font-label mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
          {t().results.objectives}
        </p>
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="grid h-5 w-5 shrink-0 place-items-center rounded-full {result.accuracy >= 80 ? 'bg-[var(--color-accent)] text-[var(--color-ink)] shadow-[0_2px_0_0_var(--color-accent-strong)]' : 'bg-[var(--color-surface-2)] text-[var(--color-muted)]'}">
              {#if result.accuracy >= 80}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {/if}
            </div>
            <span class="text-sm font-bold {result.accuracy >= 80 ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}">{t().results.objAcc80}</span>
          </div>

          <div class="flex items-center gap-3">
            <div class="grid h-5 w-5 shrink-0 place-items-center rounded-full {result.accuracy >= 95 ? 'bg-[var(--color-accent)] text-[var(--color-ink)] shadow-[0_2px_0_0_var(--color-accent-strong)]' : 'bg-[var(--color-surface-2)] text-[var(--color-muted)]'}">
              {#if result.accuracy >= 95}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {/if}
            </div>
            <span class="text-sm font-bold {result.accuracy >= 95 ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}">{t().results.objAcc95}</span>
          </div>

          <div class="flex items-center gap-3">
            <div class="grid h-5 w-5 shrink-0 place-items-center rounded-full {result.wpm >= (lesson.mode === 'drill' ? 25 : 20) ? 'bg-[var(--color-accent)] text-[var(--color-ink)] shadow-[0_2px_0_0_var(--color-accent-strong)]' : 'bg-[var(--color-surface-2)] text-[var(--color-muted)]'}">
              {#if result.wpm >= (lesson.mode === 'drill' ? 25 : 20)}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {/if}
            </div>
            <span class="text-sm font-bold {result.wpm >= (lesson.mode === 'drill' ? 25 : 20) ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}">
              {t().results.objWpm.replace('{wpm}', lesson.mode === 'drill' ? '25' : '20')}
            </span>
          </div>
        </div>
      </div>

      <div class="animate-result-in mt-8 flex flex-wrap justify-center gap-3" style="animation-delay: 480ms">
        <Button
          variant="outline"
          href="/"
          class="px-4 py-2 text-[var(--color-muted)]"
        >
          {t().nav.home}
        </Button>
        <Button
          variant="outline"
          onclick={replay}
          class="px-4 py-2 text-[var(--color-muted)]"
        >
          {t().lesson.again}
        </Button>
        {#if nextLesson}
          <Button
            href={`/lessons/${nextLesson.id}`}
            class="px-4 py-2"
          >
            {t().lesson.next} →
          </Button>
        {:else}
          <Button
            href="/lessons"
            class="px-4 py-2"
          >
            {t().lesson.back}
          </Button>
        {/if}
      </div>
    </section>
  {:else if started}
    <TypingSession
      {words}
      focusKeys={lesson.focus}
      learnedKeys={lesson.keys}
      boxed={lesson.mode === "drill"}
      {onComplete}
    />
  {:else}
    <div class="mt-12 flex flex-col gap-4">
      <div class="flex justify-between px-4">
        <Skeleton class="h-4 w-16" />
        <Skeleton class="h-4 w-16" />
      </div>
      <div
        class="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col gap-2"
      >
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-[90%]" />
        <Skeleton class="h-4 w-[80%]" />
        <Skeleton class="h-4 w-[70%]" />
      </div>
    </div>
  {/if}
</div>
