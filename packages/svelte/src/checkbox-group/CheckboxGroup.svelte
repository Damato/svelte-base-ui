<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setCheckboxGroupContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Controlled list of checked values. */
    value?: string[];
    /** Initial checked values for uncontrolled usage. */
    defaultValue?: string[];
    /** All possible checkbox values (used by a parent checkbox). */
    allValues?: string[];
    /** Whether all checkboxes are disabled. @default false */
    disabled?: boolean;
    /** Called when the checked values change. */
    onValueChange?: (value: string[]) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = [],
    allValues: _allValues,
    disabled = false,
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue = $state([...defaultValue]);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function toggle(item: string) {
    if (disabled) return;
    const next = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];
    onValueChange?.(next);
    if (valueProp === undefined) {
      internalValue = next;
    }
  }

  setCheckboxGroupContext({
    get value() { return value; },
    get disabled() { return disabled; },
    toggle,
  });
</script>

<div {...rest} class={className} role="group" data-disabled={disabled ? '' : undefined}>
  {@render children?.()}
</div>
