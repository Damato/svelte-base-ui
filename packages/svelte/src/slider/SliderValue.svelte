<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSliderContext } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Index of the thumb whose value to display. @default 0 */
    index?: number;
    children?: Snippet<[formattedValue: string | null, value: number]> | null;
  }

  let { index = 0, class: className, children, ...rest }: Props = $props();

  const ctx = getSliderContext();
  const value = $derived(ctx.values[index] ?? ctx.values[0]);
  const formatted = $derived(ctx.formattedValues[index] ?? null);
</script>

<span {...rest} class={className} aria-hidden="true">
  {#if children}
    {@render children(formatted, value)}
  {:else}
    {formatted ?? value}
  {/if}
</span>
