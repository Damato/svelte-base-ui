<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getProgressContext } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    /**
     * Render prop: receives `(formattedValue, rawValue)` and returns content.
     * When omitted the formatted value is displayed directly.
     */
    children?: Snippet<[formattedValue: string | null, value: number | null]> | null;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getProgressContext();

  const displayValue = $derived(ctx.value == null ? null : ctx.formattedValue);
</script>

<span {...rest} class={className} aria-hidden={true} data-status={ctx.status}>
  {#if children}
    {@render children(ctx.value == null ? 'indeterminate' : ctx.formattedValue, ctx.value)}
  {:else}
    {displayValue}
  {/if}
</span>
