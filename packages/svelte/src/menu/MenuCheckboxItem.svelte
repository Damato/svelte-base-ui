<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMenuContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    closeOnClick?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    children?: Snippet;
  }

  let {
    checked: checkedProp = undefined,
    defaultChecked = false,
    disabled = false,
    closeOnClick = false,
    onCheckedChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getMenuContext();
  let internalChecked = $state(defaultChecked);
  const checked = $derived(checkedProp !== undefined ? checkedProp : internalChecked);

  function handleClick() {
    if (disabled) return;
    const next = !checked;
    onCheckedChange?.(next);
    if (checkedProp === undefined) internalChecked = next;
    if (closeOnClick) ctx.close();
  }
</script>

<div
  {...rest}
  class={className}
  role="menuitemcheckbox"
  aria-checked={checked}
  aria-disabled={disabled || undefined}
  tabindex={disabled ? undefined : -1}
  data-checked={checked ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onclick={handleClick}
>
  {@render children?.()}
</div>
