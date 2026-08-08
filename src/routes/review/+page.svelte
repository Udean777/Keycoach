<script lang="ts">
  // SRS review mode: practices the keys currently due for review using all
  // learned keys.
  import { onMount } from "svelte";
  import { compileStages } from "$lib/curriculum";
  import { generateWords } from "$lib/generate";
  import { dueKeys } from "$lib/srs/srs";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import TypingSession from "$lib/components/TypingSession.svelte";
  import { t, getLang } from "$lib/i18n";

  const lessons = compileStages();
  const allKeys = lessons[lessons.length - 1].keys;

  let due = $state<string[]>([]);
  let words = $state<string[]>([]);
  let started = $state(false);
  let finished = $state(false);

  function buildReview(): string[] {
    const lang = getLang();
    const reviewLesson = {
      id: "review",
      keys: allKeys,
      focus: allKeys,
      mode: "drill" as const,
      count: 20,
    };
    return generateWords({ lesson: reviewLesson, lang, srs: srs.states });
  }

  async function init() {
    await progress.load();
    await srs.load(getLang());
    const now = Date.now();
    const dueList = dueKeys(srs.states, allKeys, now).map((s) => s.key);
    due = dueList;
    if (dueList.length > 0) {
      words = buildReview();
      started = true;
    }
  }

  function replay() {
    finished = false;
    words = buildReview();
  }

  onMount(init);
</script>

<!-- Hallmark · genre: modern-minimal · macrostructure: Workbench · design-system: design.md · designed-as-app -->
<div class="mx-auto w-full max-w-4xl px-4 py-14">
  <div class="mb-10 flex flex-col gap-1.5">
    <h1 class="text-2xl font-black tracking-[-0.03em]">{t().review.title}</h1>
    <p class="text-sm text-[var(--color-muted)]">{t().review.subtitle}</p>
  </div>

  {#if !started && !finished}
    <div
      class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-sm text-[var(--color-muted)]"
    >
      <p>{t().review.nothing}</p>
      <a href="/" class="mt-4 inline-block text-[var(--color-accent)]"
        >← {t().review.back}</a
      >
    </div>
  {:else if finished}
    <div
      class="mx-auto max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center"
    >
      <div class="text-4xl text-[var(--color-correct)]">✓</div>
      <h2 class="mt-3 text-xl font-black tracking-[-0.03em]">
        {t().review.done}
      </h2>
      <div class="mt-6 flex justify-center gap-3">
        <button
          onclick={replay}
          class="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
        >
          {t().lesson.again}
        </button>
        <a
          href="/"
          class="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-bold text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent-strong)]"
        >
          {t().review.back}
        </a>
      </div>
    </div>
  {:else if due.length > 0}
    <div class="flex flex-col gap-6">
      <TypingSession
        {words}
        focusKeys={due}
        learnedKeys={allKeys}
        boxed
        onComplete={() => {
          finished = true;
        }}
      />
    </div>
  {/if}
</div>