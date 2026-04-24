<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToastItemContext } from './context.js';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, children, onclick, ...rest }: Props = $props();

  const ctx = getToastItemContext();
</script>

<button
  {...rest}
  class={className}
  aria-label="Close"
  onclick={(e) => {
    ctx.close();
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
  }}
>
  {@render children?.()}
</button>
