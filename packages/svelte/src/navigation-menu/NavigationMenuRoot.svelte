<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setNavMenuRootContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLElement> {
    value?: string;
    defaultValue?: string;
    orientation?: 'horizontal' | 'vertical';
    onValueChange?: (value: string | undefined) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = undefined,
    orientation = 'horizontal',
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue: string | undefined = $state(defaultValue);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function setActiveItem(v: string | undefined) {
    onValueChange?.(v);
    if (valueProp === undefined) internalValue = v;
  }

  setNavMenuRootContext({
    get value() { return value; },
    get orientation() { return orientation; },
    setActiveItem,
    isActive: (v) => value === v,
  });
</script>

<nav
  {...rest}
  class={className}
  aria-label={rest['aria-label'] ?? 'Main navigation'}
  data-orientation={orientation}
>
  {@render children?.()}
</nav>
