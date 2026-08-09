<script lang="ts">
  // A live typing session: captures keyboard input, drives the engine, records
  // outcomes to SRS, and reports live stats + completion.
  import { onMount, onDestroy, untrack } from 'svelte';
  import {
    applyPress,
    initialState,
    computeStats,
    errorCounts,
    type TypingState
  } from '$lib/engine/typing';
  import { playTick, playError } from '$lib/engine/sound';
  import { srs } from '$lib/stores/srs.svelte.ts';
  import { Check } from 'lucide-svelte';
  import Words from './Words.svelte';
  import Keyboard from './Keyboard.svelte';

  interface Props {
    words: string[];
    focusKeys?: string[];
    learnedKeys?: string[];
    boxed?: boolean;
    onComplete?: (result: {
      state: TypingState;
      errorsByKey: Record<string, number>;
    }) => void;
  }
  let { words, focusKeys = [], learnedKeys = [], boxed = false, onComplete }: Props =
    $props();

  // session is replaced wholesale on every press; build the initial snapshot
  // once (raw + untrack: no deep proxying, no reactivity on the seed words)
  let session = $state.raw<{ state: TypingState; reported: boolean }>(
    untrack(() => ({ state: initialState(words), reported: false })),
  );

  let live = $derived(computeStats(session.state));

  // the key the user should press next — drives the keyboard bounce hint.
  // points at the first wrong box (so the hint stays put until it's fixed),
  // else the next unttyped char.
  let target = $derived.by(() => {
    const s = session.state;
    if (s.finished) return null;
    const word = s.words[s.currentWordIndex] ?? "";
    const typed = s.typedWords[s.currentWordIndex] ?? "";
    for (let i = 0; i < typed.length; i++) if (typed[i] !== word[i]) return word[i];
    return word[typed.length] ?? (boxed ? null : " ");
  });

  // drill (boxed): a correctly-completed combo flashes, then auto-advances
  let comboFlash = $state(false);
  let comboTimer: ReturnType<typeof setTimeout> | undefined;
  // increments per wrong key — drives the Words shake retrigger (keyed remount)
  let errorTick = $state(0);
  // keys currently held down — lights up the keyboard
  let pressed = $state(new Set<string>());

  function norm(key: string): string {
    return key === ' ' ? ' ' : key.toLowerCase();
  }

  function onKeyUp(e: KeyboardEvent) {
    const p = new Set(pressed);
    if (p.delete(norm(e.key))) pressed = p;
  }

  function comboGood(s: TypingState): boolean {
    if (s.finished) return false;
    const word = s.words[s.currentWordIndex] ?? "";
    const typed = s.typedWords[s.currentWordIndex] ?? "";
    return typed.length >= word.length && typed === word;
  }

  function advanceFrom(state: TypingState) {
    const next = applyPress(state, " ", Date.now());
    session = { ...session, state: next };
    if (next.finished && !session.reported) {
      session = { ...session, reported: true };
      onComplete?.({ state: next, errorsByKey: errorCounts(next) });
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = e.key;
    // drill (boxed): any printable character is valid, but no space,
    // backspace, or navigation keys. Words advance automatically on success.
    if (boxed && (key.length !== 1 || key === ' ')) return;
    if (key === 'Tab') {
      e.preventDefault();
      session = { ...session, state: initialState(words) };
      return;
    }
    if (!(key.length === 1 || key === 'Backspace' || key === ' ')) return;
    if (key === ' ') e.preventDefault();
    const normalized =
      key === 'Backspace' ? 'Backspace' : key.length === 1 ? key.toLowerCase() : key;
    let prev = session.state;
    clearTimeout(comboTimer);
    comboFlash = false;
    // drill: if the current combo is already complete, the next keystroke
    // belongs to the next combo — advance immediately instead of appending to
    // a finished word (which previously cancelled the pending timer and stuck).
    if (boxed && comboGood(prev)) prev = applyPress(prev, " ", Date.now());
    const next = applyPress(prev, normalized, Date.now());
    session = { ...session, state: next };
    if (next.log.length > prev.log.length) {
      const press = next.log[next.log.length - 1];
      srs.record(press.target, press.correct);
      if (!press.correct) {
        errorTick++;
        playError();
      } else {
        if (key !== 'Backspace') playTick();
      }
    }
    if (next.finished && !session.reported) {
      session = { ...session, reported: true };
      onComplete?.({ state: next, errorsByKey: errorCounts(next) });
      return;
    }
    if (boxed && comboGood(next)) {
      comboFlash = true;
      // If this is the last combo in boxed drill mode, finish immediately
      if (next.currentWordIndex === next.words.length - 1) {
        comboTimer = setTimeout(() => {
          comboFlash = false;
          advanceFrom(session.state);
        }, 450);
      } else {
        comboTimer = setTimeout(() => {
          comboFlash = false;
          advanceFrom(session.state);
        }, 450);
      }
    }
  }

  function onKeyDownTrack(e: KeyboardEvent) {
    const p = new Set(pressed);
    p.add(norm(e.key));
    pressed = p;
    handleKey(e);
  }

  onMount(() => {
    window.addEventListener('keydown', onKeyDownTrack);
    window.addEventListener('keyup', onKeyUp);
  });
  onDestroy(() => {
    window.removeEventListener('keydown', onKeyDownTrack);
    window.removeEventListener('keyup', onKeyUp);
  });
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between text-sm">
    <div class="flex gap-5">
      <span class="text-[var(--color-muted)]"
        >WPM <b class="text-[var(--color-ink)] tabular-nums">{live.wpm}</b
        ></span
      >
      <span class="text-[var(--color-muted)]"
        >Acc <b class="text-[var(--color-ink)] tabular-nums">{live.accuracy}%</b
        ></span
      >
      {#if boxed}
        <span class="text-[var(--color-muted)]"
          >Combo <b class="text-[var(--color-accent)] tabular-nums"
            >{session.state.currentWordIndex + 1}/{words.length}</b
          ></span
        >
      {/if}
    </div>
    <div
      class="h-2 w-40 overflow-hidden rounded-full bg-[var(--color-surface)]"
    >
      <div
        class="h-full rounded-full bg-[var(--color-accent)] transition-[width]"
        style="width: {live.progress * 100}%"
      ></div>
    </div>
  </div>

  <div class="relative">
    <Words
      words={words}
      typedWords={session.state.typedWords}
      currentWordIndex={session.state.currentWordIndex}
      {boxed}
      errorTick={errorTick}
    />
    {#if boxed && comboFlash}
      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          class="animate-combo-pop rounded-full border border-[var(--color-mint)]/40 bg-[var(--color-mint)]/10 px-5 py-2 text-[var(--color-mint)]"
        >
          <Check class="h-6 w-6 stroke-[3]" />
        </div>
      </div>
    {/if}
  </div>

  <Keyboard {focusKeys} {learnedKeys} {target} {pressed} />
</div>