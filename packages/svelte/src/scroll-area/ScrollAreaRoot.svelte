<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setScrollAreaContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  let scrollingX = $state(false);
  let scrollingY = $state(false);
  let hovering = $state(false);
  let viewportEl: HTMLElement | null = $state(null);

  setScrollAreaContext({
    get scrollingX() { return scrollingX; },
    get scrollingY() { return scrollingY; },
    get hovering() { return hovering; },
    get viewportEl() { return viewportEl; },
    set viewportEl(v) { viewportEl = v; },
    setScrollingX(v) { scrollingX = v; },
    setScrollingY(v) { scrollingY = v; },
    setHovering(v) { hovering = v; },
  });
</script>

<div
  {...rest}
  class={className}
  style="position:relative;overflow:hidden;{rest.style ?? ''}"
  data-hovering={hovering ? '' : undefined}
  data-scrolling-x={scrollingX ? '' : undefined}
  data-scrolling-y={scrollingY ? '' : undefined}
  onmouseenter={() => hovering = true}
  onmouseleave={() => hovering = false}
>
  {@render children?.()}
</div>
