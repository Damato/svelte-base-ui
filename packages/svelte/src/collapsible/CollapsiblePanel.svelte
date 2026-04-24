<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getCollapsibleContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Whether to keep the element in the DOM when closed.
     * When `false` (default) the panel is removed from the DOM on close.
     * @default false
     */
    keepMounted?: boolean;
    children?: Snippet;
  }

  let { keepMounted = false, class: className, children, ...rest }: Props = $props();

  const ctx = getCollapsibleContext();

  const shouldRender = $derived(keepMounted || ctx.open);
</script>

{#if shouldRender}
  <div
    {...rest}
    id={ctx.panelId}
    class={className}
    hidden={!ctx.open ? true : undefined}
    data-open={ctx.open ? '' : undefined}
    data-closed={!ctx.open ? '' : undefined}
  >
    {@render children?.()}
  </div>
{/if}
