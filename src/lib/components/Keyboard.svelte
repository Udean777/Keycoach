<script lang="ts">
  import { LAYOUTS, type LayoutName, type KeyboardType } from "$lib/keyboardLayouts";
  import * as Select from "$lib/components/ui/select";

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
    let base = "flex h-10 sm:h-12 items-center justify-center rounded-xl shadow-[0_2px_0_0_var(--color-surface-2)] transition-all duration-100 select-none uppercase";
    
    if (isModifier) {
      base += " text-[10px] sm:text-xs font-semibold tracking-wide lowercase";
    } else {
      base += " text-xs sm:text-sm font-bold";
    }

    if (target && target === k) {
      return `${base} animate-key-bounce bg-[var(--color-accent)] text-[var(--color-ink)] shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-accent)_40%,transparent)]`;
    }
    if (pressed.has(k)) {
      return `${base} bg-[var(--color-accent-2)] text-[var(--color-ink)] shadow-none scale-[0.97]`;
    }
    if (learnKeys.has(k)) {
      return `${base} border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-accent)]`;
    }
    
    if (isModifier) {
      return `${base} border border-[var(--color-border)]/50 bg-[var(--color-surface)]/50 text-[var(--color-muted)]/60`;
    }
    return `${base} border border-[var(--color-border)]/80 bg-[var(--color-surface)]/80 text-[var(--color-muted)]/80`;
  }
</script>

<div class="mx-auto w-full max-w-4xl flex flex-col gap-4">
  <!-- Settings Bar -->
  <div class="flex justify-between items-center px-2">
    <div class="flex gap-2 text-xs sm:text-sm">
      <Select.Root
        type="single"
        name="layout"
        value={activeLayout}
        onValueChange={(val) => (activeLayout = val as LayoutName)}
      >
        <Select.Trigger class="w-[140px] h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]">
          {Object.values(LAYOUTS).find(l => l.id === activeLayout)?.name ?? "Layout"}
        </Select.Trigger>
        <Select.Content>
          {#each Object.values(LAYOUTS) as l}
            <Select.Item value={l.id}>{l.name}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>

      <Select.Root
        type="single"
        name="os"
        value={keyboardType}
        onValueChange={(val) => (keyboardType = val as KeyboardType)}
      >
        <Select.Trigger class="w-[120px] h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]">
          {keyboardType === "windows" ? "Windows / PC" : "Mac / Apple"}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="windows">Windows / PC</Select.Item>
          <Select.Item value="mac">Mac / Apple</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  </div>

  <div class="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 sm:p-4 shadow-[0_12px_32px_-16px_color-mix(in_oklch,var(--color-ink)_20%,transparent)]">
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
