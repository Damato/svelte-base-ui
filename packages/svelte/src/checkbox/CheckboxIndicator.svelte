<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getCheckboxContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Whether to keep the element in the DOM when unchecked.
     * @default false
     */
    keepMounted?: boolean;
    children?: Snippet;
  }

  let { keepMounted = false, class: className, children, ...rest }: Props = $props();

  const ctx = getCheckboxContext();

  const shouldRender = $derived(keepMounted || ctx.checked || ctx.indeterminate);
</script>

{#if shouldRender}
  <span
    {...rest}
    class={className}
    data-checked={ctx.checked ? '' : undefined}
    data-disabled={ctx.disabled ? '' : undefined}
    data-indeterminate={ctx.indeterminate ? '' : undefined}
    data-readonly={ctx.readOnly ? '' : undefined}
    data-required={ctx.required ? '' : undefined}
  >
    {@render children?.()}
  </span>
{/if}
