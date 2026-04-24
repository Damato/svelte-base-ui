<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getTabsContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    /** This tab's value (required). */
    value: string | number;
    /** Whether this tab is disabled. @default false */
    disabled?: boolean;
    children?: Snippet;
  }

  let { value, disabled = false, class: className, children, ...rest }: Props = $props();

  const ctx = getTabsContext();
  const panelId = generateId('tabs-panel');
  const tabId = generateId('tabs-tab');

  const selected = $derived(ctx.isSelected(value));
</script>

<button
  {...rest}
  class={className}
  type="button"
  id={tabId}
  role="tab"
  {disabled}
  aria-selected={selected}
  aria-controls={panelId}
  tabindex={selected ? 0 : -1}
  data-selected={selected ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onclick={() => ctx.select(value)}
>
  {@render children?.()}
</button>
