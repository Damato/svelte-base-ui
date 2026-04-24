<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setSliderContext, clamp, snapToStep } from './context.js';
  import { formatNumberValue } from '../progress/context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: number | number[];
    defaultValue?: number | number[];
    min?: number;
    max?: number;
    step?: number;
    largeStep?: number;
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    name?: string;
    form?: string;
    format?: Intl.NumberFormatOptions;
    locale?: Intl.LocalesArgument;
    onValueChange?: (value: number | number[]) => void;
    onValueCommitted?: (value: number | number[]) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    orientation = 'horizontal',
    name,
    form,
    format,
    locale,
    onValueChange,
    onValueCommitted,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const toArray = (v: number | number[] | undefined): number[] =>
    Array.isArray(v) ? v : v !== undefined ? [v] : [0];

  let internalValues = $state(toArray(defaultValue));
  const values = $derived(valueProp !== undefined ? toArray(valueProp) : internalValues);

  const formattedValues = $derived(
    values.map((v) => formatNumberValue(v, locale, format)),
  );

  const isMultiple = $derived(values.length > 1);

  function updateThumb(index: number, newValue: number) {
    const clamped = clamp(snapToStep(newValue, min, step), min, max);
    const next = [...values];
    next[index] = clamped;
    onValueChange?.(isMultiple ? next : next[0]);
    if (valueProp === undefined) internalValues = next;
  }

  function commitThumb(index: number, newValue: number) {
    const clamped = clamp(snapToStep(newValue, min, step), min, max);
    const next = [...values];
    next[index] = clamped;
    onValueCommitted?.(isMultiple ? next : next[0]);
  }

  setSliderContext({
    get values() { return values; },
    get min() { return min; },
    get max() { return max; },
    get step() { return step; },
    get disabled() { return disabled; },
    get orientation() { return orientation; },
    get name() { return name; },
    get form() { return form; },
    get formattedValues() { return formattedValues; },
    updateThumb,
    commitThumb,
  });
</script>

<div
  {...rest}
  class={className}
  data-disabled={disabled ? '' : undefined}
  data-orientation={orientation}
>
  {@render children?.()}
</div>
