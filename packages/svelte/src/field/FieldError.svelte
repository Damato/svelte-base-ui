<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getFieldContext();

  const shouldShow = $derived(ctx?.invalid ?? false);
</script>

{#if shouldShow}
  <span {...rest} class={className} role="alert">
    {@render children?.()}
  </span>
{/if}
