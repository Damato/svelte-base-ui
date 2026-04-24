<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setDialogContext } from './context.js';

  interface Props {
    /** Whether the dialog is open (controlled). */
    open?: boolean;
    /** Initial open state for uncontrolled usage. @default false */
    defaultOpen?: boolean;
    /** Whether the dialog is modal (traps focus/scroll). @default true */
    modal?: boolean;
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** Called after open/close animation completes. */
    onOpenChangeComplete?: (open: boolean) => void;
    children?: Snippet;
  }

  let {
    open: openProp = undefined,
    defaultOpen = false,
    modal = true,
    onOpenChange,
    onOpenChangeComplete: _onOpenChangeComplete,
    children,
  }: Props = $props();

  let internalOpen = $state(defaultOpen);
  const open = $derived(openProp !== undefined ? openProp : internalOpen);

  let titleId: string | undefined = $state(undefined);
  let descriptionId: string | undefined = $state(undefined);
  let triggerId: string | undefined = $state(undefined);

  function close() {
    onOpenChange?.(false);
    if (openProp === undefined) internalOpen = false;
  }

  setDialogContext({
    get open() { return open; },
    get modal() { return modal; },
    get titleId() { return titleId; },
    get descriptionId() { return descriptionId; },
    get triggerId() { return triggerId; },
    setTitleId(id) { titleId = id; },
    setDescriptionId(id) { descriptionId = id; },
    setTriggerId(id) { triggerId = id; },
    close,
  });
</script>

{@render children?.()}
