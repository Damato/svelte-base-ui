<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getRadioContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Whether to keep the indicator in the DOM when unchecked. @default false */
    keepMounted?: boolean;
    children?: Snippet;
  }

  let { keepMounted = false, class: className, children, ...rest }: Props = $props();

  const ctx = getRadioContext();
  const shouldRender = $derived(keepMounted || ctx.checked);
</script>

{#if shouldRender}
  <span
    {...rest}
    class={className}
    data-checked={ctx.checked ? '' : undefined}
    data-disabled={ctx.disabled ? '' : undefined}
  >
    {@render children?.()}
  </span>
{/if}
