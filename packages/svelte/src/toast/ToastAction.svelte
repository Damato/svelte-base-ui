<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToastItemContext } from './context.js';

  interface Props extends HTMLButtonAttributes {
    closeOnClick?: boolean;
    children?: Snippet;
  }

  let { class: className, children, closeOnClick = false, onclick, ...rest }: Props = $props();

  const ctx = getToastItemContext();
</script>

<button
  {...rest}
  class={className}
  onclick={(e) => {
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
    if (closeOnClick) ctx.close();
  }}
>
  {@render children?.()}
</button>
