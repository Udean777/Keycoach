<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.OverlayProps = $props();
</script>

<AlertDialogPrimitive.Overlay
	bind:ref
	data-slot="alert-dialog-overlay"
	class={cn("bg-[color-mix(in_oklch,var(--foreground)_30%,transparent)] duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 supports-backdrop-filter:backdrop-blur-[2px] supports-backdrop-filter:bg-[color-mix(in_oklch,var(--foreground)_20%,transparent)]", className)}
	{...restProps}
/>
