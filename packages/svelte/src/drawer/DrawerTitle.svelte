<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDrawerContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getDrawerContext();
</script>

<h2 {...rest} id={ctx.titleId} class={className}>
  {@render children?.()}
</h2>
