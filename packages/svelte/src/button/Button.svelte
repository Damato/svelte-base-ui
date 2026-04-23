<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    disabled?: boolean;
    /**
     * Whether the button should remain focusable when disabled.
     * @default false
     */
    focusableWhenDisabled?: boolean;
    children?: Snippet;
  }

  let {
    disabled = false,
    focusableWhenDisabled = false,
    class: className,
    children,
    tabindex,
    ...rest
  }: Props = $props();

  const isNativelyDisabled = $derived(disabled && !focusableWhenDisabled);
  const ariaDisabled = $derived(disabled && focusableWhenDisabled ? true : undefined);
  const resolvedTabIndex = $derived(
    disabled && focusableWhenDisabled ? 0 : tabindex,
  );
</script>

<button
  {...rest}
  class={className}
  disabled={isNativelyDisabled}
  aria-disabled={ariaDisabled}
  tabindex={resolvedTabIndex}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</button>
