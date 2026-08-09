<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { reveal } from '$lib/actions/reveal';
</script>

<!-- Hallmark · genre: playful (arcade) · macrostructure: Centered-Hero · theme: arcade · design-system: design.md -->
<div
  class="reveal-stagger mx-auto flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-32 text-center"
  use:reveal
>
  <div class="reveal-child flex flex-col gap-2" style="--i: 0">
    <h1 class="text-4xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
      {$page.status}
    </h1>
    <p class="text-lg text-[var(--color-muted)]">
      {$page.error?.message ?? "Page not found or an error occurred."}
    </p>
  </div>

  <span class="reveal-child" style="--i: 1">
    <Button href="/" size="lg" class="px-6 py-3">
      Return Home
    </Button>
  </span>
</div>
