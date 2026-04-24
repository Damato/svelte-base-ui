<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setTabsContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Controlled selected tab value. */
    value?: string | number;
    /** Initial selected tab for uncontrolled usage. @default 0 */
    defaultValue?: string | number;
    /** @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical';
    /** Called when the selected tab changes. */
    onValueChange?: (value: string | number) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = 0,
    orientation = 'horizontal',
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue: string | number = $state(defaultValue);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function select(v: string | number) {
    onValueChange?.(v);
    if (valueProp === undefined) internalValue = v;
  }

  setTabsContext({
    get value() { return value; },
    get orientation() { return orientation; },
    select,
    isSelected: (v) => v === value,
  });
</script>

<div
  {...rest}
  class={className}
  data-orientation={orientation}
>
  {@render children?.()}
</div>
