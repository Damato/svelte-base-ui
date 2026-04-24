<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToastItemContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getToastItemContext();
</script>

<div {...rest} class={className}>
  {#if children}
    {@render children()}
  {:else}
    {ctx.toast.title}
  {/if}
</div>
