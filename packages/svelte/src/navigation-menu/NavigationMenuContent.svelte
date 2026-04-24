<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getNavMenuItemContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    keepMounted?: boolean;
    children?: Snippet;
  }

  let { keepMounted = false, class: className, children, ...rest }: Props = $props();

  const itemCtx = getNavMenuItemContext();
  const shouldRender = $derived(keepMounted || itemCtx.active);
</script>

{#if shouldRender}
  <div
    {...rest}
    class={className}
    hidden={!itemCtx.active ? true : undefined}
    data-active={itemCtx.active ? '' : undefined}
  >
    {@render children?.()}
  </div>
{/if}
