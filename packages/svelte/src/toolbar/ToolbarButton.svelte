<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToolbarContext } from './context.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    disabled?: boolean;
    children?: Snippet;
  }

  let { disabled: disabledProp = false, class: className, children, ...rest }: Props = $props();

  const ctx = getToolbarContext();
  const disabled = $derived(ctx?.disabled || disabledProp);
</script>

<button
  {...rest}
  class={className}
  type="button"
  disabled={disabled}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</button>
