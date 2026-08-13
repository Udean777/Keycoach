<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight, Zap } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";
  import type { CompiledLesson } from "$lib/core/curriculum";

  let { next }: { next: CompiledLesson | undefined } = $props();

  const marquee = ["a", "s", "d", "f", "j", "k", "l", ";"];
</script>

<section class="py-16 lg:py-24">
  <div
    class="reveal-stagger relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-card px-6 py-14 text-center sm:px-12 lg:py-20"
    use:reveal
  >
    <span
      aria-hidden="true"
      class="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[var(--color-primary)] via-[var(--color-accent-2)] to-[var(--color-accent-3)]"
    ></span>

    <div class="pointer-events-none absolute inset-0 flex flex-wrap items-start justify-center gap-1.5 px-8 pt-8 opacity-[0.14]" aria-hidden="true">
      {#each marquee as k, i (k)}
        <span
          class="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-border)] bg-card font-label text-xs font-bold uppercase text-foreground shadow-[0_2px_0_0_var(--color-surface-2)]"
          style="transform: rotate({i % 2 === 0 ? -3 : 3}deg)"
        >
          {k}
        </span>
      {/each}
    </div>

    <h2
      class="reveal-child relative max-w-2xl font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-[-0.03em] text-foreground [overflow-wrap:anywhere]"
      style="--i: 0"
    >
      {t().home.ctaTitle}
    </h2>
    <p
      class="reveal-child relative max-w-md text-base font-medium text-muted-foreground"
      style="--i: 1"
    >
      {t().home.subtitle}
    </p>
    <span class="reveal-child relative" style="--i: 2">
      <Button
        href={next ? `/lessons/${next.id}` : "/lessons/L1-HOME-1"}
        size="lg"
        class="mt-2 px-8 py-3 text-sm shadow-[0_4px_16px_0_var(--color-primary)]"
      >
        <Zap class="mr-2 h-4 w-4 shrink-0" />
        {t().home.ctaBtn}
        <ArrowRight class="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </span>
  </div>
</section>