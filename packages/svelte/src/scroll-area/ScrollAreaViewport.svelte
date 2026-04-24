<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getScrollAreaContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getScrollAreaContext();
  let el: HTMLDivElement | null = $state(null);
  let scrollXTimer: ReturnType<typeof setTimeout> | null = null;
  let scrollYTimer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => { ctx.viewportEl = el; });

  function handleScroll() {
    if (!el) return;
    if (el.scrollLeft !== 0 || el.scrollWidth > el.clientWidth) {
      ctx.setScrollingX(true);
      if (scrollXTimer) clearTimeout(scrollXTimer);
      scrollXTimer = setTimeout(() => ctx.setScrollingX(false), 500);
    }
    if (el.scrollTop !== 0 || el.scrollHeight > el.clientHeight) {
      ctx.setScrollingY(true);
      if (scrollYTimer) clearTimeout(scrollYTimer);
      scrollYTimer = setTimeout(() => ctx.setScrollingY(false), 500);
    }
  }
</script>

<div
  bind:this={el}
  {...rest}
  class={className}
  style="overflow:auto;height:100%;width:100%;{rest.style ?? ''}"
  onscroll={handleScroll}
>
  {@render children?.()}
</div>
