<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { SELECT_ITEM_KEY } from './SelectItem.svelte';

  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const itemCtx = getContext<{ selected: boolean } | undefined>(SELECT_ITEM_KEY);
</script>

{#if itemCtx?.selected}
  <span {...rest} class={className} aria-hidden="true">
    {@render children?.()}
  </span>
{/if}
