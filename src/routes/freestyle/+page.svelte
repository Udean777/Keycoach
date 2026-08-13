<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { getLang, t } from "$lib/i18n/i18n.svelte";
  import { DICTIONARIES } from "$lib/core/dictionaries";
  import { freestyle } from "$lib/stores/freestyle.svelte.ts";
  import TypingSession from "$lib/components/TypingSession.svelte";
  import { Button } from "$lib/components/ui/button";
  import { RefreshCcw, Trophy, Clock, Hash, Type, TypeIcon, WholeWord, Baseline } from "lucide-svelte";
  import { computeStats, type TypingState } from "$lib/engine/typing";

  // Settings
  let mode = $state<"words" | "time">("time");
  let count = $state(30); // 30 words or 30 seconds
  let useNumbers = $state(false);

  let words = $state<string[]>([]);
  let sessionKey = $state(0);
  let finished = $state(false);
  let result = $state<{ wpm: number; accuracy: number; pb: boolean } | null>(null);

  // Watch for language changes and restart the session
  let currentLang = $state(getLang());
  $effect(() => {
    const lang = getLang();
    if (lang !== currentLang) {
      currentLang = lang;
      start();
    }
  });


  function generateWords(amount: number) {
    const dict = DICTIONARIES[currentLang] || DICTIONARIES.en;
    const pool = [
      ...dict.words,
      ...dict.sentences.flatMap((s) => s.split(" ")),
    ].filter(w => w.length > 0);
    
    const newWords = [];
    for (let i = 0; i < amount; i++) {
      if (useNumbers && Math.random() < 0.1) { // 10% chance of a number
        newWords.push(Math.floor(Math.random() * 1000).toString());
      } else {
        const rawWord = pool[Math.floor(Math.random() * pool.length)];
        newWords.push(rawWord);
      }
    }
    return newWords;
  }

  function start() {
    // For time mode, we need to supply enough words so the user doesn't run out.
    // 300 words should be enough for even 200WPM for 1 minute.
    // For 2 minutes, 600 words.
    const amount = mode === "words" ? count : 400;
    words = generateWords(amount);
    finished = false;
    result = null;
    sessionKey++;
  }

  function onComplete(stats: {
    state: TypingState;
    errorsByKey: Record<string, number>;
  }) {
    const { wpm, accuracy } = computeStats(stats.state);
    
    // Only save PB if it's a standard run without modifiers, OR maybe any run is fine.
    // Let's just save all runs to PB for now, or just time/words mode.
    const pb = wpm > freestyle.personalBestWpm;
    if (pb) freestyle.saveRecord(wpm, accuracy);
    else freestyle.saveRecord(wpm, accuracy); // Save to history anyway

    result = { wpm, accuracy, pb };
    finished = true;
  }

  function toggleMode(newMode: "words" | "time") {
    if (mode === newMode) return;
    mode = newMode;
    count = mode === "words" ? 25 : 30;
    start();
  }

  function setOptionCount(newCount: number) {
    if (count === newCount) return;
    count = newCount;
    start();
  }


  function toggleNumbers() {
    useNumbers = !useNumbers;
    start();
  }

  onMount(() => {
    freestyle.load();
    start();
  });
</script>

<svelte:head>
  <title>{t().freestyle.title} — Keycoach</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 sm:px-8 py-8 lg:py-12">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        {t().freestyle.title}
      </h1>
      <p class="text-sm text-muted-foreground mt-1">
        {t().freestyle.subtitle}
      </p>
    </div>
    {#if freestyle.loaded && freestyle.personalBestWpm > 0}
      <div class="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
        <Trophy class="h-4 w-4 text-accent" />
        <span class="text-sm font-semibold">{t().freestyle.pb}: <span class="text-foreground">{freestyle.personalBestWpm} {t().results.wpm}</span></span>
      </div>
    {/if}
  </div>

  <!-- Settings Bar -->
  {#if !finished}
    <div class="flex flex-wrap items-center justify-center gap-4 lg:gap-8 rounded-[var(--radius-card)] bg-muted/30 p-2 text-sm text-muted-foreground transition-all">
      <div class="flex items-center gap-1 rounded-full bg-card p-1 shadow-sm border border-border/50">
        <button 
          class="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors hover:text-foreground {useNumbers ? 'bg-primary text-primary-foreground hover:text-primary-foreground' : ''}"
          onclick={toggleNumbers}
        >
          <Hash class="h-3.5 w-3.5" />
          <span>Numbers</span>
        </button>
      </div>

      <div class="h-4 w-[1px] bg-border/50"></div>

      <div class="flex items-center gap-1 rounded-full bg-card p-1 shadow-sm border border-border/50">
        <button 
          class="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors hover:text-foreground {mode === 'time' ? 'bg-muted text-foreground' : ''}"
          onclick={() => toggleMode('time')}
        >
          <Clock class="h-3.5 w-3.5" />
          <span>Time</span>
        </button>
        <button 
          class="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors hover:text-foreground {mode === 'words' ? 'bg-muted text-foreground' : ''}"
          onclick={() => toggleMode('words')}
        >
          <WholeWord class="h-3.5 w-3.5" />
          <span>Words</span>
        </button>
      </div>

      <div class="h-4 w-[1px] bg-border/50"></div>

      <div class="flex items-center gap-1 rounded-full bg-card p-1 shadow-sm border border-border/50">
        {#if mode === 'time'}
          {#each [15, 30, 60, 120] as val}
            <button 
              class="rounded-full px-3 py-1.5 font-medium transition-colors hover:text-foreground {count === val ? 'bg-accent text-accent-foreground hover:text-accent-foreground' : ''}"
              onclick={() => setOptionCount(val)}
            >
              {val}
            </button>
          {/each}
        {:else}
          {#each [10, 25, 50, 100] as val}
            <button 
              class="rounded-full px-3 py-1.5 font-medium transition-colors hover:text-foreground {count === val ? 'bg-accent text-accent-foreground hover:text-accent-foreground' : ''}"
              onclick={() => setOptionCount(val)}
            >
              {val}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {/if}

  {#if finished && result}
    <div
      in:fade={{ duration: 200 }}
      class="animate-result-in flex flex-col items-center justify-center gap-8 rounded-[var(--radius-card)] border border-border bg-card p-10 shadow-[0_24px_48px_-16px_color-mix(in_oklch,var(--foreground)_30%,transparent)] text-center"
    >
      <div class="space-y-2">
        <h2 class="text-3xl font-extrabold tracking-tight text-foreground">
          {t().freestyle.complete}
        </h2>
        {#if result.pb}
          <p class="text-accent font-bold animate-pulse">
            {t().freestyle.newPb}
          </p>
        {:else}
          <p class="text-muted-foreground">
            {t().freestyle.keepPracticing}
          </p>
        {/if}
      </div>

      <div class="flex gap-12">
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t().freestyle.speed}</span>
          <span class="text-6xl font-extrabold tabular-nums tracking-tighter text-foreground">{result.wpm}</span>
          <span class="text-sm font-medium text-muted-foreground">{t().results.wpm}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t().freestyle.accuracy}</span>
          <span class="text-6xl font-extrabold tabular-nums tracking-tighter text-foreground">{result.accuracy}<span class="text-4xl">%</span></span>
          <span class="text-sm font-medium text-muted-foreground">ACC</span>
        </div>
      </div>

      <Button size="lg" onclick={start} class="mt-4 px-10 text-base">
        <RefreshCcw class="mr-2 h-5 w-5" />
        {t().freestyle.typeAgain}
      </Button>

      {#if freestyle.records.length > 0}
        <div class="mt-8 w-full border-t border-border pt-8 text-left">
          <h3 class="font-semibold text-foreground mb-4">
            {t().freestyle.history}
          </h3>
          <div class="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border/50">
            <span>{t().freestyle.date}</span>
            <span class="text-right">{t().results.wpm}</span>
            <span class="text-right">{t().freestyle.accuracy}</span>
          </div>
          <div class="flex flex-col max-h-48 overflow-y-auto">
            {#each freestyle.records.slice(0, 10) as record}
              <div class="grid grid-cols-3 gap-4 py-3 text-sm border-b border-border/20 last:border-0">
                <span class="text-foreground">
                  {new Date(record.timestamp).toLocaleDateString()}
                  {new Date(record.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span class="text-right text-foreground font-semibold">{record.wpm}</span>
                <span class="text-right text-foreground">{record.accuracy}%</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {:else if words.length > 0}
    <div class="mt-4" in:fade={{ duration: 150 }}>
      {#key sessionKey}
        <!-- Pass timeLimit if mode === 'time' -->
        <TypingSession {words} timeLimit={mode === 'time' ? count : undefined} {onComplete} />
      {/key}
    </div>

    <div class="mt-8 flex justify-center opacity-50 hover:opacity-100 transition-opacity">
      <Button variant="outline" size="sm" onclick={start}>
        <RefreshCcw class="mr-2 h-4 w-4" />
        {t().freestyle.restart}
      </Button>
    </div>
  {/if}
</div>
