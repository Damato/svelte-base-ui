<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getAccordionItemContext, getAccordionRootContext } from './context.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    disabled?: boolean;
    children?: Snippet;
  }

  let { disabled: disabledProp, class: className, children, ...rest }: Props = $props();

  const rootCtx = getAccordionRootContext();
  const itemCtx = getAccordionItemContext();

  const disabled = $derived(disabledProp ?? itemCtx.disabled);
</script>

<button
  {...rest}
  class={className}
  type="button"
  id={itemCtx.triggerId}
  disabled={disabled}
  aria-expanded={itemCtx.open}
  aria-controls={itemCtx.panelId}
  data-open={itemCtx.open ? '' : undefined}
  data-closed={!itemCtx.open ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onclick={() => rootCtx.toggleItem(itemCtx.value)}
>
  {@render children?.()}
</button>
