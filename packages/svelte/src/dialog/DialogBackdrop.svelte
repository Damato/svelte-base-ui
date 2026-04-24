<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getDialogContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getDialogContext();
</script>

{#if ctx.open}
  <div
    {...rest}
    class={className}
    aria-hidden="true"
    data-open={ctx.open ? '' : undefined}
  />
{/if}
