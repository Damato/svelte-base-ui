<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The items count to compare against; show when count is 0. */
    itemCount?: number;
    children?: Snippet;
  }

  let { itemCount = 0, class: className, children, ...rest }: Props = $props();

  const ctx = getComboboxContext();
  const show = $derived(ctx.open && itemCount === 0);
</script>

{#if show}
  <div {...rest} class={className}>{@render children?.()}</div>
{/if}
