<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setToggleGroupContext } from '../toggle/context.js';

  type Orientation = 'horizontal' | 'vertical';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Controlled list of pressed values. */
    value?: string[];
    /** Initial list of pressed values for uncontrolled usage. */
    defaultValue?: string[];
    /** Whether to allow multiple pressed toggles. @default false */
    multiple?: boolean;
    /** Whether all toggles are disabled. @default false */
    disabled?: boolean;
    /** Layout direction. @default 'horizontal' */
    orientation?: Orientation;
    /** Called when the pressed values change. */
    onValueChange?: (value: string[]) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = [],
    multiple = false,
    disabled = false,
    orientation = 'horizontal',
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue = $state([...defaultValue]);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function toggle(item: string) {
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
    if (valueProp === undefined) {
      internalValue = next;
    }
  }

  setToggleGroupContext({
    get value() { return value; },
    get disabled() { return disabled; },
    get multiple() { return multiple; },
    toggle,
  });
</script>

<div
  {...rest}
  class={className}
  role="group"
  data-orientation={orientation}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
