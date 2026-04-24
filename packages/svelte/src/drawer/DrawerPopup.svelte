<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDrawerContext } from './context.js';
  import { portal } from '../utils/portal.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    keepMounted?: boolean;
  }

  let { class: className, children, keepMounted = false, style, ...rest }: Props = $props();

  const ctx = getDrawerContext();

  let el: HTMLDivElement | null = $state(null);
  let swipeOffset = $state(0);
  let swiping = $state(false);

  let pointerStartX = 0;
  let pointerStartY = 0;

  function handlePointerDown(e: PointerEvent) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
    swiping = false;
    swipeOffset = 0;
    el?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!el?.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - pointerStartX;
    const dy = e.clientY - pointerStartY;

    const dir = ctx.swipeDirection;
    let delta = 0;
    if (dir === 'down') delta = dy;
    else if (dir === 'up') delta = -dy;
    else if (dir === 'right') delta = dx;
    else if (dir === 'left') delta = -dx;

    if (delta > 0) {
      swiping = true;
      swipeOffset = delta;
    }
  }

  function handlePointerUp(e: PointerEvent) {
    if (!el?.hasPointerCapture(e.pointerId)) return;
    el?.releasePointerCapture(e.pointerId);

    const threshold = 100;
    if (swipeOffset > threshold) {
      ctx.setOpen(false);
    }
    swipeOffset = 0;
    swiping = false;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      ctx.setOpen(false);
    }
  }

  const translateStyle = $derived(() => {
    if (!swiping || swipeOffset === 0) return '';
    const dir = ctx.swipeDirection;
    if (dir === 'down') return `translateY(${swipeOffset}px)`;
    if (dir === 'up') return `translateY(-${swipeOffset}px)`;
    if (dir === 'right') return `translateX(${swipeOffset}px)`;
    if (dir === 'left') return `translateX(-${swipeOffset}px)`;
    return '';
  });

  const mounted = $derived(ctx.open || keepMounted);
</script>

{#if mounted}
  <div use:portal>
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      bind:this={el}
      {...rest}
      class={className}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ctx.titleId}
      aria-describedby={ctx.descriptionId}
      tabindex={-1}
      hidden={!ctx.open || undefined}
      data-open={ctx.open ? '' : undefined}
      data-swipe-direction={ctx.swipeDirection}
      data-swiping={swiping ? '' : undefined}
      style="touch-action:none;{swiping ? `transform:${translateStyle()};` : ''}${style ?? ''}"
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onkeydown={handleKeyDown}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
