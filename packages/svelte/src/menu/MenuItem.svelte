<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMenuContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    /** Close the menu after clicking this item. @default true */
    closeOnClick?: boolean;
    children?: Snippet;
  }

  let {
    disabled = false,
    closeOnClick = true,
    class: className,
    children,
    onclick: onclickProp,
    ...rest
  }: Props = $props();

  const ctx = getMenuContext();

  function handleClick(event: MouseEvent) {
    if (disabled) return;
    onclickProp?.(event);
    if (closeOnClick) ctx.close();
  }
</script>

<div
  {...rest}
  class={className}
  role="menuitem"
  aria-disabled={disabled || undefined}
  tabindex={disabled ? undefined : -1}
  data-disabled={disabled ? '' : undefined}
  onclick={handleClick}
>
  {@render children?.()}
</div>
