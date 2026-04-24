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
  id={ctx.triggerId}
  class={className}
  aria-haspopup="dialog"
  aria-expanded={ctx.open}
  onclick={(e) => {
    ctx.setOpen(true);
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
  }}
>
  {@render children?.()}
</button>
