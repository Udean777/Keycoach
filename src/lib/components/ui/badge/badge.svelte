<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "h-5 gap-1 rounded-full border px-2 py-0.5 font-label text-[11px] font-medium uppercase tracking-[0.05em] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none",
		variants: {
			variant: {
				default: "border-[var(--color-accent-strong)]/40 bg-[var(--color-accent)]/15 text-[var(--color-ink-2)] [a]:hover:bg-[var(--color-accent)]/25",
				secondary: "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-2)] [a]:hover:bg-[var(--color-surface)]",
				destructive: "border-[var(--color-wrong)]/30 bg-[var(--color-wrong)]/10 text-[var(--color-wrong)] [a]:hover:bg-[var(--color-wrong)]/20",
				outline: "border-[var(--color-border)] bg-transparent text-[var(--color-muted)] [a]:hover:bg-[var(--color-surface)] [a]:hover:text-[var(--color-ink)]",
				ghost: "border-transparent text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink-2)]",
				link: "border-transparent text-[var(--color-accent-2)] underline-offset-4 hover:underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
