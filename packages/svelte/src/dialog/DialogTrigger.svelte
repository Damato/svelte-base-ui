<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDialogContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLButtonAttributes { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getDialogContext();
  const id = idProp ?? generateId('dialog-trigger');

  $effect(() => {
    ctx.setTriggerId(id);
    return () => ctx.setTriggerId(undefined);
  });

  function open() {
    // DialogRoot owns open state; trigger toggles by dispatching through root.
    // Since root manages open, trigger calls onOpenChange(true) via context.
    // We expose a simple toggle here – the caller wraps in DialogRoot.
  }
</script>

<button
  {...rest}
  class={className}
  type="button"
  {id}
  aria-haspopup="dialog"
  aria-expanded={ctx.open}
  data-open={ctx.open ? '' : undefined}
>
  {@render children?.()}
</button>
