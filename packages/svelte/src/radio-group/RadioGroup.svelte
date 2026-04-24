<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setRadioGroupContext } from './context.js';
  import { getFieldContext } from '../field/context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Controlled selected value. */
    value?: string;
    /** Initial value for uncontrolled usage. */
    defaultValue?: string;
    /** Whether all radios are disabled. @default false */
    disabled?: boolean;
    /** Whether the group is read-only. @default false */
    readOnly?: boolean;
    /** Whether a selection is required. @default false */
    required?: boolean;
    /** Form field name. */
    name?: string;
    /** Associated form id. */
    form?: string;
    /** Called when the selected value changes. */
    onValueChange?: (value: string) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = undefined,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    name: nameProp,
    form,
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const fieldCtx = getFieldContext();
  const disabled = $derived(fieldCtx?.disabled || disabledProp);
  const name = $derived(fieldCtx?.name ?? nameProp);

  let internalValue: string | undefined = $state(defaultValue);
  const checkedValue = $derived(valueProp !== undefined ? valueProp : internalValue);

  function select(val: string) {
    if (disabled || readOnly) return;
    onValueChange?.(val);
    if (valueProp === undefined) {
      internalValue = val;
    }
  }

  setRadioGroupContext({
    get checkedValue() { return checkedValue; },
    get disabled() { return disabled; },
    get readOnly() { return readOnly; },
    get required() { return required; },
    get name() { return name; },
    get form() { return form; },
    select,
  });
</script>

<div
  {...rest}
  class={className}
  role="radiogroup"
  aria-disabled={disabled || undefined}
  aria-required={required || undefined}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
