<script lang="ts">
  import { onMount } from "svelte";
  import { progress } from "$lib/stores/progress.svelte.ts";
  import { srs } from "$lib/stores/srs.svelte.ts";
  import { compileStages } from "$lib/core/curriculum";
  import { dueKeys } from "$lib/srs/srs";
  import { getLang } from "$lib/i18n/i18n.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import Hero from "$lib/components/home/Hero.svelte";
  import Features from "$lib/components/home/Features.svelte";
  import InteractiveDemo from "$lib/components/home/InteractiveDemo.svelte";
  import Curriculum from "$lib/components/home/Curriculum.svelte";
  import Cta from "$lib/components/home/Cta.svelte";

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
  <div class="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-8">
    <Hero {next} {dueCount} {total} {doneCount} {shownPct} />
    <Features />
    <InteractiveDemo />
    <Curriculum {lessons} {unlocked} />
    <Cta {next} />
  </div>
{/if}
