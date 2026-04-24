<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToolbarContext } from './context.js';

  interface Props extends HTMLAnchorAttributes { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getToolbarContext();
  const disabled = $derived(ctx?.disabled ?? false);
</script>

<a
  {...rest}
  class={className}
  aria-disabled={disabled || undefined}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</a>
