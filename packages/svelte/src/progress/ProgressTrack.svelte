<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getProgressContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getProgressContext();
</script>

<div {...rest} class={className} data-status={ctx.status}>
  {@render children?.()}
</div>
