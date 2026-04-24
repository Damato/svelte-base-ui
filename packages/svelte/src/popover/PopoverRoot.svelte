<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setPopoverContext } from './context.js';
  import type { Placement } from '../utils/float.js';

  interface Props {
    /** Whether the popover is open (controlled). */
    open?: boolean;
    /** Initial open state for uncontrolled usage. @default false */
    defaultOpen?: boolean;
    /** Preferred popup placement. @default 'bottom' */
    placement?: Placement;
    /** Whether to trap focus inside the popup. @default false */
    modal?: boolean;
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    open: openProp = undefined,
    defaultOpen = false,
    placement = 'bottom',
    modal = false,
    onOpenChange,
    children,
  }: Props = $props();

  let internalOpen = $state(defaultOpen);
  const open = $derived(openProp !== undefined ? openProp : internalOpen);

  let titleId: string | undefined = $state(undefined);
  let descriptionId: string | undefined = $state(undefined);
  let triggerId: string | undefined = $state(undefined);

  // Mutable references stored on the context object itself
  let triggerEl: HTMLElement | null = $state(null);
  let popupEl: HTMLElement | null = $state(null);
  let arrowEl: HTMLElement | null = $state(null);

  function toggle() {
    const next = !open;
    onOpenChange?.(next);
    if (openProp === undefined) internalOpen = next;
  }

  function close() {
    onOpenChange?.(false);
    if (openProp === undefined) internalOpen = false;
  }

  const ctx = {
    get open() { return open; },
    get modal() { return modal; },
    get titleId() { return titleId; },
    get descriptionId() { return descriptionId; },
    get triggerId() { return triggerId; },
    get placement() { return placement; },
    get triggerEl() { return triggerEl; },
    set triggerEl(v) { triggerEl = v; },
    get popupEl() { return popupEl; },
    set popupEl(v) { popupEl = v; },
    get arrowEl() { return arrowEl; },
    set arrowEl(v) { arrowEl = v; },
    setTitleId(id: string | undefined) { titleId = id; },
    setDescriptionId(id: string | undefined) { descriptionId = id; },
    setTriggerId(id: string | undefined) { triggerId = id; },
    toggle,
    close,
  };

  setPopoverContext(ctx);
</script>

{@render children?.()}
