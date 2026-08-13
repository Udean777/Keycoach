<script lang="ts">
  // SRS review mode: practices the keys currently due for review using all
  // learned keys.
  import { onMount } from "svelte";
  import { Check } from "lucide-svelte";
  import { compileStages } from "$lib/core/curriculum";
  import { generateWords } from "$lib/core/generate";
  import { dueKeys } from "$lib/srs/srs";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import TypingSession from "$lib/components/TypingSession.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import { t, getLang } from "$lib/i18n/i18n.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Button } from "$lib/components/ui/button";
  import { reveal } from "$lib/actions/reveal";

  const lessons = compileStages();
  const allKeys = lessons[lessons.length - 1].keys;

  let due = $state<string[]>([]);
  let words = $state<string[]>([]);
  let started = $state(false);
  let finished = $state(false);
  let loaded = $derived(progress.loaded);

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

<!-- Hallmark · genre: playful (arcade) · macrostructure: Workbench · theme: arcade · design-system: design.md · designed-as-app -->
<div class="mx-auto w-full max-w-4xl px-4 py-14">
  <div class="reveal mb-10 flex flex-col gap-1.5" use:reveal>
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
        class="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col gap-2"
      >
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-[90%]" />
        <Skeleton class="h-4 w-[80%]" />
        <Skeleton class="h-4 w-[70%]" />
      </div>
    </div>
  {:else if !started && !finished}
    <div
      class="reveal flex flex-col gap-8 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-sm text-[var(--color-muted)]"
      use:reveal
    >
      <div class="flex flex-col gap-2 mb-4">
        <h3 class="text-lg font-bold text-[var(--color-ink)]">Heatmap Stats</h3>
        <p class="text-xs">
          <span class="inline-block w-3 h-3 bg-[var(--color-mint)]/20 border border-[var(--color-mint)] rounded-sm mr-1"></span> Mastered
          <span class="inline-block w-3 h-3 bg-[var(--color-accent-2)]/20 border border-[var(--color-accent-2)] rounded-sm ml-3 mr-1"></span> Learning
          <span class="inline-block w-3 h-3 bg-[var(--color-accent-3)]/20 border border-[var(--color-accent-3)] rounded-sm ml-3 mr-1"></span> Struggling
        </p>
      </div>
      <div class="pointer-events-none">
        <Keyboard learnedKeys={allKeys} showHeatmap={true} />
      </div>
      <div class="mt-4">
        <p>{t().review.nothing}</p>
        <Button variant="link" href="/" class="mt-4 text-[var(--color-accent-2)]">
          ← {t().review.back}
        </Button>
      </div>
    </div>
  {:else if finished}
    <div
      class="animate-result-in mx-auto w-full max-w-4xl rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[0_12px_32px_-16px_color-mix(in_oklch,var(--color-ink)_20%,transparent)]"
    >
      <div class="animate-star-pop flex justify-center text-4xl text-[var(--color-mint)]">
        <Check class="h-12 w-12 stroke-[3]" />
      </div>
      <h2 class="mt-3 mb-8 text-xl font-bold tracking-[-0.02em]">
        {t().review.done}
      </h2>
      
      <div class="flex flex-col gap-2 mb-4">
        <h3 class="text-lg font-bold text-[var(--color-ink)]">Heatmap Stats</h3>
        <p class="text-xs">
          <span class="inline-block w-3 h-3 bg-[var(--color-mint)]/20 border border-[var(--color-mint)] rounded-sm mr-1"></span> Mastered
          <span class="inline-block w-3 h-3 bg-[var(--color-accent-2)]/20 border border-[var(--color-accent-2)] rounded-sm ml-3 mr-1"></span> Learning
          <span class="inline-block w-3 h-3 bg-[var(--color-accent-3)]/20 border border-[var(--color-accent-3)] rounded-sm ml-3 mr-1"></span> Struggling
        </p>
      </div>
      <div class="pointer-events-none w-full max-w-3xl mx-auto mb-8">
        <Keyboard learnedKeys={allKeys} showHeatmap={true} />
      </div>

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
