<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";
  import type { CompiledLesson } from "$lib/core/curriculum";

  let { next }: { next: CompiledLesson | undefined } = $props();
</script>

<section class="border-t border-[var(--color-border)] py-16 lg:py-24">
  <div
    class="reveal-stagger flex max-w-2xl flex-col items-start gap-5"
    use:reveal
  >
    <h2
      class="reveal-child text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[var(--color-ink)]"
      style="--i: 0"
    >
      {t().home.ctaTitle}
    </h2>
    <p
      class="reveal-child text-base text-[var(--color-muted)] font-medium"
      style="--i: 1"
    >
      {t().home.subtitle}
    </p>
    <span class="reveal-child" style="--i: 2">
      <Button
        href={next ? `/lessons/${next.id}` : "/lessons/L1-HOME-1"}
        size="lg"
        class="mt-2 px-8 py-3 text-sm shadow-[0_4px_16px_0_var(--color-accent-strong)]"
      >
        {t().home.ctaBtn}
        <ArrowRight class="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </span>
  </div>
</section>
