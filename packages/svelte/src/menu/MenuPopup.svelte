<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMenuContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getMenuContext();
</script>

<div {...rest} class={className} role="menu" data-open="" tabindex={-1}>
  {@render children?.()}
</div>
