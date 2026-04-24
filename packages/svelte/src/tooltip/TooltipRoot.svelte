<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setTooltipContext } from './context.js';
  import type { Placement } from '../utils/float.js';

  interface Props {
    /** Whether the tooltip is open (controlled). */
    open?: boolean;
    /** Initial open state for uncontrolled usage. @default false */
    defaultOpen?: boolean;
    /** Whether the tooltip is disabled. @default false */
    disabled?: boolean;
    /** Preferred popup placement. @default 'top' */
    placement?: Placement;
    /** Delay in ms before opening. @default 600 */
    delay?: number;
    /** Delay in ms before closing. @default 0 */
    closeDelay?: number;
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    open: openProp = undefined,
    defaultOpen = false,
    disabled = false,
    placement = 'top',
    delay = 600,
    closeDelay = 0,
    onOpenChange,
    children,
  }: Props = $props();

  let internalOpen = $state(defaultOpen);
  const open = $derived(!disabled && (openProp !== undefined ? openProp : internalOpen));

  let openTimer: ReturnType<typeof setTimeout> | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  let triggerEl: HTMLElement | null = $state(null);
  let popupEl: HTMLElement | null = $state(null);
  let arrowEl: HTMLElement | null = $state(null);

  function openTooltip() {
    if (disabled) return;
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    openTimer = setTimeout(() => {
      onOpenChange?.(true);
      if (openProp === undefined) internalOpen = true;
    }, delay);
  }

  function closeTooltip() {
    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
    closeTimer = setTimeout(() => {
      onOpenChange?.(false);
      if (openProp === undefined) internalOpen = false;
    }, closeDelay);
  }

  const ctx = {
    get open() { return open; },
    get placement() { return placement; },
    get triggerEl() { return triggerEl; },
    set triggerEl(v) { triggerEl = v; },
    get popupEl() { return popupEl; },
    set popupEl(v) { popupEl = v; },
    get arrowEl() { return arrowEl; },
    set arrowEl(v) { arrowEl = v; },
    openTooltip,
    closeTooltip,
  };

  setTooltipContext(ctx);
</script>

{@render children?.()}
