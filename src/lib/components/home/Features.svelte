<script lang="ts">
  import { t } from "$lib/i18n/i18n.svelte";
  import { Brain, Trophy, Keyboard as KeyboardIcon } from "lucide-svelte";
  import { reveal } from "$lib/actions/reveal";
</script>

<section class="border-t border-[var(--color-border)] py-16 lg:py-20">
  <div class="flex flex-col gap-10">
    <div class="max-w-lg reveal-child" style="--i: 0">
      <span class="mono-label">{t().home.featureTagline}</span>
      <h2
        class="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[var(--color-ink)]"
      >
        {t().home.featureSectionTitle}
      </h2>
    </div>

    <div
      class="reveal flex flex-col divide-y divide-[var(--color-border)]"
      use:reveal
    >
      <div
        class="reveal-child grid gap-4 py-7 sm:grid-cols-[8rem_1fr_2.5fr] sm:gap-6"
        style="--i: 0"
      >
        <span
          class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
        >
          <KeyboardIcon class="h-5 w-5" />
        </span>
        <h3
          class="text-lg font-bold tracking-[-0.01em] text-[var(--color-ink)]"
        >
          {t().home.feature1Title}
        </h3>
        <p
          class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
        >
          {t().home.feature1Desc}
        </p>
      </div>

      <div
        class="reveal-child grid gap-4 py-7 sm:grid-cols-[8rem_1fr_2.5fr] sm:gap-6"
        style="--i: 1"
      >
        <span
          class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
        >
          <Brain class="h-5 w-5" />
        </span>
        <h3
          class="text-lg font-bold tracking-[-0.01em] text-[var(--color-ink)]"
        >
          {t().home.feature2Title}
        </h3>
        <p
          class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
        >
          {t().home.feature2Desc}
        </p>
      </div>

      <div
        class="reveal-child grid gap-4 py-7 sm:grid-cols-[8rem_1fr_2.5fr] sm:gap-6"
        style="--i: 2"
      >
        <span
          class="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]"
        >
          <Trophy class="h-5 w-5" />
        </span>
        <h3
          class="text-lg font-bold tracking-[-0.01em] text-[var(--color-ink)]"
        >
          {t().home.feature3Title}
        </h3>
        <p
          class="text-sm leading-relaxed text-[var(--color-muted)] font-medium"
        >
          {t().home.feature3Desc}
        </p>
      </div>
    </div>
  </div>
</section>
