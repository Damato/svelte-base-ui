<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import {
    setProgressContext,
    formatNumberValue,
    type ProgressStatus,
  } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Current value. Set to `null` for indeterminate state. */
    value: number | null;
    /** Minimum value. @default 0 */
    min?: number;
    /** Maximum value. @default 100 */
    max?: number;
    /** Options passed to `Intl.NumberFormat` when formatting the value. */
    format?: Intl.NumberFormatOptions;
    /** Locale for `Intl.NumberFormat`. Defaults to the runtime locale. */
    locale?: Intl.LocalesArgument;
    /**
     * Returns a human-readable text alternative for `aria-valuetext`.
     */
    getAriaValueText?: (formattedValue: string | null, value: number | null) => string;
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

  const status = $derived<ProgressStatus>(
    !Number.isFinite(value)
      ? 'indeterminate'
      : value === max
        ? 'complete'
        : 'progressing',
  );

  const formattedValue = $derived(formatNumberValue(value, locale, format));

  const defaultAriaValueText = $derived(
    value == null ? 'indeterminate progress' : (formattedValue ?? `${value}%`),
  );
  const ariaValueText = $derived(
    getAriaValueText ? getAriaValueText(formattedValue, value) : defaultAriaValueText,
  );

  setProgressContext({
    get value() { return value; },
    get min() { return min; },
    get max() { return max; },
    get status() { return status; },
    get formattedValue() { return formattedValue; },
    setLabelId(id) { labelId = id; },
  });
</script>

<div
  {...rest}
  class={className}
  role="progressbar"
  aria-labelledby={labelId}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value ?? undefined}
  aria-valuetext={ariaValueText}
  data-status={status}
>
  {@render children?.()}
  <!-- Forces NVDA to re-read the label when value changes -->
  <span role="presentation" aria-hidden="true" style="position:fixed;clip-path:inset(50%);overflow:hidden;white-space:nowrap;border:0;padding:0;width:1px;height:1px;margin:-1px">x</span>
</div>
