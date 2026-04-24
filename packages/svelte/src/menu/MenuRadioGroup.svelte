<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getContext, setContext } from 'svelte';

  export interface MenuRadioGroupContext {
    readonly value: string | undefined;
    select(v: string): void;
  }

  export const MENU_RADIO_KEY = Symbol('base-ui:menu-radio');

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children?: Snippet;
  }

  let {
    value: valueProp = undefined,
    defaultValue = undefined,
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalValue: string | undefined = $state(defaultValue);
  const value = $derived(valueProp !== undefined ? valueProp : internalValue);

  function select(v: string) {
    onValueChange?.(v);
    if (valueProp === undefined) internalValue = v;
  }

  setContext<MenuRadioGroupContext>(MENU_RADIO_KEY, {
    get value() { return value; },
    select,
  });
</script>

<div {...rest} class={className} role="group">
  {@render children?.()}
</div>
