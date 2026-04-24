<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToggleGroupContext } from './context.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    /** Whether the toggle is pressed (controlled). */
    pressed?: boolean;
    /** Initial pressed state for uncontrolled usage. @default false */
    defaultPressed?: boolean;
    /** Whether the toggle is disabled. @default false */
    disabled?: boolean;
    /** Value identifier when used inside a ToggleGroup. */
    value?: string;
    /** Called when the pressed state changes. */
    onPressedChange?: (pressed: boolean) => void;
    children?: Snippet;
  }

  let {
    pressed: pressedProp = undefined,
    defaultPressed = false,
    disabled = false,
    value,
    onPressedChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const groupCtx = getToggleGroupContext();

  let internalPressed = $state(defaultPressed);

  const pressed = $derived(
    groupCtx && value !== undefined
      ? groupCtx.value.includes(value)
      : pressedProp !== undefined
        ? pressedProp
        : internalPressed,
  );

  const isDisabled = $derived(disabled || (groupCtx?.disabled ?? false));

  function handleClick() {
    if (isDisabled) return;
    if (groupCtx && value !== undefined) {
      groupCtx.toggle(value);
    } else {
      const next = !pressed;
      onPressedChange?.(next);
      if (pressedProp === undefined) {
        internalPressed = next;
      }
    }
  }
</script>

<button
  {...rest}
  class={className}
  type="button"
  disabled={isDisabled}
  aria-pressed={pressed}
  data-pressed={pressed ? '' : undefined}
  data-disabled={isDisabled ? '' : undefined}
  onclick={handleClick}
>
  {@render children?.()}
</button>
