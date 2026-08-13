<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import VirtualKeyboard from "$lib/components/Keyboard.svelte";
  import { reveal } from "$lib/actions/reveal";
</script>

<section class="border-t border-[var(--color-border)] py-16 lg:py-20">
  <div class="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
    <div class="reveal flex flex-col gap-3" use:reveal>
      <span class="mono-label">{t().home.interactiveCoach}</span>
      <h2
        class="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)]"
      >
        {t().home.subtitle}
      </h2>
      <p class="text-sm leading-relaxed text-[var(--color-muted)] font-medium">
        {t().app.tagline}
      </p>
    </div>
    <div
      class="reveal rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-5 shadow-[0_12px_32px_-20px_color-mix(in_oklch,var(--color-ink)_20%,transparent)]"
      style="--i: 1"
      use:reveal
    >
      <span class="sr-only">{t().home.interactiveCoach}</span>
      <VirtualKeyboard
        focusKeys={["f", "j", "d", "k"]}
        learnedKeys={["a", "s", "d", "f", "j", "k", "l", ";"]}
        target="f"
      />
    </div>
  </div>
</section>
