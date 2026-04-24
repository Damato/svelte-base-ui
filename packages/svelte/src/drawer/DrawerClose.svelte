<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDrawerContext } from './context.js';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, children, onclick, ...rest }: Props = $props();

  const ctx = getDrawerContext();
</script>

<button
  {...rest}
  class={className}
  onclick={(e) => {
    ctx.setOpen(false);
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
  }}
>
  {@render children?.()}
</button>
