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
  import { t, getLang } from "$lib/i18n.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Button } from "$lib/components/ui/button";

  const lessons = compileStages();
  const allKeys = lessons[lessons.length - 1].keys;

  let due = $state<string[]>([]);
  let words = $state<string[]>([]);
  let started = $state(false);
  let finished = $state(false);
  let loaded = $state(false);

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
    loaded = true;
  }

  function replay() {
    finished = false;
    words = buildReview();
  }

  onMount(init);
</script>

<!-- Hallmark · genre: playful · macrostructure: Workbench · theme: Hum · design-system: design.md · designed-as-app -->
<div class="mx-auto w-full max-w-4xl px-4 py-14">
  <div class="mb-10 flex flex-col gap-1.5">
    <span class="mono-label">{t().review.eyebrow}</span>
    <h1 class="text-2xl font-bold tracking-[-0.02em]">{t().review.title}</h1>
    <p class="text-sm text-[var(--color-muted)]">{t().review.subtitle}</p>
  </div>

  {#if !loaded}
    <div class="mt-12 flex flex-col gap-4">
      <div class="flex justify-between px-4">
        <Skeleton class="h-4 w-16" />
        <Skeleton class="h-4 w-16" />
      </div>
      <div
        class="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col gap-2"
      >
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-[90%]" />
        <Skeleton class="h-4 w-[80%]" />
        <Skeleton class="h-4 w-[70%]" />
      </div>
    </div>
  {:else if !started && !finished}
    <div
      class="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-sm text-[var(--color-muted)]"
    >
      <p>{t().review.nothing}</p>
      <Button variant="link" href="/" class="mt-4 text-[var(--color-accent-2)]">
        ← {t().review.back}
      </Button>
    </div>
  {:else if finished}
    <div
      class="mx-auto max-w-lg rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[0_12px_32px_-16px_color-mix(in_oklch,var(--color-ink)_20%,transparent)]"
    >
      <div class="text-4xl text-[var(--color-mint)]">✓</div>
      <h2 class="mt-3 text-xl font-bold tracking-[-0.02em]">
        {t().review.done}
      </h2>
      <div class="mt-8 flex justify-center gap-3">
        <Button
          variant="outline"
          href="/"
          class="px-4 py-2"
        >
          {t().nav.home}
        </Button>
        <Button
          variant="outline"
          onclick={replay}
          class="px-4 py-2"
        >
          {t().lesson.again}
        </Button>
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
