<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSelectContext } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Placeholder text shown when nothing is selected. */
    placeholder?: string;
    children?: Snippet<[value: string | string[] | undefined]> | null;
  }

  let { placeholder, class: className, children, ...rest }: Props = $props();

  const ctx = getSelectContext();

  const displayValue = $derived(
    Array.isArray(ctx.value) ? ctx.value.join(', ') : ctx.value,
  );
</script>

<span {...rest} class={className}>
  {#if children}
    {@render children(ctx.value)}
  {:else if displayValue}
    {displayValue}
  {:else if placeholder}
    <span data-placeholder="">{placeholder}</span>
  {/if}
</span>
