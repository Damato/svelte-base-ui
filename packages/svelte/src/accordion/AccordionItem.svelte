<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getAccordionRootContext, setAccordionItemContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Unique identifier for this item (required). */
    value: string;
    /** Whether this item is disabled. @default false */
    disabled?: boolean;
    children?: Snippet;
  }

  let {
    value,
    disabled: disabledProp = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const rootCtx = getAccordionRootContext();
  const triggerId = generateId('accordion-trigger');
  const panelId = generateId('accordion-panel');

  const open = $derived(rootCtx.isOpen(value));
  const disabled = $derived(rootCtx.disabled || disabledProp);

  setAccordionItemContext({
    get open() { return open; },
    get disabled() { return disabled; },
    value,
    triggerId,
    panelId,
  });
</script>

<div
  {...rest}
  class={className}
  data-open={open ? '' : undefined}
  data-closed={!open ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
