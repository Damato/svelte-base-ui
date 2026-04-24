<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getTabsContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The tab value that activates this panel (required). */
    value: string | number;
    /** Keep this panel mounted when not selected. @default false */
    keepMounted?: boolean;
    children?: Snippet;
  }

  let { value, keepMounted = false, class: className, children, ...rest }: Props = $props();

  const ctx = getTabsContext();
  const panelId = generateId('tabs-panel');

  const selected = $derived(ctx.isSelected(value));
  const shouldRender = $derived(keepMounted || selected);
</script>

{#if shouldRender}
  <div
    {...rest}
    class={className}
    id={panelId}
    role="tabpanel"
    hidden={!selected ? true : undefined}
    data-selected={selected ? '' : undefined}
  >
    {@render children?.()}
  </div>
{/if}
