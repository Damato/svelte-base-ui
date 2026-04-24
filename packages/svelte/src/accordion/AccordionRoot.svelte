<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setAccordionRootContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Controlled open items. */
    value?: string[];
    /** Initial open items for uncontrolled usage. */
    defaultValue?: string[];
    /** Allow multiple items open simultaneously. @default false */
    multiple?: boolean;
    /** Disable all items. @default false */
    disabled?: boolean;
    /** Keep panels mounted when closed. @default false */
    keepMounted?: boolean;
    /** @default 'vertical' */
    orientation?: 'horizontal' | 'vertical';
    /** Called when open items change. */
    onValueChange?: (value: string[]) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = [],
    multiple = false,
    disabled = false,
    keepMounted = false,
    orientation = 'vertical',
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue = $state([...defaultValue]);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function toggleItem(item: string) {
    if (disabled) return;
    let next: string[];
    if (multiple) {
      next = value.includes(item)
        ? value.filter((v) => v !== item)
        : [...value, item];
    } else {
      next = value.includes(item) ? [] : [item];
    }
    onValueChange?.(next);
    if (valueProp === undefined) internalValue = next;
  }

  function isOpen(item: string) {
    return value.includes(item);
  }

  setAccordionRootContext({
    get value() { return value; },
    get disabled() { return disabled; },
    get multiple() { return multiple; },
    get orientation() { return orientation; },
    get keepMounted() { return keepMounted; },
    toggleItem,
    isOpen,
  });
</script>

<div
  {...rest}
  class={className}
  data-orientation={orientation}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
