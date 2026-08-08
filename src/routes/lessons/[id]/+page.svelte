<script lang="ts">
  import { page } from "$app/state";
  import { compileStages } from "$lib/curriculum";
  import { generateWords } from "$lib/generate";
  import { computeStats, type TypingState } from "$lib/engine/typing";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import TypingSession from "$lib/components/TypingSession.svelte";
  import { t, getLang } from "$lib/i18n";
  import type { LessonMode } from "$lib/curriculum";

  const lessons = compileStages();
  const order = lessons.map((l) => l.id);
  const lesson = $derived(
    lessons.find((l) => l.id === page.params.id) ?? lessons[0],
  );
  const idx = $derived(order.indexOf(lesson.id));
  const nextLesson = $derived(
    idx + 1 < order.length ? lessons[idx + 1] : null,
  );

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

  async function onComplete(res: { state: TypingState; errorsByKey: Record<string, number> }) {
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
  <div class="mb-8 flex flex-col gap-1.5">
    <a
      href="/lessons"
      class="w-fit text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
      >← {t().lesson.back}</a
    >
    <div class="mt-2 flex items-end justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-black tracking-[-0.03em]">{lesson.id}</h1>
        <p class="text-xs text-[var(--color-muted)]">{lesson.keys.join(" · ")}</p>
      </div>
      <span
        class="shrink-0 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]"
        >{lesson.mode}</span
      >
    </div>
  </div>

  {#if finished && result}
    <section
      class="mx-auto max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center"
    >
      <div class="text-4xl">
        {"★".repeat(result.stars)}{"☆".repeat(3 - result.stars)}
      </div>
      <h2 class="mt-3 text-xl font-black tracking-[-0.03em]">{t().lesson.done}</h2>
      <div class="mt-6 flex justify-center gap-12">
        <div>
          <p class="text-3xl font-black tabular-nums">{result.wpm}</p>
          <p class="text-xs text-[var(--color-muted)] uppercase">
            {t().results.wpm}
          </p>
        </div>
        <div>
          <p class="text-3xl font-black tabular-nums">{result.accuracy}%</p>
          <p class="text-xs text-[var(--color-muted)] uppercase">
            {t().results.accuracy}
          </p>
        </div>
      </div>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="/"
          class="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
        >
          {t().nav.home}
        </a>
        <button
          onclick={replay}
          class="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
        >
          {t().lesson.again}
        </button>
        {#if nextLesson}
          <a
            href={`/lessons/${nextLesson.id}`}
            class="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-bold text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            {t().lesson.next} →
          </a>
        {:else}
          <a
            href="/lessons"
            class="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-bold text-[var(--color-bg)]"
            >{t().lesson.back}</a
          >
        {/if}
      </div>
    </section>
  {:else if started}
    <TypingSession
      {words}
focusKeys={lesson.focus}
      learnedKeys={lesson.keys}
      boxed={lesson.mode === "drill"}
      onComplete={onComplete}
    />
  {:else}
    <p class="text-sm text-[var(--color-muted)]">…</p>
  {/if}
</div>
