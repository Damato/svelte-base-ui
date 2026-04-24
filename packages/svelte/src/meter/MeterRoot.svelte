<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setMeterContext } from './context.js';
  import { formatNumberValue, valueToPercent } from '../progress/context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Current value (required). */
    value: number;
    /** Minimum value. @default 0 */
    min?: number;
    /** Maximum value. @default 100 */
    max?: number;
    /** `Intl.NumberFormat` options for value formatting. */
    format?: Intl.NumberFormatOptions;
    /** Locale for `Intl.NumberFormat`. */
    locale?: Intl.LocalesArgument;
    /** Returns a human-readable `aria-valuetext`. */
    getAriaValueText?: (formattedValue: string | null, value: number) => string;
    children?: Snippet;
  }

  let {
    value,
    min = 0,
    max = 100,
    format,
    locale,
    getAriaValueText,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let labelId: string | undefined = $state(undefined);

  const formattedValue = $derived(formatNumberValue(value, locale, format));

  const percentageValue = $derived(valueToPercent(value, min, max));

  const ariaValueText = $derived(
    getAriaValueText
      ? getAriaValueText(formattedValue, value)
      : (formattedValue ?? `${percentageValue.toFixed(0)}%`),
  );

  setMeterContext({
    get value() { return value; },
    get min() { return min; },
    get max() { return max; },
    get formattedValue() { return formattedValue; },
    setLabelId(id) { labelId = id; },
  });
</script>

<div
  {...rest}
  class={className}
  role="meter"
  aria-labelledby={labelId}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  aria-valuetext={ariaValueText}
>
  {@render children?.()}
</div>
