<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setNumberFieldContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: number | null;
    defaultValue?: number | null;
    min?: number;
    max?: number;
    step?: number;
    largeStep?: number;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    onValueChange?: (value: number | null) => void;
    onValueCommitted?: (value: number | null) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = null,
    min,
    max,
    step = 1,
    disabled = false,
    readOnly = false,
    required = false,
    onValueChange,
    onValueCommitted,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue: number | null = $state(defaultValue);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  const inputId = generateId('number-field-input');

  function clampValue(v: number): number {
    if (min !== undefined && v < min) return min;
    if (max !== undefined && v > max) return max;
    return v;
  }

  function setValue(v: number | null) {
    const next = v !== null ? clampValue(v) : null;
    onValueChange?.(next);
    if (valueProp === undefined) internalValue = next;
  }

  function increment() {
    if (disabled || readOnly) return;
    setValue((value ?? 0) + step);
  }

  function decrement() {
    if (disabled || readOnly) return;
    setValue((value ?? 0) - step);
  }

  setNumberFieldContext({
    get value() { return value; },
    get min() { return min; },
    get max() { return max; },
    get step() { return step; },
    get disabled() { return disabled; },
    get readOnly() { return readOnly; },
    get required() { return required; },
    inputId,
    increment,
    decrement,
    setValue,
  });
</script>

<div
  {...rest}
  class={className}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
