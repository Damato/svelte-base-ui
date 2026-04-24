<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import { getAvatarContext } from './context.js';

  interface Props extends HTMLImgAttributes {}

  let { class: className, src, ...rest }: Props = $props();

  const ctx = getAvatarContext();

  function handleLoad() {
    ctx.setStatus('loaded');
  }

  function handleError() {
    ctx.setStatus('error');
  }

  $effect(() => {
    if (src) {
      ctx.setStatus('loading');
    } else {
      ctx.setStatus('idle');
    }
  });
</script>

{#if ctx.status !== 'error' && src}
  <img
    {...rest}
    class={className}
    {src}
    data-status={ctx.status}
    onload={handleLoad}
    onerror={handleError}
  />
{/if}
