<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDrawerContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getDrawerContext();
</script>

<p {...rest} id={ctx.descriptionId} class={className}>
  {@render children?.()}
</p>
