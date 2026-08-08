<script lang="ts">
  import { LAYOUTS, type LayoutName, type KeyboardType } from "$lib/keyboardLayouts";

  interface Props {
    focusKeys?: string[];
    learnedKeys?: string[];
    pressed?: Set<string>;
    target?: string | null;
  }
  let {
    focusKeys = [],
    learnedKeys = [],
    pressed = new Set<string>(),
    target = null,
  }: Props = $props();

  let activeLayout: LayoutName = $state("qwerty");
  let keyboardType: KeyboardType = $state("windows");

  const rows = $derived(LAYOUTS[activeLayout].rows);

  const learnKeys = $derived(new Set(learnedKeys));
  const focus = $derived(new Set(focusKeys));

  function cls(k: string): string {
    const isModifier = k.length > 1 && k !== " ";
    let base = "flex h-10 sm:h-12 items-center justify-center rounded-lg border shadow-sm transition-all duration-100 select-none uppercase";
    
    if (isModifier) {
      base += " text-[10px] sm:text-xs font-semibold tracking-wide lowercase";
    } else {
      base += " text-xs sm:text-sm font-bold";
    }

    if (target && target === k) {
      return `${base} animate-key-bounce border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)] ring-2 ring-[var(--color-accent)]/40`;
    }
    if (pressed.has(k)) {
      return `${base} border-[var(--color-accent-strong)] bg-[var(--color-accent-strong)] text-[var(--color-bg)] scale-[0.97]`;
    }
    if (learnKeys.has(k)) {
      return `${base} border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-accent)]`;
    }
    
    if (isModifier) {
      return `${base} border-[var(--color-border)]/50 bg-[var(--color-surface)]/50 text-[var(--color-muted)]/60`;
    }
    return `${base} border-[var(--color-border)]/80 bg-[var(--color-surface)]/80 text-[var(--color-muted)]/80`;
  }
</script>

<div class="mx-auto w-full max-w-4xl flex flex-col gap-4">
  <!-- Settings Bar -->
  <div class="flex justify-between items-center px-2">
    <div class="flex gap-2 text-xs sm:text-sm">
      <select bind:value={activeLayout} class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-2 py-1 outline-none focus:border-[var(--color-accent)] text-[var(--color-ink)] transition-colors cursor-pointer">
        {#each Object.values(LAYOUTS) as l}
          <option value={l.id}>{l.name}</option>
        {/each}
      </select>
      <select bind:value={keyboardType} class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-2 py-1 outline-none focus:border-[var(--color-accent)] text-[var(--color-ink)] transition-colors cursor-pointer">
        <option value="windows">Windows / PC</option>
        <option value="mac">Mac / Apple</option>
      </select>
    </div>
  </div>

  <div class="rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface)]/80 p-2 sm:p-4 shadow-xl backdrop-blur-md">
    <div class="flex flex-col gap-1.5 sm:gap-2">
      <!-- Row 1: Numbers -->
      <div class="flex gap-1.5 sm:gap-2">
        {#each rows[0] as k}
          <div class={cls(k)} style="flex: 1">{k}</div>
        {/each}
        <div class={cls("backspace")} style="flex: 2">backspace</div>
      </div>

      <!-- Row 2: QWERTY -->
      <div class="flex gap-1.5 sm:gap-2">
        <div class={cls("tab")} style="flex: 1.5">tab</div>
        {#each rows[1] as k}
          <div class={cls(k)} style="flex: 1">{k}</div>
        {/each}
        <div class={cls("\\")} style="flex: 1.5">\</div>
      </div>

      <!-- Row 3: ASDF -->
      <div class="flex gap-1.5 sm:gap-2">
        <div class={cls("caps")} style="flex: 1.75">caps</div>
        {#each rows[2] as k}
          <div class={cls(k)} style="flex: 1">{k}</div>
        {/each}
        <div class={cls("enter")} style="flex: 2.25">enter</div>
      </div>

      <!-- Row 4: ZXCV -->
      <div class="flex gap-1.5 sm:gap-2">
        <div class={cls("shift")} style="flex: 2.25">shift</div>
        {#each rows[3] as k}
          <div class={cls(k)} style="flex: 1">{k}</div>
        {/each}
        <div class={cls("shift-right")} style="flex: 2.75">shift</div>
      </div>

      <!-- Row 5: Modifiers & Spacebar -->
      <div class="flex gap-1.5 sm:gap-2">
        {#if keyboardType === "mac"}
          <div class={cls("control")} style="flex: 1.25">control</div>
          <div class={cls("option")} style="flex: 1.25">option</div>
          <div class={cls("command")} style="flex: 1.5">command</div>
          <div class={cls(" ")} style="flex: 5.75"></div>
          <div class={cls("command-right")} style="flex: 1.5">command</div>
          <div class={cls("option-right")} style="flex: 1.25">option</div>
          <div class={cls("control-right")} style="flex: 1.25">control</div>
        {:else}
          <div class={cls("ctrl")} style="flex: 1.25">ctrl</div>
          <div class={cls("win")} style="flex: 1.25">win</div>
          <div class={cls("alt")} style="flex: 1.25">alt</div>
          <div class={cls(" ")} style="flex: 6.25"></div>
          <div class={cls("alt-right")} style="flex: 1.25">alt</div>
          <div class={cls("win-right")} style="flex: 1.25">win</div>
          <div class={cls("menu")} style="flex: 1.25">menu</div>
          <div class={cls("ctrl-right")} style="flex: 1.25">ctrl</div>
        {/if}
      </div>
    </div>
  </div>
</div>
