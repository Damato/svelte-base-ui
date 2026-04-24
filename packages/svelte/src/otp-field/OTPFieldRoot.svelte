<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setOTPFieldContext } from './context.js';

  type ValidationType = 'numeric' | 'alphanumeric' | 'alphabetic';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    length?: number;
    validationType?: ValidationType;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    form?: string;
    mask?: boolean;
    onValueChange?: (value: string) => void;
    onValueComplete?: (value: string) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = '',
    length = 6,
    validationType = 'numeric',
    disabled = false,
    readOnly = false,
    onValueChange,
    onValueComplete,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue = $state(defaultValue);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function sanitize(raw: string): string {
    const chars = validationType === 'numeric'
      ? raw.replace(/\D/g, '')
      : validationType === 'alphabetic'
        ? raw.replace(/[^a-zA-Z]/g, '')
        : raw.replace(/[^a-zA-Z0-9]/g, '');
    return chars.slice(0, length);
  }

  function setValue(v: string) {
    const sanitized = sanitize(v);
    onValueChange?.(sanitized);
    if (valueProp === undefined) internalValue = sanitized;
    if (sanitized.length === length) onValueComplete?.(sanitized);
  }

  setOTPFieldContext({
    get value() { return value; },
    get length() { return length; },
    get disabled() { return disabled; },
    get readOnly() { return readOnly; },
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
