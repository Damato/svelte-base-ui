<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getCollapsibleContext } from './context.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    /** Override the disabled state from the root. */
    disabled?: boolean;
    children?: Snippet;
  }

  let { disabled: disabledProp, class: className, children, ...rest }: Props = $props();

  const ctx = getCollapsibleContext();

  const disabled = $derived(disabledProp ?? ctx.disabled);
</script>

<button
  {...rest}
  class={className}
  type="button"
  disabled={disabled}
  aria-expanded={ctx.open}
  aria-controls={ctx.open ? ctx.panelId : undefined}
  data-open={ctx.open ? '' : undefined}
  data-closed={!ctx.open ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onclick={(e) => {
    rest.onclick?.(e);
    ctx.toggle();
  }}
>
  {@render children?.()}
</button>
