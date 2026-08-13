<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import VirtualKeyboard from "$lib/components/Keyboard.svelte";
  import { reveal } from "$lib/actions/reveal";
</script>

<section class="py-16 lg:py-24">
  <div class="reveal overflow-hidden rounded-2xl border border-[var(--color-border)] bg-card shadow-[0_16px_40px_-20px_color-mix(in_oklch,var(--foreground)_20%,transparent)]" use:reveal>
    <div
      class="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-3.5 sm:px-7"
    >
      <span class="font-label text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {t().home.interactiveCoach}
      </span>
      <span class="hidden items-center gap-1.5 sm:flex">
        <span class="grid h-6 w-6 place-items-center rounded-md border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 font-label text-[10px] font-bold uppercase text-foreground">a</span>
        <span class="grid h-6 w-6 place-items-center rounded-md border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 font-label text-[10px] font-bold uppercase text-foreground">s</span>
        <span class="grid h-6 w-6 place-items-center rounded-md border border-[var(--color-accent-2)]/40 bg-[var(--color-accent-2)]/10 font-label text-[10px] font-bold uppercase text-foreground">d</span>
        <span class="grid h-6 w-6 place-items-center rounded-md border border-[var(--color-accent-2)]/40 bg-[var(--color-accent-2)]/10 font-label text-[10px] font-bold uppercase text-foreground">f</span>
      </span>
    </div>
    <div class="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:items-center lg:gap-12">
      <div class="flex flex-col gap-3 lg:border-r lg:border-[var(--color-border)] lg:pr-8">
        <h2
          class="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground [overflow-wrap:anywhere]"
        >
          {t().home.subtitle}
        </h2>
        <p class="text-sm leading-relaxed font-medium text-muted-foreground">
          {t().app.tagline}
        </p>
      </div>
      <div class="min-w-0">
        <span class="sr-only">{t().home.interactiveCoach}</span>
        <VirtualKeyboard
          focusKeys={["f", "j", "d", "k"]}
          learnedKeys={["a", "s", "d", "f", "j", "k", "l", ";"]}
          target="f"
        />
      </div>
    </div>
  </div>
</section>