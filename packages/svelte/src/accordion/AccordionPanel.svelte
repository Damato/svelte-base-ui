<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getAccordionItemContext, getAccordionRootContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Keep this panel in the DOM when closed. Overrides root keepMounted. */
    keepMounted?: boolean;
    children?: Snippet;
  }

  let { keepMounted: keepMountedProp, class: className, children, ...rest }: Props = $props();

  const rootCtx = getAccordionRootContext();
  const itemCtx = getAccordionItemContext();

  const keepMounted = $derived(keepMountedProp ?? rootCtx.keepMounted);
  const shouldRender = $derived(keepMounted || itemCtx.open);
</script>

{#if shouldRender}
  <div
    {...rest}
    id={itemCtx.panelId}
    class={className}
    role="region"
    aria-labelledby={itemCtx.triggerId}
    hidden={!itemCtx.open ? true : undefined}
    data-open={itemCtx.open ? '' : undefined}
    data-closed={!itemCtx.open ? '' : undefined}
  >
    {@render children?.()}
  </div>
{/if}
