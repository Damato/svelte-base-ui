<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getAvatarContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Delay in ms before showing fallback. @default 0 */
    delay?: number;
    children?: Snippet;
  }

  let { delay = 0, class: className, children, ...rest }: Props = $props();

  const ctx = getAvatarContext();

  let visible = $state(delay === 0);

  $effect(() => {
    if (delay > 0) {
      const id = setTimeout(() => { visible = true; }, delay);
      return () => clearTimeout(id);
    }
  });

  const shouldShow = $derived(
    visible && (ctx.status === 'error' || ctx.status === 'idle'),
  );
</script>

{#if shouldShow}
  <span {...rest} class={className} data-status={ctx.status}>
    {@render children?.()}
  </span>
{/if}
