<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { getMenuContext } from './context.js';
  import { MENU_RADIO_KEY, type MenuRadioGroupContext } from './MenuRadioGroup.svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
    closeOnClick?: boolean;
    children?: Snippet;
  }

  let { value, disabled = false, closeOnClick = false, class: className, children, ...rest }: Props = $props();

  const menuCtx = getMenuContext();
  const radioCtx = getContext<MenuRadioGroupContext | undefined>(MENU_RADIO_KEY);

  const checked = $derived(radioCtx?.value === value);

  function handleClick() {
    if (disabled) return;
    radioCtx?.select(value);
    if (closeOnClick) menuCtx.close();
  }
</script>

<div
  {...rest}
  class={className}
  role="menuitemradio"
  aria-checked={checked}
  aria-disabled={disabled || undefined}
  tabindex={disabled ? undefined : -1}
  data-checked={checked ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onclick={handleClick}
>
  {@render children?.()}
</div>
