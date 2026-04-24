<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setComboboxContext } from './context.js';
  import type { Placement } from '../utils/float.js';

  interface Props {
    value?: string | string[];
    defaultValue?: string | string[];
    multiple?: boolean;
    placement?: Placement;
    onValueChange?: (value: string | string[]) => void;
    onInputValueChange?: (value: string) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = undefined,
    multiple = false,
    placement = 'bottom-start',
    onValueChange,
    onInputValueChange,
    children,
  }: Props = $props();

  let internalValue: string | string[] | undefined = $state(defaultValue ?? (multiple ? [] : undefined));
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  let inputValue = $state('');
  let open = $state(false);
  let triggerEl: HTMLElement | null = $state(null);
  let inputEl: HTMLInputElement | null = $state(null);
  let popupEl: HTMLElement | null = $state(null);

  function isSelected(v: string): boolean {
    if (multiple && Array.isArray(value)) return value.includes(v);
    return value === v;
  }

  function select(v: string) {
    let next: string | string[];
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
    } else {
      next = v;
      inputValue = v;
      open = false;
    }
    onValueChange?.(next);
    if (valueProp === undefined) internalValue = next;
  }

  function setInputValue(v: string) {
    inputValue = v;
    open = v.length > 0;
    onInputValueChange?.(v);
  }

  function openList() { open = true; }
  function closeList() { open = false; }

  setComboboxContext({
    get value() { return value; },
    get multiple() { return multiple; },
    get inputValue() { return inputValue; },
    get open() { return open; },
    get placement() { return placement; },
    get triggerEl() { return triggerEl; },
    set triggerEl(v) { triggerEl = v; },
    get inputEl() { return inputEl; },
    set inputEl(v) { inputEl = v; },
    get popupEl() { return popupEl; },
    set popupEl(v) { popupEl = v; },
    isSelected,
    select,
    setInputValue,
    openList,
    closeList,
  });
</script>

{@render children?.()}
