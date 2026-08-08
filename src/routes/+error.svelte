<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
</script>

<!-- Hallmark · genre: modern-minimal · macrostructure: Centered-Hero · design-system: design.md -->
<div
  class="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-32 text-center"
>
  <div class="flex flex-col gap-2">
    <h1 class="text-4xl font-black tracking-[-0.04em] text-[var(--color-ink)]">
      {$page.status}
    </h1>
    <p class="text-lg text-[var(--color-muted)]">
      {$page.error?.message ?? "Page not found or an error occurred."}
    </p>
  </div>

  <Button href="/" size="lg" class="rounded-xl font-bold">
    Return Home
  </Button>
</div>
