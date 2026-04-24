<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setSelectContext } from './context.js';
  import type { Placement } from '../utils/float.js';

  interface Props {
    value?: string | string[];
    defaultValue?: string | string[];
    multiple?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    placement?: Placement;
    name?: string;
    form?: string;
    onValueChange?: (value: string | string[]) => void;
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = undefined,
    multiple = false,
    disabled = false,
    readOnly = false,
    required = false,
    open: openProp = undefined,
    defaultOpen = false,
    placement = 'bottom-start',
    onValueChange,
    onOpenChange,
    children,
  }: Props = $props();

  let internalValue: string | string[] | undefined = $state(
    defaultValue ?? (multiple ? [] : undefined),
  );
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  let internalOpen = $state(defaultOpen);
  const open = $derived(openProp !== undefined ? openProp : internalOpen);

  let triggerEl: HTMLElement | null = $state(null);
  let popupEl: HTMLElement | null = $state(null);

  function isSelected(v: string): boolean {
    if (multiple && Array.isArray(value)) return value.includes(v);
    return value === v;
  }

  function select(v: string) {
    if (disabled || readOnly) return;
    let next: string | string[];
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
    } else {
      next = v;
      close();
    }
    onValueChange?.(next);
    if (valueProp === undefined) internalValue = next;
  }

  function toggle() {
    const next = !open;
    onOpenChange?.(next);
    if (openProp === undefined) internalOpen = next;
  }

  function close() {
    onOpenChange?.(false);
    if (openProp === undefined) internalOpen = false;
  }

  setSelectContext({
    get value() { return value; },
    get multiple() { return multiple; },
    get disabled() { return disabled; },
    get readOnly() { return readOnly; },
    get required() { return required; },
    get open() { return open; },
    get placement() { return placement; },
    get triggerEl() { return triggerEl; },
    set triggerEl(v) { triggerEl = v; },
    get popupEl() { return popupEl; },
    set popupEl(v) { popupEl = v; },
    isSelected,
    select,
    toggle,
    close,
  });
</script>

{@render children?.()}
