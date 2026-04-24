<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setMenuContext } from './context.js';
  import type { Placement } from '../utils/float.js';

  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    placement?: Placement;
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    open: openProp = undefined,
    defaultOpen = false,
    placement = 'bottom-start',
    onOpenChange,
    children,
  }: Props = $props();

  let internalOpen = $state(defaultOpen);
  const open = $derived(openProp !== undefined ? openProp : internalOpen);

  let triggerEl: HTMLElement | null = $state(null);
  let popupEl: HTMLElement | null = $state(null);
  let highlightedIndex = $state(-1);

  function toggle() {
    const next = !open;
    onOpenChange?.(next);
    if (openProp === undefined) internalOpen = next;
    if (!next) highlightedIndex = -1;
  }

  function close() {
    onOpenChange?.(false);
    if (openProp === undefined) internalOpen = false;
    highlightedIndex = -1;
  }

  setMenuContext({
    get open() { return open; },
    get placement() { return placement; },
    get triggerEl() { return triggerEl; },
    set triggerEl(v) { triggerEl = v; },
    get popupEl() { return popupEl; },
    set popupEl(v) { popupEl = v; },
    get highlightedIndex() { return highlightedIndex; },
    set highlightedIndex(v) { highlightedIndex = v; },
    toggle,
    close,
  });
</script>

{@render children?.()}
