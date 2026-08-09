<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
</script>

<Button variant="ghost" size="icon" onclick={toggleMode} class="h-8 w-8 rounded-full" aria-label="Toggle Theme">
  <Moon class="h-[1rem] w-[1rem] rotate-0 scale-100 transition-[transform,opacity] dark:-rotate-90 dark:scale-0" />
  <Sun class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-[transform,opacity] dark:rotate-0 dark:scale-100" />
  <span class="sr-only">Toggle theme</span>
</Button>
