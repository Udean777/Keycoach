<script lang="ts">
  // Renders the target words with inline correctness + caret.
  // `boxed` (drill): each word is shown as its own combo box; only a small
  // sliding window renders at once so the whole lesson isn't revealed ahead.
interface Props {
    words: string[];
    typedWords: string[];
    currentWordIndex: number;
    boxed?: boolean;
    errorTick?: number; // increments per wrong key — retriggers shake animation
  }
  let {
    words,
    typedWords,
    currentWordIndex,
    boxed = false,
    errorTick = 0,
  }: Props = $props();

  let activeWordEl = $state<HTMLElement | null>(null);
  let scrollTop = $state(0);

  $effect(() => {
    if (currentWordIndex === 0) {
      scrollTop = 0;
    } else if (activeWordEl) {
      const top = activeWordEl.offsetTop;
      // offsetHeight is the height of the word, we add gap-y (4px)
      const lh = activeWordEl.offsetHeight + 4; 
      
      // If active word is below the 2nd visible line, scroll down
      if (top >= scrollTop + lh * 2) {
        scrollTop = top - lh;
      } 
      // If user backspaced to a line above visible area, scroll up
      else if (top < scrollTop) {
        scrollTop = top;
      }
    }
  });
  function trackCurrent(node: HTMLElement, isCurrent: boolean) {
    if (isCurrent) activeWordEl = node;
    return {
      update(newIsCurrent: boolean) {
        if (newIsCurrent) activeWordEl = node;
      }
    };
  }
</script>

{#if boxed}
  {@const word = words[currentWordIndex] ?? ""}
  {@const typed = typedWords[currentWordIndex] ?? ""}
  {@const active = (() => {
    for (let i = 0; i < typed.length; i++) if (typed[i] !== word[i]) return i;
    return typed.length;
  })()}
  <div class="flex flex-wrap justify-center gap-3">
    {#each word.split("") as ch, ci (ci === active && typed[ci] !== ch ? `${ci}-w${errorTick}` : ci)}
      {@const typedCh = typed[ci]}
      {@const done = ci < active}
      {@const wrong = typedCh !== undefined && typedCh !== ch}
      {@const cls = wrong
        ? 'animate-shake border-[var(--color-destructive)] bg-[var(--color-destructive)]/15 text-[var(--color-destructive)]'
        : done
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
          : ci === active
            ? 'scale-110 border-[var(--primary)] bg-primary/10 text-primary shadow-[0_0_0_3px_var(--primary)]/15'
            : 'border-border bg-card text-muted-foreground/40'}
      <div
        class="flex h-16 w-14 items-center justify-center rounded-[20px] border-2 text-3xl font-bold transition-[transform,border-color,background-color,color] {cls}"
        >{ch}
      </div>
      {/each}
    </div>
  {:else}
  <div
    class="relative w-full select-none overflow-hidden text-2xl leading-[1.7] tracking-wide sm:text-[30px]"
    style="height: 150px; mask-image: linear-gradient(to bottom, black 60%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);"
  >
    <div 
      class="flex flex-wrap gap-x-4 gap-y-1 transition-transform duration-200"
      style="transform: translateY(-{scrollTop}px)"
    >
      {#each words as word, wi (wi)}
        {@const typed = typedWords[wi] ?? ""}
        {@const isCurrent = wi === currentWordIndex}
        {@const wordState =
          wi < currentWordIndex ? "done" : isCurrent ? "current" : "future"}
        <span 
          class="flex"
          use:trackCurrent={isCurrent}
        >
          {#each word.split("") as ch, ci (isCurrent && typed[ci] !== undefined && typed[ci] !== ch ? `${ci}-w${errorTick}` : `${ci}`)}
            {@const tch = typed[ci]}
            {@const isWrong = wordState === "current" && tch !== undefined && tch !== ch}
            <span
              class="relative transition-colors {wordState === 'done'
                ? 'text-[var(--color-primary)]'
                : isCurrent
                  ? tch === undefined
                    ? 'text-muted-foreground'
                    : tch === ch
                      ? 'text-[var(--color-primary)]'
                      : 'animate-shake text-[var(--color-destructive)]'
                  : 'text-muted-foreground/40'}"
            >
              {#if isCurrent && ci === typed.length}
                <span
                  class="absolute -left-[1px] top-[6%] h-[82%] w-[2px] animate-pulse rounded bg-primary"
                ></span>
              {/if}
              {ch}
            </span>
          {/each}
          {#if typed.length > word.length}
            <span class="text-[var(--color-destructive)]"
              >{typed.slice(word.length)}</span
            >
          {/if}
        </span>
      {/each}
    </div>
  </div>
{/if}