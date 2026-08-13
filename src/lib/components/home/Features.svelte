<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { Brain, Trophy, Keyboard as KeyboardIcon } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";

  const features = [
    {
      icon: KeyboardIcon,
      title: () => t().home.feature1Title,
      desc: () => t().home.feature1Desc,
      tick: "var(--color-primary)",
    },
    {
      icon: Brain,
      title: () => t().home.feature2Title,
      desc: () => t().home.feature2Desc,
      tick: "var(--color-accent-2)",
    },
    {
      icon: Trophy,
      title: () => t().home.feature3Title,
      desc: () => t().home.feature3Desc,
      tick: "var(--color-accent-3)",
    },
  ];
</script>

<section class="py-16 lg:py-24">
  <div class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
    <div class="reveal flex flex-col items-start gap-4 lg:sticky lg:top-28" use:reveal>
      <span class="mono-label">{t().home.featureTagline}</span>
      <h2
        class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-foreground [overflow-wrap:anywhere]"
      >
        {t().home.featureSectionTitle}
      </h2>
    </div>

    <div class="reveal divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-card/40" use:reveal>
      {#each features as f, i (i)}
        <div class="reveal-child flex gap-4 p-5 sm:p-7" style="--i: {i}">
          <span
            class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground shadow-[0_2px_0_0_var(--color-border)]"
          >
            <f.icon class="h-5 w-5" />
          </span>
          <div class="min-w-0">
            <h3 class="font-display text-lg font-bold tracking-[-0.01em] text-foreground">
              {f.title()}
            </h3>
            <p class="mt-1 text-sm leading-relaxed font-medium text-muted-foreground">
              {f.desc()}
            </p>
          </div>
          <span
            class="ml-auto mt-1.5 h-2 w-2 shrink-0 rounded-full"
            style="background: {f.tick}"
            aria-hidden="true"
          ></span>
        </div>
      {/each}
    </div>
  </div>
</section>