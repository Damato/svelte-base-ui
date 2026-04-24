<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getContext, setContext } from 'svelte';
  import { getComboboxContext } from './context.js';

  export const COMBOBOX_ITEM_KEY = Symbol('base-ui:combobox-item');

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
    children?: Snippet;
  }

  let { value, disabled = false, class: className, children, ...rest }: Props = $props();

  const ctx = getComboboxContext();
  const selected = $derived(ctx.isSelected(value));

  setContext(COMBOBOX_ITEM_KEY, { get selected() { return selected; } });
</script>

<div
  {...rest}
  class={className}
  role="option"
  aria-selected={selected}
  aria-disabled={disabled || undefined}
  tabindex={disabled ? undefined : -1}
  data-selected={selected ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onmousedown|preventDefault={() => { if (!disabled) ctx.select(value); }}
>
  {@render children?.()}
</div>
