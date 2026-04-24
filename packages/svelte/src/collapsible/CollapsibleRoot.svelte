<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setCollapsibleContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Whether the panel is open (controlled). */
    open?: boolean;
    /** Initial open state for uncontrolled usage. @default false */
    defaultOpen?: boolean;
    /** Whether the component ignores user interaction. @default false */
    disabled?: boolean;
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    open: openProp = undefined,
    defaultOpen = false,
    disabled = false,
    onOpenChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalOpen = $state(defaultOpen);
  const open = $derived(openProp !== undefined ? openProp : internalOpen);

  // Stable panel ID shared with trigger via context.
  const panelId = `collapsible-panel-${Math.random().toString(36).slice(2, 9)}`;

  function toggle() {
    if (disabled) return;
    const nextOpen = !open;
    onOpenChange?.(nextOpen);
    if (openProp === undefined) {
      internalOpen = nextOpen;
    }
  }

  setCollapsibleContext({
    get open() { return open; },
    get disabled() { return disabled; },
    panelId,
    toggle,
  });
</script>

<div
  {...rest}
  class={className}
  data-open={open ? '' : undefined}
  data-closed={!open ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
