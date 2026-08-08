<script lang="ts">
  // QWERTY virtual keyboard — highlights learned keys + the measured key set.
  interface Props {
    focusKeys?: string[]; // the specific keys this lesson emphasizes
    learnedKeys?: string[]; // all keys introduced so far (dimmer highlight)
    pressed?: Set<string>; // currently-held keys (optional)
    target?: string | null; // the next key the user should press (bounce hint)
  }
  let {
    focusKeys = [],
    learnedKeys = [],
    pressed = new Set<string>(),
    target = null,
  }: Props = $props();

  const ROWS: string[][] = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  ];

  const learnKeys = $derived(new Set(learnedKeys));
  const focus = $derived(new Set(focusKeys));

  function cls(k: string): string {
    if (target && target === k)
      return "animate-key-bounce border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)]";
    if (pressed.has(k))
      return "border-[var(--color-accent-strong)] bg-[var(--color-accent-strong)] text-[var(--color-bg)]";
    if (focus.has(k))
      return "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]";
    if (learnKeys.has(k))
      return "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/60";
    return "border-[var(--color-border)]/60 bg-[var(--color-surface)]/60 text-[var(--color-muted)]/40 hover:text-[var(--color-muted)]/40";
  }
</script>

<div class="mx-auto w-full max-w-2xl select-none py-2">
  {#each ROWS as row, ri (ri)}
    <div class="flex gap-1.5 py-px">
      {#each row as k, ki (ki)}
        <button
          type="button"
          tabindex="-1"
          aria-hidden="true"
          class="h-9 flex-1 rounded-md border text-sm font-bold uppercase transition-colors duration-100 active:scale-95 sm:h-10 {cls(
            k,
          )}"
        >
          {k}
        </button>
      {/each}
    </div>
  {/each}
</div>