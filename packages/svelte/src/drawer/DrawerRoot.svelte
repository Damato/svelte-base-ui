<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setDrawerContext, type DrawerSwipeDirection } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    swipeDirection?: DrawerSwipeDirection;
    modal?: boolean;
    children?: Snippet;
  }

  let {
    open: openProp = undefined,
    defaultOpen = false,
    onOpenChange,
    swipeDirection = 'down',
    modal = true,
    children,
  }: Props = $props();

  let internalOpen = $state(defaultOpen);
  const open = $derived(openProp !== undefined ? openProp : internalOpen);

  const titleId = generateId('drawer-title');
  const descriptionId = generateId('drawer-description');
  const triggerId = generateId('drawer-trigger');

  function setOpen(value: boolean) {
    if (openProp !== undefined) {
      onOpenChange?.(value);
    } else {
      internalOpen = value;
      onOpenChange?.(value);
    }
  }

  setDrawerContext({
    get open() { return open; },
    get swipeDirection() { return swipeDirection; },
    titleId,
    descriptionId,
    triggerId,
    setOpen,
  });
</script>

{@render children?.()}
